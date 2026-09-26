/* ============================================================================
   Huma — Transaction Tracker (FE-207 §B) · shared controller
   ----------------------------------------------------------------------------
   One implementation used by donate.html (crypto donation), add-money.html
   (fiat purchase of hUSD) and exchange.html (swap). Each page passes its own
   copy; the states, timings and chrome are identical everywhere.

   Public API
     var t = TxTracker.mount(hostEl, config)   → renders + starts the tracker
       t.setOutcome('normal' | 'delayed' | 'failed' | 'done')
       t.destroy()
     TxTracker.pill.start({ label, href })     → nav pending pill (#txPendingPill)
     TxTracker.pill.stop('done' | 'failed')

   States: running → (delayed) → done | failed.
   Everything here is prototype mock: timers only, nothing is persisted.
   ========================================================================== */
(function () {
    'use strict';

    var ICON = {
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>',
        cross: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
        shield: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z"/></svg>',
        bell: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-40Z"/></svg>',
        calm: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-172v-40q-50-11-83.5-45T307-422l35-14q14 47 48.5 74.5T480-334q52 0 88.5-26t36.5-70q0-40-27-64t-93-46q-63-21-95-49.5T358-668q0-45 30-77t78-39v-40h48v40q42 5 70 30t42 61l-35 15q-12-31-34-49.5T496-746q-49 0-77 22t-28 58q0 36 26 58t93 45q71 24 100.5 56t29.5 81q0 26-9 46.5T604-343q-17 17-41 27.5T508-302v50h-68Z"/></svg>',
        bulb: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Z"/></svg>',
        clock: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm112-192 56-56-148-148v-184h-80v216l172 172Z"/></svg>',
        alert: '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"/></svg>'
    };

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function el(id) { return document.getElementById(id); }
    function mmss(sec) { return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); }

    /* ── Illustration: value travelling wallet → network → destination ─────
       Donations land on a heart; purchases and swaps land on a check. */
    function illustration(kind, labels) {
        // donation lands on a heart, everything else on a check — same node geometry
        var destGlyph = kind === 'donation'
            ? '<path class="txt-glyph txt-leaf" transform="translate(247,29) scale(0.0229) translate(0,960)" d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/>'
            : '<path class="txt-glyph" transform="translate(247,29) scale(0.0229) translate(0,960)" d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>';
        return '' +
            '<svg class="txt-illus" viewBox="0 0 300 96" role="img" aria-label="' + esc(labels.alt) + '">' +
            '<line class="txt-track" x1="42" y1="40" x2="258" y2="40"/>' +
            '<circle class="txt-node txt-node-0" cx="42" cy="40" r="17"/>' +
            '<path class="txt-glyph" transform="translate(31,29) scale(0.0229) translate(0,960)" d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Z"/>' +
            '<circle class="txt-node txt-node-1" cx="150" cy="40" r="17"/>' +
            '<circle class="txt-pulse" cx="150" cy="40" r="17"/>' +
            '<path class="txt-glyph" transform="translate(139,29) scale(0.0229) translate(0,960)" d="M480-80 240-320l57-57 183 183 183-183 57 57L480-80ZM298-584l-58-56 240-240 240 240-58 56-182-182-182 182Z"/>' +
            '<circle class="txt-node txt-node-2" cx="258" cy="40" r="17"/>' +
            destGlyph +
            '<circle class="txt-parcel" cx="42" cy="40" r="5"/>' +
            '<text class="txt-cap" x="42" y="78" text-anchor="middle">' + esc(labels.a) + '</text>' +
            '<text class="txt-cap" x="150" y="78" text-anchor="middle">' + esc(labels.b) + '</text>' +
            '<text class="txt-cap" x="258" y="78" text-anchor="middle">' + esc(labels.c) + '</text>' +
            '</svg>';
    }

    /* ── Persistent nav pill ───────────────────────────────────────────────── */
    var pill = (function () {
        var startedAt = null, timer = null;
        function node() { return el('txPendingPill'); }
        function render() {
            var p = node();
            if (!p || startedAt == null) return;
            var mins = Math.floor((Date.now() - startedAt) / 60000);
            var t = p.querySelector('.tx-pill-time');
            if (t) t.textContent = '· ' + (mins < 1 ? 'just now' : mins + ' min');
        }
        return {
            start: function (opts) {
                var p = node();
                if (!p) return;
                startedAt = Date.now();
                p.hidden = false;
                p.removeAttribute('data-state');
                p.setAttribute('href', (opts && opts.href) || '#main-content');
                var lab = p.querySelector('.tx-pill-text');
                if (lab) lab.textContent = (opts && opts.label) || 'Transaction pending';
                p.setAttribute('aria-label', ((opts && opts.label) || 'Transaction pending') + ' — open status');
                render();
                clearInterval(timer);
                timer = setInterval(render, 15000);
            },
            stop: function (state) {
                var p = node();
                clearInterval(timer);
                timer = null;
                startedAt = null;
                if (!p) return;
                if (state) {
                    p.setAttribute('data-state', state);
                    var lab = p.querySelector('.tx-pill-text');
                    var t = p.querySelector('.tx-pill-time');
                    if (lab) lab.textContent = state === 'failed' ? 'Transaction failed' : 'Transaction complete';
                    if (t) t.textContent = '';
                    setTimeout(function () { p.hidden = true; }, 4000);
                } else {
                    p.hidden = true;
                }
            }
        };
    })();

    /* ── Tracker ───────────────────────────────────────────────────────────── */
    function mount(host, cfg) {
        if (!host) return null;
        cfg = cfg || {};
        var stages = cfg.stages || [];
        var timings = cfg.timings || {};
        var stageMs = timings.stages || [];
        var uid = 'txt' + Date.now();

        var state = 'running';         // running | delayed | done | failed
        var idx = 0;                   // current stage index
        var startedAt = Date.now();
        var confN = 0;
        var waitIdx = 0;
        var factIdx = 0;
        var timers = [];

        function later(fn, ms) { var t = setTimeout(fn, ms); timers.push(t); return t; }
        function every(fn, ms) { var t = setInterval(fn, ms); timers.push(t); return t; }
        function clearAll() { timers.forEach(function (t) { clearTimeout(t); clearInterval(t); }); timers = []; }

        /* ---- render shell ---- */
        host.innerHTML = '' +
        '<section class="txt" data-kind="' + esc(cfg.kind || 'transfer') + '" data-state="running" aria-live="polite">' +
          '<div class="txt-hero">' +
            illustration(cfg.kind, cfg.journey || { alt: 'Your transaction on its way', a: 'You', b: 'Network', c: 'Destination' }) +
            '<h2 class="txt-headline" id="' + uid + 'Head" tabindex="-1">' + esc(cfg.headline || 'Your transaction is on its way') + '</h2>' +
            '<p class="txt-eta"><span id="' + uid + 'Eta">' + esc(cfg.eta || 'Usually takes 2–5 minutes') + '</span> · <span class="txt-timer" id="' + uid + 'Timer">0:00</span> elapsed</p>' +
          '</div>' +

          '<div class="txt-banner" id="' + uid + 'Banner" role="status" hidden></div>' +

          '<ol class="txt-stages" id="' + uid + 'Stages">' +
            stages.map(function (s, i) {
                return '<li class="txt-stage" data-i="' + i + '">' +
                    '<span class="txt-stage-marker">' + (i + 1) + '</span>' +
                    '<span class="txt-stage-body"><span class="txt-stage-title">' + esc(s.title) + '</span>' +
                    '<span class="txt-stage-sub">' + esc(s.sub) + '</span></span>' +
                    '<span class="txt-stage-spin" aria-hidden="true"></span>' +
                '</li>';
            }).join('') +
          '</ol>' +

          (cfg.confirmations
            ? '<div class="txt-conf" id="' + uid + 'Conf" hidden>' +
                '<div class="txt-conf-head"><span class="txt-conf-label">' + esc(cfg.confirmations.label || 'Network is double-checking') + '</span>' +
                '<span class="txt-conf-count" id="' + uid + 'ConfCount">0 of ' + cfg.confirmations.target + '</span></div>' +
                '<div class="txt-conf-bar"><span class="txt-conf-fill" id="' + uid + 'ConfFill"></span></div>' +
              '</div>'
            : '') +

          '<div class="txt-reassure">' +
            (cfg.reassure || []).map(function (r, i) {
                var ic = [ICON.shield, ICON.bell, ICON.calm][i] || ICON.calm;
                return '<p class="txt-reassure-row">' + ic + '<span>' + r + '</span></p>';
            }).join('') +
          '</div>' +

          (cfg.wait && cfg.wait.length
            ? '<div class="txt-wait">' +
                '<p class="txt-wait-label">While you wait</p>' +
                '<div class="txt-wait-card" id="' + uid + 'Wait" role="region" aria-label="While you wait"></div>' +
                '<div class="txt-wait-dots" id="' + uid + 'WaitDots" role="tablist" aria-label="While you wait cards"></div>' +
              '</div>'
            : '') +

          (cfg.explain
            ? '<details class="txt-what"><summary>What is happening?</summary>' +
                '<div class="txt-what-body">' + (cfg.explain || []).map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>' +
              '</details>'
            : '') +

          (cfg.facts && cfg.facts.length
            ? '<p class="txt-fact">' + ICON.bulb + '<span id="' + uid + 'Fact"></span></p>'
            : '') +

          '<div class="txt-actions" id="' + uid + 'Actions" hidden></div>' +

          (cfg.devControls === false ? '' :
            '<div class="txt-demo">' +
              '<p class="txt-demo-label">Prototype — simulate transaction state:</p>' +
              '<div class="txt-demo-btns" id="' + uid + 'Demo" role="group" aria-label="Transaction state selector">' +
                '<button type="button" class="txt-demo-btn is-on" data-o="normal">Normal (default)</button>' +
                '<button type="button" class="txt-demo-btn" data-o="delayed">Taking longer</button>' +
                '<button type="button" class="txt-demo-btn" data-o="failed">Failed</button>' +
                '<button type="button" class="txt-demo-btn" data-o="done">Done now</button>' +
              '</div>' +
            '</div>') +
        '</section>';

        var root = host.querySelector('.txt');
        var headEl = el(uid + 'Head');
        var timerEl = el(uid + 'Timer');
        var etaEl = el(uid + 'Eta');
        var bannerEl = el(uid + 'Banner');
        var confWrap = el(uid + 'Conf');
        var confCount = el(uid + 'ConfCount');
        var confFill = el(uid + 'ConfFill');
        var actionsEl = el(uid + 'Actions');
        var waitEl = el(uid + 'Wait');
        var waitDots = el(uid + 'WaitDots');
        var factEl = el(uid + 'Fact');
        var stageEls = Array.prototype.slice.call(host.querySelectorAll('.txt-stage'));

        /* ---- stage painting ---- */
        function paintStages() {
            stageEls.forEach(function (s, i) {
                s.classList.remove('is-done', 'is-current', 'is-failed');
                var marker = s.querySelector('.txt-stage-marker');
                if (state === 'failed' && i === idx) {
                    s.classList.add('is-failed');
                    marker.innerHTML = ICON.cross;
                } else if (i < idx || state === 'done') {
                    s.classList.add('is-done');
                    marker.innerHTML = ICON.check;
                } else if (i === idx) {
                    s.classList.add('is-current');
                    marker.textContent = String(i + 1);
                } else {
                    marker.textContent = String(i + 1);
                }
            });
            // dots on the journey illustration follow the stage progression
            var frac = stages.length > 1 ? idx / (stages.length - 1) : 1;
            ['0', '1', '2'].forEach(function (k, n) {
                var node = host.querySelector('.txt-node-' + k);
                if (!node) return;
                node.classList.toggle('is-done', state === 'done' || frac > n / 2);
                node.classList.toggle('is-current', state !== 'done' && Math.abs(frac - n / 2) < 0.26);
            });
            if (confWrap) {
                var showConf = state !== 'failed' && state !== 'done' && !!stages[idx] && !!stages[idx].conf;
                confWrap.hidden = !showConf;
            }
        }

        /* ---- while-you-wait rotation ---- */
        function paintWait() {
            if (!waitEl) return;
            var c = cfg.wait[waitIdx % cfg.wait.length];
            waitEl.innerHTML =
                (c.eyebrow ? '<p class="txt-wait-eyebrow">' + c.eyebrow + '</p>' : '') +
                '<p class="txt-wait-title">' + c.title + '</p>' +
                '<p class="txt-wait-body">' + c.body + '</p>';
            waitDots.innerHTML = cfg.wait.map(function (_, i) {
                return '<button type="button" class="txt-wait-dot' + (i === waitIdx % cfg.wait.length ? ' is-on' : '') +
                    '" data-w="' + i + '" aria-label="Show card ' + (i + 1) + ' of ' + cfg.wait.length + '"></button>';
            }).join('');
            waitDots.querySelectorAll('.txt-wait-dot').forEach(function (b) {
                b.addEventListener('click', function () { waitIdx = parseInt(b.getAttribute('data-w'), 10); paintWait(); });
            });
        }
        function paintFact() {
            if (!factEl) return;
            factEl.innerHTML = cfg.facts[factIdx % cfg.facts.length];
        }

        /* ---- terminal painting ---- */
        function setActions(list) {
            if (!actionsEl) return;
            if (!list || !list.length) { actionsEl.hidden = true; actionsEl.innerHTML = ''; return; }
            actionsEl.innerHTML = list.map(function (a) {
                return '<a class="txt-link" href="' + a.href + '"' + (a.blank ? ' target="_blank" rel="noopener"' : '') + '>' + esc(a.label) + '</a>';
            }).join('');
            actionsEl.hidden = false;
        }

        function goDelayed() {
            if (state === 'done' || state === 'failed') return;
            state = 'delayed';
            root.setAttribute('data-state', 'delayed');
            headEl.textContent = cfg.headlineDelayed || 'Taking a little longer than usual — that’s normal when the network is busy. Nothing to do.';
            etaEl.textContent = cfg.etaDelayed || 'Still working — we’ll finish this for you';
            bannerEl.innerHTML = ICON.clock + '<span>' + (cfg.delayedCopy ||
                'Networks get busy. Your money is safe and the transaction is still queued — you don’t need to resend it or pay anything again.') + '</span>';
            bannerEl.hidden = false;
            setActions((cfg.support ? [{ label: cfg.support.label || 'Contact support', href: cfg.support.href }] : [])
                .concat(cfg.trackHref ? [{ label: cfg.trackLabel || 'Track in history', href: cfg.trackHref }] : []));
            paintStages();
        }

        function goFailed() {
            if (state === 'done') return;
            clearAll();
            state = 'failed';
            root.setAttribute('data-state', 'failed');
            headEl.textContent = cfg.headlineFailed || 'We couldn’t complete this transaction';
            etaEl.textContent = cfg.etaFailed || 'Nothing was taken — you can safely try again';
            bannerEl.innerHTML = ICON.alert + '<span>' + (cfg.failCopy ||
                'The network rejected this transaction. No funds left your wallet. Try again, or contact support if it keeps happening.') + '</span>';
            bannerEl.hidden = false;
            if (confWrap) confWrap.hidden = true;
            setActions([{ label: cfg.retryLabel || 'Try again', href: cfg.retryHref || '#' }]
                .concat(cfg.support ? [{ label: cfg.support.label || 'Contact support', href: cfg.support.href }] : []));
            paintStages();
            pill.stop('failed');
            if (typeof cfg.onFinish === 'function') cfg.onFinish('failed');
        }

        function goDone() {
            if (state === 'done') return;
            clearAll();
            state = 'done';
            idx = stages.length - 1;
            root.setAttribute('data-state', 'done');
            headEl.textContent = cfg.headlineDone || 'All done';
            etaEl.textContent = cfg.etaDone || 'Completed';
            bannerEl.hidden = true;
            if (confWrap && cfg.confirmations) {
                confWrap.hidden = true;
                confCount.textContent = cfg.confirmations.target + ' of ' + cfg.confirmations.target;
                confFill.style.width = '100%';
            }
            setActions(null);
            paintStages();
            pill.stop('done');
            if (typeof cfg.onFinish === 'function') cfg.onFinish('success');
        }

        /* ---- run ---- */
        function advance() {
            if (state === 'failed' || state === 'done') return;
            if (idx >= stages.length - 1) { goDone(); return; }
            idx += 1;
            paintStages();
            if (typeof cfg.onStage === 'function') cfg.onStage(idx, stages[idx]);
            if (idx >= stages.length - 1) { later(goDone, 600); return; }
            later(advance, stageMs[idx] || 3500);
        }

        paintStages();
        paintWait();
        paintFact();

        every(function () {
            var s = Math.floor((Date.now() - startedAt) / 1000);
            timerEl.textContent = mmss(s);
        }, 1000);

        if (cfg.wait && cfg.wait.length > 1) {
            every(function () { waitIdx += 1; paintWait(); }, cfg.waitRotateMs || 6000);
        }
        if (cfg.facts && cfg.facts.length > 1) {
            every(function () { factIdx += 1; paintFact(); }, cfg.factRotateMs || 5000);
        }
        if (cfg.confirmations) {
            every(function () {
                if (state === 'done' || state === 'failed') return;
                if (!stages[idx] || !stages[idx].conf) return;
                if (confN >= cfg.confirmations.target) return;
                confN += 1;
                confCount.textContent = confN + ' of ' + cfg.confirmations.target;
                confFill.style.width = Math.round(confN / cfg.confirmations.target * 100) + '%';
            }, cfg.confirmations.everyMs || 700);
        }

        later(advance, stageMs[0] || 3500);
        if (timings.delayedAfter) later(goDelayed, timings.delayedAfter);

        /* ---- pill + bell ---- */
        if (cfg.pill) pill.start(cfg.pill);
        if (cfg.notify && typeof window.addNotification === 'function') {
            window.addNotification({
                level: 'progressing',
                category: cfg.notify.category || 'transaction',
                title: cfg.notify.title,
                message: cfg.notify.message,
                ref: cfg.notify.ref || '',
                ctaUrl: cfg.notify.ctaUrl,
                ctaLabel: cfg.notify.ctaLabel || 'View status'
            });
        }

        /* ---- dev controls ---- */
        var demo = el(uid + 'Demo');
        if (demo) {
            demo.addEventListener('click', function (e) {
                var b = e.target.closest('.txt-demo-btn');
                if (!b) return;
                demo.querySelectorAll('.txt-demo-btn').forEach(function (x) { x.classList.remove('is-on'); });
                b.classList.add('is-on');
                api.setOutcome(b.getAttribute('data-o'));
            });
        }

        var api = {
            root: root,
            get state() { return state; },
            setOutcome: function (o) {
                if (o === 'delayed') { clearAll(); restartTicks(); goDelayed(); }
                else if (o === 'failed') goFailed();
                else if (o === 'done') goDone();
                else if (o === 'normal' && state === 'delayed') {
                    state = 'running';
                    root.setAttribute('data-state', 'running');
                    headEl.textContent = cfg.headline;
                    etaEl.textContent = cfg.eta;
                    bannerEl.hidden = true;
                    setActions(null);
                    paintStages();
                    later(advance, stageMs[idx] || 3500);
                }
            },
            destroy: function () { clearAll(); host.innerHTML = ''; }
        };

        function restartTicks() {
            every(function () {
                var s = Math.floor((Date.now() - startedAt) / 1000);
                timerEl.textContent = mmss(s);
            }, 1000);
            if (cfg.wait && cfg.wait.length > 1) every(function () { waitIdx += 1; paintWait(); }, cfg.waitRotateMs || 6000);
            if (cfg.facts && cfg.facts.length > 1) every(function () { factIdx += 1; paintFact(); }, cfg.factRotateMs || 5000);
        }

        if (headEl && cfg.focus !== false) { try { headEl.focus({ preventScroll: true }); } catch (e) { /* noop */ } }
        return api;
    }

    window.TxTracker = { mount: mount, pill: pill, ICON: ICON };
})();
