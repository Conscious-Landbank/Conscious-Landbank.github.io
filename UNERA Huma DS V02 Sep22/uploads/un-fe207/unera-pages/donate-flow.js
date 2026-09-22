/* Huma — Donate flow controller (fiat + crypto + multi-centre). Prototype state is in-memory only. */
(function () {
'use strict';
var D = window.UNERA_DON;
var $ = function (id) { return document.getElementById(id); };

/* ── Demo pills (in-memory) ── */
var outcome = 'success';
var OUTCOMES = [
  { id: 'success', label: 'Success (default)' },
  { id: 'awaiting', label: 'Awaiting confirmation' },
  { id: 'timeout', label: 'Timeout (status uncertain)' },
  { id: 'pay_failed', label: 'Payment failed' },
  { id: 'expired', label: 'Order expired' },
  { id: 'rejected', label: 'Wallet rejected' },
  { id: 'reverted', label: 'Transaction reverted' }
];
var blocker = 'none';
var BLOCKERS = [
  { id: 'none', label: 'None (default)' },
  { id: 'balance', label: 'Insufficient balance' },
  { id: 'gas', label: 'Insufficient gas' },
  { id: 'no_receipt', label: 'Receipt not eligible' },
  { id: 'inactive', label: 'Center becomes inactive' },
  { id: 'server', label: 'Server error on submit' }
];
function pillGroup(mountId, items, get, set) {
  var el = $(mountId);
  el.innerHTML = items.map(function (s) {
    return '<button type="button" class="demo-btn' + (s.id === get() ? ' active' : '') + '" data-v="' + s.id + '">' + s.label + '</button>';
  }).join('');
  el.querySelectorAll('.demo-btn').forEach(function (b) {
    b.addEventListener('click', function () { set(b.getAttribute('data-v')); pillGroup(mountId, items, get, set); });
  });
}

/* ── Flow state ── */
var MIN_USD = 5, MAX_USD = 50000, MAX_CENTRES = 5;
var method = 'fiat';
var token = 'hUSD';
var cardId = null;              // selected saved-card id (fiat)
var PM_KEY = 'unera_paymentMethods_v1'; // shared with payment-methods.html — single source of truth
var multi = false;
var selected = [];           // center ids
var centreQuery = '';        // center search filter (step 1)
var alloc = {};              // centreId -> token amount (multi)
var currentStep = 1;
var quoteRate = 1, rateTimer = null;
var preId = D.qs('hc');
if (preId) selected = [D.getCentre(preId).id];

function tok() { return D.BALANCES.tokens.find(function (t) { return t.symbol === token; }); }

/* ── Saved cards — read the SAME store as payment-methods.html so the list stays consistent ── */
function loadCards() {
  try { var v = JSON.parse(localStorage.getItem(PM_KEY)); return Array.isArray(v) ? v : []; } catch (e) { return []; }
}
function cardExpired(c) {
  if (!c.expMonth || !c.expYear) return false;
  var d = new Date();
  return (c.expYear < d.getFullYear()) || (c.expYear === d.getFullYear() && c.expMonth < d.getMonth() + 1);
}
function cardLabel(c) { return c.brand + ' \u2022\u2022\u2022\u2022 ' + c.last4; }
function getCard(id) { return loadCards().find(function (c) { return c.id === id; }); }
var CARD_GLYPH = { visa: '#1a1f71', mastercard: '#eb001b', amex: '#2e77bc', discover: '#e6772e' };
function renderCards() {
  var wrap = $('cardSelect');
  if (!wrap) return;
  var cards = loadCards();
  var usable = cards.filter(function (c) { return !cardExpired(c); });
  // Keep/settle the selection: prefer current, else default, else first usable.
  if (!cardId || !usable.some(function (c) { return c.id === cardId; })) {
    var def = usable.find(function (c) { return c.isDefault; }) || usable[0];
    cardId = def ? def.id : null;
  }
  $('cardEmptyHint').hidden = cards.length > 0;
  wrap.innerHTML = cards.map(function (c) {
    var exp = cardExpired(c);
    var sel = c.id === cardId;
    var glyph = CARD_GLYPH[c.brand.toLowerCase()] || 'var(--brand-deep-blue)';
    return '<button type="button" class="token-chip card-chip' + (sel ? ' selected' : '') + '" role="radio" aria-checked="' + sel + '"'
      + (exp ? ' disabled aria-disabled="true"' : '') + ' data-card="' + c.id + '">'
      + '<span class="card-chip-line"><span class="card-brand-glyph" style="background:' + glyph + ';" aria-hidden="true"></span>' + D.esc(cardLabel(c))
      + (c.isDefault && !exp ? '<span class="card-def-tag">Default</span>' : '')
      + (exp ? '<span class="card-exp-tag">Expired</span>' : '') + '</span>'
      + '<span class="card-chip-sub">' + D.esc(c.name) + ' \u00b7 exp ' + ('0' + c.expMonth).slice(-2) + '/' + String(c.expYear).slice(-2) + '</span>'
      + '</button>';
  }).join('')
    + '<a href="payment-methods.html" class="card-add-btn" id="addCardBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>Add new card</a>';
  wrap.querySelectorAll('.card-chip:not([disabled])').forEach(function (b) {
    b.addEventListener('click', function () { cardId = b.getAttribute('data-card'); renderCards(); });
  });
}
function price() { return D.PRICES[token]; }
function gasUSD(eth) { return eth * D.PRICES.ETH; }
function promptCount() { return method === 'fiat' ? 0 : (token === 'ETH' ? 1 : 2); }
function totalTokenAmount() {
  if (multi) return selected.reduce(function (a, id) { return a + (parseFloat(alloc[id]) || 0); }, 0);
  return parseFloat($('amountInput').value) || 0;
}
function totalUSD() { return method === 'fiat' ? totalTokenAmount() : totalTokenAmount() * quoteRate; }

/* ── Gates ── */
function renderGates() {
  var st = D.getUserState();
  $('gateLogin').hidden = st !== 'public';
  $('gateKyc').hidden = st !== 'authed';
  $('flowRoot').hidden = (st === 'public' || st === 'authed');
  document.querySelector('.stepper').style.opacity = $('flowRoot').hidden ? '0.4' : '1';
}
$('verifyNowBtn').addEventListener('click', function () { D.setUserState('wallet' === D.getUserState() ? 'wallet' : 'kyc'); D.renderStatePills('userStatePills'); });
$('connectWalletBtn').addEventListener('click', function () { D.setUserState('wallet'); D.renderStatePills('userStatePills'); });

/* ── Stepper ── */
function goToStep(n, opts) {
  opts = opts || {};
  currentStep = n;
  ['step1', 'step2', 'step3', 'stepProcessing', 'step4'].forEach(function (id) { $(id).classList.remove('active'); });
  $(opts.processing ? 'stepProcessing' : 'step' + n).classList.add('active');
  document.querySelectorAll('#stepper .step').forEach(function (s) {
    var k = parseInt(s.getAttribute('data-step'), 10);
    s.classList.toggle('active', k === n && !opts.allDone);
    s.classList.toggle('completed', k < n || !!opts.allDone);
    var circle = s.querySelector('.step-circle');
    if (k < n || opts.allDone) circle.innerHTML = '<svg class="unera-checkmark" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg>';
    else circle.textContent = k;
  });
  $('stepper').setAttribute('aria-valuenow', n);
  $('stepperProgress').style.width = ((n - 1) / 3 * 100) + '%';
  var TITLES = ['Center', 'Amount', 'Review', 'Complete'];
  $('mStepNum').textContent = n;
  $('mStepLabel').textContent = 'Step ' + n + ' of 4';
  $('mStepTitle').textContent = opts.processing ? 'Processing' : TITLES[n - 1];
  $('mStepCounter').textContent = n + ' / 4';
  renderFlowContext(n, opts);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Move focus to the active step's heading on user-initiated navigation (steps 1-3).
  // Processing announces via its own live region; the terminal manages its own focus.
  if (!opts.processing && !opts.allDone && !opts.fail && n >= 1 && n <= 3) {
    var head = $('step' + n).querySelector('h2');
    if (head) { head.setAttribute('tabindex', '-1'); head.focus({ preventScroll: true }); }
  }
}
function renderFlowContext(n, opts) {
  var fc = $('flowContext');
  var show = (n === 2 || n === 3) && !opts.processing && selected.length > 0;
  fc.hidden = !show;
  if (!show) return;
  var c = D.getCentre(selected[0]);
  var img = '<span class="fc-img" style="background-color:' + c.tint + ';"><img src="' + c.image.replace('w=800', 'w=200') + '" alt=""></span>';
  var name = multi && selected.length > 1
    ? 'Split across ' + selected.length + ' centers'
    : D.esc(c.name) + ' · ' + D.esc(c.country);
  fc.innerHTML = img + '<span class="fc-body"><span class="fc-label">Donating to</span><span class="fc-name">' + name + '</span></span>'
    + '<button type="button" class="btn btn-secondary btn-sm" id="fcChangeBtn">Change center</button>';
  $('fcChangeBtn').addEventListener('click', function () { clearInterval(rateTimer); goToStep(1); });
}

/* ── STEP 1: center selection ── */
function renderCentres() {
  var pick = $('centrePick');
  var q = (centreQuery || '').trim().toLowerCase();
  var list = D.CENTERS.filter(function (c) {
    return !q || c.name.toLowerCase().indexOf(q) !== -1 || c.country.toLowerCase().indexOf(q) !== -1;
  });
  pick.innerHTML = list.map(function (c) {
    var sel = selected.indexOf(c.id) !== -1;
    var dis = !c.active;
    return '<button type="button" class="centre-pick-row' + (sel ? ' selected' : '') + '" role="option" aria-selected="' + sel + '" data-id="' + c.id + '"' + (dis ? ' disabled' : '') + '>'
      + '<span class="cp-img" style="background-color:' + c.tint + ';" aria-hidden="true"><img src="' + c.image.replace('w=800', 'w=200') + '" alt="" loading="lazy"></span>'
      + '<span class="cp-body"><span class="cp-name">' + D.esc(c.name) + (dis ? ' <span class="hc-inactive-badge">Paused</span>' : '') + '</span><span class="cp-meta">' + D.esc(c.country) + ' · ' + D.fmtUSD(c.totalDonatedUSD) + ' donated · ' + D.fmtNum(c.livesImpacted) + ' lives impacted</span></span>'
      + '<svg class="cp-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>'
      + '</button>';
  }).join('');
  pick.querySelectorAll('.centre-pick-row').forEach(function (row) {
    row.addEventListener('click', function () {
      var id = row.getAttribute('data-id');
      if (multi) {
        var i = selected.indexOf(id);
        if (i === -1) {
          if (selected.length >= MAX_CENTRES) {
            var mh = $('multiHint');
            if (mh) { mh.textContent = 'You can split one donation across up to ' + MAX_CENTRES + ' centers.'; mh.classList.add('error'); mh.setAttribute('role', 'alert'); }
            return;
          }
          selected.push(id);
          var mh2 = $('multiHint');
          if (mh2) { mh2.textContent = 'Multi-centre donations are available for crypto only in this release.'; mh2.classList.remove('error'); mh2.removeAttribute('role'); }
        } else selected.splice(i, 1);
      } else selected = [id];
      renderCentres();
    });
  });
  var total = D.CENTERS.length;
  var countEl = $('centreCount');
  if (countEl) countEl.textContent = q
    ? (list.length + ' of ' + total + ' centers match “' + centreQuery.trim() + '”')
    : (total + ' centers available');
  var emptyEl = $('centreEmpty');
  if (emptyEl) emptyEl.hidden = list.length > 0;
  var clearBtn = $('centreSearchClear');
  if (clearBtn) clearBtn.hidden = !q;
  renderSelectedChips();
  $('toStep2').disabled = selected.length === 0;
  pick.setAttribute('aria-multiselectable', multi ? 'true' : 'false');
}
function renderSelectedChips() {
  var wrap = $('centreSelectedChips');
  if (!wrap) return;
  if (!multi || selected.length === 0) { wrap.hidden = true; wrap.innerHTML = ''; return; }
  wrap.hidden = false;
  wrap.innerHTML = selected.map(function (id) {
    var c = D.getCentre(id);
    return '<span class="centre-chip">' + D.esc(c.name)
      + '<button type="button" class="centre-chip-remove" data-remove="' + id + '" aria-label="Remove ' + D.esc(c.name) + '"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button></span>';
  }).join('') + '<button type="button" class="centre-chips-clear" id="centreChipsClear">Clear all</button>';
  wrap.querySelectorAll('[data-remove]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-remove');
      var i = selected.indexOf(id);
      if (i !== -1) selected.splice(i, 1);
      renderCentres();
    });
  });
  var ca = $('centreChipsClear');
  if (ca) ca.addEventListener('click', function () { selected = []; renderCentres(); });
}
var centreSearchEl = $('centreSearch');
if (centreSearchEl) centreSearchEl.addEventListener('input', function () { centreQuery = this.value; renderCentres(); });
var centreSearchClearEl = $('centreSearchClear');
if (centreSearchClearEl) centreSearchClearEl.addEventListener('click', function () {
  centreQuery = '';
  if (centreSearchEl) { centreSearchEl.value = ''; centreSearchEl.focus(); }
  renderCentres();
});
$('multiToggle').addEventListener('change', function () {
  multi = this.checked;
  if (multi && method === 'fiat') setMethod('crypto');
  if (!multi && selected.length > 1) selected = [selected[0]];
  renderCentres();
});

