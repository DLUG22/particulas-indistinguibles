/* =============================================================================
   configuraciones.js — Sección 6 · Complemento A_XIV (pp. 1459–1466)
   -----------------------------------------------------------------------------
   Aproximación de campo central: H₀ = Σ [P²/2mₑ + V_c(Rᵢ)]              (6)
   Cada capa (n, l) tiene energía E_{n,l} y degeneración 2(2l + 1).
   El fundamental llena las capas en el orden de la fig. 2 del Cohen:
     1s | 2s | 2p | 3s | 3p | [4s 3d] | 4p | [5s 4d] | 5p | [6s 4f 5d] | 6p
   respetando Pauli (a lo sumo 2(2l + 1) electrones por capa).
   Degeneración del fundamental en H₀ (comentario ii): ∏ C(2(2l+1), k) sobre
   las capas abiertas (carbono 2p²: C(6,2) = 15).
   Cociente repulsión/atracción del §1-a: η ≈ (Z − 1)/(2Z)               (3)
   Panel del potencial (modelo propio para ilustrar (8), no del Cohen):
     Z_eff(r) = −r V_c(r)/e² = 1 + (Z − 1) e^{−r/a},  a = 0,8853 a₀ Z^{−1/3}
   Excepciones del llenado real: dato externo (el Cohen nombra Cr, Cu y Nb).
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var LETRA = 'spdf';
  // Orden de la fig. 2 (escrito a mano; las pruebas lo comparan con la regla n + l de Python)
  var CAPAS = [[1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [4, 0], [3, 2], [4, 1], [5, 0], [4, 2], [5, 1], [6, 0], [4, 3], [5, 2], [6, 1]];
  // Grupos de la fig. 2 que están muy cerca (los corchetes): índice de la primera y la última capa
  var CORCHETES = [[5, 6], [8, 9], [11, 13]];
  var SIMBOLOS = ('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr ' +
    'Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu ' +
    'Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn').split(' ');
  var GASES = [[2, 'He'], [10, 'Ne'], [18, 'Ar'], [36, 'Kr'], [54, 'Xe']];
  // Configuración real distinta del llenado ideal: {Z: {'nl': k}} (sólo cambia esas capas)
  var EXCEPCIONES = {
    24: { '3d': 5, '4s': 1 }, 29: { '3d': 10, '4s': 1 }, 41: { '4d': 4, '5s': 1 }, 42: { '4d': 5, '5s': 1 },
    44: { '4d': 7, '5s': 1 }, 45: { '4d': 8, '5s': 1 }, 46: { '4d': 10, '5s': 0 }, 47: { '4d': 10, '5s': 1 },
    57: { '4f': 0, '5d': 1 }, 58: { '4f': 1, '5d': 1 }, 64: { '4f': 7, '5d': 1 }, 78: { '5d': 9, '6s': 1 }, 79: { '5d': 10, '6s': 1 }
  };
  var SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

  function nombre(c) { return c[0] + LETRA[c[1]]; }
  function capacidad(c) { return 2 * (2 * c[1] + 1); }
  function sup(k) { return String(k).split('').map(function (d) { return SUP[+d]; }).join(''); }
  function binom(n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }

  function llenar(Z) {
    var ocup = [], resto = Z;
    CAPAS.forEach(function (c) { var k = Math.min(resto, capacidad(c)); ocup.push(k); resto -= k; });
    return ocup;
  }

  function cadena(ocup, desde) {
    var t = [];
    for (var i = desde || 0; i < CAPAS.length; i++) if (ocup[i] > 0) t.push(nombre(CAPAS[i]) + sup(ocup[i]));
    return t.join(' ');
  }

  // Configuración con el gas noble anterior entre corchetes: [Ar] 4s² 3d⁶
  function cadenaCorta(ocup, Z) {
    var nucleo = null;
    GASES.forEach(function (g) { if (g[0] < Z) nucleo = g; });
    if (!nucleo) return cadena(ocup);
    var lleno = llenar(nucleo[0]), i = 0, acum = 0;
    while (acum < nucleo[0]) { acum += lleno[i]; i++; }
    for (var j = 0; j < i; j++) if (ocup[j] !== lleno[j]) return cadena(ocup);   // núcleo alterado: sin abreviar
    return '[' + nucleo[1] + '] ' + cadena(ocup, i);
  }

  function degeneracion(ocup) {
    var g = 1;
    ocup.forEach(function (k, i) { g *= binom(capacidad(CAPAS[i]), k); });
    return g;
  }

  function zEff(Z, r) { var a = 0.8853 * Math.pow(Z, -1 / 3); return 1 + (Z - 1) * Math.exp(-r / a); }

  function calcular(p) {
    var Z = Math.round(p.Z), r = {};
    var ideal = llenar(Z), ocup = ideal.slice(), exc = EXCEPCIONES[Z];
    r.esExcepcion = !!exc;
    if (exc && p.real) {
      CAPAS.forEach(function (c, i) { if (exc[nombre(c)] !== undefined) ocup[i] = exc[nombre(c)]; });
    }
    r.Z = Z;
    r.simbolo = SIMBOLOS[Z - 1];
    r.ocup = ocup;
    r.config = cadena(ocup);
    r.configCorta = cadenaCorta(ocup, Z);
    r.configIdeal = cadena(ideal);
    var ult = -1;
    ideal.forEach(function (k, i) { if (k > 0) ult = i; });
    r.indiceExterna = ult;
    r.capaExterna = nombre(CAPAS[ult]);
    r.electronesExterna = ideal[ult];
    r.capacidadExterna = capacidad(CAPAS[ult]);
    r.degeneracion = degeneracion(ocup);
    r.cerrada = r.degeneracion === 1;
    r.eta = (Z - 1) / (2 * Z);
    r.zEff_05 = zEff(Z, 0.5);
    r.zEff_1 = zEff(Z, 1);
    r.rr = Num.linspace(0, 3, 241);
    r.zeff = r.rr.map(function (x) { return zEff(Z, x); });
    var tot = 0; ocup.forEach(function (k) { tot += k; });
    r.total = tot;
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coma(v, c) { return Num.formatoNum(v, c).replace('.', ','); }
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { fer: cs.getPropertyValue('--fermion').trim() };
  }

  function dibujarCapas(res, p, g) {
    var NC = CAPAS.length;
    g.configurar({
      xlim: [0, 1], ylim: [0.4, NC + 0.9], ejes: false, leyenda: false,
      margen: { izq: 44, der: 40, arr: 4, aba: 4 },
      descripcion: 'Capas electrónicas ordenadas por energía, según la figura 2 del Cohen, con los electrones del elemento elegido.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      var Wpx = g.rect.w, paso = Math.min(18, Wpx / 15), rad = Math.min(5.2, paso * 0.34);
      g.texto(0.5, NC + 0.55, res.simbolo + ' · Z = ' + res.Z + (p.real && res.esExcepcion ? ' · configuración real' : ''),
        { align: 'center', base: 'middle', tam: 12, negrita: true, color: 'texto' });
      CAPAS.forEach(function (c, i) {
        var y = g.py(i + 1), cap = capacidad(c), k = res.ocup[i], X0 = g.rect.x + 12 + rad;
        var externa = i === res.indiceExterna;
        g.textoPx(g.rect.x - 8, y, nombre(c), { align: 'right', base: 'middle', tam: 11, negrita: externa, color: k ? 'texto' : 'tenue', dentro: false });
        for (var s = 0; s < cap; s++) {
          var X = X0 + s * paso;
          if (s < k) g.circuloPx(X, y, rad, { relleno: col.fer, alfa: 0.92, borde: false });
          else g.circuloPx(X, y, rad, { borde: 'tenue', ancho: 1 });
        }
        if (k) g.textoPx(g.rect.x + g.rect.w + 6, y, k + '/' + cap, { align: 'left', base: 'middle', tam: 10, color: k === cap ? 'tenue' : 'texto', negrita: k < cap, dentro: false });
      });
      // Corchetes de la fig. 2: capas muy cercanas
      CORCHETES.forEach(function (b) {
        var X = g.rect.x + 2, Y0 = g.py(b[0] + 1) + 7, Y1 = g.py(b[1] + 1) - 7;
        g.lineaPx(X, Y0, X, Y1, { color: 'tenue', ancho: 1.2 });
        g.lineaPx(X, Y0, X + 4, Y0, { color: 'tenue', ancho: 1.2 });
        g.lineaPx(X, Y1, X + 4, Y1, { color: 'tenue', ancho: 1.2 });
      });
    });
  }

  function dibujarPotencial(res, g) {
    var Z = res.Z;
    g.configurar({
      xlim: [0, 3], ylim: [0, Z * 1.08 + 0.5], xetiqueta: 'r (a₀)', yetiqueta: 'Z_eff = −r V_c(r) / e²', leyenda: false,
      descripcion: 'Carga efectiva que ve un electrón en función de la distancia al núcleo: Z cerca del núcleo y 1 lejos.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos();
      g.marcadorH(Z, 'Z (sin apantallar)', { color: 'clasico' });
      g.marcadorH(1, 'apantallado: 1', { color: 'clasico' });
      g.relleno(res.rr, res.zeff, { color: col.fer, alfa: 0.12 });
      g.curva(res.rr, res.zeff, { color: col.fer, ancho: 2.4 });
    });
  }

  var SIM = registrarSim({
    id: 'configuraciones',
    unidad: 6,
    tema: '6.2',
    prioridad: 'B',
    titulo: 'Configuraciones electrónicas: la tabla periódica se va llenando',
    tipo: 'grafica',

    controles: [
      { id: 'Z', nombre: 'Número atómico Z', min: 1, max: 86, paso: 1, defecto: 6, animable: true, duracion: 30 },
      { id: 'real', nombre: 'Usar la configuración real en las excepciones (Cr, Cu, Nb…)', tipo: 'casilla', defecto: false }
    ],

    lecturas: [
      { id: 'configCorta', nombre: 'Configuración', formato: 'texto', valor: function (res) { return res.simbolo + ': ' + res.configCorta; } },
      { id: 'capaExterna', nombre: 'Capa externa (llenado de la fig. 2)', formato: 'texto',
        valor: function (res) { return res.capaExterna + ' con ' + res.electronesExterna + ' de ' + res.capacidadExterna; } },
      { id: 'degeneracion', nombre: 'Degeneración del fundamental en H₀', formato: 'texto',
        valor: function (res) { return String(res.degeneracion) + (res.cerrada ? ' (capas cerradas)' : ''); } },
      { id: 'eta', nombre: 'Repulsión/atracción η ≈ (Z − 1)/2Z', formato: 'texto', valor: function (res) { return coma(res.eta, 3); } },
      { id: 'aviso', nombre: 'Llenado real', formato: 'texto',
        valor: function (res, e) { return res.esExcepcion ? (e.real ? 'irregular; la fig. 2 daría ' + res.configIdeal.split(' ').slice(-2).join(' ') : 'es irregular: activa la casilla') : 'coincide con la fig. 2'; } }
    ],

    calcular: calcular,

    pruebas: [
      { fuente: 'Cohen A_XIV (12) y comentario ii; Python (regla n + l)', entrada: { Z: 2 },
        salida: { config: '1s²', degeneracion: 1, eta: 0.25, capaExterna: '1s' }, tol_abs: 1e-12 },
      { fuente: 'Carbono, comentario ii: C(6,2) = 15; Python', entrada: { Z: 6 },
        salida: { config: '1s² 2s² 2p²', degeneracion: 15, electronesExterna: 2, eta: 0.4166666666666667 }, tol_abs: 1e-12 },
      { fuente: 'Gas noble Ne y alcalino Na (comentario ii); Python', entrada: { Z: 11 },
        salida: { config: '1s² 2s² 2p⁶ 3s¹', configCorta: '[Ne] 3s¹', degeneracion: 2, capaExterna: '3s' }, tol_abs: 1e-12 },
      { fuente: 'Hierro: 4s antes que 3d (fig. 2); Python', entrada: { Z: 26 },
        salida: { config: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶', configCorta: '[Ar] 4s² 3d⁶', degeneracion: 210, capaExterna: '3d' }, tol_abs: 1e-12 },
      { fuente: 'Cromo: llenado de la fig. 2 y real 3d⁵ 4s¹ (§2); Python', entrada: { Z: 24, real: true },
        salida: { config: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁵', configIdeal: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁴', degeneracion: 504, total: 24 }, tol_abs: 1e-12 },
      { fuente: 'Paladio real 4d¹⁰ 5s⁰: capas cerradas; Python', entrada: { Z: 46, real: true },
        salida: { config: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 4d¹⁰', degeneracion: 1, total: 46 }, tol_abs: 1e-12 },
      { fuente: 'Radón: todas las capas hasta 6p cerradas (fig. 2); Python', entrada: { Z: 86 },
        salida: { config: '1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ 4p⁶ 5s² 4d¹⁰ 5p⁶ 6s² 4f¹⁴ 5d¹⁰ 6p⁶', degeneracion: 1, eta: 0.4941860465116279 }, tol_abs: 1e-12 },
      { fuente: 'Modelo de apantallamiento Z_eff (8); Python', entrada: { Z: 11 },
        salida: { zEff_05: 3.847737869808106 }, tol_rel: 1e-9 },
      { fuente: 'Modelo de apantallamiento Z_eff (8); Python', entrada: { Z: 26 },
        salida: { zEff_1: 1.8803435813088254 }, tol_rel: 1e-9 }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        paneles: [
          { id: 'capas', altura: 400 },
          { id: 'potencial', altura: 260 }
        ],
        dibujar: function (res, p, paneles) {
          dibujarCapas(res, p, paneles.capas);
          dibujarPotencial(res, paneles.potencial);
        }
      });
    }
  });
})();
