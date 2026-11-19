/* =============================================================================
   numerico.js — Biblioteca numérica común (window.Num)
   -----------------------------------------------------------------------------
   SIN DOM: se puede cargar en jsc (herramientas/ejecutar_pruebas_jsc.js).
   Todo lo que piden los 28 YAML del madre: Simpson (función y malla dada),
   bisección, Numerov (con reescalado), RK4 para sistemas, aritmética compleja
   (Num.Cx), PRNG con semilla (mulberry32), muestreo por CDF, FresnelC, formateo
   (SI y científico) y color de longitud de onda. Más utilidades generales
   (linspace, interp, histograma, erf, gamma, raíces, máximos...).

   Convenciones:
   - "arreglo" = Array normal o Float64Array (se indexa con [i]).
   - Ninguna función lanza excepciones por argumentos raros: devuelven NaN.
   - Nunca se usa la forma ingenua del denominador (exponencial menos uno): para eso
     están C.inv_expm1 y C.x_over_expm1.
   ============================================================================= */
(function () {
  'use strict';

  var Num = {};
  var PI = Math.PI;

  /* ---------------------------------------------------------------- utilidades */

  /** n puntos igualmente espaciados de a a b (ambos incluidos). */
  Num.linspace = function (a, b, n) {
    n = Math.floor(n);
    if (!(n >= 1)) return [];
    if (n === 1) return [a];
    var r = new Array(n), d = (b - a) / (n - 1);
    for (var i = 0; i < n; i++) r[i] = a + i * d;
    r[n - 1] = b;
    return r;
  };

  /** n puntos geométricamente espaciados entre los VALORES a y b (a, b > 0). */
  Num.logspace = function (a, b, n) {
    var la = Math.log(a), lb = Math.log(b), r = Num.linspace(la, lb, n);
    for (var i = 0; i < r.length; i++) r[i] = Math.exp(r[i]);
    if (r.length) { r[0] = a; r[r.length - 1] = b; }
    return r;
  };

  Num.limitar = function (x, a, b) { return x < a ? a : (x > b ? b : x); };
  Num.signo = function (x) { return x > 0 ? 1 : (x < 0 ? -1 : 0); };
  Num.esFinito = function (x) { return typeof x === 'number' && isFinite(x); };

  /** Aplica f a cada elemento de un arreglo y devuelve un Array nuevo. */
  Num.mapear = function (xs, f) {
    var r = new Array(xs.length);
    for (var i = 0; i < xs.length; i++) r[i] = f(xs[i], i);
    return r;
  };

  /** Interpolación lineal en tabla (xs ascendente). Fuera de rango: extremo. */
  Num.interp = function (xs, ys, x) {
    var n = xs.length;
    if (n === 0) return NaN;
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    var lo = 0, hi = n - 1;
    while (hi - lo > 1) { var m = (lo + hi) >> 1; if (xs[m] <= x) lo = m; else hi = m; }
    var d = xs[hi] - xs[lo];
    return d === 0 ? ys[lo] : ys[lo] + (ys[hi] - ys[lo]) * (x - xs[lo]) / d;
  };

  /** Derivada central de f en x con paso h (por defecto h = 1e-5·max(1,|x|)). */
  Num.derivada = function (f, x, h) {
    h = h || 1e-5 * Math.max(1, Math.abs(x));
    return (f(x + h) - f(x - h)) / (2 * h);
  };

  /** Media móvil (ventana de w puntos, centrada; en los bordes la ventana se acorta). */
  Num.promedioMovil = function (y, w) {
    var n = y.length, r = new Array(n), mitad = Math.floor(w / 2);
    for (var i = 0; i < n; i++) {
      var a = Math.max(0, i - mitad), b = Math.min(n - 1, i + mitad), s = 0;
      for (var j = a; j <= b; j++) s += y[j];
      r[i] = s / (b - a + 1);
    }
    return r;
  };

  /* ------------------------------------------------------------ integración */

  /** Simpson compuesto de f en [a, b] con n subintervalos (n se fuerza a par ≥ 2). */
  Num.simpson = function (f, a, b, n) {
    n = Math.max(2, Math.round(n || 1000));
    if (n % 2) n++;
    var h = (b - a) / n, s = f(a) + f(b);
    for (var i = 1; i < n; i++) s += ((i & 1) ? 4 : 2) * f(a + i * h);
    return s * h / 3;
  };

  /**
   * Simpson sobre MALLA DADA: y[i] = f(x0 + i·h) con paso uniforme h.
   * Si el número de subintervalos es impar usa Simpson 3/8 en los 3 últimos.
   */
  Num.simpsonMalla = function (y, h) {
    var n = y.length - 1, i, s;
    if (n < 1) return 0;
    if (n === 1) return 0.5 * h * (y[0] + y[1]);
    var nS = (n % 2 === 0) ? n : n - 3;       // subintervalos para Simpson 1/3
    s = 0;
    if (nS >= 2) {
      s = y[0] + y[nS];
      for (i = 1; i < nS; i++) s += ((i & 1) ? 4 : 2) * y[i];
      s *= h / 3;
    }
    if (nS < n) {                               // quedan 3 subintervalos: regla 3/8
      s += 3 * h / 8 * (y[nS] + 3 * y[nS + 1] + 3 * y[nS + 2] + y[nS + 3]);
    }
    return s;
  };

  /** Regla del trapecio con abscisas arbitrarias xs. */
  Num.trapz = function (xs, ys) {
    var s = 0;
    for (var i = 1; i < xs.length; i++) s += 0.5 * (xs[i] - xs[i - 1]) * (ys[i] + ys[i - 1]);
    return s;
  };

  /** Integral acumulada por trapecios sobre malla uniforme de paso h (primer valor 0). */
  Num.acumulada = function (y, h) {
    var r = new Array(y.length);
    r[0] = 0;
    for (var i = 1; i < y.length; i++) r[i] = r[i - 1] + 0.5 * h * (y[i] + y[i - 1]);
    return r;
  };

  /* ------------------------------------------------------- raíces y máximos */

  /**
   * Bisección con información. Requiere g(a)·g(b) ≤ 0.
   * Devuelve {x, ok, iter, ancho}; ok=false si no hay cambio de signo.
   * Criterio de parada: ancho del intervalo < tol (por defecto 1e-12).
   */
  Num.biseccionInfo = function (g, a, b, tol, maxIter) {
    tol = tol || 1e-12; maxIter = maxIter || 300;
    var fa = g(a), fb = g(b);
    if (fa === 0) return { x: a, ok: true, iter: 0, ancho: 0 };
    if (fb === 0) return { x: b, ok: true, iter: 0, ancho: 0 };
    if (!(isFinite(fa) && isFinite(fb)) || ((fa < 0) === (fb < 0))) return { x: NaN, ok: false, iter: 0, ancho: Math.abs(b - a) };
    var neg = fa < 0, m = a, it = 0;
    while (it < maxIter && Math.abs(b - a) >= tol) {
      m = 0.5 * (a + b);
      var fm = g(m);
      it++;
      if (fm === 0) { return { x: m, ok: true, iter: it, ancho: 0 }; }
      if ((fm < 0) === neg) a = m; else b = m;
    }
    return { x: 0.5 * (a + b), ok: true, iter: it, ancho: Math.abs(b - a) };
  };

  /** Bisección: devuelve la raíz (o NaN si g(a), g(b) no cambian de signo). */
  Num.biseccion = function (g, a, b, tol, maxIter) {
    return Num.biseccionInfo(g, a, b, tol, maxIter).x;
  };

  /**
   * Busca TODAS las raíces de g en [a, b]: barrido en nPasos subintervalos
   * (por defecto 400), detecta cambios de signo (ignora NaN) y refina cada una
   * por bisección hasta ancho < tol (por defecto 1e-10). Devuelve Array ascendente.
   */
  Num.buscarRaices = function (g, a, b, nPasos, tol) {
    nPasos = nPasos || 400; tol = tol || 1e-10;
    var raices = [], h = (b - a) / nPasos;
    var x0 = a, g0 = g(x0);
    for (var i = 1; i <= nPasos; i++) {
      var x1 = (i === nPasos) ? b : a + i * h, g1 = g(x1);
      if (g0 === 0 && (raices.length === 0 || raices[raices.length - 1] !== x0)) raices.push(x0);
      else if (isFinite(g0) && isFinite(g1) && g0 !== 0 && g1 !== 0 && ((g0 < 0) !== (g1 < 0))) {
        raices.push(Num.biseccion(g, x0, x1, tol));
      }
      x0 = x1; g0 = g1;
    }
    if (g0 === 0 && (raices.length === 0 || raices[raices.length - 1] !== x0)) raices.push(x0);
    return raices;
  };

  /** Máximo de f unimodal en [a, b] por sección áurea. Devuelve {x, fx}. */
  Num.maximo = function (f, a, b, tol) {
    tol = tol || 1e-12;
    var r = (Math.sqrt(5) - 1) / 2, c = b - r * (b - a), d = a + r * (b - a), fc = f(c), fd = f(d);
    for (var i = 0; i < 200 && Math.abs(b - a) > tol; i++) {
      if (fc > fd) { b = d; d = c; fd = fc; c = b - r * (b - a); fc = f(c); }
      else { a = c; c = d; fc = fd; d = a + r * (b - a); fd = f(d); }
    }
    var x = 0.5 * (a + b);
    return { x: x, fx: f(x) };
  };

  /** Newton 1D. dg opcional (si falta, derivada numérica). Devuelve la raíz o NaN. */
  Num.raizNewton = function (g, dg, x0, tol, maxIter) {
    tol = tol || 1e-12; maxIter = maxIter || 60;
    var x = x0;
    for (var i = 0; i < maxIter; i++) {
      var fx = g(x), d = dg ? dg(x) : Num.derivada(g, x);
      if (!isFinite(fx) || !isFinite(d) || d === 0) return NaN;
      var dx = fx / d;
      x -= dx;
      if (Math.abs(dx) < tol * Math.max(1, Math.abs(x))) return x;
    }
    return x;
  };

  /* ----------------------------------------------------------------- Numerov */

  /**
   * Malla uniforme ALINEADA: devuelve x_k = origen + k·dx con dx = unidadBase/M
   * (M entero, dx ≤ dxMax) de modo que origen ± j·unidadBase caigan EXACTAMENTE
   * en nodos (saltos del potencial). Cubre [xmin, xmax]. Ej. pozo finito de
   * ancho a: mallaAlineada(-L, L, 0.005, a/2, 0).
   */
  Num.mallaAlineada = function (xmin, xmax, dxMax, unidadBase, origen) {
    origen = origen || 0;
    var M = Math.max(1, Math.ceil(unidadBase / dxMax - 1e-12)), dx = unidadBase / M;
    var k0 = Math.floor((xmin - origen) / dx + 1e-9), k1 = Math.ceil((xmax - origen) / dx - 1e-9);
    var n = k1 - k0 + 1, x = new Float64Array(n);
    for (var i = 0; i < n; i++) x[i] = origen + (k0 + i) * dx;
    return x;
  };

  /**
   * Evalúa V(x) en la malla x. En los nodos que coinciden con un salto
   * (posiciones dadas en `saltos`) usa el PROMEDIO de V a la izquierda y a la
   * derecha (regla 2 del madre §0.5). Devuelve Float64Array.
   */
  Num.potencialEnMalla = function (x, fV, saltos) {
    var n = x.length, V = new Float64Array(n), dx = n > 1 ? Math.abs(x[1] - x[0]) : 1;
    var tolNodo = dx * 1e-6, eps = dx * 1e-3;
    for (var i = 0; i < n; i++) {
      var v = null;
      if (saltos) {
        for (var j = 0; j < saltos.length; j++) {
          if (Math.abs(x[i] - saltos[j]) <= tolNodo) {
            v = 0.5 * (fV(saltos[j] - eps) + fV(saltos[j] + eps));
            break;
          }
        }
      }
      V[i] = (v === null) ? fV(x[i]) : v;
    }
    return V;
  };

  /**
   * Numerov para ψ'' = −k²(x)·ψ con k² = fac·(E − V)  (fac = 2m/ħ²; por defecto
   * 2, o sea unidades ħ = m = 1: ψ'' = 2(V − E)ψ).
   *   x   : malla UNIFORME (arreglo)       V : arreglo o función V(x)
   *   E   : energía                        psi0, psi1 : ψ en x[0] y x[1]
   *   opts: {fac, soloFinal}
   * Recurrencia: ψ[i+1] = ((12 − 10 f[i])ψ[i] − f[i−1]ψ[i−1]) / f[i+1], f = 1 + dx²k²/12.
   * REESCALADO: si |ψ| > 1e100 se multiplican por 1e-100 todos los valores ya
   * calculados (el signo y los ceros se conservan; ψ queda proporcional a la
   * solución, con constante positiva).
   * Devuelve {psi (Float64Array o null), psiFinal, nodos (cambios de signo),
   *           reescalados}. Con opts.soloFinal no se guarda el arreglo (más rápido).
   */
  Num.numerov = function (x, V, E, psi0, psi1, opts) {
    opts = opts || {};
    var N = x.length, fac = (opts.fac !== undefined) ? opts.fac : 2;
    var guardar = !opts.soloFinal, psi = guardar ? new Float64Array(N) : null;
    var esFn = (typeof V === 'function');
    if (N < 2) return { psi: psi, psiFinal: psi0, nodos: 0, reescalados: 0 };
    var dx = x[1] - x[0], c12 = dx * dx / 12 * fac;
    var p0 = psi0, p1 = psi1, nodos = 0, resc = 0, i, j;
    if (guardar) { psi[0] = p0; psi[1] = p1; }
    var f0 = 1 + c12 * (E - (esFn ? V(x[0]) : V[0]));
    var f1 = 1 + c12 * (E - (esFn ? V(x[1]) : V[1]));
    if (p0 !== 0 && p1 !== 0 && ((p0 < 0) !== (p1 < 0))) nodos++;
    for (i = 1; i < N - 1; i++) {
      var f2 = 1 + c12 * (E - (esFn ? V(x[i + 1]) : V[i + 1]));
      var p2 = ((12 - 10 * f1) * p1 - f0 * p0) / f2;
      if (p2 !== 0 && p1 !== 0 && ((p2 < 0) !== (p1 < 0))) nodos++;
      if (Math.abs(p2) > 1e100) {            // reescalado: conserva signos y ceros
        p1 *= 1e-100; p2 *= 1e-100;
        if (guardar) { for (j = 0; j <= i; j++) psi[j] *= 1e-100; }
        resc++;
      }
      if (guardar) psi[i + 1] = p2;
      p0 = p1; p1 = p2; f0 = f1; f1 = f2;
    }
    return { psi: psi, psiFinal: p1, nodos: nodos, reescalados: resc };
  };

  /* --------------------------------------------------------------------- RK4 */

  /**
   * Un paso RK4. f(t, y, tCentro) → Array dy/dt; tCentro = t + h/2 en las 4
   * etapas (permite usar un coeficiente CONSTANTE por paso, p. ej. V del centro
   * del paso para que un salto de V caiga entre pasos).
   */
  Num.rk4Paso = function (f, t, y, h) {
    var n = y.length, tc = t + h / 2, i, tmp = new Array(n);
    var k1 = f(t, y, tc);
    for (i = 0; i < n; i++) tmp[i] = y[i] + 0.5 * h * k1[i];
    var k2 = f(tc, tmp, tc);
    for (i = 0; i < n; i++) tmp[i] = y[i] + 0.5 * h * k2[i];
    var k3 = f(tc, tmp, tc);
    for (i = 0; i < n; i++) tmp[i] = y[i] + h * k3[i];
    var k4 = f(t + h, tmp, tc);
    var r = new Array(n);
    for (i = 0; i < n; i++) r[i] = y[i] + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
    return r;
  };

  /**
   * RK4 para sistemas y' = f(t, y, tCentro) de t0 a tf con paso |h| (el signo
   * se toma de tf − t0). Los nodos son EXACTAMENTE t_k = t0 + k·h (sin acumular
   * errores). nPasos = round(|tf − t0|/|h|).
   * opts: {cada: k (guardar 1 de cada k pasos, def. 1), soloFinal}
   * Devuelve {t: Array, y: Array de Arrays (y[k] = estado en t[k])}.
   */
  Num.rk4Sistema = function (f, y0, t0, tf, h, opts) {
    opts = opts || {};
    var dir = (tf >= t0) ? 1 : -1, hh = dir * Math.abs(h);
    var n = Math.round(Math.abs(tf - t0) / Math.abs(h));
    var cada = Math.max(1, opts.cada || 1), T = [t0], Y = [y0.slice()], y = y0.slice();
    for (var k = 0; k < n; k++) {
      y = Num.rk4Paso(f, t0 + k * hh, y, hh);
      if (!opts.soloFinal && ((k + 1) % cada === 0 || k === n - 1)) { T.push(t0 + (k + 1) * hh); Y.push(y); }
    }
    if (opts.soloFinal) return { t: [t0 + n * hh], y: [y] };
    return { t: T, y: Y };
  };

  /* ---------------------------------------------------------------- complejos */

  var Cx = {};
  function z_(a) { return (typeof a === 'number') ? { re: a, im: 0 } : a; }

  Cx.nuevo = function (re, im) { return { re: re, im: im || 0 }; };
  Cx.I = { re: 0, im: 1 };
  Cx.UNO = { re: 1, im: 0 };
  Cx.CERO = { re: 0, im: 0 };
  Cx.add = function (a, b) { a = z_(a); b = z_(b); return { re: a.re + b.re, im: a.im + b.im }; };
  Cx.sub = function (a, b) { a = z_(a); b = z_(b); return { re: a.re - b.re, im: a.im - b.im }; };
  Cx.mul = function (a, b) { a = z_(a); b = z_(b); return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re }; };
  Cx.neg = function (a) { a = z_(a); return { re: -a.re, im: -a.im }; };
  Cx.conj = function (a) { a = z_(a); return { re: a.re, im: -a.im }; };
  /** k·z con k real. */
  Cx.escalar = function (k, a) { a = z_(a); return { re: k * a.re, im: k * a.im }; };
  /** a / b (algoritmo de Smith, evita desbordes intermedios). */
  Cx.div = function (a, b) {
    a = z_(a); b = z_(b);
    var r, d;
    if (Math.abs(b.re) >= Math.abs(b.im)) {
      r = b.im / b.re; d = b.re + b.im * r;
      return { re: (a.re + a.im * r) / d, im: (a.im - a.re * r) / d };
    }
    r = b.re / b.im; d = b.re * r + b.im;
    return { re: (a.re * r + a.im) / d, im: (a.im * r - a.re) / d };
  };
  Cx.inv = function (b) { return Cx.div(1, b); };
  Cx.abs = function (a) {
    a = z_(a);
    var m = Math.sqrt(a.re * a.re + a.im * a.im);
    return (m > 1e-150 && m < 1e150) ? m : Math.hypot(a.re, a.im);
  };
  Cx.abs2 = function (a) { a = z_(a); return a.re * a.re + a.im * a.im; };
  /** Argumento en (−π, π]. */
  Cx.arg = function (a) { a = z_(a); return Math.atan2(a.im, a.re); };
  Cx.exp = function (a) {
    a = z_(a);
    var m = Math.exp(a.re);
    return { re: m * Math.cos(a.im), im: m * Math.sin(a.im) };
  };
  /** e^{iθ} con θ real. */
  Cx.expI = function (theta) { return { re: Math.cos(theta), im: Math.sin(theta) }; };
  Cx.dePolar = function (r, theta) { return { re: r * Math.cos(theta), im: r * Math.sin(theta) }; };
  /** Logaritmo principal. */
  Cx.log = function (a) { a = z_(a); return { re: Math.log(Cx.abs(a)), im: Math.atan2(a.im, a.re) }; };
  /** Raíz cuadrada, RAMA PRINCIPAL (Re ≥ 0; sobre el eje real negativo da +i√|x|). */
  Cx.sqrt = function (a) {
    a = z_(a);
    if (a.re === 0 && a.im === 0) return { re: 0, im: 0 };
    var m = Cx.abs(a), t = Math.sqrt((m + Math.abs(a.re)) / 2);
    if (a.re >= 0) return { re: t, im: a.im / (2 * t) };
    var s = (a.im < 0) ? -1 : 1;           // Im = ±0 sobre el eje negativo → +i (arg = π)
    return { re: Math.abs(a.im) / (2 * t), im: s * t };
  };
  /** z^p con p real, rama principal. */
  Cx.pow = function (a, p) {
    a = z_(a);
    if (a.re === 0 && a.im === 0) return { re: (p === 0 ? 1 : 0), im: 0 };
    var L = Cx.log(a);
    return Cx.exp({ re: p * L.re, im: p * L.im });
  };
  /** Suma de un arreglo de complejos. */
  Cx.suma = function (zs) {
    var re = 0, im = 0;
    for (var i = 0; i < zs.length; i++) { re += zs[i].re; im += zs[i].im; }
    return { re: re, im: im };
  };
  Cx.aTexto = function (a, cifras) {
    a = z_(a); cifras = cifras || 4;
    var s = (a.im < 0 || (a.im === 0 && 1 / a.im < 0)) ? ' − ' : ' + ';
    return Num.formatoNum(a.re, cifras) + s + Num.formatoNum(Math.abs(a.im), cifras) + 'i';
  };
  Num.Cx = Cx;

  /* -------------------------------------------------------------------- PRNG */

  /** Semilla recomendada para las pruebas estocásticas (reproducibles). */
  Num.SEMILLA = 20261008;

  /**
   * Generador mulberry32 con semilla (entero). Devuelve una función sin
   * argumentos que da U[0, 1). Misma semilla → misma secuencia.
   */
  Num.prng = function (semilla) {
    var a = ((semilla === undefined || semilla === null) ? Math.floor(Math.random() * 4294967296) : Math.floor(semilla)) >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  /** Normal N(0,1) por Box–Muller (no es rechazo) a partir de un prng. */
  Num.gauss = function (rng) {
    var u1 = 1 - rng(), u2 = rng();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * PI * u2);
  };

  /**
   * Muestreador por FUNCIÓN DE DISTRIBUCIÓN ACUMULADA (regla 3 del madre).
   * Malla fina de n ≥ 4000 celdas en [a, b]; la masa de cada celda se toma con f en
   * el CENTRO de la celda (regla del punto medio: nunca se evalúa f en a ni en b,
   * así que una divergencia integrable en los extremos no produce Infinity);
   * acumulada normalizada; inversión por búsqueda binaria + interpolación lineal.
   * f ≥ 0 no necesita estar normalizada (valores no finitos o negativos → 0).
   * Para densidades con singularidades en los extremos (p. ej. 1/√(x0²−x²)) la
   * precisión es sólo O(√Δx): allí es mejor la inversa analítica exacta.
   * Devuelve {x (nodos), pdf (en los centros), F (acumulada en los nodos), area, n,
   *           inversa(u), muestra(rng), cdf(x)}.
   */
  Num.muestreadorCDF = function (f, a, b, n) {
    n = Math.max(4000, Math.floor(n || 4000));
    var x = new Float64Array(n + 1), pdf = new Float64Array(n), F = new Float64Array(n + 1), i;
    var dx = (b - a) / n;
    for (i = 0; i <= n; i++) x[i] = a + i * dx;
    x[n] = b;
    for (i = 0; i < n; i++) {
      var v = f(a + (i + 0.5) * dx);
      pdf[i] = (isFinite(v) && v > 0) ? v : 0;
      F[i + 1] = F[i] + pdf[i] * dx;
    }
    return cierraMuestreador(x, pdf, F);
  };

  function cierraMuestreador(x, pdf, F) {
    var n = x.length - 1, i;
    var area = F[n];
    if (!(area > 0)) area = 1;
    for (i = 0; i <= n; i++) F[i] /= area;
    function inversa(u) {
      if (!(u > 0)) return x[0];
      if (u >= 1) return x[n];
      var lo = 0, hi = n;                      // F[lo] ≤ u < F[hi]
      while (hi - lo > 1) { var m = (lo + hi) >> 1; if (F[m] <= u) lo = m; else hi = m; }
      var d = F[hi] - F[lo];
      var t = d > 0 ? (u - F[lo]) / d : 0;
      return x[lo] + t * (x[hi] - x[lo]);
    }
    function cdf(xq) {
      if (xq <= x[0]) return 0;
      if (xq >= x[n]) return 1;
      return Num.interp(x, F, xq);
    }
    return {
      x: x, pdf: pdf, F: F, area: area, n: n,
      inversa: inversa, cdf: cdf,
      muestra: function (rng) { return inversa(rng()); }
    };
  }

  /** Igual, pero con la densidad ya tabulada en los nodos x (ascendente); acumula por trapecios. */
  Num.muestreadorDesdeMalla = function (x, pdf) {
    var n = x.length - 1, F = new Float64Array(n + 1), i;
    for (i = 1; i <= n; i++) F[i] = F[i - 1] + 0.5 * (x[i] - x[i - 1]) * (Math.max(0, pdf[i]) + Math.max(0, pdf[i - 1]));
    return cierraMuestreador(x, pdf, F);
  };

  /* --------------------------------------------------------------- histograma */

  /**
   * Histograma de un arreglo de datos en [a, b) con nBins. Devuelve
   * {a, b, nBins, dx, cuentas, centros, dentro, total, densidad}; densidad[i] =
   * cuentas[i]/(total·dx) (normalizada respecto al TOTAL de datos).
   */
  Num.histograma = function (datos, a, b, nBins) {
    var h = Num.acumuladorHistograma(a, b, nBins);
    for (var i = 0; i < datos.length; i++) h.agregar(datos[i]);
    return h.resultado();
  };

  /** Histograma incremental (animaciones): agregar(x), resultado(), reiniciar(). */
  Num.acumuladorHistograma = function (a, b, nBins) {
    nBins = Math.max(1, Math.floor(nBins));
    var dx = (b - a) / nBins, cuentas = new Array(nBins), total = 0, dentro = 0, i;
    var centros = new Array(nBins);
    for (i = 0; i < nBins; i++) { cuentas[i] = 0; centros[i] = a + (i + 0.5) * dx; }
    return {
      agregar: function (x) {
        total++;
        if (!(x >= a && x <= b)) return;
        var k = Math.floor((x - a) / dx);
        if (k >= nBins) k = nBins - 1;
        cuentas[k]++; dentro++;
      },
      reiniciar: function () { for (var j = 0; j < nBins; j++) cuentas[j] = 0; total = 0; dentro = 0; },
      resultado: function () {
        var dens = new Array(nBins);
        for (var j = 0; j < nBins; j++) dens[j] = total > 0 ? cuentas[j] / (total * dx) : 0;
        return { a: a, b: b, nBins: nBins, dx: dx, cuentas: cuentas.slice(), centros: centros, dentro: dentro, total: total, densidad: dens };
      }
    };
  };

  /* ------------------------------------------------------ funciones especiales */

  /** Integral de Fresnel C(z) = ∫₀^z cos(π t²/2) dt por Simpson (paso ≤ 2e-4). C(1) = 0.779893. */
  Num.fresnelC = function (z) {
    if (!isFinite(z)) return NaN;
    var az = Math.abs(z);
    if (az === 0) return 0;
    var n = Math.max(2, Math.ceil(az / 2e-4));
    if (n % 2) n++;
    var v = Num.simpson(function (t) { return Math.cos(PI * t * t / 2); }, 0, az, n);
    return z < 0 ? -v : v;
  };

  /** Integral de Fresnel S(z) = ∫₀^z sen(π t²/2) dt (mismo método). */
  Num.fresnelS = function (z) {
    if (!isFinite(z)) return NaN;
    var az = Math.abs(z);
    if (az === 0) return 0;
    var n = Math.max(2, Math.ceil(az / 2e-4));
    if (n % 2) n++;
    var v = Num.simpson(function (t) { return Math.sin(PI * t * t / 2); }, 0, az, n);
    return z < 0 ? -v : v;
  };

  /** erfc(x) con precisión ~1e-15 (serie para |x|<3, fracción continua para el resto). */
  Num.erfc = function (x) {
    if (isNaN(x)) return NaN;
    if (x < 0) return 2 - Num.erfc(-x);
    if (x < 3) return 1 - Num.erf(x);
    var t = x, k;
    for (k = 80; k >= 1; k--) t = x + (k / 2) / t;
    return Math.exp(-x * x) / (Math.sqrt(PI) * t);
  };

  /** Función error. */
  Num.erf = function (x) {
    if (isNaN(x)) return NaN;
    if (x < 0) return -Num.erf(-x);
    if (x >= 3) return 1 - Num.erfc(x);
    // erf(x) = 2/√π · e^{-x²} · Σ 2^n x^{2n+1} / (1·3·5···(2n+1))   (términos positivos)
    var term = x, s = x, n = 0, x2 = x * x;
    while (Math.abs(term) > 1e-17 * Math.abs(s) && n < 500) {
      n++;
      term *= 2 * x2 / (2 * n + 1);
      s += term;
    }
    return 2 / Math.sqrt(PI) * Math.exp(-x2) * s;
  };

  /** Función de distribución normal estándar Φ(z). */
  Num.normalCDF = function (z) { return 0.5 * Num.erfc(-z / Math.SQRT2); };

  var LANCZOS = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

  /** ln Γ(x) para x > 0 (Lanczos g = 7). */
  Num.lnGamma = function (x) {
    if (x < 0.5) return Math.log(PI / Math.abs(Math.sin(PI * x))) - Num.lnGamma(1 - x);
    x -= 1;
    var a = LANCZOS[0], t = x + 7.5;
    for (var i = 1; i < 9; i++) a += LANCZOS[i] / (x + i);
    return 0.5 * Math.log(2 * PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
  };

  /** Γ(x) (Lanczos). Γ(1/2) = √π. */
  Num.gamma = function (x) {
    if (x < 0.5) return PI / (Math.sin(PI * x) * Num.gamma(1 - x));
    if (x > 170) return Infinity;
    x -= 1;
    var a = LANCZOS[0], t = x + 7.5;
    for (var i = 1; i < 9; i++) a += LANCZOS[i] / (x + i);
    return Math.sqrt(2 * PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
  };

  /* ------------------------------------------------------------------ formato */

  var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '+': '' };
  /** Exponente entero → superíndices Unicode ("-7" → "⁻⁷"). */
  Num.superindice = function (n) {
    var s = String(n), r = '';
    for (var i = 0; i < s.length; i++) r += (SUP[s[i]] !== undefined ? SUP[s[i]] : s[i]);
    return r;
  };
  var SUB = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', '-': '₋' };
  /** Entero → subíndices Unicode. */
  Num.subindice = function (n) {
    var s = String(n), r = '';
    for (var i = 0; i < s.length; i++) r += (SUB[s[i]] !== undefined ? SUB[s[i]] : s[i]);
    return r;
  };

  function partesExp(v, cifras) {
    var s = Math.abs(v).toExponential(cifras - 1), i = s.indexOf('e');
    return { m: s.slice(0, i), e: parseInt(s.slice(i + 1), 10) };
  }

  /**
   * Número con `cifras` cifras significativas (por defecto 4). Decimal si
   * 1e-3 ≤ |v| < 1e6; fuera de ese rango, científica "4.996×10⁻⁷".
   * NaN/undefined → "—"; ±Infinity → "∞"/"−∞". Signo menos tipográfico "−".
   */
  Num.formatoNum = function (valor, cifras) {
    if (valor === undefined || valor === null || typeof valor !== 'number' || isNaN(valor)) return '—';
    if (!isFinite(valor)) return valor > 0 ? '∞' : '−∞';
    if (valor === 0) return '0';
    cifras = Math.min(15, Math.max(1, Math.round(cifras || 4)));
    var neg = valor < 0 ? '−' : '', p = partesExp(valor, cifras);
    if (p.e >= -3 && p.e <= 5) {
      var dec = Math.max(0, cifras - 1 - p.e);
      return neg + Math.abs(valor).toFixed(Math.min(dec, 20));
    }
    return neg + p.m + '×10' + Num.superindice(p.e);
  };

  var PREFIJOS = [[1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f']];
  var PREFIJABLES = { m: 1, s: 1, Hz: 1, J: 1, eV: 1, W: 1, V: 1, A: 1, K: 1, g: 1, N: 1, Pa: 1, C: 1, F: 1, T: 1, 'Ω': 1, H: 1, mol: 1, rad: 1 };

  /**
   * Valor con prefijo SI y unidad: formatoSI(4.996e-7, 'm', 4) → "499.6 nm".
   * Prefijos f, p, n, µ, m, k, M, G; fuera de [1e-15, 1e12) usa notación
   * científica ("3.410×10¹⁴ Hz"). El prefijo sólo se aplica a unidades simples
   * conocidas (m, s, Hz, J, eV, W, V, K, ...). Las compuestas (J/m³, m/s, Å, kg)
   * llevan el número formateado sin prefijo. opts.prefijo = true fuerza prefijo.
   */
  Num.formatoSI = function (valor, unidad, cifras, opts) {
    unidad = unidad || '';
    cifras = cifras || 4;
    var u = unidad ? ' ' + unidad : '';
    if (valor === undefined || valor === null || typeof valor !== 'number' || isNaN(valor)) return '—';
    if (!isFinite(valor)) return (valor > 0 ? '∞' : '−∞') + u;
    if (valor === 0) return '0' + u;
    var forzar = opts && opts.prefijo === true;
    if (!forzar && !PREFIJABLES[unidad]) return Num.formatoNum(valor, cifras) + u;
    var av = Math.abs(valor);
    if (av < 1e-15 || av >= 1e12) return Num.formatoNum(valor, cifras) + u;
    var k = 0;
    while (k < PREFIJOS.length - 1 && av < PREFIJOS[k][0] * (1 - 1e-12)) k++;
    var q = valor / PREFIJOS[k][0];
    var p = partesExp(q, cifras);
    if (Math.pow(10, p.e) >= 1000 && k > 0) { k--; q = valor / PREFIJOS[k][0]; }   // 999.97 → 1.000 k...
    return Num.formatoNum(q, cifras) + ' ' + PREFIJOS[k][1] + unidad;
  };

  /* ------------------------------------------------------------------- color */

  /** ¿λ (nm) en el visible (380–750 nm)? */
  Num.esVisible = function (lam_nm) { return lam_nm >= 380 && lam_nm <= 750; };

  /** [r, g, b] (0–255) del color aproximado de λ (nm), o null si no es visible. */
  Num.colorLongitudOndaRGB = function (L) {
    if (!(L >= 380 && L <= 750)) return null;
    var r = 0, g = 0, b = 0, f;
    if (L < 440) { r = -(L - 440) / 60; b = 1; }
    else if (L < 490) { g = (L - 440) / 50; b = 1; }
    else if (L < 510) { g = 1; b = -(L - 510) / 20; }
    else if (L < 580) { r = (L - 510) / 70; g = 1; }
    else if (L < 645) { r = 1; g = -(L - 645) / 65; }
    else { r = 1; }
    if (L < 420) f = 0.3 + 0.7 * (L - 380) / 40;
    else if (L > 700) f = 0.3 + 0.7 * (750 - L) / 50;
    else f = 1;
    function ch(c) { return Math.round(255 * Math.pow(Math.max(0, c * f), 0.8)); }
    return [ch(r), ch(g), ch(b)];
  };

  /**
   * Color CSS "rgb(r,g,b)" de la longitud de onda λ (nm). Visible 380–750 nm;
   * fuera (UV/IR) devuelve un gris ('rgb(140,144,156)').
   */
  Num.colorLongitudOnda = function (lam_nm) {
    var c = Num.colorLongitudOndaRGB(lam_nm);
    return c ? 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')' : 'rgb(140,144,156)';
  };

  window.Num = Num;
})();
