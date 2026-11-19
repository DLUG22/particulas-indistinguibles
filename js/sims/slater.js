/* =============================================================================
   slater.js — Sección 3 · Cohen §C-3 (pp. 1436–1440)
   -----------------------------------------------------------------------------
   N = 2, 3 o 4 partículas idénticas; la partícula k ocupa el orbital u_{o_k}
   de una base ortonormal {u₁ … u₅} de una partícula. Regla C-3-a:
     (i)   |u⟩ = |1:u_{o₁}; 2:u_{o₂}; …; N:u_{o_N}⟩                       (C-2, C-8)
     (ii)  S|u⟩ = (1/N!) Σ_α P_α|u⟩  (bosones),
           A|u⟩ = (1/N!) Σ_α ε_α P_α|u⟩  (fermiones)                       (C-9, C-12)
     (iii) normalizar.
   Convención (B-38): P_α pone a la partícula α(k) en el orbital que tenía la k.
   Resultados (comprobados aparte con Python):
     ‖S|u⟩‖² = Π n_k! / N!,   ‖A|u⟩‖² = 1/N! (orbitales distintos) o 0 (Pauli)
     c = √(N!/Π n_k!) (bosones), c = √N! (fermiones)                      (nota 6, C-15)
     ⟨P₂₁⟩ = +1 en el ket simétrico y −1 en el antisimétrico.
   A|u⟩ es el determinante de Slater (C-13): fila = partícula, columna = orbital.
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var NORB = 5;                                         // orbitales disponibles u₁ … u₅
  var COLOR_ORB = [null, 's3', 's4', 's5', 's6', 'aprox'];

  function factorial(n) { var f = 1; for (var i = 2; i <= n; i++) f *= i; return f; }

  // Todas las permutaciones de {0, …, n−1}, cada una con su paridad ε = ±1.
  function permutaciones(n) {
    var res = [];
    (function rec(pref, resto) {
      if (!resto.length) {
        var inv = 0;
        for (var i = 0; i < pref.length; i++) for (var j = i + 1; j < pref.length; j++) if (pref[i] > pref[j]) inv++;
        res.push({ p: pref, eps: inv % 2 === 0 ? 1 : -1 });
        return;
      }
      for (var k = 0; k < resto.length; k++) rec(pref.concat([resto[k]]), resto.slice(0, k).concat(resto.slice(k + 1)));
    })([], Array.apply(null, Array(n)).map(function (_, i) { return i; }));
    return res;
  }

  // P_α|1:o₁; …; N:o_N⟩: la partícula p[k] queda en el orbital o_k (B-38).
  function permutar(p, orbs) {
    var r = new Array(orbs.length);
    for (var k = 0; k < orbs.length; k++) r[p[k]] = orbs[k];
    return r;
  }

  function norma2(ket) { var s = 0; for (var c in ket) s += ket[c] * ket[c]; return s; }

  // ⟨ψ|P₂₁|ψ⟩ para un ket normalizado guardado como {clave: coeficiente}.
  function valorP21(ket) {
    var s = 0;
    for (var c in ket) {
      var o = c.split('');
      var t = o[0]; o[0] = o[1]; o[1] = t;
      s += ket[c] * (ket[o.join('')] || 0);
    }
    return s;
  }

  function calcular(p) {
    var N = +p.N;
    var orbs = [p.o1, p.o2, p.o3, p.o4].slice(0, N).map(Number);
    var fact = factorial(N);
    var S = {}, A = {};
    permutaciones(N).forEach(function (pe) {
      var clave = permutar(pe.p, orbs).join('');
      S[clave] = (S[clave] || 0) + 1 / fact;
      A[clave] = (A[clave] || 0) + pe.eps / fact;
    });
    // Quitar ceros numéricos del antisimetrizador (términos que se cancelan)
    var clave;
    for (clave in A) if (Math.abs(A[clave]) < 1e-14) delete A[clave];

    var r = {};
    r.orbitales = orbs;
    var n = []; for (var k = 0; k <= NORB; k++) n.push(0);
    orbs.forEach(function (o) { n[o]++; });
    r.ocupaciones = n.slice(1);
    var prodFact = 1; for (k = 1; k <= NORB; k++) prodFact *= factorial(n[k]);
    r.repetido = r.ocupaciones.some(function (x) { return x > 1; });

    r.norma_S = norma2(S);
    r.norma_A = norma2(A);
    r.kets_S = Object.keys(S).length;
    r.kets_A = Object.keys(A).length;
    r.c_S = Math.sqrt(fact / prodFact);                     // nota 6 del Cohen
    r.c_A = r.repetido ? 0 : Math.sqrt(fact);

    // Kets normalizados
    var nS = Math.sqrt(r.norma_S), nA = Math.sqrt(r.norma_A);
    var Sn = {}, An = {};
    for (clave in S) Sn[clave] = S[clave] / nS;
    if (r.norma_A > 1e-14) for (clave in A) An[clave] = A[clave] / nA;

    var ref = orbs.slice().sort(function (a, b) { return a - b; }).join('');
    r.ket_referencia = ref;
    r.coef_S_ref = Sn[ref];
    r.coef_A_ref = r.norma_A > 1e-14 ? An[ref] : NaN;
    r.p21_S = valorP21(Sn);
    r.p21_A = r.norma_A > 1e-14 ? valorP21(An) : NaN;
    r.fermiones = r.norma_A > 1e-14 ? 'sí' : 'no (Pauli)';

    // Lista de kets base que aparecen, en orden lexicográfico, con su coeficiente normalizado
    r.kets = Object.keys(Sn).sort().map(function (c) {
      return { orbs: c.split('').map(Number), cS: Sn[c], cA: An[c] || 0 };
    });
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(c) { return function (v) { return isFinite(v) ? Num.formatoNum(v, c).replace('.', ',') : '— (A|u⟩ = 0)'; }; }
  function u(k) { return 'u' + Num.subindice(k); }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  // Diagrama de niveles con las partículas numeradas (regla C-3-a, paso i)
  function dibujarOcupacion(res, g) {
    g.configurar({
      xlim: [0, 10], ylim: [0.3, NORB + 0.9], ejes: false, leyenda: false,
      margen: { izq: 8, der: 8, arr: 8, aba: 8 },
      descripcion: 'Niveles u1 a u5 con las partículas numeradas que ocupa cada uno y su número de ocupación.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.texto(5, NORB + 0.6, 'Ocupaciones  n = (' + res.ocupaciones.join(', ') + ')', { align: 'center', base: 'middle', tam: 12, negrita: true, color: 'texto' });
      for (var k = 1; k <= NORB; k++) {
        var nk = res.ocupaciones[k - 1];
        g.texto(0.9, k, u(k), { align: 'center', base: 'middle', tam: 13, negrita: true, color: COLOR_ORB[k] });
        g.linea(1.6, k - 0.22, 6.2, k - 0.22, { color: COLOR_ORB[k], ancho: 2 });
        var m = 0;
        res.orbitales.forEach(function (o, i) {
          if (o !== k) return;
          var X = g.px(2.3 + m * 1.05), Y = g.py(k + 0.02);
          g.circuloPx(X, Y, 10, { relleno: COLOR_ORB[k], alfa: 0.25, borde: COLOR_ORB[k], ancho: 1.6 });
          g.textoPx(X, Y + 0.5, String(i + 1), { align: 'center', base: 'middle', tam: 11, negrita: true, color: 'texto', dentro: false });
          m++;
        });
        g.texto(6.6, k, 'n' + Num.subindice(k) + ' = ' + nk, { base: 'middle', tam: 12, color: nk ? 'texto' : 'tenue' });
        if (nk > 1) g.texto(8.2, k, '✗ fermiones', { base: 'middle', tam: 11, negrita: true, color: col.fer });
      }
    });
  }

  // Determinante de Slater (C-13): fila i = partícula i, columna j = orbital de la partícula j en |u⟩
  function dibujarSlater(res, g) {
    var N = res.orbitales.length;
    g.configurar({
      xlim: [0, N + 1], ylim: [-0.9, N + 1], ejes: false, leyenda: false,
      margen: { izq: 8, der: 8, arr: 8, aba: 8 },
      descripcion: 'Matriz del determinante de Slater: fila = partícula, columna = orbital. Dos columnas iguales anulan el determinante.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), i, j;
      var rep = res.orbitales.map(function (o) { return res.ocupaciones[o - 1] > 1; });
      for (j = 0; j < N; j++) {
        var o = res.orbitales[j];
        g.texto(j + 1.5, N + 0.55, u(o), { align: 'center', base: 'middle', tam: 13, negrita: true, color: COLOR_ORB[o] });
        if (rep[j]) g.rectangulo(j + 1.06, 0.06, j + 1.94, N - 0.06, { relleno: col.fer, alfa: 0.08, borde: col.fer, ancho: 2 });
        for (i = 0; i < N; i++) {
          g.texto(j + 1.5, N - i - 0.5, '|' + (i + 1) + ':' + u(o) + '⟩', { align: 'center', base: 'middle', tam: 12, color: 'texto' });
        }
      }
      for (i = 0; i < N; i++) g.texto(0.5, N - i - 0.5, '(' + (i + 1) + ')', { align: 'center', base: 'middle', tam: 11, color: 'tenue' });
      g.linea(1.02, 0.05, 1.02, N - 0.05, { color: 'texto', ancho: 1.6 });
      g.linea(N + 0.98, 0.05, N + 0.98, N - 0.05, { color: 'texto', ancho: 1.6 });
      var pie = res.repetido
        ? 'Dos columnas iguales ⇒ el determinante es 0: A|u⟩ = 0 (Pauli)'
        : 'A|u⟩ = (1/' + N + '!) × det;  normalizado: 1/√' + N + '! × det';
      g.texto((N + 1) / 2, -0.45, pie, { align: 'center', base: 'middle', tam: 12, negrita: res.repetido, color: res.repetido ? col.fer : 'tenue' });
    });
  }

  // Coeficientes del ket físico normalizado sobre la base |1:u_i; 2:u_j; …⟩
  function dibujarCoeficientes(res, g, cual) {
    var N = res.orbitales.length, K = res.kets.length, fer = cual === 'A';
    var cmax = 0;
    res.kets.forEach(function (k) { cmax = Math.max(cmax, Math.abs(fer ? k.cA : k.cS)); });
    if (cmax === 0) cmax = 1 / Math.sqrt(N);
    var top = cmax * (K > 6 ? 1.55 : 1.35);
    g.configurar({
      xlim: [-0.6, K - 0.4], ylim: fer ? [-top, top] : [0, top], ejes: false, leyenda: false,
      titulo: fer ? 'Fermiones: A|u⟩ normalizado (determinante de Slater)' : 'Bosones: S|u⟩ normalizado',
      margen: { izq: 46, der: 8, arr: 8, aba: 13 * N + 10 },
      descripcion: 'Coeficiente del ket físico normalizado en cada ket de la base; debajo, el orbital de cada partícula.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), color = fer ? col.fer : col.bos, i, j;
      var prohibido = fer && res.norma_A < 1e-14;
      var marcas = prohibido ? [0] : (fer ? [-cmax, 0, cmax] : [0, cmax]);
      marcas.forEach(function (y) {
        g.linea(-0.6, y, K - 0.4, y, { color: y === 0 ? 'eje' : 'grid', ancho: 1 });
        g.textoPx(g.rect.x - 6, g.py(y), Num.formatoNum(y, 3).replace('.', ','), { align: 'right', base: 'middle', tam: 10, color: 'tenue', dentro: false });
      });
      // Orbital de cada partícula (columna de dígitos bajo cada barra)
      for (j = 0; j < N; j++) {
        g.textoPx(g.rect.x - 6, g.rect.y + g.rect.h + 12 + 13 * j, (j + 1) + ':', { align: 'right', base: 'middle', tam: 9, color: 'tenue', dentro: false });
      }
      var xs = [], ys = [];
      res.kets.forEach(function (k, i) {
        xs.push(i); ys.push(fer ? k.cA : k.cS);
        for (j = 0; j < N; j++) {
          g.textoPx(g.px(i), g.rect.y + g.rect.h + 12 + 13 * j, String(k.orbs[j]), { align: 'center', base: 'middle', tam: 10, color: COLOR_ORB[k.orbs[j]], negrita: true, dentro: false });
        }
      });
      if (prohibido) {
        g.texto((K - 1) / 2, top * 0.5, 'A|u⟩ = 0: todos los coeficientes se cancelan', { align: 'center', base: 'middle', tam: 12, negrita: true, color: col.fer });
        g.texto((K - 1) / 2, top * 0.3, 'Pauli: este estado no existe para fermiones', { align: 'center', base: 'middle', tam: 11, color: col.fer });
        return;
      }
      g.barras(xs, ys, { ancho: 0.7, colores: function () { return color; }, alfa: 0.85 });
      if (K <= 6) {
        for (i = 0; i < K; i++) {
          var v = ys[i];
          g.textoPx(g.px(i), g.py(v) + (v >= 0 ? -7 : 13), Num.formatoNum(v, 3).replace('.', ','), { align: 'center', tam: 11, negrita: true, color: 'texto' });
        }
      } else {
        g.texto((K - 1) / 2, (cmax + top) / 2, 'cada coeficiente: ' + (fer ? '±' : '') + Num.formatoNum(cmax, 3).replace('.', ',') + '  (' + K + ' kets)', { align: 'center', base: 'middle', tam: 11, color: 'texto', fondo: true });
      }
    });
  }

  var OPS_N = [{ valor: 2, nombre: '2 partículas' }, { valor: 3, nombre: '3 partículas' }, { valor: 4, nombre: '4 partículas' }];
  var OPS_ORB = [1, 2, 3, 4, 5].map(function (k) { return { valor: k, nombre: u(k) }; });

  var SIM = registrarSim({
    id: 'slater',
    unidad: 3,
    tema: '3.3',
    prioridad: 'A',
    titulo: 'Kets físicos y determinante de Slater',
    tipo: 'grafica',

    controles: [
      { id: 'N', nombre: 'Número de partículas N', opciones: OPS_N, defecto: 3 },
      { id: 'o1', nombre: 'Orbital de la partícula 1', opciones: OPS_ORB, defecto: 1 },
      { id: 'o2', nombre: 'Orbital de la partícula 2', opciones: OPS_ORB, defecto: 2 },
      { id: 'o3', nombre: 'Orbital de la partícula 3', opciones: OPS_ORB, defecto: 3, visible: function (e) { return +e.N >= 3; } },
      { id: 'o4', nombre: 'Orbital de la partícula 4', opciones: OPS_ORB, defecto: 4, visible: function (e) { return +e.N >= 4; } }
    ],

    lecturas: [
      { id: 'fermiones', nombre: '¿Permitido para fermiones?', formato: 'texto' },
      { id: 'norma_S', nombre: '‖S|u⟩‖² = Πnₖ!/N!', formato: coma(4) },
      { id: 'norma_A', nombre: '‖A|u⟩‖²', formato: coma(4) },
      { id: 'kets_S', nombre: 'Kets distintos en S|u⟩', formato: function (v) { return String(v); } },
      { id: 'kets_A', nombre: 'Kets distintos en A|u⟩', formato: function (v) { return String(v); } },
      { id: 'c_S', nombre: 'c bosones = √(N!/Πnₖ!)', formato: coma(4) },
      { id: 'coef_S_ref', nombre: 'Coeficiente de cada ket (bosones)', formato: coma(4) },
      { id: 'coef_A_ref', nombre: 'Coef. del ket en orden creciente (fermiones)', formato: coma(4) },
      { id: 'p21_S', nombre: '⟨P₂₁⟩ en el ket simétrico', formato: coma(3) },
      { id: 'p21_A', nombre: '⟨P₂₁⟩ en el ket antisimétrico', formato: coma(3) }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Cohen (C-4), Python', entrada: { N: 2, o1: 1, o2: 2 },
        salida: { norma_S: 0.5, norma_A: 0.5, coef_S_ref: 0.707106781187, coef_A_ref: 0.707106781187, p21_S: 1, p21_A: -1 }, tol_abs: 1e-10 },
      { fuente: 'Cohen (C-6, C-7): Pauli, Python', entrada: { N: 2, o1: 1, o2: 1 },
        salida: { norma_S: 1, norma_A: 0, kets_S: 1, kets_A: 0, fermiones: 'no (Pauli)' }, tol_abs: 1e-12, exactos: ['kets_S', 'kets_A'] },
      { fuente: 'Cohen (C-10), Python', entrada: { N: 3, o1: 1, o2: 1, o3: 2 },
        salida: { norma_S: 0.333333333333, kets_S: 3, coef_S_ref: 0.57735026919, norma_A: 0 }, tol_abs: 1e-10, exactos: ['kets_S'] },
      { fuente: 'Cohen (C-9, C-13) y nota 6, Python', entrada: { N: 3, o1: 1, o2: 2, o3: 3 },
        salida: { norma_S: 0.166666666667, norma_A: 0.166666666667, kets_S: 6, kets_A: 6, coef_A_ref: 0.408248290464, c_A: Math.sqrt(6), c_S: Math.sqrt(6) }, tol_abs: 1e-10, exactos: ['kets_S', 'kets_A'] },
      { fuente: 'Cohen (B-63): reordenar cambia el signo, Python', entrada: { N: 3, o1: 2, o2: 1, o3: 3 },
        salida: { coef_S_ref: 0.408248290464, coef_A_ref: -0.408248290464, p21_A: -1 }, tol_abs: 1e-10 },
      { fuente: 'Cohen (C-11), Python', entrada: { N: 3, o1: 3, o2: 3, o3: 3 },
        salida: { norma_S: 1, kets_S: 1, coef_S_ref: 1, norma_A: 0 }, tol_abs: 1e-12, exactos: ['kets_S'] },
      { fuente: 'Cohen (C-15), nota 6: c = √(4!/2!2!), Python', entrada: { N: 4, o1: 1, o2: 1, o3: 2, o4: 2 },
        salida: { norma_S: 0.166666666667, kets_S: 6, c_S: Math.sqrt(6), coef_S_ref: 0.408248290464, norma_A: 0 }, tol_abs: 1e-10, exactos: ['kets_S'] },
      { fuente: 'Slater 4×4, Python', entrada: { N: 4, o1: 1, o2: 2, o3: 3, o4: 4 },
        salida: { norma_A: 0.0416666666667, kets_A: 24, coef_A_ref: 0.204124145232, p21_S: 1, p21_A: -1, c_A: Math.sqrt(24) }, tol_abs: 1e-10, exactos: ['kets_A'] },
      { fuente: 'Bosones |1:u₁;2:u₁;3:u₁;4:u₂⟩, Python', entrada: { N: 4, o1: 1, o2: 1, o3: 1, o4: 2 },
        salida: { norma_S: 0.25, kets_S: 4, coef_S_ref: 0.5, norma_A: 0 }, tol_abs: 1e-12, exactos: ['kets_S'] },
      { fuente: 'Slater 4×4 desordenado (4,2,5,1), Python', entrada: { N: 4, o1: 4, o2: 2, o3: 5, o4: 1 },
        salida: { coef_A_ref: 0.204124145232, norma_S: 0.0416666666667 }, tol_abs: 1e-10 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'ocupacion', altura: 230, cols: 'todo' },
          { id: 'slater', altura: 230, cols: 'todo' },
          { id: 'simetrico', altura: 230, cols: 'todo' },
          { id: 'antisimetrico', altura: 250, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarOcupacion(res, paneles.ocupacion);
          dibujarSlater(res, paneles.slater);
          dibujarCoeficientes(res, paneles.simetrico, 'S');
          dibujarCoeficientes(res, paneles.antisimetrico, 'A');
        }
      });
    }
  });
})();
