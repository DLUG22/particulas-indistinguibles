# Partículas indistinguibles

Página web interactiva sobre **sistemas de partículas idénticas** para la asignatura **Física Atómica y Nuclear** del programa de Física de la **Universidad del Tolima**.

Incluye la teoría completa, simulaciones interactivas, el paso a paso de los ejercicios del parcial, el entendimiento físico de cada resultado, referencias y una versión para imprimir.

## Ver la página

- **En línea:** *(enlace de GitHub Pages cuando se publique)*
- **En tu computador:** desde la carpeta del repositorio,

  ```bash
  python3 herramientas/servidor.py
  ```

  y abre <http://localhost:8800/>.

## Estructura

| Carpeta | Qué hay |
|---|---|
| `contenido/` | Teoría y ejercicios en Markdown (fuente única del texto). |
| `js/sims/` | Una simulación por archivo. |
| `js/nucleo/` | Motor de gráficas y controles de las simulaciones. |
| `js/sitio/` | Tema claro/oscuro, animaciones, navegación. |
| `css/` | Sistema de diseño: tokens, componentes, movimiento, impresión. |
| `docs/prompts/` | Plantillas de prompts que usamos para trabajar con Claude. |

El plan del proyecto está en [`PLAN.md`](PLAN.md) y las reglas de trabajo en [`CLAUDE.md`](CLAUDE.md).

## Créditos

Material educativo desarrollado por estudiantes de Física de la Universidad del Tolima para la asignatura Física Atómica y Nuclear, 2026.
**Autor principal:** David L. Urueña G. · ORCID [0009-0007-6006-8380](https://orcid.org/0009-0007-6006-8380).

Referencia principal: C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, cap. XIV.
