/* =============================================================================
   ej2-terminos.js — Ejercicio 2 del complemento D_XIV (p. 1496)
   -----------------------------------------------------------------------------
   Términos espectrales de dos partículas idénticas en un potencial central.
   Método de la tabla (M_L, M_S), independiente de la regla «L + S par»:
     1. Se listan los estados individuales (m, m_s) de cada capa.
     2. Se forman los estados físicos de dos partículas: pares no ordenados
        {a, b} con a = b permitido sólo para bosones (Pauli) si es la misma capa;
        un estado de cada capa si las capas son distintas.
     3. Se cuenta cuántos hay con cada (M_L, M_S).
     4. Se «pelan» los términos: el (M_L, M_S) máximo con cuenta > 0 define
        un término ^{2S+1}L, y se le resta 1 a todo el rectángulo |M_L| ≤ L, |M_S| ≤ S.
   Las pruebas comparan con la regla de paridad (Python): en la misma capa,
   P₂₁ = (−1)^L (−1)^{2s−S} debe valer +1 (bosones) o −1 (fermiones).
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var LETRA = 'SPDFGHI';
  var SUPER = { 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷' };
  var CONFIGS = {
    '1s2': { capas: [[1, 0], [1, 0]], nombre: '1s²' },
    '1s2s': { capas: [[1, 0], [2, 0]], nombre: '1s 2s' },
    '2p2': { capas: [[2, 1], [2, 1]], nombre: '2p²' },
    '1s2p': { capas: [[1, 0], [2, 1]], nombre: '1s 2p' },
    '2p3p': { capas: [[2, 1], [3, 1]], nombre: '2p 3p' },
    '3d2': { capas: [[3, 2], [3, 2]], nombre: '3d²' }
  };
  var PARTICULAS = {
    'bos1': { dosS: 2, bosones: true, nombre: 'bosones de espín 1' },
    'fer12': { dosS: 1, bosones: false, nombre: 'electrones (espín ½)' },
    'bos0': { dosS: 0, bosones: true, nombre: 'bosones de espín 0' }
  };

  function estadosCapa(l, dosS) {
    var e = [];
    for (var m = -l; m <= l; m++) for (var ms = -dosS; ms <= dosS; ms += 2) e.push({ m: m, ms: ms });
    return e;
  }

  function calcular(p) {
    var cfg = CONFIGS[p.config] || CONFIGS['2p2'], par = PARTICULAS[p.particulas] || PARTICULAS.bos1, r = {};
    var c1 = cfg.capas[0], c2 = cfg.capas[1], misma = c1[0] === c2[0] && c1[1] === c2[1];
    var A = estadosCapa(c1[1], par.dosS), B = estadosCapa(c2[1], par.dosS);
    var LMAX = c1[1] + c2[1], SMAX2 = 2 * par.dosS;               // M_S guardado como 2M_S
    var tabla = {}, total = 0, i, j;
    function sumar(a, b) {
      var k = (a.m + b.m) + ',' + (a.ms + b.ms);
      tabla[k] = (tabla[k] || 0) + 1; total++;
    }
    if (misma) {
      for (i = 0; i < A.length; i++) for (j = i; j < A.length; j++) {
        if (i === j && !par.bosones) continue;                     // Pauli
        sumar(A[i], A[j]);
      }
    } else {
      for (i = 0; i < A.length; i++) for (j = 0; j < B.length; j++) sumar(A[i], B[j]);
    }
    // Copia de la tabla como matriz [M_L + LMAX][(2M_S + SMAX2)/2]
    var filas = 2 * LMAX + 1, cols = SMAX2 + 1, Mtab = [], ML, MS2;
    for (i = 0; i < filas; i++) { Mtab.push([]); for (j = 0; j < cols; j++) Mtab[i].push(0); }
    Object.keys(tabla).forEach(function (k) {
      var v = k.split(',').map(Number);
      Mtab[v[0] + LMAX][(v[1] + SMAX2) / 2] = tabla[k];
    });
    r.tabla = Mtab.map(function (f) { return f.slice(); });
    // Pelar términos
    var resto = Mtab.map(function (f) { return f.slice(); }), terminos = [], quedan = total;
    while (quedan > 0) {
      var Lt = -1, S2 = -1;
      for (ML = LMAX; ML >= 0 && Lt < 0; ML--) {
        for (MS2 = SMAX2; MS2 >= 0; MS2 -= 2) {
          if ((MS2 + SMAX2) % 2) continue;
          if (resto[ML + LMAX][(MS2 + SMAX2) / 2] > 0) { Lt = ML; S2 = MS2; break; }
        }
      }
      if (Lt < 0) break;                                           // (no debería pasar)
      for (ML = -Lt; ML <= Lt; ML++) for (MS2 = -S2; MS2 <= S2; MS2 += 2) {
        resto[ML + LMAX][(MS2 + SMAX2) / 2]--; quedan--;
      }
      terminos.push({ L: Lt, dosS: S2 });
    }
    terminos.sort(function (a, b) { return a.L - b.L || a.dosS - b.dosS; });
    r.terminos = terminos;
    r.lista = terminos.map(function (t) { return SUPER[t.dosS + 1] + LETRA[t.L]; }).join(' ');
    r.degeneraciones = terminos.map(function (t) { return (2 * t.L + 1) * (t.dosS + 1); });
    r.total = total;
    var g = A.length;
    r.totalFormula = misma ? (par.bosones ? g * (g + 1) / 2 : g * (g - 1) / 2) : A.length * B.length;
    r.nTerminos = terminos.length;
    r.config = cfg.nombre; r.misma = misma; r.LMAX = LMAX; r.SMAX2 = SMAX2;
    r.particulas = par.nombre; r.bosones = par.bosones;
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }
  function msTexto(ms2) {
    if (ms2 === 0) return '0';
    var s = ms2 % 2 ? Math.abs(ms2) + '/2' : String(Math.abs(ms2) / 2);
    return (ms2 < 0 ? '−' : '+') + s;
  }

  function dibujarTabla(res, g) {
    var filas = 2 * res.LMAX + 1, cols = res.SMAX2 + 1;
    g.configurar({
      xlim: [-1.2, cols], ylim: [-0.2, filas + 1], ejes: false, leyenda: false, margen: { izq: 4, der: 28, arr: 4, aba: 4 },
      descripcion: 'Tabla del número de estados de dos partículas con cada valor de M L y M S.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), c = res.bosones ? col.bos : col.fer, mx = 1, i, j;
      res.tabla.forEach(function (f) { f.forEach(function (v) { if (v > mx) mx = v; }); });
      g.texto(-0.6, filas + 0.5, 'M_L \\ M_S', { align: 'center', base: 'middle', tam: 10, color: 'tenue' });
      for (j = 0; j < cols; j++) {
        g.texto(j + 0.5, filas + 0.5, msTexto(2 * j - res.SMAX2), { align: 'center', base: 'middle', tam: 11, negrita: true, color: 'texto' });
      }
      for (i = 0; i < filas; i++) {
        var ML = i - res.LMAX, y = i;                              // fila 0 abajo = M_L mínimo
        g.texto(-0.6, y + 0.5, (ML > 0 ? '+' : (ML < 0 ? '−' : '')) + Math.abs(ML), { align: 'center', base: 'middle', tam: 11, negrita: true, color: 'texto' });
        for (j = 0; j < cols; j++) {
          var v = res.tabla[i][j];
          if (!((2 * j - res.SMAX2 + res.SMAX2) % 2 === 0)) continue;
          g.rectangulo(j + 0.06, y + 0.06, j + 0.94, y + 0.94, { relleno: v ? c : 'tenue', alfa: v ? 0.12 + 0.6 * v / mx : 0.06 });
          if (v) g.texto(j + 0.5, y + 0.5, String(v), { align: 'center', base: 'middle', tam: 11, negrita: true, color: 'texto' });
        }
      }
    });
  }

  function dibujarTerminos(res, g) {
    var n = res.terminos.length, ymax = Math.max.apply(null, res.degeneraciones) * 1.25;
    g.configurar({
      xlim: [-0.6, n - 0.4], ylim: [0, ymax], ejes: false, leyenda: false, margen: { izq: 8, der: 30, arr: 6, aba: 26 },
      descripcion: 'Degeneración de cada término espectral permitido.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), c = res.bosones ? col.bos : col.fer;
      res.terminos.forEach(function (t, k) {
        var d = res.degeneraciones[k];
        g.rectangulo(k - 0.32, 0, k + 0.32, d, { relleno: c, alfa: 0.75 });
        g.texto(k, d, String(d), { align: 'center', dy: -7, tam: 11, negrita: true, color: 'texto' });
        g.textoPx(g.px(k), g.rect.y + g.rect.h + 15, SUPER[t.dosS + 1] + LETRA[t.L], { align: 'center', base: 'middle', tam: 13, negrita: true, color: c, dentro: false });
      });
    });
  }

  var SIM = registrarSim({
    id: 'ej2-terminos',
    unidad: 9,
    tema: '9.2',
    prioridad: 'A',
    titulo: 'Términos espectrales de dos partículas idénticas',
    tipo: 'grafica',

    controles: [
      { id: 'config', nombre: 'Configuración', defecto: '2p2',
        opciones: [{ valor: '1s2', nombre: '1s² (misma capa)' }, { valor: '1s2s', nombre: '1s 2s' }, { valor: '2p2', nombre: '2p² (misma capa)' },
          { valor: '1s2p', nombre: '1s 2p' }, { valor: '2p3p', nombre: '2p 3p' }, { valor: '3d2', nombre: '3d² (misma capa)' }] },
      { id: 'particulas', nombre: 'Partículas', defecto: 'bos1',
        opciones: [{ valor: 'bos1', nombre: 'bosones de espín 1 (enunciado)' }, { valor: 'fer12', nombre: 'electrones (espín ½)' }, { valor: 'bos0', nombre: 'bosones de espín 0' }] }
    ],

    lecturas: [
      { id: 'lista', nombre: 'Términos permitidos', formato: 'texto', valor: function (res) { return res.lista; } },
      { id: 'total', nombre: 'Estados de la configuración', formato: 'texto',
        valor: function (res) { return res.total + ' = ' + res.degeneraciones.join(' + '); } },
      { id: 'totalFormula', nombre: 'Conteo directo (pares)', formato: 'texto',
        valor: function (res) {
          return res.misma ? (res.bosones ? 'g(g + 1)/2 = ' : 'g(g − 1)/2 = ') + res.totalFormula : 'g₁ g₂ = ' + res.totalFormula;
        } }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 2, bosones de espín 1, 1s²: L + S par (Python)', entrada: { config: '1s2', particulas: 'bos1' },
        salida: { lista: '¹S ⁵S', total: 6, totalFormula: 6 } },
      { fuente: 'Ej. 2, bosones de espín 1, 1s 2s: todos los S (Python)', entrada: { config: '1s2s', particulas: 'bos1' },
        salida: { lista: '¹S ³S ⁵S', total: 9 } },
      { fuente: 'Ej. 2, bosones de espín 1, 2p² (Python)', entrada: { config: '2p2', particulas: 'bos1' },
        salida: { lista: '¹S ⁵S ³P ¹D ⁵D', total: 45, totalFormula: 45 } },
      { fuente: 'Cohen B_XIV §2-b: electrones 2p² → ¹S ³P ¹D (Python)', entrada: { config: '2p2', particulas: 'fer12' },
        salida: { lista: '¹S ³P ¹D', total: 15 } },
      { fuente: 'Bosones de espín 0, 2p²: sólo L par (Python)', entrada: { config: '2p2', particulas: 'bos0' },
        salida: { lista: '¹S ¹D', total: 6 } },
      { fuente: 'Electrones 3d² (Python)', entrada: { config: '3d2', particulas: 'fer12' },
        salida: { lista: '¹S ³P ¹D ³F ¹G', total: 45 } },
      { fuente: 'Bosones de espín 1, 3d² (Python)', entrada: { config: '3d2', particulas: 'bos1' },
        salida: { lista: '¹S ⁵S ³P ¹D ⁵D ³F ¹G ⁵G', total: 120 } },
      { fuente: 'Bosones de espín 1, 2p 3p: capas distintas (Python)', entrada: { config: '2p3p', particulas: 'bos1' },
        salida: { lista: '¹S ³S ⁵S ¹P ³P ⁵P ¹D ³D ⁵D', total: 81 } }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'tabla', altura: 300 },
          { id: 'terminos', altura: 240 }
        ],
        dibujar: function (res, p, paneles) {
          dibujarTabla(res, paneles.tabla);
          dibujarTerminos(res, paneles.terminos);
        }
      });
    }
  });
})();
