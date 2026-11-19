#!/usr/bin/env python3
"""
extraer_cohen.py — Prepara el material del Cohen para trabajar con Claude sin releer el PDF.

Fuente: C. Cohen-Tannoudji, B. Diu y F. Laloë, Quantum Mechanics, vol. II, 2.ª ed.
(Wiley-VCH, 2020), cap. XIV «Systems of Identical Particles», págs. 1419–1504 del libro.

Escribe en material/ (que NO se sube a GitHub, por derechos de autor):
  material/Cohen_II_cap_XIV_pp1419-1504.pdf     sólo el capítulo (86 págs.)
  material/notas/cohen-XIV-texto-crudo.txt      texto plano por página, para BUSCAR
                                                (las ecuaciones salen incompletas)
  material/notas/cohen-XIV-mapa.md              árbol de secciones con su página

Uso (necesita pypdf: python3 -m pip install pypdf):
  python3 herramientas/extraer_cohen.py "/ruta/a/CohenII.pdf"

Si tu PDF tiene otra paginación, ajusta el desfase con --desfase N
(índice de página en el PDF, base 0 = página del libro − N). En el PDF de
David (CohenII.pdf, 692 págs.), N = 901.
"""
import argparse
import os
import re
import sys

try:
    import pypdf
except ImportError:
    sys.exit("Falta pypdf. Instálalo con:  python3 -m pip install pypdf")

INICIO, FIN = 1419, 1504
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PATRON_TITULO = re.compile(r'^\s*((?:[A-D]-\d+(?:-[a-z])?\.)|(?:\d+-[a-z]\.)|(?:\d+\.\s))\s*(.{3,90})$')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pdf", help="PDF completo del Cohen, vol. II (2.ª ed.)")
    ap.add_argument("--desfase", type=int, default=901, help="página del libro − índice del PDF (por defecto 901)")
    args = ap.parse_args()

    lector = pypdf.PdfReader(args.pdf)
    primera = (lector.pages[INICIO - args.desfase].extract_text() or "")[:200]
    if "XIV" not in primera and "identical" not in primera.lower():
        sys.exit(f"La página {INICIO} no parece el inicio del cap. XIV con desfase {args.desfase}. "
                 "Ajusta --desfase.")

    salida = os.path.join(RAIZ, "material")
    notas = os.path.join(salida, "notas")
    os.makedirs(notas, exist_ok=True)

    # 1) Sólo el capítulo
    escritor = pypdf.PdfWriter()
    for b in range(INICIO, FIN + 1):
        escritor.add_page(lector.pages[b - args.desfase])
    ruta_pdf = os.path.join(salida, f"Cohen_II_cap_XIV_pp{INICIO}-{FIN}.pdf")
    with open(ruta_pdf, "wb") as f:
        escritor.write(f)

    # 2) Texto crudo y 3) mapa de secciones
    trozos, mapa, complemento = [], [], None
    for b in range(INICIO, FIN + 1):
        texto = lector.pages[b - args.desfase].extract_text() or ""
        trozos.append(f"\n===== pág. libro {b} · pág. {b - INICIO + 1} del PDF del capítulo =====\n{texto}")
        m = re.search(r'Complement ([A-D])XIV', texto[:300])
        if m and m.group(1) != complemento and b < FIN:
            complemento = m.group(1)
            mapa.append((b, f"\n## Complemento {complemento}_XIV\n"))
        for linea in texto.splitlines():
            mm = PATRON_TITULO.match(linea)
            if mm and not re.search(r'\.\s*\.\s*\.', linea):
                nivel = linea.strip().split()[0].count("-")
                mapa.append((b, "  " * nivel + f"- {linea.strip()} — p. {b}"))

    with open(os.path.join(notas, "cohen-XIV-texto-crudo.txt"), "w", encoding="utf-8") as f:
        f.write("Texto extraído con pypdf del Cohen II (2.ª ed.), cap. XIV. "
                "Las ecuaciones salen incompletas: úsalo para buscar, no para copiar fórmulas.\n")
        f.write("".join(trozos))

    with open(os.path.join(notas, "cohen-XIV-mapa.md"), "w", encoding="utf-8") as f:
        f.write("# Mapa del cap. XIV — Cohen II (2.ª ed.)\n\n")
        f.write(f"Páginas del libro {INICIO}–{FIN}. Página del PDF del capítulo = página del libro − {INICIO - 1}.\n")
        f.write("Títulos detectados automáticamente (algunos salen cortados o sin símbolos).\n\n## Capítulo\n")
        f.write("\n".join(t for _, t in mapa) + "\n")

    print(f"Listo: {ruta_pdf}")
    print(f"       {notas}/cohen-XIV-texto-crudo.txt")
    print(f"       {notas}/cohen-XIV-mapa.md ({len(mapa)} entradas)")


if __name__ == "__main__":
    main()
