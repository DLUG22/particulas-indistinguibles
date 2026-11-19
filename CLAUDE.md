# CLAUDE.md — Partículas indistinguibles (Física Atómica y Nuclear · UT)

Este repositorio es una página web educativa para el parcial de **partículas indistinguibles**. La hace David con Claude. Este archivo reúne las reglas del proyecto: si algo aquí choca con una petición, pregunta antes de romper la regla.

El plan completo está en `PLAN.md` (léelo si la tarea es grande o no sabes por dónde va el proyecto).

## Idioma y tono
- Todo el texto visible, los comentarios del código, los commits y los PR van en **español**.
- Escribe para un estudiante de física de VII semestre: riguroso, sin relleno, con el «por qué» físico de cada paso.
- Notación de Cohen-Tannoudji (cap. XIV): kets `|1:u; 2:v⟩`, `P₂₁`, `S`, `A`, ħ explícito.

## Organización de archivos
- Un archivo por sección (`contenido/NN-nombre.md`), uno por ejercicio (`contenido/ejercicios/EN-nombre.md`) y uno por simulación (`js/sims/<id>.js`). Así cada cambio queda acotado y es fácil de revisar.
- La infraestructura (`*.html`, `css/`, `js/sitio/`, `js/nucleo/`) se toca sólo cuando la tarea lo pide. El motor de `js/nucleo/` es el de MC I: no se cambia su interfaz.

## Arquitectura (no cambiar sin acordarlo)
- Sitio estático **sin compilación**: HTML + CSS + JS **clásico** (nada de `type="module"`, nada de npm ni bundlers). GitHub Pages sirve la raíz del repo.
- Bibliotecas sólo por CDN con **versión exacta** (KaTeX 0.16.25, markdown-it 14.1.0, markdown-it-texmath 1.0.0, Lenis 1.1.13). Si una no carga, la página debe seguir funcionando.
- El contenido vive en `contenido/*.md` (fuente única). Si el HTML contradice al `.md`, manda el `.md`.
- Simulaciones: un archivo por simulación en `js/sims/<id>.js`, con la interfaz del motor de MC I (`registrarSim`, `Graf`, `UI`, `Num`). **`CONTRATO.md` manda.** Cada simulación nueva se agrega a `js/sims/lista.js`.
- `localStorage` siempre dentro de `try/catch`.

## Sistema de diseño
- **Colores y medidas sólo con los tokens de `css/tokens.css`.** Nada de colores sueltos en el CSS ni en el JS (el JS los lee con `getComputedStyle`).
- **Convención física de color** (la misma en texto, gráficas y simulaciones):
  - `--boson` (azul) = bosones / simétrico
  - `--fermion` (rojo UT) = fermiones / antisimétrico
  - `--distinguible` (gris, discontinuo en gráficas) = distinguibles / clásico
- Tipografía: `--f-titulo` (Fraunces) para títulos, `--f-texto` (Inter) para el texto. Ancho de lectura: `--ancho-lectura`.
- **Movimiento: usa sólo los atributos que ya maneja `js/sitio/movimiento.js`**; no inventes animaciones nuevas en cada página:
  - `data-reveal` → entra con desenfoque + subida al aparecer en pantalla.
  - `data-reveal-grupo` en el padre → los hijos con `data-reveal` entran escalonados.
  - `data-split` en un título de texto plano → entra palabra por palabra.
  - `data-luz` en una tarjeta → luz que sigue al cursor.
  - `data-parallax="0.1"` → desplazamiento suave con el scroll.
- Todo debe verse bien **sin** animaciones (`prefers-reduced-motion`) y en impresión (`css/impresion.css`).

## Contenido: cómo se escribe
- Cada sección sigue la anatomía de `PLAN.md` §5 (idea central → teoría → simulación → esqueleto → preguntas → errores comunes → referencias).
- Cada ejercicio sigue: enunciado → estrategia → **paso a paso** (cada paso con comentario) → resultado → verificación → entendimiento físico → ¿qué pasa si…?
- **No copies texto literal de los libros.** Redacta con palabras propias y cita (autor, obra, sección, página).
- Las fórmulas en LaTeX (`$…$`, `$$…$$`). Antes de dar por buena una derivación, verifícala (dimensiones, casos límite, y si se puede, numéricamente con Python).
- Las ecuaciones en bloque deben caber en un celular (375 px): si una es larga, pártela con `\begin{aligned}…\end{aligned}` en vez de dejar que se desplace de lado.

## Material de la materia
- **Única fuente: Cohen-Tannoudji, *Quantum Mechanics*, vol. II, 2.ª ed. (Wiley, 2020), cap. XIV, pp. 1419–1504.** Los ejercicios del parcial son los del complemento D_XIV (9 ejercicios, pp. 1496–1504).
- Todo va en `material/`, que **no se sube** a GitHub (derechos de autor). Se genera con `python3 herramientas/extraer_cohen.py "<ruta al CohenII.pdf>"`:
  - `material/Cohen_II_cap_XIV_pp1419-1504.pdf`: sólo el capítulo. La página del PDF es la página del libro − 1418.
  - `material/notas/cohen-XIV-mapa.md`: árbol de secciones con su página. **Empieza por aquí** para saber qué páginas leer.
  - `material/notas/cohen-XIV-texto-crudo.txt`: texto plano para *buscar*. Las ecuaciones salen incompletas, así que las fórmulas se leen del PDF.
- Para ahorrar costos: **lee las notas de `material/notas/*.md` antes que el PDF**, y del PDF lee sólo las páginas que necesites (con `pages`). Si la nota de una sección no existe, créala una vez (plantilla `docs/prompts/00-material.md`) y úsala desde entonces.

## Flujo de trabajo
- Haz commit sólo cuando David lo pida. Para cambios grandes, mejor una rama por tarea y un PR.
- Mensajes de commit en español, en imperativo: «Agrega la sección 3: postulado de simetrización».
- Servidor local (sin caché) desde la raíz del repo: `python3 herramientas/servidor.py` y abre `http://localhost:8800/`.
- **Antes de decir que algo está listo**: ábrelo en el navegador, revisa la consola (0 errores), el modo claro y el oscuro, el ancho de celular (375 px) y, si tocaste una simulación, sus pruebas numéricas.