/* ── STEP 2: method & amount ── */
function setMethod(m) {
  method = m;
  $('methodFiat').classList.toggle('selected', m === 'fiat');
  $('methodFiat').setAttribute('aria-checked', m === 'fiat');
  $('methodCrypto').classList.toggle('selected', m === 'crypto');
  $('methodCrypto').setAttribute('aria-checked', m === 'crypto');
  renderAmountUI();
}
$('methodFiat').addEventListener('click', function () {
  if (multi) { $('amountHint').textContent = 'Multi-centre donations are crypto-only in this release. Switch off the split to donate by card.'; $('amountHint').classList.add('error'); return; }
  setMethod('fiat');
});
$('methodCrypto').addEventListener('click', function () { setMethod('crypto'); });

function renderTokens() {
  $('tokenSelect').innerHTML = D.BALANCES.tokens.map(function (t) {
    return '<button type="button" class="token-chip' + (t.symbol === token ? ' selected' : '') + '" role="radio" aria-checked="' + (t.symbol === token) + '" data-t="' + t.symbol + '">' + t.symbol + ' <span style="font-weight:400;color:var(--text-secondary);">' + t.amount.toLocaleString('en-US', { maximumFractionDigits: t.native ? 4 : 2 }) + '</span></button>';
  }).join('');
  $('tokenSelect').querySelectorAll('.token-chip').forEach(function (b) {
    b.addEventListener('click', function () { token = b.getAttribute('data-t'); renderTokens(); renderAmountUI(); });
  });
}

