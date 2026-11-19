/* =============================================================================
   tema.js — Modo claro/oscuro y botón de imprimir.
   Sin data-theme se sigue al sistema; el botón fuerza y guarda la elección.
   Emite el evento 'cambio-tema' en document para que los lienzos se repinten.
   ============================================================================= */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var mqOscuro = window.matchMedia('(prefers-color-scheme: dark)');

  function temaActual() {
    var t = raiz.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return mqOscuro.matches ? 'dark' : 'light';
  }

  function avisar() {
    document.dispatchEvent(new CustomEvent('cambio-tema', { detail: temaActual() }));
    window.dispatchEvent(new Event('mc-tema'));   // el motor Graf (MC I) repinta sus gráficas con este evento
  }

  function aplicar(t) {
    raiz.setAttribute('data-theme', t);
    try { localStorage.setItem('pi-tema', t); } catch (e) { /* sin almacenamiento: sólo esta visita */ }
    avisar();
  }

  var botonTema = document.getElementById('btn-tema');
  if (botonTema) {
    botonTema.addEventListener('click', function () {
      aplicar(temaActual() === 'dark' ? 'light' : 'dark');
    });
  }

  // Si el sistema cambia y no hay elección forzada, repintar lienzos.
  if (mqOscuro.addEventListener) mqOscuro.addEventListener('change', avisar);

  var botonImprimir = document.getElementById('btn-imprimir');
  if (botonImprimir) {
    botonImprimir.addEventListener('click', function () { window.print(); });
  }

  window.Tema = { actual: temaActual };
})();
