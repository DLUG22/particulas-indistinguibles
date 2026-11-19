/* =============================================================================
   ej1-tres-niveles.js — Ejercicio 1 del complemento D_XIV (p. 1496)
   -----------------------------------------------------------------------------
   h₀ con tres niveles orbitales no degenerados: e = 0, ħω₀, 2ħω₀; cada uno 2s+1
   veces degenerado por el espín. N partículas independientes:
       H = h₀(1) + h₀(2) + … + h₀(N),   E = (n₁ + 2n₂) ħω₀
   con n_k el número de partículas en el nivel orbital k.
   Estado individual = (nivel orbital, m_s): 3(2s+1) estados. Se cuentan los
   estados propios de H por enumeración directa:
     · distinguibles: todas las N-uplas ordenadas                 (3g)^N
     · bosones:   multiconjuntos (S de una N-upla; §C-3)          C(3g+N−1, N)
     · fermiones: conjuntos sin repetición (Slater; Pauli)        C(3g, N)
   Resultado del Cohen (comprobado aparte en Python):
     · 3 electrones: E/ħω₀ = 1, 2, 3, 4, 5 con g = 2, 4, 8, 4, 2   (20 estados)
     · 3 bosones de espín 0: E/ħω₀ = 0…6 con g = 1, 1, 2, 2, 2, 1, 1 (10 estados)
   calcular() es pura (sin DOM).
   ============================================================================= */
