/* Huma - Donate flow controller (fiat + crypto + multi-centre). Prototype state is in-memory only. */
(function () {
'use strict';
var D = window.UNERA_DON;
var $ = function (id) { return document.getElementById(id); };

/* ── Demo pills (in-memory) ── */
/* Outcomes map onto DON-CRYPTO-07 + DON-FIAT-05 states. */
var outcome = 'success';
var OUTCOMES = [
  { id: 'success', label: 'Success (default)' },
  { id: 'awaiting', label: 'Awaiting confirmation' },
  { id: 'conversion', label: 'Conversion pending' },
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
  { id: 'server', label: 'Server error on submit' },
  { id: 'unavailable', label: 'Service unavailable' },
  { id: 'hp_unavailable', label: 'Huma Points unavailable' }
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
/* DON-DASH-09 / AC-DON-08 - the minimum donation is $1 USD (or equivalent). */
var MIN_USD = D.MIN_USD, MAX_USD = D.MAX_USD, MAX_CENTRES = 5;
var method = 'fiat';
var token = 'USDC';             // DON-CRYPTO-01 - USDC/USDT first
var ccy = 'USD';                // DON-FIAT-04 - original fiat currency
var cardId = null;              // selected saved-card id (fiat)
var rail = 'card';              // FE-208 (Eric, 24 Aug) - fiat rail: card | bank
var PM_KEY = 'unera_paymentMethods_v1'; // shared with payment-methods.html - single source of truth
/* Donation spec §1.4 puts multi-HC allocation out of scope. Retained behind ?multi=1 for TC-CRY-27->29. */
var MULTI_ENABLED = D.qs('multi') === '1';
var multi = false;
var selected = [];           // center ids
var centreQuery = '';        // center search filter (step 1)
var alloc = {};              // centreId -> token amount (multi)
var currentStep = 1;
var quoteRate = 1, rateTimer = null;
var quote = null;            // latest Uniswap quote object
/* HC-DETAIL-05 / flow 5.1 step 8 - arrive with the HC prefilled. A suspended HC is never preselected
   (AC-DON-12): the user lands on step 1 with a safe message instead. */
var preId = D.qs('hc');
var preBlocked = false;
if (preId) {
  var preHc = D.getCentre(preId);
  if (preHc.active) selected = [preHc.id]; else preBlocked = true;
}

function tok() { return D.BALANCES.tokens.find(function (t) { return t.symbol === token; }) || D.BALANCES.tokens[0]; }
function ccyInfo() { return D.fiatCcy(ccy); }
/* Original-currency amount -> canonical USD (§1.2 "USD is the canonical value"). */
function toUSD(amount) { return method === 'fiat' ? amount * ccyInfo().rate : (quote ? quote.usd : amount * D.PRICES[token]); }

/* ── Saved cards - read the SAME store as payment-methods.html so the list stays consistent ── */
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
/* USDC/USDT are ERC-20: approve + transfer. ETH/BTC are native sends: one confirmation. */
function promptCount() { return method === 'fiat' ? 0 : ((token === 'ETH' || token === 'BTC') ? 1 : 2); }
function totalTokenAmount() {
  if (multi) return selected.reduce(function (a, id) { return a + (parseFloat(alloc[id]) || 0); }, 0);
  return parseFloat($('amountInput').value) || 0;
}
/* Canonical USD value of the donation itself (before the processing fee is added on top). */
function totalUSD() {
  var amt = totalTokenAmount();
  if (method === 'fiat') return Math.round(amt * ccyInfo().rate * 100) / 100;
  return quote ? quote.usd : Math.round(amt * quoteRate * 100) / 100;
}
/* DON-DASH-08 / AC-DON-07 - processing fee is ON TOP: total charged = donation + processing fee. */
function feeUSD() { return D.processingFee(method, totalUSD(), rail); }
function convFeeUSD() { return (method === 'crypto' && quote && quote.converted) ? D.conversionFee(totalUSD()) : 0; }
function totalChargedUSD() { return Math.round((totalUSD() + feeUSD()) * 100) / 100; }
function refreshQuote() {
  if (method !== 'crypto') { quote = null; return; }
  quote = D.uniswapQuote(token, totalTokenAmount());
  quoteRate = quote.rate;
}

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

/* Rich hover preview of a Humanity Center on step 1 (Eric's popup-detail direction, applied to the picker).
   Hover-capable pointers only; hidden on touch, scroll, click and step change. */
var hcvTimer = null;
var HOVER_OK = window.matchMedia && window.matchMedia('(hover: hover)').matches;
function showHcPreview(row, id) {
  var el = $('hcHoverCard');
  if (!el || !HOVER_OK) return;
  clearTimeout(hcvTimer);
  hcvTimer = setTimeout(function () {
    var c = D.getCentre(id);
    var lives = c.livesImpacted == null ? 'Coming soon' : D.fmtNum(c.livesImpacted);
    var thumbs = (c.gallery || []).slice(0, 3).map(function (g) { return '<img src="' + g + '" alt="" loading="lazy">'; }).join('');
    el.innerHTML = '<div class="hcv-hero"><img src="' + c.image + '" alt=""></div>'
      + '<div class="hcv-body">'
      + '<p class="hcv-name">' + D.esc(c.name) + '</p>'
      + '<p class="hcv-meta">' + D.esc(c.location) + ' \u00b7 ' + D.esc(c.category) + '</p>'
      + '<p class="hcv-desc">' + D.esc(c.lead || c.desc) + '</p>'
      + '<div class="hcv-stats"><div class="hcv-stat"><strong>' + D.fmtUSD(c.totalDonatedUSD) + '</strong><span>Total donated</span></div><div class="hcv-stat"><strong>' + lives + '</strong><span>Lives impacted</span></div></div>'
      + (thumbs ? '<div class="hcv-thumbs">' + thumbs + '</div>' : '')
      + '</div>';
    el.hidden = false;
    var r = row.getBoundingClientRect(), w = 320, h = el.offsetHeight;
    var left = r.right + 12;
    if (left + w > window.innerWidth - 8) left = r.left - w - 12;
    if (left < 8) left = Math.min(r.left, window.innerWidth - w - 8);
    el.style.left = left + 'px';
    el.style.top = Math.max(8, Math.min(r.top, window.innerHeight - h - 8)) + 'px';
  }, 220);
}
function hideHcPreview() {
  clearTimeout(hcvTimer);
  var el = $('hcHoverCard');
  if (el) el.hidden = true;
}
document.addEventListener('scroll', hideHcPreview, true);

/* ── Stepper ── */
function goToStep(n, opts) {
  opts = opts || {};
  hideHcPreview();
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
    : D.esc(c.name) + ' · ' + D.esc(c.location);
  fc.innerHTML = img + '<span class="fc-body"><span class="fc-label">Donating to</span><span class="fc-name">' + name + '</span></span>'
    + '<button type="button" class="btn btn-secondary btn-sm" id="fcChangeBtn">Change center</button>';
  $('fcChangeBtn').addEventListener('click', function () { clearInterval(rateTimer); goToStep(1); });
}

/* ── STEP 1: center selection ── */
function renderCentres() {
  var pick = $('centrePick');
  var q = (centreQuery || '').trim().toLowerCase();
  /* DON-DASH-06 / AC-DON-12 - a donation can only target an ACTIVE Humanity Center. */
  var list = D.CENTERS.filter(function (c) {
    if (!c.active) return false;
    return !q || c.name.toLowerCase().indexOf(q) !== -1 || c.country.toLowerCase().indexOf(q) !== -1 || c.category.toLowerCase().indexOf(q) !== -1;
  });
  pick.innerHTML = list.map(function (c) {
    var sel = selected.indexOf(c.id) !== -1;
    var lives = c.livesImpacted == null ? 'lives impacted coming soon' : D.fmtNum(c.livesImpacted) + ' lives impacted';
    return '<button type="button" class="centre-pick-row' + (sel ? ' selected' : '') + '" role="option" aria-selected="' + sel + '" data-id="' + c.id + '">'
      + '<span class="cp-img" style="background-color:' + c.tint + ';" aria-hidden="true"><img src="' + c.image.replace('w=800', 'w=200') + '" alt="" loading="lazy"></span>'
      + '<span class="cp-body"><span class="cp-name">' + D.esc(c.name) + '</span><span class="cp-meta">' + D.esc(c.location) + ' · ' + D.fmtUSD(c.totalDonatedUSD) + ' donated · ' + lives + '</span></span>'
      + '<svg class="cp-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>'
      + '</button>';
  }).join('');
  pick.querySelectorAll('.centre-pick-row').forEach(function (row) {
    row.addEventListener('mouseenter', function () { showHcPreview(row, row.getAttribute('data-id')); });
    row.addEventListener('mouseleave', hideHcPreview);
    row.addEventListener('click', function () {
      hideHcPreview();
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
      } else {
        /* Single-select: choosing a center advances straight to step 2 (one less click).
           The "Change center" chip on steps 2-3 returns here. Multi mode keeps toggling. */
        selected = [id];
        renderCentres();
        renderAmountUI();
        goToStep(2);
        return;
      }
      renderCentres();
    });
  });
  var total = D.CENTERS.filter(function (c) { return c.active; }).length;
  var countEl = $('centreCount');
  if (countEl) countEl.textContent = q
    ? (list.length + ' of ' + total + ' centers match "' + centreQuery.trim() + '"')
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
if (MULTI_ENABLED) { $('multiToggleRow').hidden = false; $('multiHint').hidden = false; }
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

/* FE-208 (Kevin 23 Aug / Eric 24 Aug) - fiat supports card AND bank transfer; method comes before currency.
   Card: any currency, converted by the card issuer at its own rate, so no rate is shown. Bank: currency matters. */
function renderRails() {
  var wrap = $('railSelect');
  if (!wrap) return;
  wrap.innerHTML = [
    { id: 'card', l: 'Card' },
    { id: 'bank', l: 'Bank transfer' }
  ].map(function (r) {
    var on = r.id === rail;
    return '<button type="button" class="token-chip' + (on ? ' selected' : '') + '" role="radio" aria-checked="' + on + '" data-r="' + r.id + '">' + r.l + '</button>';
  }).join('');
  wrap.querySelectorAll('.token-chip').forEach(function (b) {
    b.addEventListener('click', function () { rail = b.getAttribute('data-r'); if (rail === 'card') ccy = 'USD'; renderRails(); renderAmountUI(); });
  });
}

/* DON-CRYPTO-01 - USDC/USDT first (direct to multisig), then convertible assets (BTC/ETH). */
function renderTokens() {
  $('tokenSelect').innerHTML = D.BALANCES.tokens.map(function (t) {
    var tag = t.settles === 'direct'
      ? '<span class="asset-tag is-direct">Direct</span>'
      : '<span class="asset-tag is-converted">Converted to USDC/USDT</span>';
    return '<button type="button" class="token-chip' + (t.symbol === token ? ' selected' : '') + '" role="radio" aria-checked="' + (t.symbol === token) + '" data-t="' + t.symbol + '">'
      + t.symbol + ' <span style="font-weight:400;color:var(--text-secondary);">' + t.amount.toLocaleString('en-US', { maximumFractionDigits: t.symbol === 'BTC' ? 5 : (t.native ? 4 : 2) }) + '</span>' + tag + '</button>';
  }).join('');
  $('tokenSelect').querySelectorAll('.token-chip').forEach(function (b) {
    b.addEventListener('click', function () { token = b.getAttribute('data-t'); renderTokens(); renderAmountUI(); });
  });
}
/* DON-FIAT-04 - original fiat currency; the rail converts non-USD to USD before settlement. */
function renderCurrencies() {
  var wrap = $('ccySelect');
  if (!wrap) return;
  wrap.innerHTML = D.FIAT.map(function (f) {
    var on = f.code === ccy;
    return '<button type="button" class="ccy-chip' + (on ? ' selected' : '') + '" role="radio" aria-checked="' + on + '" data-c="' + f.code + '">' + f.symbol + ' ' + f.code + '</button>';
  }).join('');
  wrap.querySelectorAll('.ccy-chip').forEach(function (b) {
    b.addEventListener('click', function () { ccy = b.getAttribute('data-c'); renderCurrencies(); renderAmountUI(); });
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
    var t = tok(), dp = token === 'BTC' ? 5 : (t.native ? 4 : 2);
    $('amountLabel').textContent = multi ? 'Allocation per center (' + token + ')' : 'Donation amount (' + token + ')';
    $('amountPrefix').textContent = token;
    $('availLine').hidden = false;
    $('availAmt').textContent = t.amount.toLocaleString('en-US', { maximumFractionDigits: dp }) + ' ' + token;
    $('availUsd').textContent = '≈ ' + D.fmtUSD(t.amount * quoteRate, 2);
    $('amountHint').textContent = 'Donations between ' + D.fmtUSD(MIN_USD) + ' and ' + D.fmtUSD(MAX_USD) + ' (USD value) per transaction.';
    /* §1.7 - USDC/USDT need no swap; BTC/ETH are converted to USDC or USDT, never to fiat. */
    $('conversionTipText').innerHTML = t.settles === 'direct'
      ? '<strong>' + token + ' goes straight to the ' + D.SETTLEMENT.multisigLabel + '</strong>. No conversion needed. Its USD value is what we report and receipt.'
      : '<strong>' + token + ' is converted to USDC or USDT</strong> before it reaches the ' + D.SETTLEMENT.multisigLabel + '. We take whichever route returns more USD value.';
    $('gasWarnBanner').hidden = blocker !== 'gas';
    $('amountWrap').style.display = multi ? 'none' : '';
    $('amountLabel').style.display = multi ? 'none' : '';
    $('quickAmounts').style.display = multi ? 'none' : '';
    $('multiAllocBlock').hidden = !multi;
    if (multi) renderAllocRows();
  } else {
    renderRails();
    $('railCardWrap').hidden = rail !== 'card';
    $('railBankWrap').hidden = rail !== 'bank';
    if (rail === 'card') ccy = 'USD'; else renderCurrencies();
    var f = ccyInfo();
    $('amountLabel').textContent = 'Donation amount (' + f.code + ')';
    $('amountLabel').style.display = '';
    $('amountPrefix').textContent = f.symbol;
    $('availLine').hidden = true;
    $('amountHint').textContent = 'Donations between ' + D.fmtUSD(MIN_USD) + ' and ' + D.fmtUSD(MAX_USD) + ' (USD value) per transaction.';
    $('conversionTipText').innerHTML = rail === 'card'
      ? 'Your card is charged and the donation is routed to the ' + D.SETTLEMENT.fiatAccountLabel + '. Non-USD cards are converted by your card issuer at its own rate. Fiat is never converted to crypto.'
      : (f.code === 'USD'
        ? 'You transfer USD to our donation account and it is routed to the ' + D.SETTLEMENT.fiatAccountLabel + '. Fiat is never converted to crypto.'
        : 'You transfer ' + f.code + '. The payment rail converts it to USD before routing. We keep your original amount, the rate and the USD value on the record.');
    $('gasWarnBanner').hidden = true;
    $('amountWrap').style.display = '';
    $('quickAmounts').style.display = '';
    $('multiAllocBlock').hidden = true;
  }
  var quicks = method === 'fiat'
    ? (ccy === 'VND' ? [250000, 500000, 1000000, 2500000] : [25, 50, 100, 250])
    : (token === 'ETH' ? [0.01, 0.05, 0.1] : token === 'BTC' ? [0.0005, 0.001, 0.005] : [25, 50, 100, 250]);
  $('quickAmounts').innerHTML = quicks.map(function (q) { return '<button type="button" class="quick-amt" data-q="' + q + '">' + (method === 'fiat' ? D.fmtCcy(ccy, q) : q + ' ' + token) + '</button>'; }).join('');
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

/* §6.3 - every message below is the spec's user message, verbatim, from D.ERR. */
function validateAmount() {
  var hint = $('amountHint'), wrap = $('amountWrap');
  hint.classList.remove('error'); wrap.classList.remove('input-error');
  refreshQuote();
  var amt = totalTokenAmount();
  var usd = totalUSD();
  function fail(msg) { hint.textContent = msg; hint.classList.add('error'); hint.setAttribute('role', 'alert'); if (!multi) wrap.classList.add('input-error'); return false; }
  if (blocker === 'unavailable') return fail(D.ERR.provider);
  if (!amt || amt <= 0 || isNaN(amt)) return fail(D.ERR.invalidAmount);
  if (usd < MIN_USD || usd > MAX_USD) return fail(D.ERR.outOfRange(MAX_USD));
  if (method === 'fiat' && rail === 'card' && !cardId) return fail('Add a payment card to donate by card.');
  if (method === 'crypto') {
    if (blocker === 'balance' || amt > tok().amount) return fail(D.ERR.insufficient(token));
    if (multi && selected.some(function (id) { return (parseFloat(alloc[id]) || 0) * quoteRate < MIN_USD; })) return fail('Each center allocation must be at least ' + D.fmtUSD(MIN_USD) + '.');
  }
  hint.removeAttribute('role');
  return true;
}

/* ── STEP 3: review ── */
function row(label, value, opts) {
  opts = opts || {};
  return '<div class="summary-row' + (opts.total ? ' summary-row--total' : '') + '"><span class="summary-row-label">' + label + '</span><span class="summary-row-value' + (opts.mono ? ' mono' : '') + '">' + value + '</span></div>';
}
function receiptEligible() { return blocker !== 'no_receipt'; }
function updateAmountLive() {
  var el = $('amountLive'), ql = $('quoteLine');
  refreshQuote();
  if (multi) { el.hidden = true; if (ql) ql.hidden = true; return; }
  var amt = parseFloat($('amountInput').value) || 0;
  if (!amt || amt <= 0) { el.hidden = true; if (ql) ql.hidden = true; return; }
  var usd = totalUSD(), fee = feeUSD(), conv = convFeeUSD();
  /* DON-CRYPTO-02 - attribute the quote and name the route that was picked. */
  if (ql) {
    if (method === 'crypto' && quote) {
      ql.hidden = false;
      ql.innerHTML = '<strong>≈ ' + D.fmtUSD(quote.usd, 2) + '</strong> USD value · quoted via <strong>Uniswap</strong>, best of the USDC and USDT routes'
        + (quote.converted ? ' · settles as <strong>' + quote.settlementAsset + '</strong>' : ' · settles as <strong>' + quote.settlementAsset + '</strong> (no swap)');
    } else { ql.hidden = true; }
  }
  var rows = '';
  if (method === 'crypto') rows += '<div class="summary-row"><span class="summary-row-label">You donate</span><span class="summary-row-value">' + amt.toLocaleString('en-US', { maximumFractionDigits: 6 }) + ' ' + token + '</span></div>';
  else if (ccy !== 'USD') rows += '<div class="summary-row"><span class="summary-row-label">You donate</span><span class="summary-row-value">' + D.fmtCcy(ccy, amt) + '</span></div>';
  rows += '<div class="summary-row"><span class="summary-row-label">Donation amount (USD)</span><span class="summary-row-value">' + D.fmtUSD(usd, 2) + '</span></div>';
  rows += '<div class="summary-row is-fee"><span class="summary-row-label">Processing fee<span class="summary-row-note">Added on top of your donation</span></span><span class="summary-row-value">+ ' + D.fmtUSD(fee, 2) + '</span></div>';
  if (conv) rows += '<div class="summary-row is-fee"><span class="summary-row-label">Conversion fee<span class="summary-row-note">' + token + ' → ' + quote.settlementAsset + '</span></span><span class="summary-row-value">' + D.fmtUSD(conv, 2) + '</span></div>';
  rows += '<div class="summary-row summary-row--total"><span class="summary-row-label">Total charged</span><span class="summary-row-value">' + D.fmtUSD(totalChargedUSD(), 2) + '</span></div>';
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
  refreshQuote();
  var orderRows = '';
  if (multi) {
    orderRows += selected.map(function (id) {
      var c = D.getCentre(id); var a = parseFloat(alloc[id]) || 0;
      return row(D.esc(c.name), a.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' ' + token + ' · ≈ ' + D.fmtUSD(a * quoteRate, 2));
    }).join('');
    orderRows += row('Routing', 'DonationRouter · donateMulti', {});
  } else {
    var c = D.getCentre(selected[0]);
    orderRows += row('Humanity Center', D.esc(c.name) + ' · ' + D.esc(c.location));
  }
  orderRows += row('Method', method === 'fiat' ? 'Donate by Fiat · ' + (rail === 'card' ? 'card' : 'bank transfer') : 'Donate by Crypto · ' + token);
  var amt = totalTokenAmount(), usd = totalUSD();
  if (method === 'fiat') {
    if (rail === 'card') {
      var sc = getCard(cardId);
      if (sc) orderRows += row('Card', D.esc(cardLabel(sc)));
      /* Kevin, 23 Aug - card conversion is done by the card issuer; the rate is unknown before settlement, so no rate is shown. */
      orderRows += row('Card currency', 'Any · converted to USD by your card issuer<span class="summary-row-note">The issuer\u2019s exchange rate is only known at settlement and appears on your receipt.</span>');
    } else {
      /* DON-FIAT-04 - non-USD keeps original currency, amount and rate on the record (bank transfer only). */
      if (ccy !== 'USD') {
        orderRows += row('You donate', D.fmtCcy(ccy, amt) + ' ' + ccy);
        orderRows += row('Exchange rate', '1 ' + ccy + ' = ' + D.fmtUSD(ccyInfo().rate, 4) + ', applied by the payment rail');
      }
      /* FE-208 (Eric, 24 Aug) - bank transfer shows the receiving account the user sends money to. */
      var bk = D.SETTLEMENT.bank;
      orderRows += row('Transfer to', D.esc(bk.holder) + '<span class="summary-row-note">' + D.esc(bk.bankName) + '</span>');
      orderRows += row('IBAN', bk.iban, { mono: true });
      orderRows += row('BIC', bk.bic, { mono: true });
      orderRows += row('Reference', 'Shown after you confirm<span class="summary-row-note">Include it so we can match your transfer.</span>');
      orderRows += row('Transfer window', bk.expiryHours + ' hours<span class="summary-row-note">The order expires if the transfer has not arrived by then.</span>');
    }
    orderRows += row('Donation amount (USD)', D.fmtUSD(usd, 2), { total: true });
    /* DON-FIAT-03 - fiat settles to a defined ACCOUNT and is never converted to crypto. */
    orderRows += row('Destination', D.SETTLEMENT.fiatAccountLabel + '<span class="summary-row-note">Fiat is not converted to crypto</span>');
  } else {
    /* DON-CRYPTO-03 - asset, original amount, USD quote, destination type.
       FE-208 (Eric, 24 Aug) - the multisig wallet address is NOT shown; settlement is handled by the BE. */
    orderRows += row('You donate', amt.toLocaleString('en-US', { maximumFractionDigits: 6 }) + ' ' + token);
    orderRows += row('USD quote', D.fmtUSD(usd, 2) + '<span class="summary-row-note">via Uniswap, best of the USDC and USDT routes</span>', { total: true });
    orderRows += row('Settlement asset', quote.settlementAsset + (quote.converted ? '<span class="summary-row-note">' + token + ' is converted before it is routed</span>' : '<span class="summary-row-note">No conversion needed</span>'));
    orderRows += row('Destination', D.SETTLEMENT.multisigLabel + '<span class="summary-row-note">Managed by Huma. Routed through the DonationRouter.</span>');
    orderRows += row('Network', D.SETTLEMENT.network + '<span class="summary-row-note">More networks are being added.</span>');
  }
  orderRows += row('Tax receipt', receiptEligible()
    ? "Issued on confirmation, tied to this donation's transaction ID"
    : 'May not be available in your region');
  $('reviewOrderRows').innerHTML = orderRows;

  /* DON-DASH-08 / DON-CRYPTO-03 / AC-DON-07 - every fee before confirmation, processing fee ON TOP. */
  var fee = feeUSD(), conv = convFeeUSD();
  var costRows = row('Donation amount', D.fmtUSD(usd, 2));
  costRows += row('Processing fee<span class="summary-row-note">Applied on top of your donation</span>', '+ ' + D.fmtUSD(fee, 2));
  if (method === 'fiat') {
    costRows += row('Total charged' + (ccy !== 'USD' ? ' (USD)' : ''), D.fmtUSD(totalChargedUSD(), 2), { total: true });
    if (ccy !== 'USD') costRows += row(rail === 'card' ? 'Charged to your card' : 'You transfer', D.fmtCcy(ccy, totalChargedUSD() / ccyInfo().rate) + ' ' + ccy);
  } else {
    if (conv) costRows += row('Conversion fee<span class="summary-row-note">' + token + ' → ' + quote.settlementAsset + ', via the Crypto Swap Worker</span>', D.fmtUSD(conv, 2));
    var ga = D.GAS.approveETH, gd = D.GAS.donateETH;
    if (token === 'ETH' || token === 'BTC') {
      costRows += row('Estimated network fee', gd.toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(gd), 2));
    } else {
      costRows += row('Estimated network fee · approve', ga.toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(ga), 2));
      costRows += row('Estimated network fee · donate', gd.toFixed(5) + ' ETH · ≈ ' + D.fmtUSD(gasUSD(gd), 2));
    }
    costRows += row('Total charged<span class="summary-row-note">Donation + processing fee. Network fees are paid separately from your wallet.</span>', D.fmtUSD(totalChargedUSD(), 2), { total: true });
  }
  costRows += '<p class="tbd-note">' + D.esc(D.FEES.note) + '</p>';
  $('reviewCostRows').innerHTML = costRows;

  $('rateLockNote').hidden = method !== 'crypto';
  if (method === 'crypto') startRateLock();
  var n = promptCount();
  $('promptCountText').innerHTML = n === 0
    ? 'No wallet confirmations needed. This is a ' + (rail === 'card' ? 'card payment' : 'bank transfer') + '.'
    : (n === 1
      ? 'This needs <strong>1 wallet confirmation</strong>: the donation itself.'
      : 'This needs <strong>2 wallet confirmations</strong>: approve, then ' + (multi ? 'donateMulti' : 'donate') + '.');
  $('promptCountLine').querySelector('.fee-info-btn').style.display = n >= 1 ? '' : 'none';
  $('promptTooltip').classList.remove('is-open');

  var block = null;
  /* AC-DON-12 - HC went inactive mid-flow: block submission with a safe message. */
  if (blocker === 'inactive') block = { t: 'This Humanity Center is no longer accepting donations', x: 'The center was suspended while you were reviewing. Please choose another active Humanity Center.' };
  if (blocker === 'unavailable') block = { t: 'Donations are temporarily unavailable', x: D.ERR.provider };
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

/* ── Confirm -> Transaction Tracker -> terminal ── */
var serverErrShown = false;
var tracker = null;

/* DON-HP-03 - the UI must NOT define Huma Points rules. This stands in for the value the
   Huma Points service returns (§7.2 /v1/huma-points/donations/:donationId); it is display only. */
function hpFromService(usd) {
  if (blocker === 'hp_unavailable') return { status: 'unavailable', amount: null };
  return { status: 'estimated', amount: Math.round(usd * 0.05 * 1.5 * 10) / 10 };
}
function pointsFor(usd) { var r = hpFromService(usd); return r.amount; }

function impactFor(c, usd) {
  var hint = null;
  (c.impactHints || []).forEach(function (h) { if (usd >= h.amount) hint = h; });
  return hint ? hint.impact : null;
}

function trackerConfig(donationId, c, refLabel) {
  var usd = totalUSD();
  var crypto = method === 'crypto';
  var impact = impactFor(c, usd);
  /* DON-CRYPTO-07 - named stages for awaiting signature -> submitted -> awaiting confirmation ->
     (conversion pending, convertible assets only) -> completed. Never show completed before finality. */
  var converts = crypto && quote && quote.converted;
  var settleAs = quote ? quote.settlementAsset : 'USDC';
  var stages = crypto
    ? [
        { title: 'Waiting for your signature', sub: 'Approve in your wallet. Nothing sends until then.' },
        { title: 'Submitted to the network', sub: 'Broadcast. Nothing more is needed from you.' },
        { title: 'Awaiting confirmation', sub: 'The blockchain is writing your donation into a block.', conf: true }
      ].concat(converts ? [
        { title: 'Converting to ' + settleAs, sub: 'Your ' + token + ' becomes ' + settleAs + ' at the quoted route. Automatic.' }
      ] : []).concat([
        { title: 'Delivered to the ' + D.SETTLEMENT.multisigLabel, sub: 'Funds arrive. Your receipt is issued.' }
      ])
    : [
        { title: 'Payment received', sub: 'Your card payment went through.' },
        { title: 'Checks', sub: 'Routine safety checks. The part that can take a few minutes.', conf: true },
        { title: 'Routed to the settlement account', sub: "Sent on to this Center's settlement account." },
        { title: 'Delivered', sub: 'Funds arrive. Your receipt is issued.' }
      ];

  var wait = [];
  if (impact) {
    wait.push({
      eyebrow: 'Your impact',
      title: D.esc(impact),
      body: 'That is what ' + D.fmtUSD(usd, 2) + ' does at ' + D.esc(c.name) + '. It funds ' +
            D.esc((c.programs || []).slice(0, 2).join(' and ').toLowerCase() || 'its programs') + '.'
    });
  }
  wait.push({
    eyebrow: 'Huma Points',
    title: 'You are earning ≈ ' + pointsFor(usd) + ' Huma Points',
    body: 'Direct gifts earn <strong>1.5×</strong>, recurring <strong>3×</strong>. Points cut fees up to 60%.'
  });
  wait.push({
    eyebrow: 'Where it lands',
    title: D.esc(refLabel),
    body: D.esc(c.desc || 'A Humanity Center in the network.')
  });
  wait.push({
    eyebrow: 'Verified on-chain',
    title: 'Funds arrive instantly. Impact is verified on-chain.',
    body: 'Your receipt ties to the transaction id. Anyone can verify it arrived.'
  });

  return {
    kind: 'donation',
    journey: { alt: 'Your donation travelling from your wallet, through the network, to the Humanity Center',
               a: crypto ? 'Your wallet' : 'Your card', b: 'Network', c: 'Center' },
    headline: 'Your donation is on its way',
    eta: crypto ? 'Usually takes 2–5 minutes' : 'This may take a few minutes',
    headlineDelayed: outcome === 'timeout' ? D.ERR.timeout : 'Taking a little longer than usual. Nothing to do.',
    etaDelayed: 'Still working. We will finish this for you',
    headlineFailed: "We couldn't complete this donation",
    etaFailed: 'Nothing left your ' + (crypto ? 'wallet' : 'card') + '. You can safely try again',
    headlineDone: 'Donation delivered. Thank you',
    etaDone: 'Completed',
    delayedCopy: 'Networks get busy. Your donation is safe and still queued. Nothing to resend or pay again.',
    failCopy: crypto
      ? 'The transaction was reverted before it reached the center. No funds left your wallet.'
      : 'The payment could not be completed. Your card was not charged.',
    stages: stages,
    confirmations: crypto ? { target: 12, label: 'Network is double-checking', everyMs: 700 } : null,
    reassure: [
      '<strong>Your money is safe</strong>. The network is slow, not your funds.',
      "You can leave. We'll notify you when it's done.",
      'Nothing to do right now.'
    ],
    wait: wait,
    explain: crypto
      ? ['You sent your donation to the ' + D.SETTLEMENT.multisigLabel + '. The blockchain now has to agree that it happened, a bit like several banks countersigning the same transfer.',
         converts
           ? 'Because you gave ' + token + ', a background worker then converts it to ' + settleAs + ' using whichever Uniswap route returns more USD value. That conversion step is why you may see a "conversion pending" status.'
           : 'You gave ' + token + ', so no conversion is needed. It goes straight through. Its US dollar value is what we report and what your receipt shows.',
         'You do not need to sign anything else, refresh, or resend. If the network is busy it takes a few minutes longer.']
      : ['Your card payment has been taken by the payment rail and is being routed to the account configured for donations. Fiat is never converted to crypto.',
         'A routine safety check runs on every donation. It is automatic and needs nothing from you.',
         'Once it clears, the donation is settled in US dollars and your digital receipt is issued.'],
    facts: [
      'Donations start at $1. Small, regular giving adds up fastest.',
      'Fees are added on top, never taken out of your gift.',
      'Every donation is tied to a transaction id, so you can check where it went.',
      'Recurring giving earns 3× Huma Points, the highest multiplier on the platform.'
    ],
    support: { label: 'Contact support', href: 'mailto:support@unera.org' },
    trackHref: 'donation-history.html',
    trackLabel: 'Track in donation history',
    retryLabel: 'Start a new donation',
    retryHref: 'donate.html',
    pill: { label: 'Donation pending', href: '#main-content' },
    notify: {
      title: 'Donation pending',
      message: 'Your donation of ' + D.fmtUSD(usd, 2) + ' to ' + refLabel + " is on its way. We'll tell you the moment it lands.",
      ref: 'Ref ' + donationId,
      ctaUrl: 'donate.html',
      ctaLabel: 'View status'
    },
    timings: { stages: converts ? [2600, 3200, 4200, 3600, 800] : [3200, 4200, 3600, 800] },
    onFinish: function (res) {
      if (res === 'failed') {
        var failKind = ['pay_failed', 'expired', 'rejected', 'reverted'].indexOf(outcome) !== -1
          ? outcome
          : (method === 'fiat' ? 'pay_failed' : 'reverted');
        terminal(failKind, donationId);
      } else if (outcome === 'conversion') {
        terminal('conversion', donationId);
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
    /* §6.3 verbatim */
    $('reviewBlockTitle').textContent = D.ERR.reverted;
    $('reviewBlockText').textContent = 'Nothing was charged and nothing left your wallet.';
    $('confirmBtn').textContent = 'Retry';
    return;
  }
  $('reviewBlockBanner').hidden = true;
  var donationId = 'DON-' + Math.floor(100000 + Math.random() * 899999);
  var c = D.getCentre(selected[0]);
  var refLabel = multi ? selected.length + ' centers' : c.name;
  var origin = method === 'fiat'
    ? (ccy === 'USD' ? D.fmtUSD(totalUSD(), 2) : D.fmtCcy(ccy, totalTokenAmount()) + ' ' + ccy + ' (≈ ' + D.fmtUSD(totalUSD(), 2) + ')')
    : totalTokenAmount() + ' ' + token + ' (≈ ' + D.fmtUSD(totalUSD(), 2) + ')';
  /* FE-208 (Eric, 24 Aug) - bank transfer: no charge happens here. Show the receiving account, the
     reference and the expiry (Kevin: pending orders carry an expiration date). */
  if (method === 'fiat' && rail === 'bank') {
    D.notifyDonation('info', 'Donation submitted', 'Your bank-transfer donation of ' + origin + ' to ' + refLabel + ' was created. Transfer within ' + D.SETTLEMENT.bank.expiryHours + ' hours to complete it.', 'Ref ' + donationId);
    terminal('bank_pending', donationId);
    return;
  }
  /* §4.3 notification events - submitted, then awaiting confirmation. */
  D.notifyDonation('info', 'Donation submitted', 'Your donation of ' + origin + ' to ' + refLabel + ' was submitted. Total charged ' + D.fmtUSD(totalChargedUSD(), 2) + ' including the processing fee.', 'Ref ' + donationId);
  setTimeout(function () {
    D.notifyDonation('progressing', 'Donation awaiting confirmation', 'We are waiting for final confirmation of your donation to ' + refLabel + '. Nothing is needed from you.', 'Ref ' + donationId, 'donate.html', 'View status');
  }, 1400);
  goToStep(4, { processing: true });

  if (tracker) tracker.destroy();
  tracker = window.TxTracker.mount(document.getElementById('txTrackerMount'), trackerConfig(donationId, c, refLabel));

  // Map the page's outcome demo pills onto the tracker's states.
  /* 'conversion' runs the full stage list (including "Converting to USDC/USDT") and then resolves
     into the conversion-pending terminal, so the Swap Worker step is visible end to end. */
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
        return D.esc(D.getCentre(id).name) + ' · ' + a.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' ' + token + ' · ≈ ' + D.fmtUSD(a * quoteRate, 2);
      }).join('<br>')
    : D.esc(c.name);
  var hash = method === 'crypto' ? fakeHash() : null;
  var hp = hpFromService(usd);
  var settleAsset = method === 'crypto' ? (quote ? quote.settlementAsset : token) : 'USD';
  var html = '';
  if (kind === 'bank_pending') {
    /* DON-FIAT-05 pending_payment + Kevin's expiration rule. The user still has to make the transfer. */
    var bk = D.SETTLEMENT.bank;
    var expires = new Date(Date.now() + bk.expiryHours * 36e5);
    var xfer = ccy === 'USD' ? D.fmtUSD(totalChargedUSD(), 2) : D.fmtCcy(ccy, totalChargedUSD() / ccyInfo().rate) + ' ' + ccy;
    html = terminalShell('pending', 'Waiting for your bank transfer',
      'Transfer ' + xfer + ' to the account below and include the reference. Your donation completes once the transfer arrives, which can take a few days.',
      detailRow('Donation ID', donationId)
      + detailRow('Status', D.statusChip('pending_payment'))
      + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel)
      + detailRow('Donation amount (USD)', D.fmtUSD(usd, 2))
      + detailRow('Processing fee', '+ ' + D.fmtUSD(feeUSD(), 2))
      + detailRow('Total to transfer', xfer)
      + detailRow('Account holder', D.esc(bk.holder))
      + detailRow('Bank', D.esc(bk.bankName))
      + detailRow('IBAN', '<span class="success-detail-value mono">' + bk.iban + '</span>')
      + detailRow('BIC', '<span class="success-detail-value mono">' + bk.bic + '</span>')
      + detailRow('Reference', '<span class="success-detail-value mono">' + donationId + '</span>')
      + detailRow('Expires', D.fmtDate(expires.toISOString())),
      '<a href="donation-history.html" class="btn btn-secondary">Track in donation history</a><a href="donations.html" class="btn btn-primary">Back to Donations</a>');
    renderTerminal(html, {});
    return;
  }
  if (kind === 'conversion') {
    /* DON-CRYPTO-07 §6.3 - conversion pending. Never labelled completed. */
    D.notifyDonation('progressing', 'Donation awaiting confirmation', D.ERR.converting, 'Ref ' + donationId, 'donation-history.html', 'Track donation');
    html = terminalShell('pending', 'Conversion in progress', D.ERR.converting,
      detailRow('Donation ID', donationId)
      + detailRow('Status', D.statusChip('conversion_pending'))
      + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel)
      + detailRow('You donated', amt.toLocaleString('en-US', { maximumFractionDigits: 6 }) + ' ' + token)
      + detailRow('USD quote', D.fmtUSD(usd, 2) + ' <span class="summary-row-note">via Uniswap, best of the USDC and USDT routes</span>')
      + detailRow('Converting to', settleAsset + ' <span class="summary-row-note">Crypto Swap Worker</span>')
      + detailRow('Destination type', D.SETTLEMENT.multisigLabel)
      + (hash ? detailRow('Transaction', '<span class="success-detail-value mono">' + explorerLink(hash) + '</span>') : '')
      + detailRow('Tax receipt', 'Pending · issued once the conversion settles')
      + detailRow('Huma Points', hp.amount == null ? D.hpChip('unavailable') : '≈ ' + hp.amount + ' Huma Points · ' + D.hpChip('estimated')),
      '<a href="donation-history.html" class="btn btn-secondary">Track in donation history</a><a href="donations.html" class="btn btn-primary">Back to Donations</a>');
    renderTerminal(html, {});
    return;
  }
  if (kind === 'success') {
    D.notifyDonation('completed', 'Donation completed', 'Your donation of ' + D.fmtUSD(usd, 2) + ' to ' + (multi ? selected.length + ' centers' : c.name) + ' is confirmed. Thank you.', 'Ref ' + donationId);
    setTimeout(function () { D.notifyDonation('info', 'Tax receipt available', 'Your receipt for donation ' + donationId + " is ready to download. It is tied to this donation's transaction ID.", 'Ref ' + donationId, 'donation-history.html', 'Download receipt'); }, 2200);
    setTimeout(function () {
      D.notifyDonation('completed', 'Huma Points updated', hp.amount == null
        ? 'Huma Points state for this donation is unavailable right now.'
        : 'Your Huma Points for this donation moved to confirmed: ' + hp.amount + ' Huma Points.', 'Ref ' + donationId, 'donations.html', 'View impact');
    }, 3800);
    html = '<div class="amount-section terminal-state flow-card-animated">'
      + '<div class="success-icon-animated"><svg class="unera-checkmark" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg>'
      + '<div class="lightning-badge"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m320-80 40-280H160l360-520h80l-40 320h240L400-80h-80Z"/></svg></div></div>'
      + '<h2 class="terminal-title success" tabindex="-1" id="terminalHeading">Donation complete. Thank you.</h2>'
      + '<p class="terminal-sub">' + (method === 'crypto'
          ? (quote && quote.converted
              ? 'Your ' + token + ' was converted to ' + settleAsset + ' and settled to the ' + D.SETTLEMENT.multisigLabel + '.'
              : 'Your ' + token + ' settled directly to the ' + D.SETTLEMENT.multisigLabel + '.')
          : 'Your card payment settled to the ' + D.SETTLEMENT.fiatAccountLabel + '.') + '</p>'
      + '<div class="success-details">'
      + detailRow('Donation ID', donationId)
      + detailRow('Date', D.fmtDate(new Date().toISOString()))
      + detailRow('Status', D.statusChip('completed'))
      + detailRow(multi ? 'Humanity Centers' : 'Humanity Center', centreLabel)
      + detailRow('Source', method === 'fiat' ? 'Fiat · ' + (rail === 'card' ? 'card' : 'bank transfer') : 'Crypto · ' + token)
      + (method === 'fiat' && getCard(cardId) ? detailRow('Card', D.esc(cardLabel(getCard(cardId)))) : '')
      + (method === 'fiat' && ccy !== 'USD' ? detailRow('Original amount', D.fmtCcy(ccy, amt) + ' ' + ccy + ' · rate 1 ' + ccy + ' = ' + D.fmtUSD(ccyInfo().rate, 4)) : '')
      + (method === 'crypto' ? detailRow('You donated', amt.toLocaleString('en-US', { maximumFractionDigits: 6 }) + ' ' + token) : '')
      + detailRow('Donation amount (USD)', '<span style="color:var(--fin-up);font-weight:700;">' + D.fmtUSD(usd, 2) + '</span>')
      + detailRow('Processing fee', '+ ' + D.fmtUSD(feeUSD(), 2))
      + (convFeeUSD() ? detailRow('Conversion fee', D.fmtUSD(convFeeUSD(), 2)) : '')
      + detailRow('Total charged', D.fmtUSD(totalChargedUSD(), 2))
      + detailRow('Settlement asset', settleAsset)
      + detailRow('Destination type', method === 'fiat' ? D.SETTLEMENT.fiatAccountLabel : D.SETTLEMENT.multisigLabel)
      + (hash ? detailRow('Transaction', '<span class="success-detail-value mono">' + explorerLink(hash) + '</span>') : '')
      + detailRow('Tax receipt', receiptEligible()
          ? 'Pending · being generated and tied to this donation\'s transaction ID'
          : D.ERR.noReceipt)
      + detailRow('Huma Points', hp.amount == null
          ? D.hpChip('unavailable')
          : '≈ ' + hp.amount + ' Huma Points · ' + D.hpChip('estimated'))
      + '</div>'
      + '<div class="btn-actions"><a href="donation-history.html" class="btn btn-secondary">View donation history</a><a href="explore-centres.html" class="btn btn-primary">Back to centers</a></div>'
      + '</div>';
    renderTerminal(html, { allDone: true });
    return;
  }
  if (kind === 'awaiting' || kind === 'timeout') {
    var subCopy = kind === 'timeout'
      ? D.ERR.timeout + ' Your donation stays safely pending and you can leave this page.'
      : (method === 'crypto'
        ? "Your transaction was submitted. We'll notify you as soon as it's confirmed on-chain and converted to USD. You can leave this page safely."
        : "Your payment was received. We'll notify you as soon as the donation is confirmed and routed to the center. You can leave this page safely.");
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
  /* §6.3 - the `x` strings below are the spec's user messages, verbatim; any reassurance is appended after. */
  var fails = {
    pay_failed: { t: "We couldn't process the payment", x: D.ERR.provider, extra: 'Your card was not charged. You can try again or use a different card.', notify: true },
    expired: { t: 'This donation request expired', x: D.ERR.expired, extra: 'Nothing was charged.', notify: true },
    reverted: { t: "Donation couldn't be completed", x: D.ERR.reverted, extra: 'The transaction was reverted and no funds reached the Humanity Center.', notify: true },
    rejected: { t: 'Donation not submitted', x: D.ERR.rejected, extra: 'Nothing left your wallet.', notify: false }
  };
  var f = fails[kind];
  if (f.notify) D.notifyDonation('error', 'Donation failed', f.x, 'Ref ' + donationId, 'donate.html', 'Try again');
  html = terminalShell(kind === 'rejected' ? 'pending' : 'fail', f.t, f.x + ' ' + f.extra + (f.notify ? ' If this keeps happening, contact support.' : ''),
    detailRow('Donation ID', donationId)
    + detailRow('Status', D.statusChip(kind === 'expired' ? 'expired' : (kind === 'rejected' ? 'rejected' : 'failed')))
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
pillGroup('blockerPills', BLOCKERS, function () { return blocker; }, function (v) {
  blocker = v;
  /* §6.2 Unavailable / maintenance - neutral banner, affected actions disabled. */
  $('serviceBanner').hidden = v !== 'unavailable';
  $('toStep3').disabled = v === 'unavailable';
  if (currentStep === 2) renderAmountUI();
  if (currentStep === 3) renderReview();
});
renderGates();
renderCurrencies();
if (centreSearchEl) centreSearchEl.value = '';  // ignore any browser form-restore on reload
centreQuery = '';
renderCentres();
renderTokens();
renderAmountUI();
if (preBlocked) {
  $('preBlockedBanner').hidden = false;
  $('preBlockedTitle').textContent = D.getCentre(preId).name + ' is not accepting new donations';
}
var centresLink = document.getElementById('navLinkCentres'); if (centresLink) centresLink.classList.add('active');
})();