function renderAmountUI() {
  var crypto = method === 'crypto';
  var walletOk = D.is('wallet');
  $('gateWallet').hidden = !(crypto && !walletOk);
  $('cryptoTokenBlock').hidden = !(crypto && walletOk);
  $('fiatCardBlock').hidden = crypto;
  if (!crypto) renderCards();
  $('amountBlock').hidden = crypto && !walletOk;
  $('amountHint').classList.remove('error');
  $('amountWrap').classList.remove('input-error');
  if (crypto && walletOk) {
    quoteRate = price();
    $('amountLabel').textContent = multi ? 'Allocation per center (' + token + ')' : 'Donation amount (' + token + ')';
    $('amountPrefix').textContent = token;
    $('availLine').hidden = false;
    $('availAmt').textContent = tok().amount.toLocaleString('en-US', { maximumFractionDigits: tok().native ? 4 : 2 }) + ' ' + token;
    $('availUsd').textContent = '≈ ' + D.fmtUSD(tok().amount * quoteRate, 2);
    $('amountHint').textContent = 'Donations between ' + D.fmtUSD(MIN_USD) + ' and ' + D.fmtUSD(MAX_USD) + ' (USD value) per transaction.';
    $('conversionTipText').innerHTML = 'All donated crypto is <strong>converted to USD</strong> before it is routed to the center. Current quote: 1 ' + token + ' = ' + D.fmtUSD(quoteRate, token === 'ETH' ? 2 : 4) + '.';
    $('gasWarnBanner').hidden = blocker !== 'gas';
    $('amountWrap').style.display = multi ? 'none' : '';
    $('amountLabel').style.display = multi ? 'none' : '';
    $('quickAmounts').style.display = multi ? 'none' : '';
    $('multiAllocBlock').hidden = !multi;
    if (multi) renderAllocRows();
  } else {
    $('amountLabel').textContent = 'Donation amount (USD)';
    $('amountLabel').style.display = '';
    $('amountPrefix').textContent = '$';
    $('availLine').hidden = true;
    $('amountHint').textContent = 'Donations between $5 and $50,000 per transaction.';
    $('conversionTipText').textContent = 'Your card is charged in USD and the full donation is routed to the center. Credit and debit cards are supported.';
    $('gasWarnBanner').hidden = true;
    $('amountWrap').style.display = '';
    $('quickAmounts').style.display = '';
    $('multiAllocBlock').hidden = true;
  }
  var quicks = method === 'fiat' ? [25, 50, 100, 250] : (token === 'ETH' ? [0.01, 0.05, 0.1] : [25, 50, 100, 250]);
  $('quickAmounts').innerHTML = quicks.map(function (q) { return '<button type="button" class="quick-amt" data-q="' + q + '">' + (method === 'fiat' ? '$' + q : q + ' ' + token) + '</button>'; }).join('');
  $('quickAmounts').querySelectorAll('.quick-amt').forEach(function (b) {
    b.addEventListener('click', function () { $('amountInput').value = b.getAttribute('data-q'); updateAmountLive(); });
  });
  updateAmountLive();
}
function renderAllocRows() {
  $('multiAllocRows').innerHTML = selected.map(function (id) {
    var c = D.getCentre(id);
    return '<div class="multi-row"><span class="cp-name">' + D.esc(c.name) + '</span>'
      + '<div class="input-wrapper"><span class="input-prefix">' + token + '</span><input type="text" inputmode="decimal" class="input-field" style="font-size:0.938rem;padding:0.625rem 0.5rem;" data-alloc="' + id + '" value="' + (alloc[id] || '') + '" aria-label="Amount for ' + D.esc(c.name) + '"></div>'
      + '</div>';
  }).join('');
  $('multiAllocRows').querySelectorAll('[data-alloc]').forEach(function (inp) {
    inp.addEventListener('input', function () { alloc[inp.getAttribute('data-alloc')] = inp.value; updateMultiTotal(); });
  });
  updateMultiTotal();
}
function updateMultiTotal() {
  var t = totalTokenAmount();
  $('multiTotalLine').textContent = 'Total: ' + t.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' ' + token + ' ≈ ' + D.fmtUSD(t * quoteRate, 2);
}

