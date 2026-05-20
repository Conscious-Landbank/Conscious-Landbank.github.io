(function () {
    'use strict';

    var catalog = null;
    var activeEntry = null;
    var pinned = false;

    function esc(s) {
        if (s == null) return '';
        var d = document.createElement('div');
        d.textContent = String(s);
        return d.innerHTML;
    }

    function isVisible(el) {
        if (!el) return false;
        var node = el;
        while (node && node !== document.body) {
            var style = window.getComputedStyle(node);
            if (style.display === 'none' || style.visibility === 'hidden') return false;
            node = node.parentElement;
        }
        return true;
    }

    function getScreenKey() {
        var body = document.body;
        var round = body.dataset.dmRound || '';
        var screen = body.dataset.dmScreen || '';
        if (round && screen) return round + '.' + screen;
        return '';
    }

    function getCatalogUrl() {
        return document.body.dataset.dmCatalog || '../token-mgmt-remittance-catalog.json';
    }

    function ensurePanel() {
        if (document.getElementById('dm-panel')) return;

        var panel = document.createElement('aside');
        panel.id = 'dm-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-labelledby', 'dm-panel-title');
        panel.setAttribute('aria-hidden', 'true');
        panel.innerHTML =
            '<button type="button" id="dm-panel-close" aria-label="Close data mapping panel">&times;</button>' +
            '<div id="dm-panel-inner"></div>';
        document.body.appendChild(panel);

        document.getElementById('dm-panel-close').addEventListener('click', closePanel);

        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.id = 'dm-toggle';
        toggle.setAttribute('aria-pressed', 'false');
        toggle.textContent = 'Data map OFF';
        document.body.appendChild(toggle);
        toggle.addEventListener('click', function () {
            var on = document.body.classList.toggle('dm-mode');
            toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
            toggle.textContent = on ? 'Data map ON' : 'Data map OFF';
        });
    }

    function closePanel() {
        var panel = document.getElementById('dm-panel');
        if (panel) {
            panel.classList.remove('is-open');
            panel.setAttribute('aria-hidden', 'true');
        }
        document.querySelectorAll('.dm-highlight').forEach(function (el) {
            el.classList.remove('dm-highlight', 'planned');
        });
        activeEntry = null;
        pinned = false;
    }

    function renderPanel(entry, el) {
        var inner = document.getElementById('dm-panel-inner');
        if (!inner || !entry) return;

        var status = entry.status || 'live';
        var statusLabel = status.toUpperCase();
        var plannedBanner = status === 'planned'
            ? '<div class="dm-planned-banner">PLANNED — not in production UI yet</div>'
            : '';
        var hiddenBanner = el && !isVisible(el)
            ? '<div class="dm-hidden-banner">' + esc(entry.presenterNote || 'This element may be hidden. Navigate to the correct step or section first.') + '</div>'
            : '';

        var exampleStr = 'N/A';
        if (entry.panel && entry.panel.example != null) {
            exampleStr = typeof entry.panel.example === 'string'
                ? entry.panel.example
                : JSON.stringify(entry.panel.example, null, 2);
        }

        var seeAlso = '';
        if (entry.seeAlso && entry.seeAlso.length) {
            seeAlso = '<div class="dm-see-also"><strong>See also:</strong> ' +
                entry.seeAlso.map(function (id) { return '<code>' + esc(id) + '</code>'; }).join(', ') +
                '</div>';
        }

        var presenterNote = entry.presenterNote
            ? '<p class="dm-section-body" style="margin-top:0.75rem;font-style:italic;">Presenter: ' + esc(entry.presenterNote) + '</p>'
            : '';

        inner.innerHTML =
            plannedBanner +
            hiddenBanner +
            '<div class="dm-panel-header">' +
            '<span class="dm-status-pill ' + esc(status) + '">' + statusLabel + '</span>' +
            (entry.featureRow ? '<span class="dm-feature-row">Row ' + esc(entry.featureRow) + (entry.featureName ? ' · ' + esc(entry.featureName) : '') + '</span>' : '') +
            '</div>' +
            '<h2 class="dm-panel-title" id="dm-panel-title">' + esc(entry.label) + '</h2>' +
            '<p class="dm-section-label">What is this?</p>' +
            '<p class="dm-section-body">' + esc(entry.panel && entry.panel.what) + '</p>' +
            '<p class="dm-section-label">Frontend</p>' +
            '<p class="dm-section-body">' + esc(entry.panel && entry.panel.frontend) + '</p>' +
            '<p class="dm-section-label">Backend (proposed)</p>' +
            '<p class="dm-section-body">' + esc(entry.panel && entry.panel.backend) + '</p>' +
            '<p class="dm-section-label">Example</p>' +
            '<pre class="dm-example">' + esc(exampleStr) + '</pre>' +
            seeAlso +
            presenterNote;

        var panel = document.getElementById('dm-panel');
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
    }

    function showEntry(entry, el) {
        activeEntry = entry;
        document.querySelectorAll('.dm-highlight').forEach(function (n) {
            n.classList.remove('dm-highlight', 'planned');
        });
        if (el) {
            el.classList.add('dm-highlight');
            if (entry.status === 'planned') el.classList.add('planned');
        }
        renderPanel(entry, el);
    }

    function bindEntry(entry) {
        if (!entry.selector) return;
        var el = document.querySelector(entry.selector);
        if (!el) return;

        el.setAttribute('data-dm-bound', entry.id);
        el.setAttribute('data-dm-key', entry.id);

        var focusable = el.matches('a, button, input, select, textarea, [tabindex]');
        if (!focusable && entry.status !== 'planned') {
            el.setAttribute('tabindex', '0');
        }

        function onEnter() {
            if (!document.body.classList.contains('dm-mode')) return;
            showEntry(entry, el);
        }

        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('focusin', onEnter);
    }

    function initBindings() {
        if (!catalog || !catalog.entries) return;
        var key = getScreenKey();
        catalog.entries.forEach(function (entry) {
            if (entry.screen === key) bindEntry(entry);
        });
    }

    function loadCatalog() {
        var url = getCatalogUrl();
        return fetch(url)
            .then(function (r) {
                if (!r.ok) throw new Error('Catalog load failed: ' + url);
                return r.json();
            })
            .then(function (data) {
                catalog = data;
                initBindings();
            })
            .catch(function (err) {
                console.warn('[data-mapping]', err);
            });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePanel();
    });

    document.addEventListener('DOMContentLoaded', function () {
        if (!document.body.dataset.dmRound && !document.body.dataset.dmScreen) return;
        ensurePanel();
        loadCatalog();
    });
})();
