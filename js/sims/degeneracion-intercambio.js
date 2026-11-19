/* =============================================================================
   degeneracion-intercambio.js — Sección 1 · Cohen §A-3-b (pp. 1423–1424)
   -----------------------------------------------------------------------------
   Dos partículas idénticas de espín ½, sólo grados de libertad de espín.
   Estado físico: «una con S_z = +ħ/2 y la otra con −ħ/2». Kets candidatos (A-6):
       |ψ⟩ = α|+,−⟩ + β|−,+⟩,   |α|² + |β|² = 1                         (A-7)
   Parametrización: α = cos χ, β = e^{iφ} sen χ   (χ ∈ [0°, 90°], φ ∈ [0°, 360°)).
   Medida de S_x en ambas (Cohen A-8, A-9):
       P(ambas +x) = |α + β|²/4 = (1 + sen 2χ cos φ)/4
       P(ambas −x) = |α + β|²/4
       P(una +x y otra −x) = |α − β|²/2 = (1 − sen 2χ cos φ)/2
   Medida de S_z: P(una + y otra −) = |α|² + |β|² = 1 para TODOS los kets.
   ⇒ Mismo estado físico, predicciones distintas: hay que levantar la degeneración.
   calcular() es pura (sin DOM): la usan las pruebas en Node y en el navegador.
   ============================================================================= */