function validateAmount() {
  var hint = $('amountHint'), wrap = $('amountWrap');
  hint.classList.remove('error'); wrap.classList.remove('input-error');
  var amt = totalTokenAmount();
  var usd = totalUSD();
  function fail(msg) { hint.textContent = msg; hint.classList.add('error'); if (!multi) wrap.classList.add('input-error'); return false; }
  if (!amt || amt <= 0 || isNaN(amt)) return fail('Enter a valid donation amount.');
  if (usd < MIN_USD || usd > MAX_USD) return fail('Donation amount must be between ' + D.fmtUSD(MIN_USD) + ' and ' + D.fmtUSD(MAX_USD) + ' (USD value).');
  if (method === 'fiat' && !cardId) return fail('Add a payment card to donate by card.');
  if (method === 'crypto') {
    if (blocker === 'balance' || amt > tok().amount) return fail('You do not have enough ' + token + ' for this donation.');
    if (multi && selected.some(function (id) { return (parseFloat(alloc[id]) || 0) * quoteRate < MIN_USD; })) return fail('Each center allocation must be at least ' + D.fmtUSD(MIN_USD) + '.');
  }
  return true;
}

/* ── STEP 3: review ── */
function row(label, value, opts) {
  opts = opts || {};
  return '<div class="summary-row' + (opts.total ? ' summary-row--total' : '') + '"><span class="summary-row-label">' + label + '</span><span class="summary-row-value' + (opts.mono ? ' mono' : '') + '">' + value + '</span></div>';
}
function receiptEligible() { return blocker !== 'no_receipt'; }
function updateAmountLive() {
  var el = $('amountLive');
  if (multi) { el.hidden = true; return; }
  var amt = parseFloat($('amountInput').value) || 0;
  if (!amt || amt <= 0) { el.hidden = true; return; }
  var usd = method === 'fiat' ? amt : amt * quoteRate;
  var rows = '';
  if (method === 'crypto') rows += '<div class="summary-row"><span class="summary-row-label">You donate</span><span class="summary-row-value">' + amt.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' ' + token + '</span></div>';
  rows += '<div class="summary-row summary-row--total"><span class="summary-row-label">Center receives</span><span class="summary-row-value">' + D.fmtUSD(usd, 2) + '</span></div>';
  var hc = D.getCentre(selected[0]);
  if (hc.impactHints && hc.impactHints.length) {
    var hint = null;
    hc.impactHints.forEach(function (h) { if (usd >= h.amount) hint = h; });
    if (hint) rows += '<div class="summary-row"><span class="summary-row-label">Your impact</span><span class="summary-row-value" style="color:var(--fin-up);">≈ ' + D.esc(hint.impact) + '</span></div>';
  }
  el.innerHTML = rows;
  el.hidden = false;
}
function renderReview() {
  var orderRows = '';
  if (multi) {
    orderRows += selected.map(function (id) {
      var c = D.getCentre(id); var a = parseFloat(alloc[id]) || 0;
      return row(D.esc(c.name), a.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' ' + token + ' · ≈ ' + D.fmtUSD(a * quoteRate, 2));
    }).join('');
    orderRows += row('Routing', 'DonationRouter · donateMulti', {});
  } else {
    var c = D.getCentre(selected[0]);
    orderRows += row('Humanity Center', D.esc(c.name) + ' · ' + D.esc(c.country));
    orderRows += row('Center wallet', D.shortAddr(c.wallet), { mono: true });
  }
  orderRows += row('Method', method === 'fiat' ? 'Credit / debit card (USD)' : 'Crypto — ' + token);
  if (method === 'fiat') {
    var sc = getCard(cardId);
    if (sc) orderRows += row('Card', D.esc(cardLabel(sc)));
  }
  orderRows += row('Tax receipt', receiptEligible() ? 'Available once completed' : 'May not be available in your region');
  var amt = totalTokenAmount(), usd = totalUSD();
  if (method === 'crypto') {
    orderRows += row('You donate', amt.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' ' + token);
    orderRows += row('Conversion rate', '1 ' + token + ' = ' + D.fmtUSD(quoteRate, token === 'ETH' ? 2 : 4));
    orderRows += row('Center receives (USD)', D.fmtUSD(usd, 2), { total: true });
  } else {
    orderRows += row('Center receives (USD)', D.fmtUSD(usd, 2), { total: true });
  }
  $('reviewOrderRows').innerHTML = orderRows;

  var costRows = '';
  if (method === 'fiat') {
    costRows += row('Donation amount', D.fmtUSD(usd, 2));
    costRows += row('Huma fee', 'None');
    costRows += row('Total charged to card', D.fmtUSD(usd, 2), { total: true });
  } else if (token === 'ETH') {
    var g1 = D.GAS.donateETH;
    costRows += row('Network fee — donate', g1.toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(g1), 2));
    costRows += row('Total network fees', g1.toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(g1), 2), { total: true });
  } else {
    var ga = D.GAS.approveETH, gd = D.GAS.donateETH;
    costRows += row('Network fee — approve', ga.toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(ga), 2));
    costRows += row('Network fee — ' + (multi ? 'donateMulti' : 'donate'), gd.toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(gd), 2));
    costRows += row('Total network fees', (ga + gd).toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(ga + gd), 2), { total: true });
  }
  $('reviewCostRows').innerHTML = costRows;

  $('rateLockNote').hidden = method !== 'crypto';
  if (method === 'crypto') startRateLock();
  var n = promptCount();
  $('promptCountText').innerHTML = n === 0
    ? 'No wallet confirmations needed — this is a card payment.'
    : (n === 1
      ? 'This needs <strong>1 wallet confirmation</strong> — the donation itself.'
      : 'This needs <strong>2 wallet confirmations</strong> — approve, then ' + (multi ? 'donateMulti' : 'donate') + '.');
  $('promptCountLine').querySelector('.fee-info-btn').style.display = n >= 1 ? '' : 'none';
  $('promptTooltip').classList.remove('is-open');

  var block = null;
  if (blocker === 'inactive') block = { t: 'This center is no longer accepting donations', x: 'The center was paused while you were reviewing. Please choose another center.' };
  $('reviewBlockBanner').hidden = !block;
  if (block) { $('reviewBlockTitle').textContent = block.t; $('reviewBlockText').textContent = block.x; }
  $('confirmBtn').disabled = !!block;
}
function startRateLock() {
  clearInterval(rateTimer);
  var s = 30;
  $('rateCountdown').textContent = '0:30';
  rateTimer = setInterval(function () {
    s--;
    if (s <= 0) { s = 30; quoteRate = price() * (1 + (Math.random() - 0.5) * 0.0004); renderReview(); return; }
    $('rateCountdown').textContent = '0:' + String(s).padStart(2, '0');
  }, 1000);
}

