/* ============================================================================
 * Huma - Common pre-submit gas / balance validation for TOKEN transactions
 * ----------------------------------------------------------------------------
 * Shared across every on-chain token flow: Send, Swap, Trade.
 * Encodes the four common checks we must run OFF-CHAIN before we ever build a
 * wallet transaction, so we never submit something that will fail:
 *
 *   1. Can't estimate  (BLOCK) - the tx would revert regardless of gas balance.
 *                                We can't estimate gas, so we do NOT submit at
 *                                all. Tell the user exactly what to satisfy.
 *   2. Low token bal.  (BLOCK) - token balance < amount to send (erc20 transfer).
 *   3. Not enough ETH  (BLOCK) - native balance <= estimatedGas * gasPrice.
 *   4. Low ETH buffer  (WARN)  - native balance covers the estimate but NOT
 *                                estimate + 25% buffer. Warn that the tx may be
 *                                rejected for low ETH, but let them proceed if
 *                                they insist.
 *   (otherwise -> good to go.)
 *
 * NOT applicable to fiat Buy OTC (add-money.html): 0 wallet prompts, no user
 * gas, no erc20 transfer at buy time - nothing to validate on-chain.
 *
 * Prototype-only: the demo pill selector is IN-MEMORY (never persisted); a
 * refresh returns to "Passes checks". See guidelines/edge-case-demo-bar.md.
 * ========================================================================== */
