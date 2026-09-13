/* Huma — native <select> → wallet-scope dropdown enhancer.
   Self-contained: injects its own CSS, mirrors value back to the hidden <select>
   and fires its native 'change' so existing handlers keep working. Auto-enhances
   every <select> on load and any added later (MutationObserver). */
(function () {
  if (window.__wsSelectLoaded) return;
  window.__wsSelectLoaded = true;

  var css = ''
    + '.ws-sel{position:relative;display:block;width:100%;}'
    + '.ws-sel-trigger{display:flex;align-items:center;justify-content:space-between;gap:0.5rem;width:100%;min-height:48px;padding:0.7rem 1rem;background:var(--neutral-50,#fff);border:2px solid var(--border-subtle,rgba(23,61,71,0.13));border-radius:0.75rem;font-family:inherit;font-size:1rem;font-weight:500;color:var(--text-primary,#173d47);cursor:pointer;text-align:left;transition:border-color .15s,box-shadow .15s;}'
    + '.ws-sel-trigger:hover{border-color:var(--brand-deep-blue,#173d47);}'
    + '.ws-sel-trigger:focus-visible{outline:2px solid var(--brand-deep-blue,#173d47);outline-offset:1px;}'
    + '.ws-sel-label{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
    + '.ws-sel-chev{width:18px;height:18px;flex-shrink:0;fill:currentColor;transition:transform .2s;}'
    + '.ws-sel.open .ws-sel-chev{transform:rotate(180deg);}'
    + '.ws-sel-list{position:absolute;top:calc(100% + 6px);left:0;right:0;z-index:60;background:#fff;border:1.5px solid var(--border-subtle,rgba(23,61,71,0.13));border-radius:0.75rem;box-shadow:0 12px 32px rgba(23,61,71,0.16);padding:0.35rem;max-height:280px;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none;}'
    + '.ws-sel-list::-webkit-scrollbar{display:none;}'
    + '.ws-sel-list[hidden]{display:none;}'
    + '.ws-sel-opt{display:block;width:100%;text-align:left;padding:0.6rem 0.75rem;border:none;background:none;border-radius:0.5rem;font-family:inherit;font-size:0.95rem;color:var(--text-primary,#173d47);cursor:pointer;min-height:40px;}'
    + '.ws-sel-opt:hover{background:rgba(23,61,71,0.07);}'
    + '.ws-sel-opt.active{background:color-mix(in srgb,var(--brand-deep-blue,#173d47) 8%,#fff);color:var(--brand-deep-blue,#173d47);font-weight:600;}'
    + '.ws-sel-opt:focus-visible{outline:2px solid var(--brand-deep-blue,#173d47);outline-offset:-2px;}'
    + '@media (prefers-reduced-motion:reduce){.ws-sel-chev,.ws-sel-list{transition:none;}}';
  var st = document.createElement('style');
  st.id = 'ws-select-css';
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  var CHEV = '<svg class="ws-sel-chev" viewBox="0 -960 960 960" aria-hidden="true"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function enhance(sel) {
    if (!sel || sel.__wsEnhanced || sel.multiple || (sel.size && sel.size > 1) || sel.hasAttribute('data-ws-skip')) return;
    sel.__wsEnhanced = true;
    sel.style.display = 'none';
    sel.setAttribute('aria-hidden', 'true');
    sel.tabIndex = -1;

    var dd = document.createElement('div');
    dd.className = 'ws-sel';
    var tr = document.createElement('button');
    tr.type = 'button';
    tr.className = 'ws-sel-trigger';
    tr.setAttribute('aria-haspopup', 'listbox');
    tr.setAttribute('aria-expanded', 'false');
    var al = sel.getAttribute('aria-label');
    if (!al) { var lab = sel.closest('.form-group, .kyc-decision-field, .form-field') ; var lel = lab && lab.querySelector('label, .form-label'); if (lel) al = lel.textContent.trim(); }
    if (al) tr.setAttribute('aria-label', al);
    var lbl = document.createElement('span');
    lbl.className = 'ws-sel-label';
    tr.appendChild(lbl);
    tr.insertAdjacentHTML('beforeend', CHEV);
    var list = document.createElement('div');
    list.className = 'ws-sel-list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;

    function syncLabel() { var o = sel.options[sel.selectedIndex]; lbl.textContent = o ? o.textContent : ''; }
    function build() {
      list.innerHTML = Array.prototype.map.call(sel.options, function (o, i) {
        return '<button type="button" role="option" aria-selected="' + (i === sel.selectedIndex) + '" class="ws-sel-opt' + (i === sel.selectedIndex ? ' active' : '') + '"' + (o.disabled ? ' disabled' : '') + ' data-i="' + i + '">' + esc(o.textContent) + '</button>';
      }).join('');
      list.querySelectorAll('.ws-sel-opt:not([disabled])').forEach(function (b) {
        b.addEventListener('click', function () {
          sel.selectedIndex = parseInt(b.getAttribute('data-i'), 10);
          sel.dispatchEvent(new Event('change', { bubbles: true }));
          syncLabel(); build(); closeL(); tr.focus();
        });
      });
    }
    function openL() { build(); list.hidden = false; tr.setAttribute('aria-expanded', 'true'); dd.classList.add('open'); }
    function closeL() { list.hidden = true; tr.setAttribute('aria-expanded', 'false'); dd.classList.remove('open'); }
    tr.addEventListener('click', function (e) { e.stopPropagation(); list.hidden ? openL() : closeL(); });
    tr.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeL(); else if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && list.hidden) { e.preventDefault(); openL(); var f = list.querySelector('.ws-sel-opt'); if (f) f.focus(); } });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) closeL(); });
    // keep the dropdown in sync if other code sets select.value programmatically
    sel.addEventListener('change', function () { syncLabel(); if (!list.hidden) build(); });

    dd.appendChild(tr);
    dd.appendChild(list);
    sel.parentNode.insertBefore(dd, sel.nextSibling);
    syncLabel();
  }

  function run(root) { (root || document).querySelectorAll('select').forEach(enhance); }
  window.enhanceSelects = run;

  function init() {
    run();
    if (window.MutationObserver) {
      new MutationObserver(function (muts) {
        muts.forEach(function (m) {
          Array.prototype.forEach.call(m.addedNodes, function (n) {
            if (n.nodeType !== 1) return;
            if (n.tagName === 'SELECT') enhance(n);
            else if (n.querySelectorAll) n.querySelectorAll('select').forEach(enhance);
          });
        });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