/* ── Confirm → Transaction Tracker → terminal ── */
var serverErrShown = false;
var tracker = null;

/* Points multiplier per FE-207 §A: direct donation 1.5×, recurring 3×. */
var POINTS_MULTIPLIER = 1.5;
function pointsFor(usd) { return Math.round(usd * 0.05 * POINTS_MULTIPLIER * 10) / 10; }

function impactFor(c, usd) {
  var hint = null;
  (c.impactHints || []).forEach(function (h) { if (usd >= h.amount) hint = h; });
  return hint ? hint.impact : null;
}

function trackerConfig(donationId, c, refLabel) {
  var usd = totalUSD();
  var crypto = method === 'crypto';
  var impact = impactFor(c, usd);
  var stages = crypto
    ? [
        { title: 'Sent from your wallet', sub: 'You approved the transfer. Nothing else is needed from you.' },
        { title: 'Being confirmed by the network', sub: 'The blockchain is writing your donation into a block.', conf: true },
        { title: 'Checked by Huma', sub: 'We match the transfer to your donation and convert it to US dollars.' },
        { title: 'Delivered to the Humanity Center', sub: 'The funds arrive and your digital receipt is issued.' }
      ]
    : [
        { title: 'Payment received', sub: 'Your card payment went through. Nothing else is needed from you.' },
        { title: 'Checks', sub: 'A routine safety check on the payment — this is the part that can take a few minutes.', conf: true },
        { title: 'Routed to the Humanity Center', sub: 'We send the full amount on to the center you chose.' },
        { title: 'Delivered', sub: 'The funds arrive and your digital receipt is issued.' }
      ];

  var wait = [];
  if (impact) {
    wait.push({
      eyebrow: 'Your impact',
      title: D.esc(impact),
      body: 'That is what ' + D.fmtUSD(usd, 2) + ' does at ' + D.esc(c.name) + ' — funding ' +
            D.esc((c.programs || []).slice(0, 2).join(' and ').toLowerCase() || 'its programs') + '.'
    });
  }
  wait.push({
    eyebrow: 'Huma Points',
    title: 'You are earning ≈ ' + pointsFor(usd) + ' Huma Points',
    body: 'Direct donations earn <strong>1.5×</strong>. Make the same gift recurring and it earns <strong>3×</strong> — Huma Points cut your fees by up to 60%.'
  });
  wait.push({
    eyebrow: 'Where it lands',
    title: D.esc(refLabel),
    body: D.esc(c.desc || 'A Humanity Center in the network.')
  });
  wait.push({
    eyebrow: 'Verified on-chain',
    title: 'Funds arrive instantly. Impact is verified on-chain.',
    body: 'Your receipt is tied to the transaction id, so anyone can check that the money reached the center.'
  });

  return {
    kind: 'donation',
    journey: { alt: 'Your donation travelling from your wallet, through the network, to the Humanity Center',
               a: crypto ? 'Your wallet' : 'Your card', b: 'Network', c: 'Center' },
    headline: 'Your donation is on its way',
    eta: crypto ? 'Usually takes 2–5 minutes' : 'This may take a few minutes',
    headlineDelayed: 'Taking a little longer than usual — that’s normal when the network is busy. Nothing to do.',
    etaDelayed: 'Still working — we will finish this for you',
    headlineFailed: 'We couldn’t complete this donation',
    etaFailed: 'Nothing left your ' + (crypto ? 'wallet' : 'card') + ' — you can safely try again',
    headlineDone: 'Donation delivered — thank you',
    etaDone: 'Completed',
    delayedCopy: 'Networks get busy. Your money is safe and the donation is still queued — there is nothing to resend and nothing to pay again.',
    failCopy: crypto
      ? 'The transaction was reverted before it reached the center. No funds left your wallet.'
      : 'The payment could not be completed. Your card was not charged.',
    stages: stages,
    confirmations: crypto ? { target: 12, label: 'Network is double-checking', everyMs: 700 } : null,
    reassure: [
      '<strong>Your money is safe</strong> — the network is just slow, not your funds.',
      'You can leave this page. We’ll email you and ring the bell when it’s done.',
      'Nothing to do right now.'
    ],
    wait: wait,
    explain: crypto
      ? ['You sent your donation to the Humanity Center’s wallet. The blockchain now has to agree that it happened — a bit like several banks countersigning the same transfer.',
         'While that happens we convert the amount to US dollars at the rate you saw, so the center receives exactly what you were shown.',
         'You do not need to sign anything else, refresh, or resend. If the network is busy it simply takes a few minutes longer.']
      : ['Your card payment has been taken by our payment provider and is being routed to the center you chose.',
         'A routine safety check runs on every donation. It is automatic and needs nothing from you.',
         'Once it clears, the full amount goes to the center and your digital receipt is issued.'],
    facts: [
      'Donations start at just $1 in hUSD — small, regular giving adds up fastest.',
      'Huma never takes a cut of a donation: 100% of what you give reaches the center.',
      'Every donation is tied to an on-chain transaction id, so impact is verifiable, not just reported.',
      'Recurring giving earns 3× Huma Points — the highest multiplier on the platform.'
    ],
    support: { label: 'Contact support', href: 'mailto:support@unera.org' },
    trackHref: 'donation-history.html',
    trackLabel: 'Track in donation history',
    retryLabel: 'Start a new donation',
    retryHref: 'donate.html',
    pill: { label: 'Donation pending', href: '#main-content' },
    notify: {
      title: 'Donation pending',
      message: 'Your donation of ' + D.fmtUSD(usd, 2) + ' to ' + refLabel + ' is on its way. We’ll tell you the moment it lands.',
      ref: 'Ref ' + donationId,
      ctaUrl: 'donate.html',
      ctaLabel: 'View status'
    },
    timings: { stages: [3200, 4200, 3600, 800] },
    onFinish: function (res) {
      if (res === 'failed') {
        var failKind = ['pay_failed', 'expired', 'rejected', 'reverted'].indexOf(outcome) !== -1
          ? outcome
          : (method === 'fiat' ? 'pay_failed' : 'reverted');
        terminal(failKind, donationId);
      } else {
        terminal('success', donationId);
      }
    }
  };
}

