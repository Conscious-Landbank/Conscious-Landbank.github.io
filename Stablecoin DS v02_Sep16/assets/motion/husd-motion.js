/* UNERA hUSD · motion library (0908, Movmint-inspired, softened per Kevin: "humane and softer")
   Web components: <husd-globe> <husd-flow> <husd-trend> <husd-reveal>
   All loops pause when offscreen or tab-hidden; prefers-reduced-motion renders a static frame. */
(function () {
  'use strict';
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GOLD = '#ecd6a0', GOLD_BRIGHT = '#f7e8bd', TEAL = '#43c0ad', TEAL_DEEP = '#2f7682';
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function hexA(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }
  // shared rAF driver with visibility gating
  function driver(el, draw) {
    var running = false, visible = false, raf = 0;
    function tick(ts) { if (!running) return; draw(ts); raf = requestAnimationFrame(tick); }
    function update() {
      var should = visible && !document.hidden && !RM;
      if (should && !running) { running = true; raf = requestAnimationFrame(tick); }
      if (!should && running) { running = false; cancelAnimationFrame(raf); }
    }
    var io = new IntersectionObserver(function (es) { visible = es[0].isIntersecting; update(); }, { threshold: 0.05 });
    io.observe(el);
    var onVis = function () { update(); };
    document.addEventListener('visibilitychange', onVis);
    return { stop: function () { running = false; cancelAnimationFrame(raf); io.disconnect(); document.removeEventListener('visibilitychange', onVis); } };
  }
  // defer ResizeObserver work to the next frame: same-frame layout writes trigger the
  // "loop completed with undelivered notifications" console error
  function onResize(fn) { var raf = 0; return new ResizeObserver(function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(fn); }); }
  function fitCanvas(cv, w, h, fluid) {
    var d = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * d); cv.height = Math.round(h * d);
    // fluid: CSS size tracks the host (so a stale measurement can never overflow it); buffer still matches w×h
    cv.style.width = fluid ? '100%' : w + 'px';
    cv.style.height = (fluid === 'both') ? '100%' : h + 'px';
    var ctx = cv.getContext('2d'); ctx.setTransform(d, 0, 0, d, 0, 0); return ctx;
  }

  /* ── <husd-globe> · rotating dot-sphere, gentle arcs (Movmint hero globe, softened) ───────── */
  var Globe = function () { return Reflect.construct(HTMLElement, [], Globe); };
  Globe.prototype = Object.create(HTMLElement.prototype);
  Globe.prototype.connectedCallback = function () {
    if (this._init) return; this._init = true;
    var host = this; host.style.display = 'block'; host.style.position = 'relative';
    var cv = document.createElement('canvas'); cv.style.display = 'block'; cv.setAttribute('aria-hidden', 'true'); host.appendChild(cv);
    var W = 0, H = 0, ctx = null;
    var N = parseInt(host.dataset.density || '380', 10);
    var pts = [], golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
      pts.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r, gold: (i * 7) % 13 === 0, ph: Math.random() * Math.PI * 2 });
    }
    var arcs = [], tilt = 0.42;
    function project(p, rot) {
      var cx = Math.cos(rot), sx = Math.sin(rot);
      var x = p.x * cx + p.z * sx, z = p.z * cx - p.x * sx, y = p.y;
      var y2 = y * Math.cos(tilt) - z * Math.sin(tilt), z2 = z * Math.cos(tilt) + y * Math.sin(tilt);
      return { x: x, y: y2, z: z2 };
    }
    function spawnArc(now) {
      var a = Math.floor(Math.random() * N), b = Math.floor(Math.random() * N);
      if (a === b) return;
      arcs.push({ a: a, b: b, t0: now, dur: 5200 + Math.random() * 2400, gold: Math.random() < 0.45 });
    }
    function frame(now) {
      if (!ctx) return;
      var R = Math.min(W, H) * 0.44, ox = W / 2, oy = H / 2;
      var rot = now * 0.00008; // very slow, calm rotation
      ctx.clearRect(0, 0, W, H);
      // soft halo
      var g = ctx.createRadialGradient(ox, oy, R * 0.2, ox, oy, R * 1.25);
      g.addColorStop(0, 'rgba(67,192,173,0.07)'); g.addColorStop(0.7, 'rgba(236,214,160,0.04)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // rim + faint graticule for depth
      ctx.beginPath(); ctx.arc(ox, oy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(236,214,160,0.10)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(ox, oy, R, R * 0.34, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.045)'; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(ox, oy, R * 0.34, R, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.035)'; ctx.stroke();
      var proj = new Array(N);
      for (var i = 0; i < N; i++) {
        var q = project(pts[i], rot); proj[i] = q;
        var depth = (q.z + 1) / 2; // 0 back → 1 front
        var px = ox + q.x * R, py = oy + q.y * R;
        if (pts[i].gold) {
          var pulse = 0.55 + 0.45 * Math.sin(now * 0.0012 + pts[i].ph);
          ctx.beginPath(); ctx.arc(px, py, 1.5 + depth * 1.4, 0, Math.PI * 2);
          ctx.fillStyle = hexA(GOLD, (0.25 + 0.6 * depth) * pulse); ctx.fill();
          if (depth > 0.6) { ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fillStyle = hexA(GOLD, 0.08 * pulse); ctx.fill(); }
        } else {
          ctx.beginPath(); ctx.arc(px, py, 0.8 + depth * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(207,233,228,' + (0.06 + 0.3 * depth) + ')'; ctx.fill();
        }
      }
      // arcs between rotating points
      if (arcs.length < 4 && Math.random() < 0.02) spawnArc(now);
      arcs = arcs.filter(function (arc) {
        var p = (now - arc.t0) / arc.dur; if (p >= 1) return false;
        var A = proj[arc.a], B = proj[arc.b];
        if (A.z < -0.15 || B.z < -0.15) return p < 1; // endpoints rotated behind: keep life running, skip draw
        var ax = ox + A.x * R, ay = oy + A.y * R, bx = ox + B.x * R, by = oy + B.y * R;
        var mx = (ax + bx) / 2, my = (ay + by) / 2;
        var dx = mx - ox, dy = my - oy, dl = Math.sqrt(dx * dx + dy * dy) || 1;
        var lift = 0.35 * Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay));
        var cxp = mx + (dx / dl) * lift, cyp = my + (dy / dl) * lift;
        var col = arc.gold ? GOLD : TEAL;
        var grow = ease(clamp(p / 0.4, 0, 1));          // path grows in
        var fade = 1 - ease(clamp((p - 0.72) / 0.28, 0, 1)); // then breathes out
        ctx.beginPath(); ctx.moveTo(ax, ay);
        var segs = 24, lx = ax, ly = ay;
        for (var s2 = 1; s2 <= Math.floor(segs * grow); s2++) {
          var t = s2 / segs, u = 1 - t;
          lx = u * u * ax + 2 * u * t * cxp + t * t * bx; ly = u * u * ay + 2 * u * t * cyp + t * t * by;
          ctx.lineTo(lx, ly);
        }
        ctx.strokeStyle = hexA(col, 0.34 * fade); ctx.lineWidth = 1; ctx.stroke();
        // comet
        var ct = ease(clamp((p - 0.15) / 0.7, 0, 1)), cu = 1 - ct;
        var px2 = cu * cu * ax + 2 * cu * ct * cxp + ct * ct * bx, py2 = cu * cu * ay + 2 * cu * ct * cyp + ct * ct * by;
        if (p > 0.12 && p < 0.9) {
          ctx.beginPath(); ctx.arc(px2, py2, 2, 0, Math.PI * 2); ctx.fillStyle = hexA(col, 0.9 * fade);
          ctx.shadowColor = col; ctx.shadowBlur = 9; ctx.fill(); ctx.shadowBlur = 0;
        }
        // endpoint blooms
        ctx.beginPath(); ctx.arc(ax, ay, 2.2, 0, Math.PI * 2); ctx.fillStyle = hexA(col, 0.5 * fade); ctx.fill();
        ctx.beginPath(); ctx.arc(bx, by, 2.2, 0, Math.PI * 2); ctx.fillStyle = hexA(col, 0.5 * fade * grow); ctx.fill();
        // landing ripple: a soft ring exhaled where the arc arrives
        if (p > 0.8) {
          var rr = (p - 0.8) / 0.2;
          ctx.beginPath(); ctx.arc(bx, by, 3 + ease(rr) * 11, 0, Math.PI * 2);
          ctx.strokeStyle = hexA(col, 0.3 * (1 - rr)); ctx.lineWidth = 1.1; ctx.stroke();
        }
        return true;
      });
    }
    var ro = onResize(function () {
      var w = host.clientWidth || 300; var h = parseInt(host.dataset.height || '0', 10) || w;
      W = w; H = h; ctx = fitCanvas(cv, w, h);
      if (RM) { for (var k = 0; k < 3; k++) spawnArc(performance.now() - 2000); frame(performance.now()); }
    });
    ro.observe(host);
    this._drv = driver(host, frame);
  };
  if (!customElements.get('husd-globe')) customElements.define('husd-globe', Globe);

  /* ── <husd-flow> · value-flow diagram, chips → hub → chips with travelling light (MoneyGrid, softened) ── */
  var Flow = function () { return Reflect.construct(HTMLElement, [], Flow); };
  Flow.prototype = Object.create(HTMLElement.prototype);
  Flow.prototype.connectedCallback = function () {
    if (this._init) return; this._init = true;
    var host = this; host.style.display = 'block'; host.style.position = 'relative';
    function parse(attr, fb) { try { return JSON.parse((host.dataset[attr] || '').replace(/'/g, '"')); } catch (e) { return fb; } }
    var left = parse('left', [{ t: 'USD deposit' }]), right = parse('right', [{ t: 'Your wallet' }]);
    var hub = host.dataset.hub || 'hUSD';
    var hubSub = host.dataset.hubsub != null ? host.dataset.hubsub : '1 : 1';
    var compact = host.dataset.compact != null;
    var cv = document.createElement('canvas');
    cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;'; cv.setAttribute('aria-hidden', 'true');
    var grid = document.createElement('div');
    grid.style.cssText = 'position:relative;display:grid;grid-template-columns:minmax(80px,1fr) auto minmax(80px,1fr);align-items:center;gap:16px;padding:8px 0;';
    var lastGap = -1;
    function fitGap() {
      var w = host.clientWidth || 600;
      // gap derived from HOST width, not viewport: 7vw ate the narrow auth sidebar
      var g = Math.round(Math.min(90, Math.max(12, (w - hubEl.offsetWidth - 200) * 0.28)));
      if (g !== lastGap) { lastGap = g; grid.style.gap = g + 'px'; }
    }
    function col(items, alignEnd) {
      var c = document.createElement('div');
      c.style.cssText = 'display:flex;flex-direction:column;gap:12px;align-items:' + (alignEnd ? 'flex-end' : 'flex-start') + ';min-width:0;';
      items.forEach(function (it) {
        var chip = document.createElement('div');
        chip.style.cssText = 'max-width:100%;background:rgba(16,23,26,0.92);border:1px solid ' + (it.hl ? 'rgba(236,214,160,0.45)' : 'rgba(255,255,255,0.10)') + ';border-radius:12px;padding:9px 13px;box-shadow:0 6px 18px -8px rgba(0,0,0,0.55);';
        var t = document.createElement('div');
        t.style.cssText = 'font-size:0.88rem;font-weight:600;color:' + (it.hl ? GOLD : '#eef3f2') + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
        t.textContent = it.t || String(it); chip.appendChild(t);
        if (it.s) { var s = document.createElement('div'); s.style.cssText = 'font-size:0.72rem;color:#9ca9a8;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'; s.textContent = it.s; chip.appendChild(s); }
        c.appendChild(chip);
      });
      return c;
    }
    var leftCol = col(left, true), rightCol = col(right, false);
    var hubEl = document.createElement('div');
    var hubSize = compact ? 64 : 92;
    hubEl.style.cssText = 'position:relative;width:' + hubSize + 'px;height:' + hubSize + 'px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 35% 30%, rgba(247,232,189,0.16), rgba(16,23,26,0.95) 70%);border:1.5px solid rgba(236,214,160,0.55);box-shadow:0 0 34px rgba(236,214,160,0.14);z-index:1;';
    hubEl.innerHTML = '<div style="font-weight:700;font-size:' + (compact ? '0.9rem' : '1.06rem') + ';color:' + GOLD_BRIGHT + ';letter-spacing:0.01em;">' + hub + '</div>' + (hubSub ? '<div style="font-size:0.58rem;font-weight:700;letter-spacing:0.1em;color:#9ca9a8;">' + hubSub + '</div>' : '');
    grid.appendChild(leftCol); grid.appendChild(hubEl); grid.appendChild(rightCol);
    host.appendChild(cv); host.appendChild(grid);
    var W = 0, H = 0, ctx = null, paths = [];
    function rel(r, hostR) { return { x: r.left - hostR.left, y: r.top - hostR.top, w: r.width, h: r.height }; }
    function layout() {
      fitGap();
      var hr = host.getBoundingClientRect(); if (!hr.width) return;
      W = hr.width; H = hr.height; ctx = fitCanvas(cv, W, H, 'both');
      var hb = rel(hubEl.getBoundingClientRect(), hr);
      var hx = hb.x + hb.w / 2, hy = hb.y + hb.h / 2, hrad = hb.w / 2;
      paths = [];
      Array.prototype.forEach.call(leftCol.children, function (ch, i) {
        var b = rel(ch.getBoundingClientRect(), hr);
        paths.push({ from: [b.x + b.w + 4, b.y + b.h / 2], to: [hx - hrad - 4, hy], col: TEAL, ph: i * 0.31, dur: 4600 + (i % 3) * 750, into: true });
      });
      Array.prototype.forEach.call(rightCol.children, function (ch, i) {
        var b = rel(ch.getBoundingClientRect(), hr);
        paths.push({ from: [hx + hrad + 4, hy], to: [b.x - 4, b.y + b.h / 2], col: GOLD, ph: 0.5 + i * 0.27, dur: 5200 + (i % 3) * 650, into: false });
      });
      if (RM) frame(0);
    }
    function bez(p, t) {
      var x0 = p.from[0], y0 = p.from[1], x1 = p.to[0], y1 = p.to[1];
      var c1x = x0 + (x1 - x0) * 0.45, c2x = x0 + (x1 - x0) * 0.55, u = 1 - t;
      return [u * u * u * x0 + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * x1,
              u * u * u * y0 + 3 * u * u * t * y0 + 3 * u * t * t * y1 + t * t * t * y1];
    }
    function frame(now) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      paths.forEach(function (p) {
        ctx.beginPath(); ctx.moveTo(p.from[0], p.from[1]);
        ctx.bezierCurveTo(p.from[0] + (p.to[0] - p.from[0]) * 0.45, p.from[1], p.from[0] + (p.to[0] - p.from[0]) * 0.55, p.to[1], p.to[0], p.to[1]);
        ctx.strokeStyle = 'rgba(255,255,255,0.075)'; ctx.lineWidth = 1; ctx.stroke();
        if (RM) return;
        for (var d = 0; d < 2; d++) { // two staggered lights per path, varied pace per lane
          var t = ((now / (p.dur || 5300)) + p.ph + d * 0.5) % 1;
          var tt = ease(t);
          // comet tail
          for (var k = 6; k >= 0; k--) {
            var tb = clamp(tt - k * 0.016, 0, 1), pt = bez(p, tb);
            ctx.beginPath(); ctx.arc(pt[0], pt[1], k === 0 ? 2.4 : 1.6, 0, Math.PI * 2);
            ctx.fillStyle = hexA(p.col, (k === 0 ? 0.95 : 0.28 - k * 0.035) * Math.sin(Math.PI * clamp(tt, 0.02, 0.98)));
            if (k === 0) { ctx.shadowColor = p.col; ctx.shadowBlur = 8; }
            ctx.fill(); ctx.shadowBlur = 0;
          }
          // arrival glow at the destination
          if (tt > 0.92) {
            var ar = (tt - 0.92) / 0.08;
            ctx.beginPath(); ctx.arc(p.to[0], p.to[1], 3 + ar * 10, 0, Math.PI * 2);
            ctx.strokeStyle = hexA(p.col, 0.32 * (1 - ar)); ctx.lineWidth = 1.2; ctx.stroke();
          }
        }
      });
      if (!RM) {
        // hub breath: a soft ring exhaled every ~3.6s
        var hb = hubEl, r0 = hb.offsetWidth / 2;
        var hx = hb.offsetLeft + r0, hy = hb.offsetTop + r0;
        var bp = (now % 3600) / 3600, br = r0 + 4 + ease(bp) * 16;
        ctx.beginPath(); ctx.arc(hx, hy, br, 0, Math.PI * 2);
        ctx.strokeStyle = hexA(GOLD, 0.22 * (1 - bp)); ctx.lineWidth = 1.2; ctx.stroke();
      }
    }
    var ro = onResize(layout); ro.observe(host); ro.observe(grid);
    requestAnimationFrame(layout);
    this._drv = driver(host, frame);
  };
  if (!customElements.get('husd-flow')) customElements.define('husd-flow', Flow);

  /* ── <husd-trend> · draw-in area chart with a travelling glow (Movmint live charts, softened) ── */
  var Trend = function () { return Reflect.construct(HTMLElement, [], Trend); };
  Trend.prototype = Object.create(HTMLElement.prototype);
  Trend.prototype.connectedCallback = function () {
    if (this._init) return; this._init = true;
    var host = this; host.style.display = 'block'; host.style.position = 'relative';
    var cv = document.createElement('canvas'); cv.style.display = 'block'; cv.setAttribute('aria-hidden', 'true'); host.appendChild(cv);
    var raw = (host.dataset.points || '10,12,11,14,15,15,17,19,18,21,23,24').split(',').map(parseFloat);
    var col = host.dataset.color || TEAL;
    var baseline = host.dataset.baseline ? parseFloat(host.dataset.baseline) : null;
    var W = 0, H = 0, ctx = null, started = 0;
    var lo = Math.min.apply(null, raw.concat(baseline == null ? [] : [baseline]));
    var hi = Math.max.apply(null, raw.concat(baseline == null ? [] : [baseline]));
    var pad = (hi - lo) * 0.18 || 1; lo -= pad; hi += pad;
    if (host.dataset.min) lo = parseFloat(host.dataset.min);
    if (host.dataset.max) hi = parseFloat(host.dataset.max);
    function pt(i) {
      var x = 8 + (W - 16) * (i / (raw.length - 1));
      var y = H - 6 - (H - 14) * ((raw[i] - lo) / (hi - lo));
      return [x, y];
    }
    function xy(f) { // fractional index along polyline
      var i = Math.floor(f), t = f - i;
      if (i >= raw.length - 1) return pt(raw.length - 1);
      var a = pt(i), b = pt(i + 1);
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    }
    function frame(now) {
      if (!ctx || !W) return;
      if (!started) started = now;
      var reveal = RM ? 1 : ease(clamp((now - started) / 1900, 0, 1));
      ctx.clearRect(0, 0, W, H);
      if (baseline != null) {
        var by = H - 6 - (H - 14) * ((baseline - lo) / (hi - lo));
        ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.moveTo(8, by); ctx.lineTo(W - 8, by);
        ctx.strokeStyle = 'rgba(236,214,160,0.35)'; ctx.lineWidth = 1; ctx.stroke(); ctx.setLineDash([]);
      }
      var upto = (raw.length - 1) * reveal;
      ctx.beginPath();
      var p0 = pt(0); ctx.moveTo(p0[0], p0[1]);
      for (var i = 1; i <= Math.floor(upto); i++) { var p = pt(i); ctx.lineTo(p[0], p[1]); }
      var tip = xy(upto); ctx.lineTo(tip[0], tip[1]);
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
      // area fill
      ctx.lineTo(tip[0], H - 2); ctx.lineTo(p0[0], H - 2); ctx.closePath();
      var g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, hexA(col, 0.20)); g.addColorStop(1, hexA(col, 0));
      ctx.fillStyle = g; ctx.fill();
      // endpoint pulse
      var ep = pt(raw.length - 1);
      if (reveal >= 1) {
        var pu = (now % 2600) / 2600;
        ctx.beginPath(); ctx.arc(ep[0], ep[1], 3 + ease(pu) * 8, 0, Math.PI * 2);
        ctx.strokeStyle = hexA(col, 0.35 * (1 - pu)); ctx.lineWidth = 1.4; ctx.stroke();
        // travelling glow retraces the line, slow and continuous (host can disable via data-husd-chartglow)
        if (document.documentElement.dataset.husdChartglow !== 'off') {
          var tf = ((now - started) % 11000) / 11000;
          var gp = xy((raw.length - 1) * ease(tf));
          ctx.beginPath(); ctx.arc(gp[0], gp[1], 2.4, 0, Math.PI * 2);
          ctx.fillStyle = hexA(col, 0.9); ctx.shadowColor = col; ctx.shadowBlur = 9; ctx.fill(); ctx.shadowBlur = 0;
        }
      }
      // endpoint value tag (Movmint live-rate style)
      var tag = host.dataset.tag;
      if (tag && (RM || reveal >= 1)) {
        ctx.font = '600 11px TestFoundersGrotesk, system-ui, sans-serif';
        var tw = ctx.measureText(tag).width, bw = tw + 14, bh = 20;
        var bx2 = clamp(ep[0] - bw - 10, 4, W - bw - 4), by2 = clamp(ep[1] - bh - 10, 4, H - bh - 4);
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(bx2, by2, bw, bh, 6); else ctx.rect(bx2, by2, bw, bh);
        ctx.fillStyle = 'rgba(11,15,16,0.92)'; ctx.fill();
        ctx.strokeStyle = hexA(col, 0.45); ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = '#eef3f2'; ctx.textBaseline = 'middle'; ctx.fillText(tag, bx2 + 7, by2 + bh / 2 + 0.5);
      }
      ctx.beginPath(); ctx.arc(ep[0], ep[1], 3, 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill();
      if (RM) return;
    }
    var ro = onResize(function () {
      W = host.clientWidth || 300; H = parseInt(host.dataset.height || '0', 10) || Math.max(80, Math.round(W * 0.3));
      ctx = fitCanvas(cv, W, H, true); started = 0;
      if (RM) frame(performance.now());
    });
    ro.observe(host);
    this._drv = driver(host, frame);
  };
  if (!customElements.get('husd-trend')) customElements.define('husd-trend', Trend);

  /* ── <husd-reveal> · gentle rise-on-scroll wrapper ───────────────────────────── */
  var Reveal = function () { return Reflect.construct(HTMLElement, [], Reveal); };
  Reveal.prototype = Object.create(HTMLElement.prototype);
  Reveal.prototype.connectedCallback = function () {
    if (this._init) return; this._init = true;
    var host = this; host.style.display = 'block';
    if (RM) return;
    var delay = parseInt(host.dataset.delay || '0', 10);
    // data-stagger: animate the section's pieces one after another (header first, then the
    // children of the [data-stagger-items] grid), instead of the block as one slab
    var items = [host];
    if (host.dataset.stagger != null) {
      var marker = host.querySelector('[data-stagger-items]');
      if (marker) {
        items = [];
        Array.prototype.forEach.call(host.children, function (c) { if (c !== marker && !c.contains(marker)) items.push(c); });
        var wrap = marker.parentElement === host || items.indexOf(marker.parentElement) !== -1 ? null : marker.parentElement;
        if (wrap && wrap !== host) items.push(wrap);
        Array.prototype.push.apply(items, Array.prototype.slice.call(marker.children));
        if (wrap) items = items.filter(function (c) { return c !== wrap; });
      } else {
        items = Array.prototype.slice.call(host.children);
      }
      if (!items.length) items = [host];
    }
    items.forEach(function (el, i) {
      el.style.opacity = '0'; el.style.transform = 'translateY(22px)';
      var d2 = delay + i * 110;
      el.style.transition = 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) ' + d2 + 'ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ' + d2 + 'ms';
    });
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { items.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; }); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    // if it mounts already in view (top of page), fire on next frame for the entrance to register
    requestAnimationFrame(function () { io.observe(host); });
  };
  if (!customElements.get('husd-reveal')) customElements.define('husd-reveal', Reveal);
  /* ── <husd-dust> · ambient drifting dot-field with occasional arcs (the globe's texture, as a backdrop) ── */
  var Dust = function () { return Reflect.construct(HTMLElement, [], Dust); };
  Dust.prototype = Object.create(HTMLElement.prototype);
  Dust.prototype.connectedCallback = function () {
    if (this._init) return; this._init = true;
    var host = this;
    if (!host.style.position) host.style.position = 'absolute';
    host.style.pointerEvents = 'none'; host.setAttribute('aria-hidden', 'true');
    var cv = document.createElement('canvas'); cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;'; host.appendChild(cv);
    var W = 0, H = 0, ctx = null;
    var N = parseInt(host.dataset.density || '46', 10), pts = [], arcs = [];
    function seed() {
      // structured constellation, not random scatter: dots sit on a loose grid with
      // deterministic jitter, so every field across the product has the same texture
      pts = [];
      var cell = Math.sqrt((W * H) / N) || 40;
      var cols = Math.max(1, Math.round(W / cell)), rows = Math.max(1, Math.round(H / cell));
      var k = 0;
      function hash(n) { var x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
      for (var gy = 0; gy < rows; gy++) for (var gx = 0; gx < cols; gx++) {
        k++;
        if (hash(k * 3.7) < 0.18) continue; // breathe: skip ~1 in 6 cells
        var jx = (hash(k) - 0.5) * cell * 0.85, jy = (hash(k * 2.3) - 0.5) * cell * 0.85;
        var ang = hash(k * 5.1) * Math.PI * 2;
        pts.push({
          x: (gx + 0.5) * (W / cols) + jx, y: (gy + 0.5) * (H / rows) + jy,
          vx: Math.cos(ang) * 0.045, vy: Math.sin(ang) * 0.035,
          r: 0.9 + hash(k * 7.9) * 0.9, gold: k % 7 === 0, ph: hash(k * 9.4) * Math.PI * 2
        });
      }
    }
    function frame(now) {
      if (!ctx || !W) return;
      if (document.documentElement.dataset.husdAmbient === 'off') { ctx.clearRect(0, 0, W, H); return; }
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        if (!RM) { p.x += p.vx; p.y += p.vy; if (p.x < -4) p.x = W + 4; if (p.x > W + 4) p.x = -4; if (p.y < -4) p.y = H + 4; if (p.y > H + 4) p.y = -4; }
        var tw = 0.5 + 0.5 * Math.sin(now * 0.0009 + p.ph);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? hexA(GOLD, 0.32 * tw + 0.08) : 'rgba(207,233,228,' + (0.14 * tw + 0.04) + ')';
        ctx.fill();
      }
      if (!RM) {
        if (arcs.length < 2 && Math.random() < 0.006) {
          var a = pts[Math.floor(Math.random() * pts.length)], b = pts[Math.floor(Math.random() * pts.length)];
          var d = Math.hypot(a.x - b.x, a.y - b.y);
          if (a !== b && d > 60 && d < Math.min(W, H) * 0.9) arcs.push({ a: a, b: b, t0: now, dur: 4600 + Math.random() * 1800, gold: Math.random() < 0.4 });
        }
        arcs = arcs.filter(function (arc) {
          var p2 = (now - arc.t0) / arc.dur; if (p2 >= 1) return false;
          var col = arc.gold ? GOLD : TEAL;
          var mx = (arc.a.x + arc.b.x) / 2, my = (arc.a.y + arc.b.y) / 2 - Math.hypot(arc.b.x - arc.a.x, arc.b.y - arc.a.y) * 0.22;
          var grow = ease(clamp(p2 / 0.4, 0, 1)), fade = 1 - ease(clamp((p2 - 0.7) / 0.3, 0, 1));
          ctx.beginPath(); ctx.moveTo(arc.a.x, arc.a.y);
          var segs = 20;
          for (var s = 1; s <= Math.floor(segs * grow); s++) {
            var t = s / segs, u = 1 - t;
            ctx.lineTo(u * u * arc.a.x + 2 * u * t * mx + t * t * arc.b.x, u * u * arc.a.y + 2 * u * t * my + t * t * arc.b.y);
          }
          ctx.strokeStyle = hexA(col, 0.22 * fade); ctx.lineWidth = 1; ctx.stroke();
          var ct = ease(clamp((p2 - 0.1) / 0.75, 0, 1)), cu = 1 - ct;
          if (p2 > 0.08 && p2 < 0.92) {
            var px = cu * cu * arc.a.x + 2 * cu * ct * mx + ct * ct * arc.b.x, py = cu * cu * arc.a.y + 2 * cu * ct * my + ct * ct * arc.b.y;
            ctx.beginPath(); ctx.arc(px, py, 1.8, 0, Math.PI * 2); ctx.fillStyle = hexA(col, 0.75 * fade);
            ctx.shadowColor = col; ctx.shadowBlur = 7; ctx.fill(); ctx.shadowBlur = 0;
          }
          return true;
        });
      }
    }
    var ro = onResize(function () {
      var r = host.getBoundingClientRect(); if (!r.width) return;
      W = r.width; H = r.height; ctx = fitCanvas(cv, W, H, 'both'); seed();
      if (RM) frame(performance.now());
    });
    ro.observe(host);
    this._drv = driver(host, frame);
  };
  if (!customElements.get('husd-dust')) customElements.define('husd-dust', Dust);

  /* ── <husd-orbit> · your dollar at the center of daily life: orbiting dots, payment arcs (Use cases hero) ── */
  var Orbit = function () { return Reflect.construct(HTMLElement, [], Orbit); };
  Orbit.prototype = Object.create(HTMLElement.prototype);
  Orbit.prototype.connectedCallback = function () {
    if (this._init) return; this._init = true;
    var host = this; host.style.display = 'block'; host.style.position = 'relative';
    var cv = document.createElement('canvas'); cv.style.display = 'block'; cv.setAttribute('aria-hidden', 'true'); host.appendChild(cv);
    var W = 0, H = 0, ctx = null;
    var RINGS = [0.42, 0.7, 1.0], SPEEDS = [0.000115, -0.00008, 0.000055], COUNTS = [4, 6, 8];
    var dots = [];
    RINGS.forEach(function (rr, ri) {
      for (var i = 0; i < COUNTS[ri]; i++) dots.push({ ring: ri, a0: (Math.PI * 2 * i) / COUNTS[ri] + ri * 0.9, gold: (ri + i) % 4 === 0, ph: Math.random() * Math.PI * 2 });
    });
    var arcs = [];
    function dotPos(d, now, R, ox, oy) {
      var a = d.a0 + now * SPEEDS[d.ring];
      var r = RINGS[d.ring] * R;
      return [ox + Math.cos(a) * r, oy + Math.sin(a) * r * 0.92];
    }
    function frame(now) {
      if (!ctx || !W) return;
      var R = Math.min(W, H) * 0.46, ox = W / 2, oy = H / 2;
      ctx.clearRect(0, 0, W, H);
      // center halo
      var g = ctx.createRadialGradient(ox, oy, 2, ox, oy, R);
      g.addColorStop(0, 'rgba(236,214,160,0.10)'); g.addColorStop(0.5, 'rgba(67,192,173,0.04)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      // rings
      RINGS.forEach(function (rr) {
        ctx.beginPath(); ctx.ellipse(ox, oy, rr * R, rr * R * 0.92, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(236,214,160,0.09)'; ctx.lineWidth = 1; ctx.stroke();
      });
      // center coin: gold disc + breathing ring (the flow hub's heartbeat)
      var cg = ctx.createRadialGradient(ox - 4, oy - 5, 2, ox, oy, 17);
      cg.addColorStop(0, '#f7e8bd'); cg.addColorStop(0.55, '#d8b873'); cg.addColorStop(1, '#8a6831');
      ctx.beginPath(); ctx.arc(ox, oy, 15, 0, Math.PI * 2); ctx.fillStyle = cg; ctx.fill();
      ctx.font = '700 13px TestFoundersGrotesk, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#5c431a'; ctx.fillText('h', ox, oy + 0.5);
      if (!RM) {
        var bp = (now % 3600) / 3600;
        ctx.beginPath(); ctx.arc(ox, oy, 18 + ease(bp) * 15, 0, Math.PI * 2);
        ctx.strokeStyle = hexA(GOLD, 0.25 * (1 - bp)); ctx.lineWidth = 1.2; ctx.stroke();
      }
      // orbiting dots
      dots.forEach(function (d) {
        var p = dotPos(d, RM ? 0 : now, R, ox, oy);
        var tw = 0.6 + 0.4 * Math.sin(now * 0.0011 + d.ph);
        ctx.beginPath(); ctx.arc(p[0], p[1], d.gold ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = d.gold ? hexA(GOLD, 0.5 + 0.4 * tw) : 'rgba(207,233,228,' + (0.25 + 0.3 * tw) + ')';
        if (d.gold) { ctx.shadowColor = GOLD; ctx.shadowBlur = 7 * tw; }
        ctx.fill(); ctx.shadowBlur = 0;
      });
      if (RM) return;
      // payments: a comet leaves the coin for an orbiting dot, blooms, and fades
      if (arcs.length < 2 && Math.random() < 0.011) arcs.push({ d: dots[Math.floor(Math.random() * dots.length)], t0: now, dur: 2600 + Math.random() * 900, gold: Math.random() < 0.5 });
      arcs = arcs.filter(function (arc) {
        var p2 = (now - arc.t0) / arc.dur; if (p2 >= 1) return false;
        var tp = dotPos(arc.d, now, R, ox, oy);
        var col = arc.gold ? GOLD : TEAL;
        var mx = (ox + tp[0]) / 2, my = (oy + tp[1]) / 2;
        var dx = mx - ox, dy = my - oy, dl = Math.sqrt(dx * dx + dy * dy) || 1;
        var lift = 0.3 * Math.hypot(tp[0] - ox, tp[1] - oy);
        var cxp = mx - (dy / dl) * lift, cyp = my + (dx / dl) * lift;
        var grow = ease(clamp(p2 / 0.45, 0, 1)), fade = 1 - ease(clamp((p2 - 0.7) / 0.3, 0, 1));
        ctx.beginPath(); ctx.moveTo(ox, oy);
        var segs = 22;
        for (var s = 1; s <= Math.floor(segs * grow); s++) {
          var t = s / segs, u = 1 - t;
          ctx.lineTo(u * u * ox + 2 * u * t * cxp + t * t * tp[0], u * u * oy + 2 * u * t * cyp + t * t * tp[1]);
        }
        ctx.strokeStyle = hexA(col, 0.3 * fade); ctx.lineWidth = 1; ctx.stroke();
        var ct = ease(clamp((p2 - 0.08) / 0.72, 0, 1)), cu = 1 - ct;
        if (p2 > 0.06 && p2 < 0.92) {
          var px = cu * cu * ox + 2 * cu * ct * cxp + ct * ct * tp[0], py = cu * cu * oy + 2 * cu * ct * cyp + ct * ct * tp[1];
          ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2); ctx.fillStyle = hexA(col, 0.9 * fade);
          ctx.shadowColor = col; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
        }
        if (p2 > 0.75) { // landing ripple on the dot
          var rr2 = (p2 - 0.75) / 0.25;
          ctx.beginPath(); ctx.arc(tp[0], tp[1], 3 + ease(rr2) * 10, 0, Math.PI * 2);
          ctx.strokeStyle = hexA(col, 0.32 * (1 - rr2)); ctx.lineWidth = 1.1; ctx.stroke();
        }
        return true;
      });
    }
    var ro = onResize(function () {
      var w = host.clientWidth || 300; var h = parseInt(host.dataset.height || '0', 10) || Math.round(w * 0.86);
      W = w; H = h; ctx = fitCanvas(cv, w, h, true);
      if (RM) frame(0);
    });
    ro.observe(host);
    this._drv = driver(host, frame);
  };
  if (!customElements.get('husd-orbit')) customElements.define('husd-orbit', Orbit);

  /* ── <husd-ring> · proof visual: outer gold dot-ring (reserves) enclosing the teal supply ring,
     counter-rotating; an attestation sweep circles the rim and settles as a check-pulse ── */
  var Ring = function () { return Reflect.construct(HTMLElement, [], Ring); };
  Ring.prototype = Object.create(HTMLElement.prototype);
  Ring.prototype.connectedCallback = function () {
    if (this._init) return; this._init = true;
    var host = this; host.style.display = 'block'; host.style.position = 'relative';
    var cv = document.createElement('canvas'); cv.style.display = 'block'; cv.setAttribute('aria-hidden', 'true'); host.appendChild(cv);
    var W = 0, H = 0, ctx = null;
    var NO = 56, NI = 40; // outer reserve dots > inner supply dots: the surplus, visible
    function frame(now) {
      if (!ctx || !W) return;
      var R = Math.min(W, H) * 0.46, ox = W / 2, oy = H / 2, Ri = R * 0.72;
      ctx.clearRect(0, 0, W, H);
      var g = ctx.createRadialGradient(ox, oy, 2, ox, oy, R);
      g.addColorStop(0, 'rgba(67,192,173,0.06)'); g.addColorStop(0.75, 'rgba(236,214,160,0.05)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      var t = RM ? 0 : now;
      for (var i = 0; i < NO; i++) { // gold reserve ring, slow clockwise
        var a = (Math.PI * 2 * i) / NO + t * 0.00005;
        var tw = 0.6 + 0.4 * Math.sin(t * 0.001 + i * 1.7);
        ctx.beginPath(); ctx.arc(ox + Math.cos(a) * R, oy + Math.sin(a) * R, 1.9, 0, Math.PI * 2);
        ctx.fillStyle = hexA(GOLD, 0.3 + 0.45 * tw); ctx.fill();
      }
      for (var j = 0; j < NI; j++) { // teal supply ring, slower counter-rotation
        var a2 = (Math.PI * 2 * j) / NI - t * 0.000035;
        var tw2 = 0.6 + 0.4 * Math.sin(t * 0.0011 + j * 2.3);
        ctx.beginPath(); ctx.arc(ox + Math.cos(a2) * Ri, oy + Math.sin(a2) * Ri, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = hexA(TEAL, 0.28 + 0.4 * tw2); ctx.fill();
      }
      // center: ratio figure lives in the HTML overlay; canvas draws the 1:1 tether — a faint
      // spoke pairing the two rings where the sweep passes
      if (!RM) {
        var sp = (now % 7000) / 7000; // attestation sweep: one slow lap, then a settle-pulse
        var sa = sp * Math.PI * 2 - Math.PI / 2;
        var sx = ox + Math.cos(sa) * R, sy = oy + Math.sin(sa) * R;
        var ix = ox + Math.cos(sa) * Ri, iy = oy + Math.sin(sa) * Ri;
        ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(sx, sy);
        ctx.strokeStyle = hexA(GOLD, 0.5); ctx.lineWidth = 1.2; ctx.stroke();
        ctx.beginPath(); ctx.arc(sx, sy, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = hexA(GOLD, 0.95); ctx.shadowColor = GOLD; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
        ctx.beginPath(); ctx.arc(ix, iy, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = hexA(TEAL, 0.9); ctx.shadowColor = TEAL; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
        if (sp > 0.96) { // lap complete: a soft verification pulse breathes out from the rim
          var pr = (sp - 0.96) / 0.04;
          ctx.beginPath(); ctx.arc(ox, oy, R + pr * 9, 0, Math.PI * 2);
          ctx.strokeStyle = hexA(TEAL, 0.3 * (1 - pr)); ctx.lineWidth = 1.3; ctx.stroke();
        }
      }
    }
    var ro = onResize(function () {
      var w = host.clientWidth || 200; var h = parseInt(host.dataset.height || '0', 10) || w;
      W = w; H = h; ctx = fitCanvas(cv, w, h, true);
      if (RM) frame(0);
    });
    ro.observe(host);
    this._drv = driver(host, frame);
  };
  if (!customElements.get('husd-ring')) customElements.define('husd-ring', Ring);
})();