(function () {
  'use strict';

  var ESPINES = [{ valor: 0, nombre: '0' }, { valor: 0.5, nombre: '½' }, { valor: 1, nombre: '1' }, { valor: 1.5, nombre: '3/2' }];
  function entero(v) { return String(Math.round(v)); }
  function nombreEspin(s) { for (var i = 0; i < ESPINES.length; i++) if (ESPINES[i].valor === s) return ESPINES[i].nombre; return String(s); }

  function calcular(p) {
    var N = Math.round(+p.N), g = Math.round(2 * +p.espin + 1), tipo = p.tipo;
    var M = 3 * g;                                   // estados individuales; índice q = nivel·g + m
    var Emax = 2 * N, deg = [], porConf = {}, i, total = 0;
    for (i = 0; i <= Emax; i++) deg.push(0);
    var t = [];
    for (i = 0; i < N; i++) t.push(0);
    // Recorre todas las N-uplas (q₁, …, q_N) y se queda con las que cuentan según el tipo.
    var seguir = true;
    while (seguir) {
      var vale = true;
      for (i = 1; i < N && vale; i++) {
        if (tipo === 'bosones' && t[i] < t[i - 1]) vale = false;
        if (tipo === 'fermiones' && t[i] <= t[i - 1]) vale = false;
      }
      if (vale) {
        var E = 0, n = [0, 0, 0];
        for (i = 0; i < N; i++) { var nivel = Math.floor(t[i] / g); E += nivel; n[nivel]++; }
        deg[E]++;
        total++;
        var clave = n.join(',');
        porConf[clave] = (porConf[clave] || 0) + 1;
      }
      // siguiente N-upla (odómetro)
      i = N - 1;
      while (i >= 0) { t[i]++; if (t[i] < M) break; t[i] = 0; i--; }
      if (i < 0) seguir = false;
    }
    var r = { deg: deg, total: total, energias: [] };
    for (i = 0; i <= Emax; i++) r.energias.push(i);
    var Ef = -1;
    for (i = 0; i <= Emax; i++) if (deg[i] > 0) { Ef = i; break; }
    r.E_fund = Ef;
    r.g_fund = Ef >= 0 ? deg[Ef] : 0;
    r.n_niveles = deg.filter(function (d) { return d > 0; }).length;
    r.degeneraciones = deg.filter(function (d) { return d > 0; }).join(' · ');
    // Configuraciones (n₀, n₁, n₂) del nivel elegido, con su número de estados
    var Esel = Math.min(Math.round(+p.nivel), Emax);
    r.E_sel = Esel;
    r.g_sel = deg[Esel];
    r.configuraciones = Object.keys(porConf).map(function (k) {
      var n = k.split(',').map(Number);
      return { n: n, E: n[1] + 2 * n[2], estados: porConf[k] };
    }).filter(function (c) { return c.E === Esel; }).sort(function (a, b) { return b.n[0] - a.n[0]; });
    return r;
  }

  /* ------------------------------------------------------------ dibujo */
  function coloresFisicos() {
    var cs = getComputedStyle(document.documentElement);
    return { bos: cs.getPropertyValue('--boson').trim(), fer: cs.getPropertyValue('--fermion').trim() };
  }
  function colorTipo(tipo, col) { return tipo === 'bosones' ? col.bos : (tipo === 'fermiones' ? col.fer : 'clasico'); }

  function dibujarNiveles(res, p, g) {
    var N = Math.round(+p.N), ymax = Math.max.apply(null, res.deg) * 1.22 || 1;
    g.configurar({
      xlim: [-0.7, 2 * N + 0.7], ylim: [0, ymax], xetiqueta: 'energía del sistema E / ħω₀', yetiqueta: 'degeneración',
      leyenda: false, descripcion: 'Degeneración de cada nivel de energía del sistema de N partículas en tres niveles equidistantes.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), c = colorTipo(p.tipo, col);
      g.barras(res.energias, res.deg, {
        ancho: 0.62, alfa: 0.8,
        colores: function (i) { return i === res.E_sel ? c : 'tenue'; }
      });
      if (p.tipo === 'distinguibles') {
        g.barras(res.energias, res.deg, { ancho: 0.62, alfa: 0.35, color: 'clasico' });
      }
      res.deg.forEach(function (d, i) {
        if (d > 0) g.texto(i, d, String(d), { align: 'center', dy: -5, tam: 12, negrita: i === res.E_sel, color: 'texto' });
      });
    });
  }

  function dibujarConfiguraciones(res, p, g) {
    var N = Math.round(+p.N), gS = Math.round(2 * +p.espin + 1);
    var conf = res.configuraciones, W = g.W || 340, anchoC = Math.max(104, 34 + N * 15), cols = Math.max(1, Math.floor((W - 12) / anchoC));
    var altoC = 128, filas = Math.max(1, Math.ceil(conf.length / cols));
    g.configurar({
      altura: 46 + filas * altoC, xlim: [0, 1], ylim: [0, 1], ejes: false, leyenda: false,
      margen: { izq: 0, der: 0, arr: 0, aba: 0 },
      descripcion: 'Configuraciones de números de ocupación de los tres niveles orbitales que dan la energía elegida, con cuántos estados aporta cada una.'
    });
    g.dibujar(function (g) {
      var col = coloresFisicos(), c = colorTipo(p.tipo, col), cc = g.color(c);
      g.textoPx(8, 16, 'E = ' + res.E_sel + ' ħω₀: ' + (res.g_sel === 0 ? 'nivel prohibido' : res.g_sel + ' estado' + (res.g_sel === 1 ? '' : 's')),
        { tam: 12, negrita: true, color: res.g_sel === 0 ? 'tenue' : cc });
      g.textoPx(8, 33, 'Cada casilla: números de ocupación (n₀, n₁, n₂) · ×k = estados que aporta', { tam: 10, color: 'tenue' });
      if (!conf.length) {
        g.textoPx(W / 2, 74, p.tipo === 'fermiones' ? 'Pauli: ninguna configuración llega a esta energía' : 'Ninguna configuración llega a esta energía',
          { align: 'center', tam: 11, color: 'tenue' });
        return;
      }
      var x0 = (W - Math.min(cols, conf.length) * anchoC) / 2;
      conf.forEach(function (cf, i) {
        var cx = x0 + (i % cols) * anchoC, cy = 44 + Math.floor(i / cols) * altoC, ctx = g.ctx;
        ctx.save();
        ctx.globalAlpha = 0.07; ctx.fillStyle = cc; ctx.fillRect(cx + 3, cy + 2, anchoC - 6, altoC - 8);
        ctx.globalAlpha = 1; ctx.lineWidth = 1; ctx.strokeStyle = g.color('grid'); ctx.strokeRect(cx + 3, cy + 2, anchoC - 6, altoC - 8);
        ctx.restore();
        for (var k = 0; k < 3; k++) {
          var y = cy + altoC - 36 - k * 28;            // nivel 0 abajo
          ctx.save(); ctx.strokeStyle = g.color('eje'); ctx.globalAlpha = 0.6; ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.moveTo(cx + 18, y); ctx.lineTo(cx + anchoC - 9, y); ctx.stroke(); ctx.restore();
          g.textoPx(cx + 9, y + 3, String(k), { tam: 10, color: 'tenue', dentro: false });
          for (var j = 0; j < cf.n[k]; j++) {
            var px = cx + 30 + j * 15;
            g.circuloPx(px, y - 6, 5, { relleno: cc, alfa: 0.95, borde: false });
            // Fermiones de espín ½ en el mismo nivel: flechas opuestas (Pauli)
            if (p.tipo === 'fermiones' && gS === 2) {
              var arriba = j % 2 === 0;
              g.textoPx(px, y - 13, arriba ? '↑' : '↓', { align: 'center', tam: 10, color: 'tenue', dentro: false });
            }
          }
        }
        g.textoPx(cx + anchoC / 2, cy + altoC - 13, '(' + cf.n.join(', ') + ')  ×' + cf.estados, { align: 'center', tam: 11, color: 'texto', dentro: false });
      });
    });
  }

  var SIM = registrarSim({
    id: 'ej1-tres-niveles',
    unidad: 9,
    tema: '9.1',
    prioridad: 'A',
    titulo: 'Partículas en tres niveles equidistantes',
    tipo: 'grafica',

    controles: [
      { id: 'tipo', nombre: 'Partículas', defecto: 'fermiones',
        opciones: [{ valor: 'fermiones', nombre: 'fermiones idénticos' }, { valor: 'bosones', nombre: 'bosones idénticos' }, { valor: 'distinguibles', nombre: 'distinguibles' }] },
      { id: 'espin', nombre: 'Espín s', defecto: 0.5, opciones: ESPINES,
        opcionesDeshabilitadas: function (e) {
          if (e.tipo === 'fermiones') return [0, 1];
          if (e.tipo === 'bosones') return [0.5, 1.5];
          return [];
        } },
      { id: 'N', nombre: 'Número de partículas N', min: 1, max: 4, paso: 1, defecto: 3 },
      { id: 'nivel', nombre: 'Nivel que se detalla E / ħω₀', min: 0, max: function (e) { return 2 * Math.round(+e.N); }, paso: 1, defecto: 1 }
    ],

    lecturas: [
      { id: 'E_fund', nombre: 'Fundamental E₀ / ħω₀', formato: entero },
      { id: 'g_fund', nombre: 'Degeneración del fundamental', formato: entero },
      { id: 'degeneraciones', nombre: 'Degeneraciones (de menor a mayor E)', formato: 'texto' },
      { id: 'total', nombre: 'Total de estados', formato: entero }
    ],

    restriccion: function (e) {
      if (e.tipo === 'fermiones' && [0, 1].indexOf(+e.espin) >= 0) e.espin = 0.5;
      if (e.tipo === 'bosones' && [0.5, 1.5].indexOf(+e.espin) >= 0) e.espin = 0;
      if (+e.nivel > 2 * Math.round(+e.N)) e.nivel = 2 * Math.round(+e.N);
    },

    calcular: calcular,

    pruebas: [
      { fuente: 'Ej. 1a: tres electrones (enumeración en Python)', entrada: { tipo: 'fermiones', espin: 0.5, N: 3 },
        salida: { degeneraciones: '2 · 4 · 8 · 4 · 2', E_fund: 1, g_fund: 2, total: 20 }, exactos: ['E_fund', 'g_fund', 'total'] },
      { fuente: 'Ej. 1b: tres bosones de espín 0 (enumeración en Python)', entrada: { tipo: 'bosones', espin: 0, N: 3 },
        salida: { degeneraciones: '1 · 1 · 2 · 2 · 2 · 1 · 1', E_fund: 0, g_fund: 1, total: 10 }, exactos: ['E_fund', 'g_fund', 'total'] },
      { fuente: 'Tres distinguibles de espín 0: coeficientes de (1 + x + x²)³ (Python)', entrada: { tipo: 'distinguibles', espin: 0, N: 3 },
        salida: { degeneraciones: '1 · 3 · 6 · 7 · 6 · 3 · 1', total: 27 }, exactos: ['total'] },
      { fuente: 'Tres bosones de espín 1 (enumeración en Python)', entrada: { tipo: 'bosones', espin: 1, N: 3 },
        salida: { degeneraciones: '10 · 18 · 36 · 37 · 36 · 18 · 10', total: 165 }, exactos: ['total'] },
      { fuente: 'Cuatro electrones: fundamental 2ħω₀ no degenerado (Python)', entrada: { tipo: 'fermiones', espin: 0.5, N: 4 },
        salida: { degeneraciones: '1 · 4 · 5 · 4 · 1', E_fund: 2, g_fund: 1, total: 15 }, exactos: ['E_fund', 'g_fund', 'total'] }
    ],

    montar: function (contenedor, estadoInicial) {
      return UI.montarEstandar(contenedor, SIM, {
        estadoInicial: estadoInicial,
        restriccion: SIM.restriccion,
        paneles: [
          { id: 'niveles', altura: 250, cols: 'todo' },
          { id: 'configuraciones', altura: 170, cols: 'todo' }
        ],
        dibujar: function (res, p, paneles) {
          dibujarNiveles(res, p, paneles.niveles);
          dibujarConfiguraciones(res, p, paneles.configuraciones);
        }
      });
    }
  });
})();