(function () {
    'use strict';

    // First pill is the happy path. Order matches the feedback's 4 cases.
    var PILLS = [
        { id: null,          label: 'Passes checks' },
        { id: 'cantEstimate', label: 'Can\u2019t estimate' },
        { id: 'tokenBalance', label: 'Low token balance' },
        { id: 'ethGas',       label: 'Not enough ETH (gas)' },
        { id: 'ethBuffer',    label: 'Low ETH buffer' }
    ];

    function buildConfig(o) {
        var native = o.native || 'ETH';          // chain native gas token
        var verb   = o.verb   || 'send';         // send / swap / place this order
        var noun   = o.noun   || 'transaction';  // transaction / swap / order
        var bufferPct = o.bufferPct || 25;
        return {
            cantEstimate: {
                tone: 'error', blocking: true,
                title: 'We can\u2019t prepare this ' + noun,
                body: 'A pre-submit check shows this ' + noun + ' would fail on-chain, so we won\u2019t submit it. This is usually because your token balance is below the amount, or the token contract would reject the transfer. Resolve the flagged requirement below, then try again.',
                // Concrete "what to satisfy" list - the point of catching this off-chain.
                reqs: [
                    'Your token balance must cover the full amount.',
                    'Your ' + native + ' balance must cover the estimated gas.',
                    'The recipient / contract must be able to accept this ' + noun + '.'
                ]
            },
            tokenBalance: {
                tone: 'error', blocking: true,
                title: 'Not enough token balance',
                body: 'Your token balance is lower than the amount you\u2019re trying to ' + verb + '. Lower the amount or top up, then try again.'
            },
            ethGas: {
                tone: 'error', blocking: true,
                title: 'Not enough ' + native + ' for gas',
                body: 'You pay network gas in ' + native + ', and your ' + native + ' balance is below the estimated gas cost. Add ' + native + ' to cover gas before you ' + verb + '.'
            },
            ethBuffer: {
                tone: 'warning', blocking: false,
                title: 'Your ' + native + ' may be too low for gas',
                body: 'Your ' + native + ' covers the current estimate but not the ' + bufferPct + '% safety buffer we add for gas-price swings, so the network may reject this ' + noun + '. You can proceed anyway, or add a little ' + native + ' to be safe.'
            }
        };
    }

    var _injected = false;
    function injectStyle() {
        if (_injected) return;
        _injected = true;
        var css =
        '.txv-banner{display:flex;align-items:flex-start;gap:0.625rem;padding:1rem;border-radius:0.75rem;margin-bottom:1.25rem;' +
            'background:var(--surface-error-soft);border:1.5px solid color-mix(in srgb, var(--error) 30%, transparent);}' +
        '.txv-banner>svg{width:20px;height:20px;fill:var(--error);flex-shrink:0;margin-top:1px;}' +
        '.txv-banner.is-warning{background:var(--surface-warning-soft);border-color:color-mix(in srgb, var(--warning) 30%, transparent);}' +
        '.txv-banner.is-warning>svg{fill:var(--warning);}' +
        '.txv-banner[hidden]{display:none !important;}' +
        '.txv-title{font-weight:700;font-size:0.9375rem;margin-bottom:0.2rem;color:var(--text-primary);}' +
        '.txv-body{font-size:0.8125rem;color:var(--text-secondary);line-height:1.45;}' +
        '.txv-reqs{margin:0.55rem 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:0.3rem;}' +
        '.txv-reqs li{position:relative;padding-left:1.15rem;font-size:0.8125rem;color:var(--text-secondary);line-height:1.4;}' +
        '.txv-reqs li::before{content:"";position:absolute;left:0;top:0.5em;width:6px;height:6px;border-radius:50%;background:var(--error);}' +
        '.txv-reqs[hidden]{display:none !important;}';
        var el = document.createElement('style');
        el.setAttribute('data-txv', '');
        el.textContent = css;
        document.head.appendChild(el);
    }

    function TxValidation() {
        this.state = null;
        this.cfg = null;
        this.opts = null;
    }

    TxValidation.prototype.init = function (opts) {
        this.opts = opts || {};
        this.cfg = buildConfig(this.opts);
        injectStyle();
        this._renderPills();
        this._buildBanner();
        this.apply(null);
    };

    TxValidation.prototype._renderPills = function () {
        var self = this;
        var c = document.getElementById(this.opts.pillsId);
        if (!c) return;
        c.innerHTML = PILLS.map(function (p) {
            return '<button type="button" class="demo-btn" data-txv="' +
                (p.id === null ? 'null' : p.id) + '">' + p.label + '</button>';
        }).join('');
        c.addEventListener('click', function (e) {
            var b = e.target.closest ? e.target.closest('.demo-btn') : null;
            if (!b) return;
            var v = b.getAttribute('data-txv');
            self.apply(v === 'null' ? null : v);
        });
        this._syncPills();
    };

    TxValidation.prototype._syncPills = function () {
        var c = document.getElementById(this.opts.pillsId);
        if (!c) return;
        var state = this.state;
        c.querySelectorAll('.demo-btn').forEach(function (b) {
            var v = b.getAttribute('data-txv');
            b.classList.toggle('active', (v === 'null' && !state) || v === String(state));
        });
    };

    TxValidation.prototype._buildBanner = function () {
        var mount = document.getElementById(this.opts.mountId);
        if (!mount) return;
        mount.innerHTML =
            '<div id="txvBanner" class="txv-banner" role="alert" hidden>' +
                '<svg viewBox="0 -960 960 960" aria-hidden="true"><path d="m40-120 440-760 440 760H40Zm440-120q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Z"/></svg>' +
                '<div style="flex:1;min-width:0;">' +
                    '<div class="txv-title" id="txvTitle">\u2014</div>' +
                    '<div class="txv-body" id="txvBody">\u2014</div>' +
                    '<ul class="txv-reqs" id="txvReqs" hidden></ul>' +
                '</div>' +
            '</div>';
    };

    // Set the current simulated check and refresh banner + CTA + announcer.
    TxValidation.prototype.apply = function (id) {
        this.state = id || null;
        this._syncPills();
        var cfg = this.state ? this.cfg[this.state] : null;
        var banner = document.getElementById('txvBanner');
        var titleEl = document.getElementById('txvTitle');
        var bodyEl = document.getElementById('txvBody');
        var reqsEl = document.getElementById('txvReqs');
        var ann = this.opts.announcerId ? document.getElementById(this.opts.announcerId) : null;

        if (banner) {
            if (!cfg) {
                banner.hidden = true;
            } else {
                banner.hidden = false;
                banner.classList.toggle('is-warning', cfg.tone === 'warning');
                if (titleEl) titleEl.textContent = cfg.title;
                if (bodyEl) bodyEl.textContent = cfg.body;
                if (reqsEl) {
                    if (cfg.reqs && cfg.reqs.length) {
                        reqsEl.innerHTML = cfg.reqs.map(function (r) { return '<li>' + r + '</li>'; }).join('');
                        reqsEl.hidden = false;
                    } else {
                        reqsEl.innerHTML = '';
                        reqsEl.hidden = true;
                    }
                }
            }
        }
        if (ann) ann.textContent = 'Simulating: ' + (cfg ? cfg.title : 'Passes checks');
        if (typeof this.opts.onChange === 'function') this.opts.onChange();
    };

    // Blocking = we must NOT submit (cases 1–3). The buffer warning is non-blocking.
    TxValidation.prototype.isBlocking = function () {
        var cfg = this.state ? this.cfg[this.state] : null;
        return !!(cfg && cfg.blocking);
    };
    TxValidation.prototype.currentTitle = function () {
        var cfg = this.state ? this.cfg[this.state] : null;
        return cfg ? cfg.title : null;
    };

    window.TokenTxValidation = new TxValidation();
})();