function confirmDonation() {
  clearInterval(rateTimer);
  if (blocker === 'server' && !serverErrShown) {
    serverErrShown = true;
    $('reviewBlockBanner').hidden = false;
    $('reviewBlockTitle').textContent = 'Unable to complete this action. Please try again.';
    $('reviewBlockText').textContent = 'Something went wrong on our side — your card was not charged and nothing left your wallet.';
    $('confirmBtn').textContent = 'Retry';
    return;
  }
  $('reviewBlockBanner').hidden = true;
  var donationId = 'DON-' + Math.floor(100000 + Math.random() * 899999);
  var c = D.getCentre(selected[0]);
  var refLabel = multi ? selected.length + ' centers' : c.name;
  D.notifyDonation('info', 'Donation submitted', 'Your donation of ' + (method === 'fiat' ? D.fmtUSD(totalUSD(), 2) : totalTokenAmount() + ' ' + token) + ' to ' + refLabel + ' was submitted.', 'Ref ' + donationId);
  goToStep(4, { processing: true });

  if (tracker) tracker.destroy();
  tracker = window.TxTracker.mount(document.getElementById('txTrackerMount'), trackerConfig(donationId, c, refLabel));

  // Map the page's outcome demo pills onto the tracker's states.
  if (outcome === 'awaiting' || outcome === 'timeout') setTimeout(function () { tracker.setOutcome('delayed'); }, 900);
  else if (['pay_failed', 'expired', 'rejected', 'reverted'].indexOf(outcome) !== -1) setTimeout(function () { tracker.setOutcome('failed'); }, 2600);
}

