/* =============================================================================
   graficos.js — Mini motor Canvas 2D (window.Graf)
   -----------------------------------------------------------------------------
   Modo inmediato: cada gráfica guarda una función de dibujo; se vuelve a llamar
   al cambiar el tamaño, el tema claro/oscuro o cuando se pide g.dibujar().

     var g = Graf.crear(contenedor, {altura: 320, xlim: [0, 1], ylim: [0, 1],
                                     xetiqueta: 'x (m)', yetiqueta: 'ρ'});
     g.dibujar(function (g) {
       g.curva(x, y, {estilo: 'solido', etiqueta: 'Planck'});   // cuántico
       g.curva(x, yc, {estilo: 'discontinuo', etiqueta: 'clásico'});
       g.marcadorV(x0, 'máximo');
     });

   Colores: se leen de variables CSS (--acento, --clasico, --aprox, --texto, ...)
   en cada dibujo, así el modo claro/oscuro funciona solo.
   Valores NaN/±Infinity nunca se dibujan: cortan el trazo.
   Documentación completa: CONTRATO.md. SÓLO se carga en el navegador (usa DOM).
   ============================================================================= */
(function () {
  'use strict';

  var Graf = {};
  var viva = [];                     // gráficas vivas (para redibujar al cambiar de tema)
  var PI = Math.PI;

  /* ------------------------------------------------------------ utilidades */

  function esNum(v) { return typeof v === 'number' && isFinite(v); }

  function sup(n) { return (window.Num && Num.superindice) ? Num.superindice(n) : 'e' + n; }

  function mezcla(def, op) {
    var r = {}, k;
    for (k in def) r[k] = def[k];
    if (op) for (k in op) if (op[k] !== undefined) r[k] = op[k];
    return r;
  }

  /** Interpreta '#rgb', '#rrggbb', 'rgb()', 'rgba()' → [r,g,b,a] o null. */
  function parseColor(s) {
    if (typeof s !== 'string') return null;
    s = s.trim();
    var m = /^#([0-9a-f]{3})$/i.exec(s);
    if (m) return [parseInt(m[1][0] + m[1][0], 16), parseInt(m[1][1] + m[1][1], 16), parseInt(m[1][2] + m[1][2], 16), 1];
    m = /^#([0-9a-f]{6})$/i.exec(s);
    if (m) return [parseInt(m[1].slice(0, 2), 16), parseInt(m[1].slice(2, 4), 16), parseInt(m[1].slice(4, 6), 16), 1];
    m = /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)$/i.exec(s);
    if (m) {
      var a = m[4] === undefined ? 1 : (m[4].slice(-1) === '%' ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
      return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), a];
    }
    return null;
  }
  Graf.parseColor = parseColor;

  function luminancia(c) { return c ? (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255 : 1; }

  function rgb(c) { return 'rgb(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ')'; }
  function lerpC(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

  /** Lee la paleta de las variables CSS del elemento. */
  Graf.colores = function (el) {
    var cs = window.getComputedStyle(el);
    function v(n, d) { var x = cs.getPropertyValue(n); x = x ? x.trim() : ''; return x || d; }
    var c = {
      fondo: v('--graf-fondo', v('--panel', '#ffffff')),
      texto: v('--texto', '#1c1f24'),
      tenue: v('--tenue', '#5a6270'),
      grid: v('--grid', 'rgba(0,0,0,0.08)'),
      eje: v('--eje', '#4a5160'),
      acento: v('--acento', '#1f5fbf'),
      clasico: v('--clasico', '#7b8190'),
      aprox: v('--aprox', '#b4530a'),
      prohibido: v('--prohibido', 'rgba(120,120,140,0.14)'),
      positivo: v('--positivo', '#2a9d8f'),
      negativo: v('--negativo', '#d1495b'),
      serie: [v('--s1', '#1f5fbf'), v('--s2', '#d1495b'), v('--s3', '#2a9d8f'),
              v('--s4', '#e9a100'), v('--s5', '#7b4fbf'), v('--s6', '#3a3f4b')]
    };
    c.oscuro = luminancia(parseColor(c.fondo)) < 0.45;
    c.fuente = cs.fontFamily || 'system-ui, sans-serif';
    return c;
  };

  /* ---------------------------------------------------------------- ticks */

  function bonito(x) {
    var e = Math.floor(Math.log(x) / Math.LN10), f = x / Math.pow(10, e);
    var nf = f < 1.5 ? 1 : (f < 3 ? 2 : (f < 7 ? 5 : 10));
    return nf * Math.pow(10, e);
  }

  /** Marcas "bonitas" lineales entre min y max (≈ n marcas). Devuelve {valores, paso}. */
  Graf.ticks = function (min, max, n) {
    var rango = max - min;
    if (!(rango > 0)) return { valores: [min], paso: 1 };
    var paso = bonito(rango / Math.max(2, n || 6)), r = [];
    var k0 = Math.ceil(min / paso - 1e-9), k1 = Math.floor(max / paso + 1e-9);
    for (var k = k0; k <= k1; k++) r.push(Number((k * paso).toPrecision(12)));
    return { valores: r, paso: paso };
  };

  /**
   * Rango [min, max] que cubre todos los arreglos dados, ignorando valores no
   * finitos. opciones: {margen: fracción (0.05), cero: incluir el 0, log: ignora ≤ 0}.
   */
  Graf.rango = function (arreglos, opciones) {
    opciones = opciones || {};
    var mn = Infinity, mx = -Infinity;
    for (var a = 0; a < arreglos.length; a++) {
      var A = arreglos[a];
      for (var i = 0; i < A.length; i++) {
        var v = A[i];
        if (!esNum(v) || (opciones.log && v <= 0)) continue;
        if (v < mn) mn = v;
        if (v > mx) mx = v;
      }
    }
    if (opciones.cero) { if (mn > 0) mn = 0; if (mx < 0) mx = 0; }
    if (!isFinite(mn) || !isFinite(mx)) return [0, 1];
    if (mx === mn) { var d = Math.abs(mx) * 0.5 || 1; mn -= d; mx += d; }
    var m = (opciones.margen !== undefined ? opciones.margen : 0.05);
    if (opciones.log) return [mn / Math.pow(mx / mn, m), mx * Math.pow(mx / mn, m)];
    var r = mx - mn;
    return [(opciones.cero && mn === 0) ? 0 : mn - m * r, mx + m * r];
  };

  function fmtTick(v, decimales) {
    var s = v.toFixed(Math.min(decimales, 10));
    if (Number(s) === 0) s = s.replace('-', '');
    return s.replace('-', '−').replace('.', ',');           // coma decimal (convención del sitio)
  }

  function etiquetaConMultiplicador(txt, me) {
    if (!me) return txt || '';
    var m = '10' + sup(me);
    if (!txt) return '×' + m;
    var i = txt.lastIndexOf('(');
    if (i >= 0 && txt.charAt(txt.length - 1) === ')') return txt.slice(0, i + 1) + m + ' ' + txt.slice(i + 1);
    return txt + ' (×' + m + ')';
  }

  /* ------------------------------------------------------------- Grafica */

  var DEFECTOS = {
    altura: 320,            // px (si no se da `aspecto`)
    aspecto: null,          // ancho/alto; si se da, la altura = ancho/aspecto
    xlim: [0, 1], ylim: [0, 1],
    xescala: 'lin', yescala: 'lin',     // 'lin' | 'log'
    xetiqueta: '', yetiqueta: '', titulo: '',
    cuadricula: true, ejes: true,
    margen: null,           // {izq, der, arr, aba} en px
    igual: false,           // escala 1:1 en x e y (órbitas, diagramas polares)
    recortar: true,         // recortar el dibujo al área de la gráfica
    leyenda: 'ne',          // 'ne'|'nw'|'se'|'sw'|false
    xmultiplicador: 'auto', ymultiplicador: 'auto',   // 'auto' | false | exponente entero
    descripcion: '',        // texto accesible (aria-label)
    minorLog: true,
    lineaCero: true
  };

  var ESTILO_COLOR = { solido: 'acento', discontinuo: 'clasico', punteado: 'aprox' };

  function Grafica(cont, op) {
    var self = this;
    this.op = mezcla(DEFECTOS, op);
    this.cont = cont;
    this.wrap = document.createElement('div');
    this.wrap.className = 'graf';
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('role', 'img');
    this.canvas.setAttribute('aria-label', this.op.descripcion || this.op.titulo || this.op.yetiqueta || 'Gráfica');
    this.wrap.appendChild(this.canvas);
    cont.appendChild(this.wrap);
    this.ctx = this.canvas.getContext('2d');
    this.W = 0; this.H = 0; this.dpr = 0;
    this._fn = null;
    this._leyenda = [];
    this._handlers = null;
    this.vivo = true;
    this.rect = { x: 0, y: 0, w: 1, h: 1 };
    this.col = Graf.colores(this.wrap);
    this._redimensionar(true);
    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(function () { self._redimensionar(false); });
      this._ro.observe(this.wrap);
    } else {
      this._onResize = function () { self._redimensionar(false); };
      window.addEventListener('resize', this._onResize);
    }
    viva.push(this);
  }

  var P = Grafica.prototype;

  P._redimensionar = function (forzar) {
    var W = Math.floor(this.wrap.clientWidth) || (forzar ? 600 : 0);
    if (!W) return;
    var op = this.op;
    var H = op.aspecto ? Math.max(120, Math.round(W / op.aspecto)) : op.altura;
    var dpr = window.devicePixelRatio || 1;
    if (W === this.W && H === this.H && dpr === this.dpr) return;
    this.W = W; this.H = H; this.dpr = dpr;
    this.canvas.width = Math.round(W * dpr);
    this.canvas.height = Math.round(H * dpr);
    this.canvas.style.height = H + 'px';
    if (!forzar) this._render();
  };

  /** Cambia opciones (xlim, ylim, etiquetas, escalas...). No redibuja: llamar a dibujar(). */
  P.configurar = function (op) {
    for (var k in op) if (op[k] !== undefined) this.op[k] = op[k];
    if (op.descripcion || op.titulo) this.canvas.setAttribute('aria-label', op.descripcion || op.titulo);
    this._redimensionar(false);
    return this;
  };

  /**
   * Programa fn(g) para ejecutarse DESPUÉS de liberar el recorte (se puede dibujar fuera del
   * área de la gráfica: barras de color, rótulos en los márgenes). Sólo vale dentro de dibujar().
   */
  P.despues = function (fn) { if (this._despues) this._despues.push(fn); return this; };

  /** Texto accesible actual de la gráfica (lectores de pantalla). */
  P.descripcion = function (txt) { this.canvas.setAttribute('aria-label', txt); return this; };

  /**
   * Dibuja: limpia, cuadrícula, llama fn(g) con recorte al área de la gráfica,
   * y al final ejes, marcas, etiquetas y leyenda. Guarda fn para redibujar.
   */
  P.dibujar = function (fn) {
    if (fn) this._fn = fn;
    this._render();
    return this;
  };

  /** Alias de dibujar() sin cambiar la función guardada. */
  P.redibujar = function () { this._render(); return this; };

  P.destruir = function () {
    this.vivo = false;
    if (this._ro) this._ro.disconnect();
    if (this._onResize) window.removeEventListener('resize', this._onResize);
    var i = viva.indexOf(this);
    if (i >= 0) viva.splice(i, 1);
    if (this.wrap.parentNode) this.wrap.parentNode.removeChild(this.wrap);
  };

  /* ---- transformaciones datos ↔ píxeles ---- */

  function limites(lim, escala) {
    var a = lim[0], b = lim[1];
    if (!esNum(a) || !esNum(b)) { a = 0; b = 1; }
    if (escala === 'log') {
      if (!(a > 0)) a = 1e-300;
      if (!(b > a)) b = a * 10;
    } else if (a === b) { var d = Math.abs(a) * 0.5 || 1; a -= d; b += d; }
    return [a, b];
  }

  P._fijarEscalas = function () {
    var op = this.op, r = this.rect;
    var xl = limites(op.xlim, op.xescala), yl = limites(op.ylim, op.yescala);
    this.x0 = xl[0]; this.x1 = xl[1]; this.y0 = yl[0]; this.y1 = yl[1];
    this._lx0 = op.xescala === 'log' ? Math.log(this.x0) : this.x0;
    this._lx1 = op.xescala === 'log' ? Math.log(this.x1) : this.x1;
    this._ly0 = op.yescala === 'log' ? Math.log(this.y0) : this.y0;
    this._ly1 = op.yescala === 'log' ? Math.log(this.y1) : this.y1;
    this._sx = r.w / (this._lx1 - this._lx0);
    this._sy = r.h / (this._ly1 - this._ly0);
  };

  /** x (datos) → píxel horizontal. NaN si x no es representable (p. ej. ≤ 0 en log). */
  P.px = function (x) {
    if (this.op.xescala === 'log') { if (!(x > 0)) return NaN; x = Math.log(x); }
    return this.rect.x + (x - this._lx0) * this._sx;
  };
  /** y (datos) → píxel vertical. */
  P.py = function (y) {
    if (this.op.yescala === 'log') { if (!(y > 0)) return NaN; y = Math.log(y); }
    return this.rect.y + this.rect.h - (y - this._ly0) * this._sy;
  };
  /** píxel → x (datos). */
  P.ix = function (px) {
    var v = this._lx0 + (px - this.rect.x) / this._sx;
    return this.op.xescala === 'log' ? Math.exp(v) : v;
  };
  /** píxel → y (datos). */
  P.iy = function (py) {
    var v = this._ly0 + (this.rect.y + this.rect.h - py) / this._sy;
    return this.op.yescala === 'log' ? Math.exp(v) : v;
  };

  P.color = function (c, def) {
    if (c === undefined || c === null) c = def;
    var m = this.col;
    if (typeof c === 'string') {
      if (typeof m[c] === 'string' && c !== 'fuente') return m[c];
      var s = /^s([1-6])$/.exec(c);
      if (s) return m.serie[parseInt(s[1], 10) - 1];
    }
    return c;
  };

  P.fuente = function (tam, negrita) { return (negrita ? '600 ' : '') + tam + 'px ' + this.col.fuente; };

  /* ---- ticks de un eje ---- */

  function ticksEje(g, eje) {
    var op = g.op, log = (eje === 'x' ? op.xescala : op.yescala) === 'log';
    var a = eje === 'x' ? g.x0 : g.y0, b = eje === 'x' ? g.x1 : g.y1;
    var largo = eje === 'x' ? g.rect.w : g.rect.h;
    var n = Math.max(3, Math.floor(largo / (eje === 'x' ? 78 : 44)));
    var res = { mayores: [], menores: [], etiquetas: [], me: 0 };
    if (log) {
      var k0 = Math.floor(Math.log(a) / Math.LN10 + 1e-9), k1 = Math.ceil(Math.log(b) / Math.LN10 - 1e-9);
      var span = k1 - k0, salto = Math.max(1, Math.ceil(span / Math.max(2, n)));
      for (var k = k0; k <= k1; k++) {
        var v = Math.pow(10, k);
        if (v >= a * (1 - 1e-9) && v <= b * (1 + 1e-9) && (k - k0) % salto === 0) {
          res.mayores.push(v);
          res.etiquetas.push((k >= -2 && k <= 3) ? String(v < 1 ? Number(v.toPrecision(3)) : v).replace('.', ',') : (k === 0 ? '1' : '10' + sup(k)));
        }
        if (op.minorLog && span <= 6) {
          for (var d = 2; d <= 9; d++) { var m = d * v; if (m >= a && m <= b) res.menores.push(m); }
        }
      }
      return res;
    }
    var t = Graf.ticks(a, b, n), vals = t.valores, mm = 0, i;
    for (i = 0; i < vals.length; i++) mm = Math.max(mm, Math.abs(vals[i]));
    var mult = eje === 'x' ? op.xmultiplicador : op.ymultiplicador, me = 0;
    if (mult === 'auto') {
      if (mm >= 1e5 || (mm > 0 && mm < 1e-2)) me = Math.floor(Math.log(mm) / Math.LN10 + 1e-9);
    } else if (typeof mult === 'number') me = mult;
    res.me = me;
    var paso = t.paso / Math.pow(10, me);
    var dec = Math.max(0, Math.min(8, -Math.floor(Math.log(paso) / Math.LN10 + 1e-9)));
    for (i = 0; i < vals.length; i++) {
      res.mayores.push(vals[i]);
      res.etiquetas.push(fmtTick(vals[i] / Math.pow(10, me), dec));
    }
    return res;
  }

  /* ---- layout ---- */

  P._layout = function () {
    var op = this.op, ctx = this.ctx, W = this.W, H = this.H;
    var m = op.margen || {};
    var libre = (op.ejes === false);
    var mg = {
      izq: m.izq !== undefined ? m.izq : (libre ? 8 : 58),
      der: m.der !== undefined ? m.der : (libre ? 8 : 16),
      arr: m.arr !== undefined ? m.arr : (libre ? 8 : 12),
      aba: m.aba !== undefined ? m.aba : (libre ? 8 : 44)
    };
    if (op.titulo && m.arr === undefined) mg.arr += 20;
    this.rect = { x: mg.izq, y: mg.arr, w: Math.max(40, W - mg.izq - mg.der), h: Math.max(40, H - mg.arr - mg.aba) };
    this._fijarEscalas();
    if (!libre && m.izq === undefined) {
      // ajustar margen izquierdo al ancho real de las marcas del eje y
      var ty = ticksEje(this, 'y');
      ctx.save(); ctx.font = this.fuente(11);
      var wmax = 0;
      for (var i = 0; i < ty.etiquetas.length; i++) wmax = Math.max(wmax, ctx.measureText(ty.etiquetas[i]).width);
      ctx.restore();
      var nuevo = Math.max(mg.izq, Math.ceil(wmax) + (op.yetiqueta ? 34 : 16));
      if (nuevo !== mg.izq) {
        mg.izq = nuevo;
        this.rect = { x: mg.izq, y: mg.arr, w: Math.max(40, W - mg.izq - mg.der), h: Math.max(40, H - mg.arr - mg.aba) };
        this._fijarEscalas();
      }
    }
    if (op.igual) {
      var r = this.rect, ex = this._lx1 - this._lx0, ey = this._ly1 - this._ly0;
      var s = Math.min(r.w / ex, r.h / ey), w2 = s * ex, h2 = s * ey;
      this.rect = { x: r.x + (r.w - w2) / 2, y: r.y + (r.h - h2) / 2, w: w2, h: h2 };
      this._fijarEscalas();
    }
  };

  /* ---- render ---- */

  P._render = function () {
    if (!this.vivo) return;
    if (!this.W) this._redimensionar(true);
    if (!this.W) return;
    var ctx = this.ctx, op = this.op;
    var dpr = window.devicePixelRatio || 1;
    if (dpr !== this.dpr) { this.dpr = 0; this._redimensionar(true); }
    this.col = Graf.colores(this.wrap);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.W, this.H);
    ctx.textBaseline = 'alphabetic';
    this._layout();
    this._leyenda = [];
    this._despues = [];
    this._ticksX = op.ejes === false ? null : ticksEje(this, 'x');
    this._ticksY = op.ejes === false ? null : ticksEje(this, 'y');
    if (op.ejes !== false && op.cuadricula) this._cuadricula();
    var r = this.rect;
    ctx.save();
    if (op.recortar !== false && op.ejes !== false) { ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip(); }
    if (this._fn) {
      try { this._fn(this); }
      catch (e) {
        if (window.console) console.error('Graf: error al dibujar', e);
        ctx.restore(); ctx.save();
        this.textoPx(r.x + 8, r.y + 20, 'Error al dibujar: ' + (e && e.message ? e.message : e), { color: 'negativo', tam: 12 });
      }
    }
    ctx.restore();
    for (var d = 0; d < this._despues.length; d++) this._despues[d].call(this);     // dibujo fuera del recorte
    if (op.ejes !== false) this._dibujarEjes();
    if (op.titulo) this.textoPx(r.x, 15, op.titulo, { tam: 13, negrita: true, color: 'texto' });
    if (this._leyenda.length && op.leyenda !== false) this._dibujarLeyenda(this._leyenda, op.leyenda);
    ctx.setLineDash([]);
  };

  P._cuadricula = function () {
    var ctx = this.ctx, r = this.rect, i, v, p;
    ctx.save();
    ctx.lineWidth = 1;
    var tx = this._ticksX, ty = this._ticksY;
    ctx.strokeStyle = this.col.grid;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    for (i = 0; i < tx.menores.length; i++) { p = Math.round(this.px(tx.menores[i])) + 0.5; ctx.moveTo(p, r.y); ctx.lineTo(p, r.y + r.h); }
    for (i = 0; i < ty.menores.length; i++) { p = Math.round(this.py(ty.menores[i])) + 0.5; ctx.moveTo(r.x, p); ctx.lineTo(r.x + r.w, p); }
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    for (i = 0; i < tx.mayores.length; i++) { p = Math.round(this.px(tx.mayores[i])) + 0.5; ctx.moveTo(p, r.y); ctx.lineTo(p, r.y + r.h); }
    for (i = 0; i < ty.mayores.length; i++) { p = Math.round(this.py(ty.mayores[i])) + 0.5; ctx.moveTo(r.x, p); ctx.lineTo(r.x + r.w, p); }
    ctx.stroke();
    ctx.restore();
  };

  P._dibujarEjes = function () {
    var ctx = this.ctx, r = this.rect, op = this.op, col = this.col, i, p;
    var tx = this._ticksX, ty = this._ticksY;
    ctx.save();
    // líneas de cero
    if (op.lineaCero) {
      ctx.strokeStyle = col.eje; ctx.globalAlpha = 0.45; ctx.lineWidth = 1; ctx.beginPath();
      if (op.yescala !== 'log' && this.y0 < 0 && this.y1 > 0) { p = Math.round(this.py(0)) + 0.5; ctx.moveTo(r.x, p); ctx.lineTo(r.x + r.w, p); }
      if (op.xescala !== 'log' && this.x0 < 0 && this.x1 > 0) { p = Math.round(this.px(0)) + 0.5; ctx.moveTo(p, r.y); ctx.lineTo(p, r.y + r.h); }
      ctx.stroke(); ctx.globalAlpha = 1;
    }
    // marco y marcas
    ctx.strokeStyle = col.eje; ctx.lineWidth = 1;
    ctx.strokeRect(Math.round(r.x) + 0.5, Math.round(r.y) + 0.5, Math.round(r.w), Math.round(r.h));
    ctx.beginPath();
    for (i = 0; i < tx.mayores.length; i++) { p = Math.round(this.px(tx.mayores[i])) + 0.5; ctx.moveTo(p, r.y + r.h); ctx.lineTo(p, r.y + r.h + 4); }
    for (i = 0; i < ty.mayores.length; i++) { p = Math.round(this.py(ty.mayores[i])) + 0.5; ctx.moveTo(r.x, p); ctx.lineTo(r.x - 4, p); }
    ctx.stroke();
    // etiquetas de marcas
    ctx.fillStyle = col.tenue; ctx.font = this.fuente(11);
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (i = 0; i < tx.mayores.length; i++) ctx.fillText(tx.etiquetas[i], this.px(tx.mayores[i]), r.y + r.h + 7);
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    for (i = 0; i < ty.mayores.length; i++) ctx.fillText(ty.etiquetas[i], r.x - 7, this.py(ty.mayores[i]));
    // títulos de ejes
    ctx.fillStyle = col.texto; ctx.font = this.fuente(12);
    ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    var xl = etiquetaConMultiplicador(op.xetiqueta, tx.me), yl = etiquetaConMultiplicador(op.yetiqueta, ty.me);
    if (xl) ctx.fillText(xl, r.x + r.w / 2, this.H - 7);
    if (yl) {
      ctx.save();
      ctx.translate(14, r.y + r.h / 2); ctx.rotate(-PI / 2);
      ctx.fillText(yl, 0, 0);
      ctx.restore();
    }
    ctx.restore();
  };

  /* ---- leyenda ---- */

  P._dibujarLeyenda = function (items, pos) {
    var ctx = this.ctx, r = this.rect, col = this.col, i, w = 0, fila = 18, pad = 7, mu = 28;
    pos = pos || 'ne';
    ctx.save();
    ctx.font = this.fuente(12);
    for (i = 0; i < items.length; i++) w = Math.max(w, ctx.measureText(items[i].etiqueta).width);
    var bw = w + mu + pad * 2 + 6, bh = items.length * fila + pad * 2 - 4;
    var x = (pos.charAt(1) === 'w') ? r.x + 8 : r.x + r.w - bw - 8;
    var y = (pos.charAt(0) === 's') ? r.y + r.h - bh - 8 : r.y + 8;
    ctx.globalAlpha = 0.88; ctx.fillStyle = col.fondo; this._rectRedondeado(x, y, bw, bh, 5); ctx.fill();
    ctx.globalAlpha = 1; ctx.strokeStyle = col.grid; ctx.lineWidth = 1; this._rectRedondeado(x, y, bw, bh, 5); ctx.stroke();
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    for (i = 0; i < items.length; i++) {
      var it = items[i], yy = y + pad + i * fila + 6, c = this.color(it.color, ESTILO_COLOR[it.estilo] || 'acento');
      ctx.strokeStyle = c; ctx.fillStyle = c;
      if (it.tipo === 'caja') {
        ctx.globalAlpha = it.alfa !== undefined ? Math.max(0.35, it.alfa) : 0.5;
        ctx.fillRect(x + pad, yy - 5, mu - 6, 10); ctx.globalAlpha = 1;
      } else if (it.tipo === 'punto') {
        ctx.beginPath(); ctx.arc(x + pad + (mu - 6) / 2, yy, 3.5, 0, 2 * PI); ctx.fill();
      } else {
        ctx.lineWidth = it.ancho || 2; ctx.setLineDash(dashDe(it.estilo, it.ancho || 2)); ctx.lineCap = it.estilo === 'punteado' ? 'round' : 'butt';
        ctx.beginPath(); ctx.moveTo(x + pad, yy); ctx.lineTo(x + pad + mu - 6, yy); ctx.stroke(); ctx.setLineDash([]);
      }
      ctx.fillStyle = col.texto;
      ctx.fillText(it.etiqueta, x + pad + mu, yy);
    }
    ctx.restore();
  };

  P._rectRedondeado = function (x, y, w, h, r) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  /**
   * Leyenda manual: g.leyenda([{etiqueta, estilo, color, tipo}], 'nw'). Normalmente no
   * hace falta: basta pasar `etiqueta` a curva(), relleno(), puntos(), etc.
   */
  P.leyenda = function (items, pos) {
    this._dibujarLeyenda(items, pos || this.op.leyenda || 'ne');
    return this;
  };

  function dashDe(estilo, ancho) {
    if (estilo === 'discontinuo') return [7, 5];
    if (estilo === 'punteado') return [0.1, ancho * 2.4 + 2];
    return [];
  }

  P._registrarLeyenda = function (o, defecto) {
    if (!o || !o.etiqueta) return;
    this._leyenda.push({
      etiqueta: o.etiqueta, estilo: o.estilo || defecto.estilo, color: o.color || defecto.color,
      ancho: o.ancho || defecto.ancho, tipo: defecto.tipo || 'linea', alfa: o.alfa
    });
  };

  /* ---- primitivas de datos ---- */

  var LIM = 5e4;     // recorte de píxeles para evitar números absurdos en el trazo

  /**
   * Curva y(x). Estilos: 'solido' (cuántico, acento), 'discontinuo' (clásico, gris),
   * 'punteado' (aproximaciones). Opciones: {estilo, color, ancho, etiqueta, saturar,
   * dash:[...], alfa}. NaN/±Infinity cortan el trazo (con saturar:true, ±Infinity se
   * recorta al borde en vez de cortar).
   */
  P.curva = function (x, y, o) {
    o = o || {};
    var estilo = o.estilo || 'solido', ctx = this.ctx;
    var ancho = o.ancho || (estilo === 'solido' ? 2.2 : 1.8);
    var color = this.color(o.color, ESTILO_COLOR[estilo] || 'acento');
    ctx.save();
    ctx.lineWidth = ancho; ctx.strokeStyle = color; ctx.lineJoin = 'round';
    ctx.lineCap = estilo === 'punteado' ? 'round' : 'butt';
    ctx.setLineDash(o.dash || dashDe(estilo, ancho));
    if (o.alfa !== undefined) ctx.globalAlpha = o.alfa;
    ctx.beginPath();
    var abierto = false, n = Math.min(x.length, y.length);
    for (var i = 0; i < n; i++) {
      var X = this.px(x[i]), Y = this.py(y[i]);
      if (o.saturar && (y[i] === Infinity || y[i] === -Infinity)) Y = y[i] > 0 ? -LIM : LIM;
      if (!isFinite(X) || !isFinite(Y)) { abierto = false; continue; }
      if (Y > LIM) Y = LIM; else if (Y < -LIM) Y = -LIM;
      if (X > LIM) X = LIM; else if (X < -LIM) X = -LIM;
      if (!abierto) { ctx.moveTo(X, Y); abierto = true; } else ctx.lineTo(X, Y);
    }
    ctx.stroke();
    ctx.restore();
    this._registrarLeyenda(o, { estilo: estilo, color: o.color, ancho: ancho });
    return this;
  };

  /** Curva de una función f(x) muestreada en n puntos (400 por defecto) entre a y b (por defecto, la ventana). */
  P.curvaF = function (f, a, b, n, o) {
    if (a === undefined || a === null) a = this.x0;
    if (b === undefined || b === null) b = this.x1;
    n = n || 400;
    var xs = new Array(n), ys = new Array(n), log = this.op.xescala === 'log';
    for (var i = 0; i < n; i++) {
      var t = i / (n - 1);
      xs[i] = log ? a * Math.pow(b / a, t) : a + (b - a) * t;
      ys[i] = f(xs[i]);
    }
    return this.curva(xs, ys, o);
  };

  /** Curva en coordenadas polares (θ en rad; con o.grados:true en grados) → x = r cosθ, y = r senθ. */
  P.curvaPolar = function (theta, r, o) {
    var xs = new Array(theta.length), ys = new Array(theta.length), k = (o && o.grados) ? PI / 180 : 1;
    for (var i = 0; i < theta.length; i++) { xs[i] = r[i] * Math.cos(theta[i] * k); ys[i] = r[i] * Math.sin(theta[i] * k); }
    return this.curva(xs, ys, o);
  };

  /**
   * Relleno entre la curva y la base (o.base, por defecto 0 / el borde inferior en log).
   * Opciones: {color, alfa (0.18), base, etiqueta}. Corta en NaN.
   */
  P.relleno = function (x, y, o) {
    o = o || {};
    var base = (o.base !== undefined) ? o.base : (this.op.yescala === 'log' ? this.y0 : 0);
    var yb = new Array(x.length);
    for (var i = 0; i < x.length; i++) yb[i] = base;
    return this.rellenoEntre(x, y, yb, o);
  };

  /**
   * Relleno entre dos curvas y1(x) e y2(x). Opciones: {color, alfa, donde(i) → boolean
   * (sólo rellena donde sea cierto; para sombrear E<V), etiqueta, contorno}.
   */
  P.rellenoEntre = function (x, y1, y2, o) {
    o = o || {};
    var ctx = this.ctx, n = Math.min(x.length, y1.length, y2.length), i, j;
    ctx.save();
    ctx.fillStyle = this.color(o.color, 'acento');
    ctx.globalAlpha = o.alfa !== undefined ? o.alfa : 0.18;
    var ini = -1;
    function ok(g, k) {
      var X = g.px(x[k]), A = g.py(y1[k]), B = g.py(y2[k]);
      return isFinite(X) && isFinite(A) && isFinite(B) && (!o.donde || o.donde(k));
    }
    for (i = 0; i <= n; i++) {
      var bueno = (i < n) && ok(this, i);
      if (bueno && ini < 0) ini = i;
      if ((!bueno || i === n) && ini >= 0) {
        var fin = i - 1;
        ctx.beginPath();
        for (j = ini; j <= fin; j++) ctx.lineTo(this.px(x[j]), clampPx(this.py(y1[j])));
        for (j = fin; j >= ini; j--) ctx.lineTo(this.px(x[j]), clampPx(this.py(y2[j])));
        ctx.closePath(); ctx.fill();
        ini = -1;
      }
    }
    ctx.restore();
    this._registrarLeyenda(o, { estilo: 'solido', color: o.color || 'acento', tipo: 'caja' });
    return this;
  };

  function clampPx(v) { return v > LIM ? LIM : (v < -LIM ? -LIM : v); }

  /** Sombrea una franja vertical x0<x<x1 (p. ej. zona clásicamente prohibida). {color:'prohibido', alfa, etiqueta, texto}. */
  P.regionV = function (x0, x1, o) {
    o = o || {};
    var r = this.rect, ctx = this.ctx;
    var a = isFinite(this.px(x0)) ? this.px(x0) : r.x, b = isFinite(this.px(x1)) ? this.px(x1) : r.x + r.w;
    if (x0 === -Infinity) a = r.x; if (x1 === Infinity) b = r.x + r.w;
    ctx.save();
    ctx.fillStyle = this.color(o.color, 'prohibido');
    if (o.alfa !== undefined) ctx.globalAlpha = o.alfa;
    ctx.fillRect(Math.min(a, b), r.y, Math.abs(b - a), r.h);
    ctx.restore();
    if (o.texto) this.textoPx((a + b) / 2, r.y + 14 + (o.fila || 0) * 15, o.texto, { align: 'center', color: 'tenue', tam: 11 });
    this._registrarLeyenda(o, { estilo: 'solido', color: o.color || 'prohibido', tipo: 'caja' });
    return this;
  };

  /** Sombrea una franja horizontal y0<y<y1. */
  P.regionH = function (y0, y1, o) {
    o = o || {};
    var r = this.rect, ctx = this.ctx;
    var a = isFinite(this.py(y0)) ? this.py(y0) : r.y + r.h, b = isFinite(this.py(y1)) ? this.py(y1) : r.y;
    ctx.save();
    ctx.fillStyle = this.color(o.color, 'prohibido');
    if (o.alfa !== undefined) ctx.globalAlpha = o.alfa;
    ctx.fillRect(r.x, Math.min(a, b), r.w, Math.abs(b - a));
    ctx.restore();
    if (o.texto) this.textoPx(r.x + 8, (a + b) / 2, o.texto, { color: 'tenue', tam: 11 });
    this._registrarLeyenda(o, { estilo: 'solido', color: o.color || 'prohibido', tipo: 'caja' });
    return this;
  };

  /** Recta vertical en x con etiqueta. {estilo:'discontinuo', color, fila (0,1,..: apila etiquetas), lado:'izq'|'der'}. */
  P.marcadorV = function (x, etiqueta, o) {
    o = o || {};
    var X = this.px(x), r = this.rect;
    if (!isFinite(X) || X < r.x - 1 || X > r.x + r.w + 1) return this;
    var ctx = this.ctx, estilo = o.estilo || 'discontinuo';
    ctx.save();
    ctx.strokeStyle = this.color(o.color, estilo === 'solido' ? 'acento' : 'tenue');
    ctx.lineWidth = o.ancho || 1.4; ctx.setLineDash(dashDe(estilo, ctx.lineWidth)); ctx.lineCap = estilo === 'punteado' ? 'round' : 'butt';
    ctx.beginPath(); ctx.moveTo(X, r.y); ctx.lineTo(X, r.y + r.h); ctx.stroke();
    ctx.restore();
    if (etiqueta) {
      var izq = (o.lado === 'izq') || (o.lado !== 'der' && X > r.x + r.w * 0.62);
      this.textoPx(X + (izq ? -6 : 6), r.y + 14 + (o.fila || 0) * 16, etiqueta,
        { align: izq ? 'right' : 'left', color: o.colorTexto || o.color || 'texto', tam: 12, fondo: true });
    }
    return this;
  };

  /** Recta horizontal en y con etiqueta. {estilo, color, lado:'arriba'|'abajo', alinear:'izq'|'centro'|'der'}. */
  P.marcadorH = function (y, etiqueta, o) {
    o = o || {};
    var Y = this.py(y), r = this.rect;
    if (!isFinite(Y) || Y < r.y - 1 || Y > r.y + r.h + 1) return this;
    var ctx = this.ctx, estilo = o.estilo || 'discontinuo';
    ctx.save();
    ctx.strokeStyle = this.color(o.color, estilo === 'solido' ? 'acento' : 'tenue');
    ctx.lineWidth = o.ancho || 1.4; ctx.setLineDash(dashDe(estilo, ctx.lineWidth)); ctx.lineCap = estilo === 'punteado' ? 'round' : 'butt';
    ctx.beginPath(); ctx.moveTo(r.x, Y); ctx.lineTo(r.x + r.w, Y); ctx.stroke();
    ctx.restore();
    if (etiqueta) {
      var abajo = (o.lado === 'abajo') || (o.lado !== 'arriba' && Y < r.y + 22);
      var al = o.alinear || 'der';      // 'izq' | 'centro' | 'der'
      this.textoPx(al === 'izq' ? r.x + 6 : (al === 'centro' ? r.x + r.w / 2 : r.x + r.w - 6), Y + (abajo ? 13 : -6), etiqueta,
        { align: al === 'izq' ? 'left' : (al === 'centro' ? 'center' : 'right'), color: o.colorTexto || o.color || 'texto', tam: 12, fondo: true });
    }
    return this;
  };

  /** Punto (marcador circular) en (x, y) con etiqueta opcional. {radio, color, relleno:true, dx, dy, align}. */
  P.punto = function (x, y, o) {
    o = o || {};
    var X = this.px(x), Y = this.py(y);
    if (!isFinite(X) || !isFinite(Y)) return this;
    var ctx = this.ctx, c = this.color(o.color, 'acento'), rad = o.radio || 4.5;
    ctx.save();
    ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(X, Y, rad, 0, 2 * PI);
    if (o.relleno === false) { ctx.fillStyle = this.col.fondo; ctx.fill(); ctx.stroke(); } else ctx.fill();
    ctx.restore();
    if (o.etiqueta) {
      this.textoPx(X + (o.dx !== undefined ? o.dx : 8), Y + (o.dy !== undefined ? o.dy : -8), o.etiqueta,
        { align: o.align || 'left', color: o.colorTexto || 'texto', tam: 12, fondo: true });
    }
    if (o.leyenda) this._registrarLeyenda({ etiqueta: o.leyenda, color: o.color }, { estilo: 'solido', color: o.color || 'acento', tipo: 'punto' });
    return this;
  };

  /** Muchos puntos pequeños (impactos, dispersión). {radio (1.5), color, alfa, etiqueta}. */
  P.puntos = function (x, y, o) {
    o = o || {};
    var ctx = this.ctx, rad = o.radio || 1.5, n = Math.min(x.length, y.length);
    ctx.save();
    ctx.fillStyle = this.color(o.color, 'acento');
    if (o.alfa !== undefined) ctx.globalAlpha = o.alfa;
    for (var i = 0; i < n; i++) {
      var X = this.px(x[i]), Y = this.py(y[i]);
      if (!isFinite(X) || !isFinite(Y)) continue;
      if (rad <= 1.6) ctx.fillRect(X - rad, Y - rad, 2 * rad, 2 * rad);
      else { ctx.beginPath(); ctx.arc(X, Y, rad, 0, 2 * PI); ctx.fill(); }
    }
    ctx.restore();
    this._registrarLeyenda(o, { estilo: 'solido', color: o.color || 'acento', tipo: 'punto' });
    return this;
  };

  /** Segmento entre dos puntos de datos. {estilo, color, ancho}. */
  P.linea = function (x0, y0, x1, y1, o) {
    o = o || {};
    var X0 = this.px(x0), Y0 = this.py(y0), X1 = this.px(x1), Y1 = this.py(y1);
    if (![X0, Y0, X1, Y1].every(isFinite)) return this;
    return this.lineaPx(X0, Y0, X1, Y1, o);
  };

  P.lineaPx = function (X0, Y0, X1, Y1, o) {
    o = o || {};
    var ctx = this.ctx, estilo = o.estilo || 'solido', ancho = o.ancho || 1.8;
    ctx.save();
    ctx.strokeStyle = this.color(o.color, ESTILO_COLOR[estilo] || 'acento'); ctx.lineWidth = ancho;
    ctx.setLineDash(o.dash || dashDe(estilo, ancho)); ctx.lineCap = estilo === 'punteado' ? 'round' : 'butt';
    ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X1, Y1); ctx.stroke();
    ctx.restore();
    this._registrarLeyenda(o, { estilo: estilo, color: o.color, ancho: ancho });
    return this;
  };

  /** Flecha de (x0,y0) a (x1,y1) en datos. {color, ancho, cabeza (px, 9), etiqueta (texto en la punta), estilo}. */
  P.flecha = function (x0, y0, x1, y1, o) {
    var X0 = this.px(x0), Y0 = this.py(y0), X1 = this.px(x1), Y1 = this.py(y1);
    if (![X0, Y0, X1, Y1].every(isFinite)) return this;
    return this.flechaPx(X0, Y0, X1, Y1, o);
  };

  P.flechaPx = function (X0, Y0, X1, Y1, o) {
    o = o || {};
    var ctx = this.ctx, c = this.color(o.color, 'texto'), ancho = o.ancho || 2, cab = o.cabeza || 9;
    var ang = Math.atan2(Y1 - Y0, X1 - X0), L = Math.hypot(X1 - X0, Y1 - Y0);
    if (L < 1) return this;
    var c2 = Math.min(cab, L * 0.6);
    ctx.save();
    ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = ancho; ctx.lineCap = 'round';
    ctx.setLineDash(o.dash || dashDe(o.estilo, ancho));
    ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X1 - Math.cos(ang) * c2 * 0.7, Y1 - Math.sin(ang) * c2 * 0.7); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(X1, Y1);
    ctx.lineTo(X1 - c2 * Math.cos(ang - 0.38), Y1 - c2 * Math.sin(ang - 0.38));
    ctx.lineTo(X1 - c2 * Math.cos(ang + 0.38), Y1 - c2 * Math.sin(ang + 0.38));
    ctx.closePath(); ctx.fill();
    ctx.restore();
    if (o.etiqueta) this.textoPx(X1 + (o.dx !== undefined ? o.dx : 6), Y1 + (o.dy !== undefined ? o.dy : -6), o.etiqueta,
      { color: o.colorTexto || o.color || 'texto', tam: 12, align: o.align || 'left', fondo: o.fondo });
    return this;
  };

  /** Rectángulo en datos. {relleno (color), alfa, borde (color), ancho, etiqueta}. */
  P.rectangulo = function (x0, y0, x1, y1, o) {
    o = o || {};
    var A = this.px(x0), B = this.py(y0), C = this.px(x1), D = this.py(y1);
    if (![A, B, C, D].every(isFinite)) return this;
    var ctx = this.ctx;
    ctx.save();
    if (o.relleno) { ctx.globalAlpha = o.alfa !== undefined ? o.alfa : 0.25; ctx.fillStyle = this.color(o.relleno); ctx.fillRect(Math.min(A, C), Math.min(B, D), Math.abs(C - A), Math.abs(D - B)); ctx.globalAlpha = 1; }
    if (o.borde) { ctx.strokeStyle = this.color(o.borde); ctx.lineWidth = o.ancho || 1.5; ctx.setLineDash(o.dash || dashDe(o.estilo, 1.5)); ctx.strokeRect(Math.min(A, C), Math.min(B, D), Math.abs(C - A), Math.abs(D - B)); }
    ctx.restore();
    return this;
  };

  /** Polígono (xs, ys en datos). {relleno, alfa, borde, ancho, cerrar:true, estilo}. */
  P.poligono = function (xs, ys, o) {
    o = o || {};
    var ctx = this.ctx, n = Math.min(xs.length, ys.length), i, ok = true;
    ctx.save();
    ctx.beginPath();
    for (i = 0; i < n; i++) {
      var X = this.px(xs[i]), Y = this.py(ys[i]);
      if (!isFinite(X) || !isFinite(Y)) { ok = false; break; }
      if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
    }
    if (ok) {
      if (o.cerrar !== false) ctx.closePath();
      if (o.relleno) { ctx.globalAlpha = o.alfa !== undefined ? o.alfa : 0.25; ctx.fillStyle = this.color(o.relleno); ctx.fill(); ctx.globalAlpha = 1; }
      if (o.borde !== false) {
        ctx.strokeStyle = this.color(o.borde, o.relleno ? o.relleno : 'texto'); ctx.lineWidth = o.ancho || 1.8;
        ctx.setLineDash(o.dash || dashDe(o.estilo, 1.8)); ctx.stroke();
      }
    }
    ctx.restore();
    return this;
  };

  /** Círculo de radio r (unidades de x) centrado en (cx, cy). Con igual:true es un círculo real. {relleno, alfa, borde, ancho, estilo}. */
  P.circulo = function (cx, cy, r, o) {
    var X = this.px(cx), Y = this.py(cy);
    var rx = Math.abs(this.px(cx + r) - X);
    if (!isFinite(X) || !isFinite(Y) || !isFinite(rx)) return this;
    return this.circuloPx(X, Y, rx, o);
  };

  P.circuloPx = function (X, Y, rpx, o) {
    o = o || {};
    var ctx = this.ctx;
    ctx.save();
    ctx.beginPath(); ctx.arc(X, Y, Math.max(0, rpx), 0, 2 * PI);
    if (o.relleno) { ctx.globalAlpha = o.alfa !== undefined ? o.alfa : 0.25; ctx.fillStyle = this.color(o.relleno); ctx.fill(); ctx.globalAlpha = 1; }
    if (o.borde !== false) {
      ctx.strokeStyle = this.color(o.borde, o.relleno ? o.relleno : 'texto'); ctx.lineWidth = o.ancho || 1.6;
      ctx.setLineDash(o.dash || dashDe(o.estilo, 1.6)); ctx.stroke();
    }
    ctx.restore();
    return this;
  };

  /** Arco de radio r (unidades de x) de a0 a a1 (rad; grados con o.grados). */
  P.arco = function (cx, cy, r, a0, a1, o) {
    o = o || {};
    var X = this.px(cx), Y = this.py(cy), rx = Math.abs(this.px(cx + r) - X), k = o.grados ? PI / 180 : 1;
    if (![X, Y, rx].every(isFinite)) return this;
    var ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = this.color(o.color, 'texto'); ctx.lineWidth = o.ancho || 1.6; ctx.setLineDash(o.dash || dashDe(o.estilo, 1.6));
    ctx.beginPath(); ctx.arc(X, Y, rx, -a0 * k, -a1 * k, a1 > a0); ctx.stroke();
    ctx.restore();
    return this;
  };

  /** Rejilla polar (círculos y radios) para diagramas polares. {radios:[...], nRadios, angulosCada (30°), etiquetas:true, unidad}. Usar con igual:true y ejes:false. */
  P.rejillaPolar = function (rmax, o) {
    o = o || {};
    var ctx = this.ctx, i, nr = o.nRadios || 4, radios = o.radios;
    if (!radios) { radios = []; for (i = 1; i <= nr; i++) radios.push(rmax * i / nr); }
    var cada = (o.angulosCada || 30) * PI / 180, X0 = this.px(0), Y0 = this.py(0);
    ctx.save();
    ctx.strokeStyle = this.col.grid; ctx.lineWidth = 1;
    for (i = 0; i < radios.length; i++) { ctx.beginPath(); ctx.arc(X0, Y0, Math.abs(this.px(radios[i]) - X0), 0, 2 * PI); ctx.stroke(); }
    for (var a = 0; a < 2 * PI - 1e-9; a += cada) {
      ctx.beginPath(); ctx.moveTo(X0, Y0);
      ctx.lineTo(this.px(rmax * Math.cos(a)), this.py(rmax * Math.sin(a))); ctx.stroke();
    }
    ctx.restore();
    if (o.etiquetas !== false) {
      for (i = 0; i < radios.length; i++) {
        var txt = (window.Num ? Num.formatoNum(radios[i], 3) : String(radios[i])) + (o.unidad ? ' ' + o.unidad : '');
        this.textoPx(X0 + 3, this.py(radios[i]) - 3, txt, { color: 'tenue', tam: 10 });
      }
      for (var b = 0; b < 360; b += (o.angulosCada || 30)) {
        var rr = rmax * 1.08;
        this.textoPx(this.px(rr * Math.cos(b * PI / 180)), this.py(rr * Math.sin(b * PI / 180)), b + '°',
          { color: 'tenue', tam: 10, align: 'center', base: 'middle' });
      }
    }
    return this;
  };

  /**
   * Barras verticales centradas en x[i] con altura y[i] desde o.base (0).
   * {ancho (datos; por defecto 0.9·separación), color, colores(i) → color, alfa, borde, etiqueta}.
   */
  P.barras = function (x, y, o) {
    o = o || {};
    var ctx = this.ctx, n = Math.min(x.length, y.length), i;
    var ancho = o.ancho;
    if (ancho === undefined) {
      ancho = n > 1 ? Math.abs(x[1] - x[0]) * 0.9 : 1;
      if (this.op.xescala === 'log') ancho = undefined;
    }
    var base = o.base !== undefined ? o.base : (this.op.yescala === 'log' ? this.y0 : 0);
    var yb = this.py(base);
    ctx.save();
    ctx.globalAlpha = o.alfa !== undefined ? o.alfa : 0.85;
    for (i = 0; i < n; i++) {
      var Yt = this.py(y[i]);
      if (!isFinite(Yt) || !isFinite(yb)) continue;
      var xa, xb;
      if (ancho === undefined) { xa = this.px(x[i] / 1.15); xb = this.px(x[i] * 1.15); }
      else { xa = this.px(x[i] - ancho / 2); xb = this.px(x[i] + ancho / 2); }
      if (!isFinite(xa) || !isFinite(xb)) continue;
      ctx.fillStyle = this.color(o.colores ? o.colores(i) : o.color, 'acento');
      var yy = clampPx(Yt);
      ctx.fillRect(Math.min(xa, xb), Math.min(yy, yb), Math.max(1, Math.abs(xb - xa)), Math.abs(yb - yy));
    }
    ctx.restore();
    this._registrarLeyenda(o, { estilo: 'solido', color: o.color || 'acento', tipo: 'caja' });
    return this;
  };

  /**
   * Histograma. h = resultado de Num.histograma/acumulador.resultado() (campos a, dx,
   * cuentas, densidad). o.que = 'densidad' (defecto) | 'cuentas'; o.escala multiplica
   * las alturas (p. ej. N·dx para comparar con una curva teórica en "cuentas").
   */
  P.histograma = function (h, o) {
    o = o || {};
    var que = o.que || 'densidad', v = h[que] || h.cuentas, k = o.escala || 1, xs = [], ys = [];
    for (var i = 0; i < v.length; i++) { xs.push(h.a + (i + 0.5) * h.dx); ys.push(v[i] * k); }
    return this.barras(xs, ys, { ancho: h.dx * 0.96, color: o.color || 'acento', alfa: o.alfa !== undefined ? o.alfa : 0.55, etiqueta: o.etiqueta });
  };

  /**
   * Mapa de calor de la matriz Z (Z[fila][columna]). Opciones: {x0,x1,y0,y1 (extensión en
   * datos; por defecto 0..ncol, 0..nfil), vmin, vmax, paleta: 'divergente'|'secuencial'|'gris'|fn(t→css),
   * origenArriba (true: fila 0 arriba, como una matriz), valores (rotula cada celda), dec (decimales),
   * resaltar: [[fila, col], ...], barra (colorbar en el margen derecho; dar margen.der ≥ 64)}.
   */
  P.mapaCalor = function (Z, o) {
    o = o || {};
    var nf = Z.length, nc = Z[0].length, i, j, v;
    var x0 = o.x0 !== undefined ? o.x0 : 0, x1 = o.x1 !== undefined ? o.x1 : nc;
    var y0 = o.y0 !== undefined ? o.y0 : 0, y1 = o.y1 !== undefined ? o.y1 : nf;
    var vmin = o.vmin, vmax = o.vmax;
    if (vmin === undefined || vmax === undefined) {
      var mn = Infinity, mx = -Infinity;
      for (i = 0; i < nf; i++) for (j = 0; j < nc; j++) { v = Z[i][j]; if (esNum(v)) { if (v < mn) mn = v; if (v > mx) mx = v; } }
      if (vmin === undefined) vmin = mn; if (vmax === undefined) vmax = mx;
    }
    if (o.paleta === 'divergente' && o.vmin === undefined && o.vmax === undefined) { var m = Math.max(Math.abs(vmin), Math.abs(vmax)); vmin = -m; vmax = m; }
    if (!(vmax > vmin)) vmax = vmin + 1;
    var arriba = o.origenArriba !== false, ctx = this.ctx, self = this;
    var paleta = (typeof o.paleta === 'function') ? o.paleta : Graf.paleta(o.paleta || 'secuencial', this.col);
    var dx = (x1 - x0) / nc, dy = (y1 - y0) / nf;
    ctx.save();
    for (i = 0; i < nf; i++) {
      var ya = arriba ? (y1 - i * dy) : (y0 + i * dy), yb = arriba ? (y1 - (i + 1) * dy) : (y0 + (i + 1) * dy);
      for (j = 0; j < nc; j++) {
        v = Z[i][j];
        if (!esNum(v)) continue;
        var xa = x0 + j * dx, xb = x0 + (j + 1) * dx;
        var A = this.px(xa), B = this.py(ya), C = this.px(xb), D = this.py(yb);
        ctx.fillStyle = paleta(Math.max(0, Math.min(1, (v - vmin) / (vmax - vmin))));
        ctx.fillRect(Math.min(A, C), Math.min(B, D), Math.abs(C - A) + 0.6, Math.abs(D - B) + 0.6);
        if (o.valores) {
          var tc = (parseColor(ctx.fillStyle) ? luminancia(parseColor(ctx.fillStyle)) : 0.5) > 0.55 ? '#111' : '#fff';
          ctx.fillStyle = tc; ctx.font = this.fuente(Math.min(12, Math.abs(C - A) / 3.2));
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(Math.abs(v) < 0.5 * Math.pow(10, -(o.dec !== undefined ? o.dec : 1)) ? '0' : v.toFixed(o.dec !== undefined ? o.dec : 1).replace('.', ','), (A + C) / 2, (B + D) / 2);
        }
      }
    }
    if (o.resaltar) {
      ctx.strokeStyle = this.color('negativo'); ctx.lineWidth = 2.5;
      o.resaltar.forEach(function (c) {
        var fi = c[0], cj = c[1];
        var ya2 = arriba ? (y1 - fi * dy) : (y0 + fi * dy), yb2 = arriba ? (y1 - (fi + 1) * dy) : (y0 + (fi + 1) * dy);
        var A2 = self.px(x0 + cj * dx), C2 = self.px(x0 + (cj + 1) * dx), B2 = self.py(ya2), D2 = self.py(yb2);
        ctx.strokeRect(Math.min(A2, C2) + 1, Math.min(B2, D2) + 1, Math.abs(C2 - A2) - 2, Math.abs(D2 - B2) - 2);
      });
    }
    ctx.restore();
    if (o.barra) this.despues(function () { this._barraColor(paleta, vmin, vmax); });
    return this;
  };

  P._barraColor = function (paleta, vmin, vmax) {
    var ctx = this.ctx, r = this.rect, x = r.x + r.w + 12, w = 12, n = 60;
    ctx.save();
    for (var i = 0; i < n; i++) {
      ctx.fillStyle = paleta(1 - i / (n - 1));
      ctx.fillRect(x, r.y + i * r.h / n, w, r.h / n + 1);
    }
    ctx.strokeStyle = this.col.eje; ctx.strokeRect(x + 0.5, r.y + 0.5, w, r.h);
    ctx.restore();
    var f = function (v) { return (window.Num ? Num.formatoNum(v, 2) : String(v)).replace('.', ','); };
    this.textoPx(x + w + 4, r.y + 6, f(vmax), { tam: 10, color: 'tenue', dentro: false });
    this.textoPx(x + w + 4, r.y + r.h, f(vmin), { tam: 10, color: 'tenue', dentro: false });
  };

  /* ---- texto ---- */

  /**
   * Texto en coordenadas de DATOS. {color, tam (12), negrita, align, base, fondo (caja detrás),
   * angulo (rad), dx, dy (desplazamiento en px), dentro (true: se encoge/desplaza para no salirse
   * del área de la gráfica; false lo desactiva)}. Acepta saltos de línea \n.
   */
  P.texto = function (x, y, txt, o) {
    var X = this.px(x), Y = this.py(y);
    if (!isFinite(X) || !isFinite(Y)) return this;
    o = o || {};
    return this.textoPx(X + (o.dx || 0), Y + (o.dy || 0), txt, o);
  };

  /** Texto en coordenadas de PÍXEL del lienzo (origen arriba-izquierda del canvas). */
  P.textoPx = function (X, Y, txt, o) {
    o = o || {};
    var ctx = this.ctx, tam = o.tam || 12, lineas = String(txt).split('\n'), i, w = 0;
    ctx.save();
    ctx.font = this.fuente(tam, o.negrita);
    for (i = 0; i < lineas.length; i++) w = Math.max(w, ctx.measureText(lineas[i]).width);
    var al = o.align || 'left';
    if (o.dentro !== false && !o.angulo) {
      // mantener el texto dentro del área de la gráfica (o del lienzo en modo libre): encoger y desplazar
      var lim = (this.op.ejes !== false) ? { a: this.rect.x + 2, b: this.rect.x + this.rect.w - 2 } : { a: 2, b: this.W - 2 };
      var disp = lim.b - lim.a;
      while (w > disp && tam > 9) { tam -= 0.5; ctx.font = this.fuente(tam, o.negrita); w = 0; for (i = 0; i < lineas.length; i++) w = Math.max(w, ctx.measureText(lineas[i]).width); }
      var x0 = (al === 'center') ? X - w / 2 : (al === 'right' ? X - w : X);
      if (x0 + w > lim.b) x0 = lim.b - w;
      if (x0 < lim.a) x0 = lim.a;
      X = (al === 'center') ? x0 + w / 2 : (al === 'right' ? x0 + w : x0);
    }
    var lh = tam * 1.28;
    ctx.textAlign = al;
    ctx.textBaseline = o.base || 'alphabetic';
    if (o.angulo) { ctx.translate(X, Y); ctx.rotate(o.angulo); X = 0; Y = 0; }
    if (o.fondo) {
      var bx = (al === 'center') ? X - w / 2 : (al === 'right' ? X - w : X);
      var by = (o.base === 'middle') ? Y - lh / 2 : (o.base === 'top' ? Y : Y - tam);
      ctx.globalAlpha = 0.75; ctx.fillStyle = this.col.fondo;
      ctx.fillRect(bx - 3, by - 1, w + 6, lh * lineas.length + 2);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = this.color(o.color, 'texto');
    for (i = 0; i < lineas.length; i++) ctx.fillText(lineas[i], X, Y + i * lh);
    ctx.restore();
    return this;
  };

  /* ---- eventos de puntero ---- */

  /**
   * Interacción: fn(tipo, x, y, ev) con tipo 'bajar' | 'mover' | 'subir' | 'salir' y (x, y) en
   * coordenadas de datos. Mientras se arrastra se captura el puntero. Devuelve la gráfica.
   */
  P.alPuntero = function (fn) {
    var self = this, cv = this.canvas, arrastrando = false;
    function pos(ev) {
      var b = cv.getBoundingClientRect();
      return [self.ix(ev.clientX - b.left), self.iy(ev.clientY - b.top)];
    }
    cv.style.touchAction = 'none';
    cv.style.cursor = 'crosshair';
    cv.addEventListener('pointerdown', function (ev) {
      arrastrando = true;
      try { cv.setPointerCapture(ev.pointerId); } catch (e) { /* ignorar */ }
      var p = pos(ev); fn('bajar', p[0], p[1], ev);
    });
    cv.addEventListener('pointermove', function (ev) { var p = pos(ev); fn('mover', p[0], p[1], ev); });
    cv.addEventListener('pointerup', function (ev) { arrastrando = false; var p = pos(ev); fn('subir', p[0], p[1], ev); });
    cv.addEventListener('pointerleave', function (ev) { if (!arrastrando) { var p = pos(ev); fn('salir', p[0], p[1], ev); } });
    return this;
  };

  /* --------------------------------------------------------- paletas y API */

  /** Paleta t∈[0,1] → color CSS. Nombres: 'divergente' (azul-neutro-rojo), 'secuencial', 'gris'. */
  Graf.paleta = function (nombre, col) {
    var osc = col ? col.oscuro : false;
    if (nombre === 'divergente') {
      var neg = [33, 102, 172], neu = osc ? [38, 42, 52] : [244, 244, 246], pos = [200, 40, 60];
      return function (t) { return rgb(t < 0.5 ? lerpC(neg, neu, t * 2) : lerpC(neu, pos, (t - 0.5) * 2)); };
    }
    if (nombre === 'gris') {
      return function (t) { var g = osc ? 25 + 215 * t : 245 - 225 * t; return rgb([g, g, g]); };
    }
    var a = osc ? [24, 30, 44] : [248, 250, 253], b = osc ? [120, 180, 255] : [20, 70, 160];
    return function (t) { return rgb(lerpC(a, b, t)); };
  };

  /** Crea una gráfica en `contenedor` (elemento DOM). Ver DEFECTOS arriba para las opciones. */
  Graf.crear = function (contenedor, op) { return new Grafica(contenedor, op); };

  /**
   * Varios paneles en una rejilla responsiva. specs = [{id, cols:1|'todo', ...opciones de Graf.crear}].
   * Devuelve {id: grafica, ...} y una propiedad no enumerable `.lista` (arreglo en orden).
   */
  Graf.paneles = function (contenedor, specs, opts) {
    opts = opts || {};
    var rej = document.createElement('div');
    rej.className = 'graf-paneles';
    if (opts.minimo) rej.style.setProperty('--graf-min', opts.minimo + 'px');
    contenedor.appendChild(rej);
    var res = {}, lista = [];
    specs.forEach(function (s, i) {
      var caja = document.createElement('div');
      caja.className = 'graf-panel' + (s.cols === 'todo' ? ' graf-panel-ancho' : '');
      rej.appendChild(caja);
      var g = Graf.crear(caja, s);
      g.panelCaja = caja;
      res[s.id || ('p' + i)] = g;
      lista.push(g);
    });
    Object.defineProperty(res, 'lista', { value: lista, enumerable: false });
    Object.defineProperty(res, 'rejilla', { value: rej, enumerable: false });
    Object.defineProperty(res, 'destruir', { value: function () { lista.forEach(function (g) { g.destruir(); }); if (rej.parentNode) rej.parentNode.removeChild(rej); }, enumerable: false });
    return res;
  };

  /** Vuelve a dibujar todas las gráficas vivas (se llama al cambiar el tema claro/oscuro). */
  Graf.redibujarTodo = function () {
    for (var i = 0; i < viva.length; i++) viva[i]._render();
  };

  window.addEventListener('mc-tema', Graf.redibujarTodo);
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', Graf.redibujarTodo);
    else if (mq.addListener) mq.addListener(Graf.redibujarTodo);
  }

  window.Graf = Graf;
})();
