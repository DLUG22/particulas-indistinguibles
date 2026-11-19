/* =============================================================================
   movimiento.js — Todo el movimiento del sitio en un solo lugar.
   Atributos que entiende (ver CLAUDE.md):
     data-reveal          entra con desenfoque + subida al aparecer en pantalla
     data-reveal-grupo    en el padre: escalona a sus hijos data-reveal
     data-split           título de texto plano que entra palabra por palabra
     data-luz             tarjeta con luz que sigue al cursor
     data-parallax="0.1"  desplazamiento suave con el scroll
   Además: barra de progreso, barra superior de vidrio, mapa que se dibuja con el
   scroll, enlace activo en la barra y scroll suave (Lenis, si cargó).
   Con prefers-reduced-motion todo queda visible y quieto.
   ============================================================================= */
(function () {
  'use strict';

  var raiz = document.documentElement;
  var reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tactil = window.matchMedia('(pointer: coarse)').matches;
  var cada = function (sel, fn, base) { Array.prototype.forEach.call((base || document).querySelectorAll(sel), fn); };

  /* -------------------------------------------- 1. Títulos palabra a palabra */
  function dividir(el) {
    if (el.hasAttribute('data-dividido')) return;
    var texto = el.textContent.replace(/\s+/g, ' ').trim();
    var frag = document.createDocumentFragment();
    var lector = document.createElement('span');
    lector.className = 'solo-lector';
    lector.textContent = texto;
    frag.appendChild(lector);

    var i = 0;
    function palabra(contenido) {
      var envoltura = document.createElement('span');
      envoltura.className = 'palabra';
      envoltura.setAttribute('aria-hidden', 'true');
      var interior = document.createElement('span');
      interior.style.setProperty('--i', i++);
      if (typeof contenido === 'string') interior.textContent = contenido;
      else interior.appendChild(contenido);
      envoltura.appendChild(interior);
      frag.appendChild(envoltura);
    }

    Array.prototype.slice.call(el.childNodes).forEach(function (nodo) {
      if (nodo.nodeType === 3) {
        nodo.textContent.split(/(\s+)/).forEach(function (trozo) {
          if (!trozo) return;
          if (/^\s+$/.test(trozo)) frag.appendChild(document.createTextNode(' '));
          else palabra(trozo);
        });
      } else if (nodo.nodeType === 1) {
        palabra(nodo.cloneNode(true)); // p. ej. <em>: se anima como una palabra
      }
    });

    el.textContent = '';
    el.appendChild(frag);
    el.setAttribute('data-dividido', '');
  }

  /* -------------------------------------------------- 2. Entradas al scroll */
  function revelar(el) {
    if (el.classList.contains('visible')) return;
    el.classList.add('visible');
    // Al terminar, se quita la transición de entrada para que los :hover respondan sin retraso.
    var i = parseFloat(el.style.getPropertyValue('--i')) || 0;
    var palabras = el.querySelectorAll('.palabra').length;
    var espera = 1200 + i * 90 + palabras * 75 + 200;
    setTimeout(function () { el.classList.add('revelado'); }, espera);
  }

  var observador = (reducir || !('IntersectionObserver' in window)) ? null :
    new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { revelar(e.target); observador.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  // Prepara títulos, grupos y entradas dentro de `raiz`. Se llama al cargar y cada vez que
  // llega contenido nuevo (p. ej. una sección cargada desde Markdown).
  function preparar(raiz) {
    raiz = raiz || document;
    cada('[data-split]', dividir, raiz);
    cada('[data-reveal-grupo]', function (grupo) {
      var k = 0;
      cada('[data-reveal]', function (hijo) {
        if (!hijo.style.getPropertyValue('--i')) hijo.style.setProperty('--i', k);
        k++;
      }, grupo);
    });
    var animables = raiz.querySelectorAll('[data-reveal]:not(.visible), [data-split]:not(.visible)');
    Array.prototype.forEach.call(animables, function (el) {
      if (!observador) { el.classList.add('visible', 'revelado'); return; }
      // Lo que ya está en pantalla entra de inmediato (sin esperar al observador).
      // getBoundingClientRect fuerza el cálculo de estilos, así la transición sí ocurre.
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92 && r.bottom > 0) revelar(el);
      else observador.observe(el);
    });
  }
  preparar(document);

  /* ------------------------------------------------- 3. Luz bajo el cursor */
  if (!tactil) {
    cada('[data-luz]', function (el) {
      el.addEventListener('pointermove', function (ev) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        el.style.setProperty('--my', (ev.clientY - r.top) + 'px');
      });
    });
  }

  /* ------------------------- 4. Progreso, barra, parallax, mapa, enlace activo */
  var barra = document.querySelector('.barra');
  var progreso = document.querySelector('.progreso');
  var parallax = document.querySelectorAll('[data-parallax]');
  var mapas = document.querySelectorAll('.mapa');
  var enlacesNav = document.querySelectorAll('.barra-nav a[href^="#"]');
  var pendiente = false;

  function actualizar() {
    pendiente = false;
    var y = window.scrollY || window.pageYOffset;
    var alto = innerHeight;
    var total = document.documentElement.scrollHeight - alto;

    if (progreso) progreso.style.setProperty('--p', total > 0 ? Math.min(1, y / total).toFixed(4) : 0);
    if (barra) barra.classList.toggle('con-scroll', y > 8);

    if (!reducir) {
      Array.prototype.forEach.call(parallax, function (el) {
        var f = parseFloat(el.getAttribute('data-parallax')) || 0;
        el.style.transform = 'translate3d(0,' + (y * f).toFixed(1) + 'px,0)';
      });
    }

    var linea = alto * 0.62; // la «línea de lectura»
    Array.prototype.forEach.call(mapas, function (mapa) {
      var r = mapa.getBoundingClientRect();
      var avance = Math.max(0, Math.min(1, (linea - r.top - 28) / Math.max(1, r.height - 56)));
      mapa.style.setProperty('--avance', avance.toFixed(4));
      cada('.mapa-item', function (item) {
        var num = item.querySelector('.mapa-num');
        var rn = (num || item).getBoundingClientRect();
        item.classList.toggle('alcanzado', rn.top + rn.height / 2 < linea);
      }, mapa);
    });

    var activo = null;
    Array.prototype.forEach.call(enlacesNav, function (a) {
      var s = document.querySelector(a.getAttribute('href'));
      if (!s) return;
      var rs = s.getBoundingClientRect();
      if (rs.top <= alto * 0.4 && rs.bottom > alto * 0.4) activo = a;
    });
    Array.prototype.forEach.call(enlacesNav, function (a) { a.classList.toggle('activo', a === activo); });
  }

  function alDesplazar() {
    if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
  }
  window.addEventListener('scroll', alDesplazar, { passive: true });
  window.addEventListener('resize', alDesplazar);
  actualizar();

  /* ------------------------------------------------ 5. Scroll suave (Lenis) */
  var lenis = null;
  if (!reducir && !tactil && typeof window.Lenis === 'function') {
    try {
      lenis = new window.Lenis({ lerp: 0.11, wheelMultiplier: 1 });
      var bucle = function (t) { lenis.raf(t); requestAnimationFrame(bucle); };
      requestAnimationFrame(bucle);
    } catch (e) { lenis = null; }
  }

  // Enlaces internos: desplazamiento suave con el desfase de la barra.
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href^="#"]');
    if (!a || a.classList.contains('saltar')) return;
    var id = a.getAttribute('href');
    if (id.length < 2) return;
    var destino = document.querySelector(id);
    if (!destino) return;
    ev.preventDefault();
    var desfase = -((barra ? barra.offsetHeight : 0) + 12);
    if (lenis) lenis.scrollTo(destino, { offset: desfase, duration: 1.2 });
    else window.scrollTo({ top: destino.getBoundingClientRect().top + window.scrollY + desfase, behavior: reducir ? 'auto' : 'smooth' });
    if (history.replaceState) history.replaceState(null, '', id);
  });

  window.Movimiento = { lenis: lenis, revelar: revelar, dividir: dividir, preparar: preparar, actualizar: alDesplazar };
  window.__movimiento = true;
})();
