# Plantillas de prompts

Las usamos **los dos** para pedirle cosas a Claude de la misma forma, así el resultado sale con el mismo estilo sin importar quién lo pidió. Copia la plantilla, rellena lo que está entre `⟨…⟩` y pégala en Claude Code **abierto en la carpeta del repositorio** (así lee `CLAUDE.md` solo).

| Plantilla | Para qué |
|---|---|
| [`00-material.md`](00-material.md) | Convertir un PDF del material en notas Markdown (se hace **una vez** por documento). |
| [`01-seccion.md`](01-seccion.md) | Escribir una sección de teoría. |
| [`02-ejercicio.md`](02-ejercicio.md) | Resolver un ejercicio del parcial con paso a paso. |
| [`03-simulacion.md`](03-simulacion.md) | Programar una simulación. |
| [`04-revisar-pr.md`](04-revisar-pr.md) | Revisar el PR de la otra persona. |

Consejos para gastar menos:
- **Una tarea por sesión.** Al terminar, empieza la siguiente con `/clear`.
- Para tareas grandes, pide primero el plan (modo plan) y aprueba antes de que escriba.
- Señala los archivos exactos (`@contenido/03-simetrizacion.md`) en vez de «busca dónde está…».
