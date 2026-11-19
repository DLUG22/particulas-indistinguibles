/* =============================================================================
   constantes.js — Constantes físicas y funciones seguras (Mecánica Cuántica I)
   -----------------------------------------------------------------------------
   Las líneas 92–108 de MC_Parcial1_Temas_Madre.md (§0.5) están copiadas LITERALES
   dentro de la IIFE, SIN sangría, para que la comparación sea exacta. NO retocar:
   el revisor las compara con el madre.
   Se publica window.C con todas las constantes (SI, CODATA 2022) y las funciones
   inv_expm1 y x_over_expm1. Añadidos: M_alpha (línea 674 del madre) y hc_eVnm.
   ============================================================================= */
(function () {
  'use strict';

// Constantes SI (CODATA 2022). Usar SIEMPRE estas, no redondeos.
const PI = Math.PI;
const h = 6.62607015e-34, hbar = h / (2 * PI), c = 299792458;
const kB = 1.380649e-23, e = 1.602176634e-19, eV = e;
const me = 9.1093837139e-31, mp = 1.67262192595e-27, mn = 1.67492750056e-27;
const eps0 = 8.8541878188e-12, NA = 6.02214076e23, R = NA * kB;
const e02 = e * e / (4 * PI * eps0);          // e0^2 [J m]
const a0 = hbar * hbar / (me * e02);           // = 5.29177211e-11 m
const Rinf = me * e02 * e02 / (4 * PI * c * hbar ** 3); // = 10973731.568 1/m
const lambdaC = h / (me * c);                  // = 2.42631024e-12 m
const bWien = 2.897771955e-3;                          // m K
const sigmaSB = 2 * PI ** 5 * kB ** 4 / (15 * h ** 3 * c ** 2);

// 1/(e^x - 1) sin desbordamiento ni pérdida de precisión (x > 0; en x = 0 diverge)
const inv_expm1 = x => (x > 0) ? Math.exp(-x) / (-Math.expm1(-x)) : 1 / Math.expm1(x);
// x/(e^x - 1): finita en todo x >= 0 (vale 1 en x = 0) y 0 en x = Infinity
const x_over_expm1 = x => (!isFinite(x)) ? 0 : (Math.abs(x) < 1e-8 ? 1 - x / 2 : x * inv_expm1(x));

  // ---- Añadidos (no forman parte del bloque literal) ----
  const M_alpha = 6.6446573450e-27;   // kg, masa de la partícula alfa (madre, línea 674)
  const hc_eVnm = 1239.841984;        // eV·nm (atajo E[eV] = 1239.841984/λ[nm])

  const C = {
    PI, h, hbar, c, kB, e, eV, me, mp, mn, eps0, NA, R, e02, a0, Rinf,
    lambdaC, bWien, sigmaSB, inv_expm1, x_over_expm1, M_alpha, hc_eVnm
  };
  Object.freeze(C);

  const raiz = (typeof window !== 'undefined') ? window : (typeof globalThis !== 'undefined' ? globalThis : this);
  raiz.C = C;
})();