function explorerLink(hash) {
  return '<a href="https://sepolia.etherscan.io/tx/' + hash + '" target="_blank" rel="noopener">' + D.shortHash(hash) + '</a>';
}
function fakeHash() {
  var s = '0x'; var h = '0123456789abcdef';
  for (var i = 0; i < 64; i++) s += h[Math.floor(Math.random() * 16)];
  return s;
}
function detailRow(l, v) { return '<div class="success-detail-row"><span class="success-detail-label">' + l + '</span><span class="success-detail-value">' + v + '</span></div>'; }

function terminal(kind, donationId) {
  if (window.TxTracker && window.TxTracker.pill) window.TxTracker.pill.stop();
  var amt = totalTokenAmount(), usd = totalUSD();
  var c = D.getCentre(selected[0]);
  var centreLabel = multi
    ? selected.map(function (id) {
        var a = parseFloat(alloc[id]) || 0;
        return D.esc(D.getCentre(id).name) + ' — ' + a.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' ' + token + ' · ≈ ' + D.fmtUSD(a * quoteRate, 2);
      }).join('<br>')
    : D.esc(c.name);
  var hash = method === 'crypto' ? fakeHash() : null;
  var html = '';
  if (kind === 'success') {
    D.notifyDonation('completed', 'Donation completed', 'Your donation of ' + D.fmtUSD(usd, 2) + ' to ' + (multi ? selected.length + ' centers' : c.name) + ' is confirmed. Thank you.', 'Ref ' + donationId);
    setTimeout(function () { D.notifyDonation('info', 'Tax receipt available', 'Your receipt for donation ' + donationId + ' is ready to download.', 'Ref ' + donationId, 'donation-history.html', 'Download receipt'); }, 2200);
    setTimeout(function () { D.notifyDonation('completed', 'Huma Points earned', 'You earned ≈ ' + pointsFor(usd) + ' Huma Points from this donation.', 'Ref ' + donationId, 'donations.html', 'View impact'); }, 3800);
    html = '<div class="amount-section terminal-state flow-card-animated">'
      + '<div class="success-icon-animated"><svg class="unera-checkmark" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg>'
      + '<div class="lightning-badge"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m320-80 40-280H160l360-520h80l-40 320h240L400-80h-80Z"/></svg></div></div>'
      + '<h2 class="terminal-title success" tabindex="-1" id="terminalHeading">Donation Complete — Thank You!</h2>'
      + '<p class="terminal-sub">' + (method === 'crypto' ? 'Your crypto was converted to USD and routed to the center.' : 'Your card payment was routed to the center.') + '</p>'
      + '<div class="success-details">'
      + detailRow('Donation ID', donationId)
      + detailRow('Date', D.fmtDate(new Date().toISOString()))
      + detailRow('Status', D.statusChip('completed'))
      + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel)
      + detailRow('Source', method === 'fiat' ? 'Card (fiat)' : 'Crypto — ' + token)
      + (method === 'fiat' && getCard(cardId) ? detailRow('Card', D.esc(cardLabel(getCard(cardId)))) : '')
      + (method === 'crypto' ? detailRow('You donated', amt.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' ' + token) : '')
      + detailRow('Center received (USD)', '<span style="color:var(--fin-up);font-weight:700;">' + D.fmtUSD(usd, 2) + '</span>')
      + (hash ? detailRow('Transaction', '<span class="success-detail-value mono">' + explorerLink(hash) + '</span>') : '')
      + detailRow('Tax receipt', 'Being generated — we’ll notify you when it’s ready')
      + detailRow('Huma Points earned', '≈ ' + pointsFor(usd) + ' Huma Points · <span class="uyt-pill">pending confirmation</span>') + detailRow('Points rate', 'Direct donation · 1.5× — recurring gifts earn 3×')
      + '</div>'
      + '<div class="btn-actions"><a href="donation-history.html" class="btn btn-secondary">View donation history</a><a href="explore-centres.html" class="btn btn-primary">Back to centers</a></div>'
      + '</div>';
    renderTerminal(html, { allDone: true });
    return;
  }
  if (kind === 'awaiting' || kind === 'timeout') {
    var subCopy = kind === 'timeout'
      ? 'This is taking longer than expected. We’ll update the status when confirmation is available — your donation stays safely pending and you can leave this page.'
      : (method === 'crypto'
        ? 'Your transaction was submitted. We’ll notify you as soon as it’s confirmed on-chain and converted to USD — you can leave this page safely.'
        : 'Your payment was received. We’ll notify you as soon as the donation is confirmed and routed to the center — you can leave this page safely.');
    html = terminalShell('pending',
      kind === 'timeout' ? 'Still Waiting for Confirmation' : 'Donation Awaiting Confirmation',
      subCopy,
      detailRow('Donation ID', donationId)
      + detailRow('Status', D.statusChip('awaiting_confirmation'))
      + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel)
      + detailRow('Amount', method === 'fiat' ? D.fmtUSD(usd, 2) : amt + ' ' + token + ' · ≈ ' + D.fmtUSD(usd, 2))
      + (hash ? detailRow('Transaction', '<span class="success-detail-value mono">' + explorerLink(hash) + '</span>') : ''),
      '<button type="button" class="btn btn-secondary" id="refreshStatusBtn">Refresh status</button><a href="donation-history.html" class="btn btn-secondary">Track in history</a><a href="donations.html" class="btn btn-primary">Back to Donations</a>');
    renderTerminal(html, {});
    var rb = $('refreshStatusBtn');
    if (rb) rb.addEventListener('click', function () {
      rb.disabled = true; rb.textContent = 'Checking…';
      setTimeout(function () { outcome = 'success'; terminal('success', donationId); }, 1200);
    });
    return;
  }
  var fails = {
    pay_failed: { t: 'We couldn’t process the payment', x: 'We could not process the payment right now. Your card was not charged. Please try again or use a different card.', notify: true },
    expired: { t: 'This donation request expired', x: 'This donation request expired before payment was completed. Please start a new donation.', notify: true },
    reverted: { t: 'Donation couldn’t be completed', x: 'Unable to complete this donation — the transaction was reverted and no funds reached the center. Please try again.', notify: true },
    rejected: { t: 'Donation not submitted', x: 'Donation was not submitted because the wallet request was rejected. Nothing left your wallet.', notify: false }
  };
  var f = fails[kind];
  if (f.notify) D.notifyDonation('error', 'Donation failed', f.x, 'Ref ' + donationId, 'donate.html', 'Try again');
  html = terminalShell(kind === 'rejected' ? 'pending' : 'fail', f.t, f.x + (f.notify ? ' If this keeps happening, contact support.' : ''),
    detailRow('Donation ID', donationId)
    + detailRow('Status', D.statusChip(kind === 'expired' ? 'expired' : (kind === 'rejected' ? 'pending_payment' : 'failed')))
    + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel),
    '<a href="explore-centres.html" class="btn btn-secondary">Back to centers</a><button type="button" class="btn btn-primary" onclick="location.reload()">Try again</button>');
  renderTerminal(html, { fail: true });
}
function terminalShell(icon, title, sub, rows, actions) {
  var iconHtml = icon === 'fail'
    ? '<div class="fail-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg></div>'
    : '<div class="pending-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z"/></svg></div>';
  return '<div class="amount-section terminal-state flow-card-animated">' + iconHtml
    + '<h2 class="terminal-title" tabindex="-1" id="terminalHeading">' + title + '</h2>'
    + '<p class="terminal-sub">' + sub + '</p>'
    + '<div class="success-details">' + rows + '</div>'
    + '<div class="btn-actions">' + actions + '</div></div>';
}
function renderTerminal(html, opts) {
  $('step4').innerHTML = html;
  goToStep(4, { allDone: !!opts.allDone });
  var h = $('terminalHeading');
  if (h) h.focus();
}

