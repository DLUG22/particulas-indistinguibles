/* =============================================================================
   llenado-niveles.js — Sección 4 · Cohen §D-1-a (pp. 1444–1445)
   -----------------------------------------------------------------------------
   N partículas idénticas independientes: H = h(1) + … + h(N)            (D-1)
   con h|φ_n⟩ = e_n|φ_n⟩                                                (D-2)
   Estado fundamental:
     · bosones (espín 0): todas en φ₁ ⇒ E = N e₁                        (D-5, D-6)
     · fermiones: se llenan los N estados individuales más bajos
       ⇒ E = e₁ + … + e_N, y e_N es la energía de Fermi                  (D-7, D-8, D-9)
     · comentario de §D-1-a: un nivel degenerado g veces admite g fermiones
       (fermiones de espín ½: cada nivel orbital cuenta 2 veces).
   Espectros de una partícula (unidades indicadas):
     oscilador 1D  e_n = (n − ½) ħω, n = 1, 2, …   (no degenerado)
     pozo infinito e_n = n² e₁                    (no degenerado)
     tipo hidrógeno e_n = −|e₁|/n², degeneración orbital n²
   (modelo de partículas independientes: sin repulsión entre ellas).
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var NMAX = 14;
  var ESPECTROS = {
    oscilador: { nombre: 'Oscilador armónico 1D', unidad: 'ħω', e: function (n) { return n - 0.5; }, g: function () { return 1; } },
    pozo: { nombre: 'Pozo infinito 1D', unidad: 'e₁', e: function (n) { return n * n; }, g: function () { return 1; } },
    hidrogeno: { nombre: 'Tipo hidrógeno (n² estados por nivel)', unidad: '|e₁|', e: function (n) { return -1 / (n * n); }, g: function (n) { return n * n; } }
  };

  // Llena niveles con N partículas; cap(n) = capacidad del nivel n (Infinity para bosones).
  // Devuelve {ocup: [ocupación por nivel, desde n = 1], E, eF, nivelF}.
  function llenar(esp, N, cap) {
    var ocup = [], resto = N, E = 0, n = 0, eF = NaN, nivelF = 0;
    while (resto > 0) {
      n++;
      var k = Math.min(resto, cap(n));
      ocup.push(k);
      if (k > 0) { E += k * esp.e(n); eF = esp.e(n); nivelF = n; }
      resto -= k;
    }
    return { ocup: ocup, E: E, eF: eF, nivelF: nivelF };
  }

  function fundamental(esp, N) {
    return {
      B: llenar(esp, N, function () { return Infinity; }),
      F: llenar(esp, N, function (n) { return esp.g(n); }),
      F2: llenar(esp, N, function (n) { return 2 * esp.g(n); })
    };
  }

  function calcular(p) {
    var esp = ESPECTROS[p.espectro] || ESPECTROS.oscilador;
    var N = Math.round(p.N);
    var f = fundamental(esp, N);
    var r = {};
    r.unidad = esp.unidad;
    r.E_bosones = f.B.E;
    r.E_fermiones = f.F.E;
    r.E_fermiones_espin = f.F2.E;
    r.eF_fermiones = f.F.eF;
    r.eF_fermiones_espin = f.F2.eF;
    r.E_por_particula_F = f.F.E / N;
    r.ocup_B = f.B.ocup; r.ocup_F = f.F.ocup; r.ocup_F2 = f.F2.ocup;
    r.nivelF = f.F.nivelF; r.nivelF2 = f.F2.nivelF;
    r.niveles = Math.max(f.F.nivelF + 1, 3);
    r.energias = []; r.capacidad = [];
    for (var n = 1; n <= r.niveles; n++) { r.energias.push(esp.e(n)); r.capacidad.push(esp.g(n)); }
    // Curvas E₀(N) para N = 1 … NMAX
    r.curvaN = []; r.curvaB = []; r.curvaF = []; r.curvaF2 = [];
    for (var m = 1; m <= NMAX; m++) {
      var fm = fundamental(esp, m);
      r.curvaN.push(m); r.curvaB.push(fm.B.E); r.curvaF.push(fm.F.E); r.curvaF2.push(fm.F2.E);
    }
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(v, c) { return Num.formatoNum(v, c === undefined ? 4 : c).replace('.', ',').replace('-', '−'); }
  function conUnidad(clave) { return function (res) { return res ? coma(res[clave], 4) + ' ' + res.unidad : '—'; }; }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujarNiveles(res, g) {
    var L = res.niveles;
    g.configurar({
      xlim: [0, 3], ylim: [0.45, L + 1.15], ejes: false, leyenda: false,
      margen: { izq: 46, der: 6, arr: 6, aba: 6 },
      descripcion: 'Estado fundamental: niveles de una partícula con las partículas que ocupa cada uno, para bosones, fermiones polarizados y fermiones de espín un medio.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      var columnas = [
        { ocup: res.ocup_B, titulo: 'Bosones\nespín 0', color: col.bos, cap: null, nivelF: 0 },
        { ocup: res.ocup_F, titulo: 'Fermiones\npolarizados', color: col.fer, cap: 1, nivelF: res.nivelF },
        { ocup: res.ocup_F2, titulo: 'Fermiones\nespín ½', color: col.fer, cap: 2, nivelF: res.nivelF2 }
      ];
      // Energía de cada nivel, en el margen izquierdo (el dibujo no está a escala)
      for (var n = 1; n <= L; n++) {
        g.textoPx(g.rect.x - 6, g.py(n), coma(res.energias[n - 1], 3), { align: 'right', base: 'middle', tam: 10, color: 'tenue', dentro: false });
      }
      columnas.forEach(function (c, ci) {
        var x0 = ci + 0.06, x1 = ci + 0.94;
        g.texto(ci + 0.5, L + 0.75, c.titulo, { align: 'center', base: 'middle', tam: 11, negrita: true, color: c.color });
        for (var n = 1; n <= L; n++) {
          var k = c.ocup[n - 1] || 0;
          var esF = c.cap && n === c.nivelF;
          g.linea(x0, n - 0.3, x1, n - 0.3, { color: esF ? c.color : 'eje', ancho: esF ? 2.2 : 1 });
          // Partículas: puntos en filas de hasta 9
          var X0 = g.px(x0) + 7, dx = Math.min(9, (g.px(x1) - g.px(x0) - 30) / 9);
          for (var i = 0; i < k; i++) {
            var fila = Math.floor(i / 9), colm = i % 9;
            g.circuloPx(X0 + colm * dx, g.py(n - 0.3) - 6 - fila * 8, 3.3, { relleno: c.color, alfa: 0.9, borde: false });
          }
          var capTxt = c.cap ? k + '/' + c.cap * res.capacidad[n - 1] : (k ? String(k) : '');
          if (capTxt && (k > 0 || c.cap)) g.textoPx(g.px(x1), g.py(n - 0.3) - 4, capTxt, { align: 'right', tam: 9, color: k ? 'texto' : 'tenue', dentro: false });
          if (esF) g.textoPx(g.px(x0), g.py(n - 0.3) + 10, 'Fermi', { tam: 9, negrita: true, color: c.color, dentro: false });
        }
      });
    });
  }

  function dibujarCurva(res, p, g) {
    var N = Math.round(p.N), i = N - 1;
    var yl = Graf.rango([res.curvaB, res.curvaF, res.curvaF2], { cero: true, margen: 0.08 });
    g.configurar({
      xlim: [0.5, NMAX + 0.5], ylim: yl, xetiqueta: 'número de partículas N', yetiqueta: 'E₀ (' + res.unidad + ')',
      leyenda: res.curvaF[NMAX - 1] < 0 ? 'sw' : 'nw',
      descripcion: 'Energía del estado fundamental en función de N para bosones, fermiones polarizados y fermiones de espín un medio.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.curva(res.curvaN, res.curvaB, { color: col.bos, ancho: 2.2, etiqueta: 'bosones (= distinguibles)' });
      g.curva(res.curvaN, res.curvaF, { color: col.fer, ancho: 2.2, etiqueta: 'fermiones polarizados' });
      g.curva(res.curvaN, res.curvaF2, { color: col.fer, ancho: 2, estilo: 'punteado', etiqueta: 'fermiones espín ½' });
      g.puntos(res.curvaN, res.curvaB, { radio: 2.4, color: col.bos });
      g.puntos(res.curvaN, res.curvaF, { radio: 2.4, color: col.fer });
      g.marcadorV(N, '', { color: 'tenue' });
      g.punto(N, res.curvaB[i], { color: col.bos });
      g.punto(N, res.curvaF[i], { color: col.fer });
      g.punto(N, res.curvaF2[i], { color: col.fer });
    });
  }

  var SIM = registrarSim({
    id: 'llenado-niveles',
    unidad: 4,
    tema: '4.1',
    prioridad: 'A',
    titulo: 'Estado fundamental: los bosones se apilan, los fermiones llenan',
    tipo: 'grafica',

    controles: [
      { id: 'espectro', nombre: 'Espectro de una partícula', defecto: 'oscilador',
        opciones: [{ valor: 'oscilador', nombre: 'Oscilador armónico 1D' }, { valor: 'pozo', nombre: 'Pozo infinito 1D' }, { valor: 'hidrogeno', nombre: 'Tipo hidrógeno (n² estados por nivel)' }] },
      { id: 'N', nombre: 'Número de partículas N', min: 1, max: NMAX, paso: 1, defecto: 5, animable: true, duracion: 10 }
    ],

    lecturas: [
      { id: 'E_bosones', nombre: 'E₀ bosones = N e₁', formato: 'texto', valor: conUnidad('E_bosones') },
      { id: 'E_fermiones', nombre: 'E₀ fermiones polarizados', formato: 'texto', valor: conUnidad('E_fermiones') },
      { id: 'eF_fermiones', nombre: 'Energía de Fermi (polarizados)', formato: 'texto', valor: conUnidad('eF_fermiones') },
      { id: 'E_fermiones_espin', nombre: 'E₀ fermiones de espín ½', formato: 'texto', valor: conUnidad('E_fermiones_espin') },
      { id: 'eF_fermiones_espin', nombre: 'Energía de Fermi (espín ½)', formato: 'texto', valor: conUnidad('eF_fermiones_espin') }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Cohen (D-5), (D-8); oscilador, Python', entrada: { espectro: 'oscilador', N: 5 },
        salida: { E_bosones: 2.5, E_fermiones: 12.5, eF_fermiones: 4.5, E_fermiones_espin: 6.5, eF_fermiones_espin: 2.5 }, tol_abs: 1e-12 },
      { fuente: 'Oscilador: E_F = N²/2 ħω, Python', entrada: { espectro: 'oscilador', N: 12 },
        salida: { E_bosones: 6, E_fermiones: 72, eF_fermiones: 11.5, E_fermiones_espin: 36, eF_fermiones_espin: 5.5 }, tol_abs: 1e-12 },
      { fuente: 'Cohen (D-8); pozo infinito, Python', entrada: { espectro: 'pozo', N: 4 },
        salida: { E_bosones: 4, E_fermiones: 30, eF_fermiones: 16, E_fermiones_espin: 10, eF_fermiones_espin: 4 }, tol_abs: 1e-12 },
      { fuente: 'Pozo infinito, espín ½, Python', entrada: { espectro: 'pozo', N: 5 },
        salida: { E_fermiones: 55, E_fermiones_espin: 19, eF_fermiones_espin: 9 }, tol_abs: 1e-12 },
      { fuente: 'Comentario de §D-1-a (niveles degenerados); tipo hidrógeno, Python', entrada: { espectro: 'hidrogeno', N: 10 },
        salida: { E_bosones: -10, E_fermiones: -23 / 9, eF_fermiones: -1 / 9, E_fermiones_espin: -4, eF_fermiones_espin: -0.25 }, tol_abs: 1e-12 },
      { fuente: 'Tipo hidrógeno, N = 3, Python', entrada: { espectro: 'hidrogeno', N: 3 },
        salida: { E_fermiones: -1.5, E_fermiones_espin: -2.25, eF_fermiones_espin: -0.25 }, tol_abs: 1e-12 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'niveles', altura: 380, cols: 'todo' },
          { id: 'curva', altura: 260, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarNiveles(res, paneles.niveles);
          dibujarCurva(res, p, paneles.curva);
        }
      });
    }
  });
})();
