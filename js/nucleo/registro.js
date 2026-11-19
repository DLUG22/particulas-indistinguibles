/* =============================================================================
   registro.js — Registro global de simulaciones (window.SIMS, registrarSim)
   -----------------------------------------------------------------------------
   SIN DOM. Cada archivo js/sims/<id>.js llama a registrarSim({...}) con el
   objeto de simulación descrito en CONTRATO.md. Aquí sólo se normaliza y se
   guarda; ningún archivo de sims puede tocar el DOM al cargarse (jsc no tiene).
   ============================================================================= */
(function () {
  'use strict';

  var SIMS = window.SIMS = window.SIMS || {};

  /** Valor por defecto de un control (según su tipo). */
  function defectoDeControl(c) {
    if (c.defecto !== undefined) return c.defecto;
    if (c.opciones && c.opciones.length) {
      var o = c.opciones[0];
      return (o && typeof o === 'object') ? o.valor : o;
    }
    if (c.min !== undefined) return c.min;
    return undefined;
  }

  /**
   * Registra una simulación. Obligatorios: id, unidad, tema, prioridad, titulo.
   * Rellena: tipo ('grafica'), controles ([]), pruebas ([]), lecturas ([]).
   * Devuelve la propia definición. Un id repetido sustituye al anterior.
   */
  function registrarSim(def) {
    if (!def || typeof def.id !== 'string' || !def.id) throw new Error('registrarSim: falta id');
    ['unidad', 'tema', 'prioridad', 'titulo'].forEach(function (k) {
      if (def[k] === undefined) throw new Error('registrarSim(' + def.id + '): falta ' + k);
    });
    if (!def.tipo) def.tipo = 'grafica';
    if (!def.controles) def.controles = [];
    if (!def.pruebas) def.pruebas = [];
    if (!def.lecturas) def.lecturas = [];
    SIMS[def.id] = def;
    return def;
  }

  /**
   * Objeto {id_control: defecto} de una simulación (sin botones). Es lo que
   * Pruebas y UI usan para rellenar las entradas que faltan.
   */
  registrarSim.defectos = function (def) {
    var d = {};
    (def.controles || []).forEach(function (c) {
      if (c.tipo === 'boton') return;
      var v = defectoDeControl(c);
      d[c.id] = Array.isArray(v) ? v.slice() : v;
    });
    return d;
  };

  /** Valor por defecto de un solo control. */
  registrarSim.defectoDeControl = defectoDeControl;

  function claveTema(t) {
    return String(t).split('.').map(function (p) { return ('000' + p).slice(-3); }).join('.');
  }

  /** Lista de simulaciones ordenada por unidad, tema (numérico) y prioridad/id. */
  registrarSim.listar = function () {
    var arr = Object.keys(SIMS).map(function (k) { return SIMS[k]; });
    arr.sort(function (a, b) {
      if (a.unidad !== b.unidad) return a.unidad - b.unidad;
      var ta = claveTema(a.tema), tb = claveTema(b.tema);
      if (ta !== tb) return ta < tb ? -1 : 1;
      if (a.prioridad !== b.prioridad) return a.prioridad < b.prioridad ? -1 : 1;
      return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
    });
    return arr;
  };

  window.registrarSim = registrarSim;
})();
