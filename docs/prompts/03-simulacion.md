Programa la simulación `⟨id⟩` en `js/sims/⟨id⟩.js` a partir de su bloque ```` ```sim ```` en `contenido/⟨archivo⟩.md`.

Reglas:
- Sigue `CONTRATO.md` y copia la estructura de una simulación existente en `js/sims/`.
- Sólo escribes ese archivo. Si falta algo en el motor, impleméntalo localmente en tu archivo y avísame.
- `calcular` es pura (sin DOM); el DOM sólo dentro de `montar`.
- Colores por token: bosones `--boson`, fermiones `--fermion`, distinguibles `--distinguible` (discontinuo).
- Todo el texto visible en español; las lecturas con unidades.

Al terminar:
1. Corre sus pruebas numéricas y muéstrame el `RESULTADO: k/k`.
2. Ábrela en el navegador (`python3 -m http.server 8800`), prueba cada control en su mínimo y su máximo, y revisa la consola, el modo oscuro y los 375 px.
3. Dime qué ve el estudiante y qué física debería notar al mover cada control.
