#!/usr/bin/env python3
"""
servidor.py — Servidor local para desarrollar la página (sólo biblioteca estándar).

Igual que `python3 -m http.server`, pero le dice al navegador que NO guarde copias
(Cache-Control: no-store), así cada recarga muestra los cambios recién hechos.

Uso, desde la raíz del repositorio:
    python3 herramientas/servidor.py          # http://localhost:8800/
    python3 herramientas/servidor.py 9000     # otro puerto

Sólo escucha en 127.0.0.1 (tu computador), no en la red.
"""
import functools
import http.server
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class SinCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()


def main():
    puerto = int(sys.argv[1]) if len(sys.argv) > 1 else 8800
    manejador = functools.partial(SinCache, directory=RAIZ)
    with http.server.ThreadingHTTPServer(("127.0.0.1", puerto), manejador) as srv:
        print(f"Sirviendo {RAIZ} en http://localhost:{puerto}/  (Ctrl+C para detener)")
        try:
            srv.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