/* ── Wire steps ── */
$('toStep2').addEventListener('click', function () { renderAmountUI(); goToStep(2); });
$('backTo1').addEventListener('click', function () { goToStep(1); });
$('toStep3').addEventListener('click', function () {
  if (method === 'crypto' && !D.is('wallet')) { $('gateWallet').hidden = false; return; }
  if (!validateAmount()) return;
  renderReview();
  goToStep(3);
});
$('backTo2').addEventListener('click', function () { clearInterval(rateTimer); serverErrShown = false; $('confirmBtn').textContent = 'Confirm donation'; goToStep(2); });
$('confirmBtn').addEventListener('click', confirmDonation);
$('amountInput').addEventListener('input', updateAmountLive);

/* ── Init ── */
D.onUserState(function () { renderGates(); renderAmountUI(); });
D.renderStatePills('userStatePills');
pillGroup('outcomePills', OUTCOMES, function () { return outcome; }, function (v) { outcome = v; });
pillGroup('blockerPills', BLOCKERS, function () { return blocker; }, function (v) { blocker = v; if (currentStep === 2) renderAmountUI(); if (currentStep === 3) renderReview(); });
renderGates();
if (centreSearchEl) centreSearchEl.value = '';  // ignore any browser form-restore on reload
centreQuery = '';
renderCentres();
renderTokens();
renderAmountUI();
var centresLink = document.getElementById('navLinkCentres'); if (centresLink) centresLink.classList.add('active');
})();
