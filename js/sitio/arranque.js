/* =============================================================================
   arranque.js — Se carga en el <head>, sin «defer», antes de pintar la página.
   Pone el tema guardado y la clase .js (activa las animaciones de entrada).
   Si movimiento.js no llega a cargar, quita .js a los 2,5 s para que nada quede oculto.
   Va en archivo aparte (y no dentro del HTML) porque la CSP no permite scripts en línea.
   ============================================================================= */
(function () {
  var r = document.documentElement;
  try { var t = localStorage.getItem('pi-tema'); if (t === 'light' || t === 'dark') r.setAttribute('data-theme', t); } catch (e) {}
  r.classList.add('js');
  setTimeout(function () { if (!window.__movimiento) r.classList.remove('js'); }, 2500);
})();