(function () {
  'use strict';

  var GRAD = Math.PI / 180;
  function coma(c) { return function (v) { return Num.formatoNum(v, c).replace('.', ','); }; }

  function calcular(p) {
    var chi = p.chi * GRAD, phi = p.phi * GRAD;
    var a = Math.cos(chi);
    var bRe = Math.sin(chi) * Math.cos(phi), bIm = Math.sin(chi) * Math.sin(phi);
    var r = {};
    r.alfa = a;
    r.beta_re = bRe;
    r.beta_im = bIm;
    // |α+β|² y |α−β|²
    var suma2 = (a + bRe) * (a + bRe) + bIm * bIm;
    var resta2 = (a - bRe) * (a - bRe) + bIm * bIm;
    r.P_ambas_mas_x = suma2 / 4;
    r.P_ambas_menos_x = suma2 / 4;
    r.P_distintas_x = resta2 / 2;
    r.P_z = a * a + bRe * bRe + bIm * bIm;
    r.suma_x = r.P_ambas_mas_x + r.P_ambas_menos_x + r.P_distintas_x;

    // Mapa: P(ambas +x) en todo el plano (φ, χ)
    var NF = 46, NC = 73, Z = [], i, j;
    for (i = 0; i < NF; i++) {
      var c = 90 * i / (NF - 1) * GRAD, fila = [];
      for (j = 0; j < NC; j++) {
        var f = 360 * j / (NC - 1) * GRAD;
        fila.push((1 + Math.sin(2 * c) * Math.cos(f)) / 4);
      }
      Z.push(fila);
    }
    r.mapa = Z;
    return r;
  }

  function textoKet(r) {
    var a = Num.formatoNum(r.alfa, 3).replace('.', ',');
    var bm = Math.sqrt(r.beta_re * r.beta_re + r.beta_im * r.beta_im);
    if (bm < 1e-9) return '|ψ⟩ = |+,−⟩';
    if (Math.abs(r.alfa) < 1e-9) return '|ψ⟩ = e^{iφ} |−,+⟩';
    return '|ψ⟩ = ' + a + ' |+,−⟩ + ' + Num.formatoNum(bm, 3).replace('.', ',') + ' e^{iφ} |−,+⟩';
  }

  function dibujar(res, p, paneles) {
    /* --- Panel 1: probabilidades de los resultados físicos -------------------- */
    var g = paneles.barras;
    var LARGAS = ['S_z: una ↑\ny otra ↓', 'S_x:\nambas +', 'S_x:\nambas −', 'S_x: una +\ny otra −'];
    var CORTAS = ['S_z\n↑ ↓', 'S_x\n+ +', 'S_x\n− −', 'S_x\n+ −'];
    var valores = [res.P_z, res.P_ambas_mas_x, res.P_ambas_menos_x, res.P_distintas_x];
    // Eje categórico: se dibuja sin ejes de Graf (no tiene marcas personalizadas) y con rejilla propia.
    g.configurar({
      xlim: [-0.6, 3.6], ylim: [0, 1.12],
      ejes: false, leyenda: false,
      margen: { izq: 44, der: 12, arr: 30, aba: 46 },
      descripcion: 'Probabilidades de los resultados de medida para el ket elegido. La de S_z vale 1 siempre; las de S_x dependen de alfa y beta.'
    });
    g.dibujar(function (g) {
      var i, y, etiquetas = g.rect.w / 4.2 < 120 ? CORTAS : LARGAS;
      for (i = 0; i <= 4; i++) {
        y = i * 0.25;
        g.linea(-0.6, y, 3.6, y, { color: i === 0 ? 'eje' : 'grid', ancho: 1 });
        g.textoPx(g.rect.x - 8, g.py(y), Num.formatoNum(y, 2).replace('.', ','), { align: 'right', tam: 11, color: 'tenue', base: 'middle', dentro: false });
      }
      g.barras([0, 1, 2, 3], valores, {
        ancho: 0.62,
        colores: function (k) { return k === 0 ? 'clasico' : 'acento'; },
        alfa: 0.85
      });
      for (i = 0; i < 4; i++) {
        g.textoPx(g.px(i), g.py(valores[i]) - 8, Num.formatoNum(valores[i], 3).replace('.', ','), { align: 'center', tam: 12, negrita: true, color: 'texto' });
        g.textoPx(g.px(i), g.rect.y + g.rect.h + 18, etiquetas[i], { align: 'center', tam: 11, color: 'tenue', dentro: false });
      }
      g.linea(-0.6, 0.5, 3.6, 0.5, { color: 'aprox', estilo: 'punteado', ancho: 1.2 });
      g.textoPx(g.rect.x + g.rect.w, g.py(0.5) - 8, 'máximo posible de «S_x: ambas +» = 0,5', { align: 'right', tam: 11, color: 'aprox' });
      g.textoPx(g.rect.x, g.rect.y - 14, textoKet(res), { tam: 12, color: 'texto', negrita: true, dentro: false });
    });

    /* --- Panel 2: la familia completa de kets --------------------------------- */
    var m = paneles.mapa;
    m.configurar({
      xlim: [0, 360], ylim: [0, 90],
      xetiqueta: 'fase relativa φ (°)', yetiqueta: 'mezcla χ (°)',
      leyenda: false,
      margen: { der: 70 },
      descripcion: 'Mapa de la probabilidad de medir ambas S_x positivas para todos los kets de la familia. Va de 0 (antisimétrico) a 0,5 (simétrico).'
    });
    m.dibujar(function (m) {
      m.mapaCalor(res.mapa, { x0: 0, x1: 360, y0: 0, y1: 90, vmin: 0, vmax: 0.5, paleta: 'secuencial', origenArriba: false, barra: true });
      m.punto(0, 45, { etiqueta: 'simétrico · 0,5', color: 'texto' });
      m.punto(180, 45, { etiqueta: 'antisimétrico · 0', color: 'texto' });
      m.punto(360, 45, { color: 'texto' });
      m.texto(180, 4, '|+,−⟩ (χ = 0): 0,25 para toda φ', { align: 'center', tam: 11, color: 'texto', fondo: true });
      m.texto(180, 86, '|−,+⟩ (χ = 90°): 0,25', { align: 'center', tam: 11, color: 'texto', fondo: true });
      m.punto(p.phi, p.chi, { radio: 7, color: 'acento', relleno: false });
      m.punto(p.phi, p.chi, { radio: 3, color: 'acento', etiqueta: 'tu ket' });
    });
  }

  var SIM = registrarSim({
    id: 'degeneracion-intercambio',
    unidad: 1,
    tema: '1.3',
    prioridad: 'A',
    titulo: 'Degeneración de intercambio: mismo estado físico, predicciones distintas',
    tipo: 'grafica',

    controles: [
      { id: 'chi', nombre: 'Mezcla χ', unidad: '°', min: 0, max: 90, paso: 1, defecto: 30,
        ayuda: 'α = cos χ ,  β = e^{iφ} sen χ' },
      { id: 'phi', nombre: 'Fase relativa φ', unidad: '°', min: 0, max: 360, paso: 1, defecto: 60, animable: true, duracion: 8 },
      { id: 'p_mas_menos', nombre: '|+,−⟩', tipo: 'boton', accion: function (e) { e.chi = 0; e.phi = 0; } },
      { id: 'p_menos_mas', nombre: '|−,+⟩', tipo: 'boton', accion: function (e) { e.chi = 90; e.phi = 0; } },
      { id: 'p_sim', nombre: 'Simétrico', tipo: 'boton', accion: function (e) { e.chi = 45; e.phi = 0; } },
      { id: 'p_anti', nombre: 'Antisimétrico', tipo: 'boton', accion: function (e) { e.chi = 45; e.phi = 180; } }
    ],

    lecturas: [
      { id: 'P_z', nombre: 'P(S_z: una ↑, otra ↓)', formato: coma(4) },
      { id: 'P_ambas_mas_x', nombre: 'P(S_x: ambas +)', formato: coma(4) },
      { id: 'P_distintas_x', nombre: 'P(S_x: una + y otra −)', formato: coma(4) },
      { id: 'suma_x', nombre: 'Suma de las tres de S_x', formato: coma(4) }
    ],

    calcular: calcular,

    // Valores calculados aparte (Python, números complejos) a partir de (A-9).
    pruebas: [
      { fuente: 'Cohen (A-9), ket |+,−⟩', entrada: { chi: 0, phi: 0 }, salida: { P_ambas_mas_x: 0.25, P_distintas_x: 0.5, P_z: 1 }, tol_abs: 1e-12 },
      { fuente: 'Cohen (A-9), ket simétrico', entrada: { chi: 45, phi: 0 }, salida: { P_ambas_mas_x: 0.5, P_ambas_menos_x: 0.5, P_distintas_x: 0, P_z: 1 }, tol_abs: 1e-12 },
      { fuente: 'Cohen (A-9), ket antisimétrico', entrada: { chi: 45, phi: 180 }, salida: { P_ambas_mas_x: 0, P_distintas_x: 1, P_z: 1 }, tol_abs: 1e-12 },
      { fuente: 'Cohen (A-9), ket general', entrada: { chi: 30, phi: 60 }, salida: { P_ambas_mas_x: 0.358253175473055, P_distintas_x: 0.28349364905389, suma_x: 1 }, tol_abs: 1e-12 },
      { fuente: 'Cohen (A-9), ket general', entrada: { chi: 60, phi: 120 }, salida: { P_ambas_mas_x: 0.141746824526945, P_distintas_x: 0.71650635094611 }, tol_abs: 1e-12 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'barras', altura: 300, cols: 'todo', margen: { aba: 40 } },
          { id: 'mapa', altura: 300, cols: 'todo' }
        ],
        dibujar: dibujar
      });
    }
  });
})();
