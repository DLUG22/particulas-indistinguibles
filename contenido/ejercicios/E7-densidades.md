---
titulo: Densidades de probabilidad de posición de dos partículas idénticas
numero: 7
cohen: Cohen, complemento D del cap. XIV · pp. 1499–1500
resumen: Las funciones densidad de una y de dos partículas, ρ_I y ρ_II, para dos electrones con espines opuestos, dos electrones con el mismo espín y dos bosones. Con espines opuestos no hay término de intercambio; con el mismo espín aparece un hueco (fermiones) o un apilamiento (bosones) en la diagonal r = r′.
---

## Enunciado {#enunciado}

$\ket\varphi$ y $\ket\chi$ son dos estados normalizados y ortogonales del espacio orbital $\mathscr E_{\mathbf r}$ de un electrón; $\ket+$ y $\ket-$ son los estados propios de $S_z$.

- **a)** Un electrón está en $\ket{\varphi,+}$ y el otro en $\ket{\chi,-}$. Sea $\rho_{II}(\mathbf r,\mathbf r')\,\mathrm d^3r\,\mathrm d^3r'$ la probabilidad de hallar uno de ellos en $\mathrm d^3r$ alrededor de $\mathbf r$ y el otro en $\mathrm d^3r'$ alrededor de $\mathbf r'$ (función densidad de dos partículas), y $\rho_I(\mathbf r)\,\mathrm d^3r$ la de hallar uno de los electrones en $\mathrm d^3r$ (función densidad de una partícula). Mostrar que
$$\begin{aligned}\rho_{II}(\mathbf r,\mathbf r')&=|\varphi(\mathbf r)|^2|\chi(\mathbf r')|^2\\&\;+|\varphi(\mathbf r')|^2|\chi(\mathbf r)|^2\\\rho_I(\mathbf r)&=|\varphi(\mathbf r)|^2+|\chi(\mathbf r)|^2\end{aligned}$$
y que siguen valiendo aunque $\varphi$ y $\chi$ no sean ortogonales. Calcular sus integrales sobre todo el espacio: ¿valen 1? Comparar con dos partículas **distinguibles** de espín ½, una en $\ket{\varphi,+}$ y otra en $\ket{\chi,-}$, medidas con un aparato que no las distingue.
- **b)** Ahora uno está en $\ket{\varphi,+}$ y el otro en $\ket{\chi,+}$. Mostrar que
$$\begin{aligned}\rho_{II}(\mathbf r,\mathbf r')&=\big|\varphi(\mathbf r)\chi(\mathbf r')-\varphi(\mathbf r')\chi(\mathbf r)\big|^2\\\rho_I(\mathbf r)&=|\varphi(\mathbf r)|^2+|\chi(\mathbf r)|^2\end{aligned}$$
Calcular las integrales. ¿Qué pasa si $\varphi$ y $\chi$ dejan de ser ortogonales?
- **c)** Las mismas preguntas para dos bosones idénticos, en el mismo estado de espín o en dos estados de espín ortogonales.

## Qué piden y estrategia {#estrategia}

1. Construir el ket físico con la regla de §C-3 y escribir su función de onda $\psi(\mathbf r_1,m_1;\mathbf r_2,m_2)$ con las etiquetas.
2. **«Uno en $\mathbf r$ y el otro en $\mathbf r'$»** se realiza de dos maneras (1 en $\mathbf r$ y 2 en $\mathbf r'$, o al revés) y no se mide el espín, así que
$$\begin{aligned}\rho_{II}(\mathbf r,\mathbf r')=\sum_{m,m'}\Big[&|\psi(\mathbf r,m;\mathbf r',m')|^2\\+\,&|\psi(\mathbf r',m';\mathbf r,m)|^2\Big]\end{aligned}$$
Para partículas idénticas los dos sumandos son iguales: $\rho_{II}=2\sum|\psi|^2$. Es (D-18) con la posición como observable.
3. **«Uno en $\mathbf r$»**: cualquiera de las dos, en cualquier sitio la otra: $\rho_I(\mathbf r)=\int\rho_{II}(\mathbf r,\mathbf r')\,\mathrm d^3r'$ (para $N=2$).

El espín decide si hay término de intercambio: es el mecanismo del §D-2-b-β.

## Solución paso a paso {#solucion}

### a) Espines opuestos {#a-espines-opuestos}

:::pasos Electrones en |φ,+⟩ y |χ,−⟩
+++ El ket físico
$$\begin{aligned}\ket\psi=\tfrac1{\sqrt2}\Big[&\ket{1\!:\!\varphi,+;2\!:\!\chi,-}\\-&\ket{1\!:\!\chi,-;2\!:\!\varphi,+}\Big]\end{aligned}$$
Su norma al cuadrado es $\tfrac12\big[1+1-2\,\mathrm{Re}\braket{\varphi}{\chi}\braket{+}{-}\braket{\chi}{\varphi}\braket{-}{+}\big]=1$.
> Los estados individuales $\ket{\varphi,+}$ y $\ket{\chi,-}$ son ortogonales **por el espín**, aunque $\varphi$ y $\chi$ no lo sean. Por eso el $1/\sqrt2$ sirve siempre.
+++ La función de onda con etiquetas
$$\begin{aligned}&\psi(\mathbf r_1,m_1;\mathbf r_2,m_2)\\&=\tfrac1{\sqrt2}\Big[\varphi(\mathbf r_1)\chi(\mathbf r_2)\,\delta_{m_1+}\delta_{m_2-}\\&\quad-\chi(\mathbf r_1)\varphi(\mathbf r_2)\,\delta_{m_1-}\delta_{m_2+}\Big]\end{aligned}$$
+++ Sumar sobre los espines
Los dos términos nunca coinciden en $(m_1,m_2)$, así que no hay producto cruzado:
$$\begin{aligned}\sum_{m_1,m_2}|\psi|^2=\tfrac12\Big[&|\varphi(\mathbf r_1)|^2|\chi(\mathbf r_2)|^2\\+\,&|\chi(\mathbf r_1)|^2|\varphi(\mathbf r_2)|^2\Big]\end{aligned}$$
> Aquí desaparece la interferencia: el término de intercambio tiene los espines al revés y es ortogonal al directo.
+++ La densidad de dos partículas
Con $\rho_{II}=2\sum|\psi|^2$:
$$\begin{aligned}\rho_{II}(\mathbf r,\mathbf r')=\;&|\varphi(\mathbf r)|^2|\chi(\mathbf r')|^2\\+\,&|\varphi(\mathbf r')|^2|\chi(\mathbf r)|^2\end{aligned}$$
+++ La densidad de una partícula
Integrando en $\mathbf r'$ con $\int|\varphi|^2=\int|\chi|^2=1$:
$$\rho_I(\mathbf r)=|\varphi(\mathbf r)|^2+|\chi(\mathbf r)|^2$$
> No se usó $\braket\varphi\chi=0$ en ningún paso: las fórmulas valen también si no son ortogonales.
+++ Las integrales
$$\begin{gathered}\int\rho_I\,\mathrm d^3r=2\\\iint\rho_{II}\,\mathrm d^3r\,\mathrm d^3r'=2\end{gathered}$$
> No valen 1: $\int\rho_I$ es el **número de partículas** $N$ y $\iint\rho_{II}$ el número de **pares ordenados** $N(N-1)$. $\rho_I$ es una densidad de partículas, no de probabilidad.
+++ Comparar con partículas distinguibles
Para $\ket{1\!:\!\varphi,+;2\!:\!\chi,-}$ y un aparato que no distingue cuál es cuál, «una en $\mathbf r$ y otra en $\mathbf r'$» suma las dos asignaciones:
$$|\varphi(\mathbf r)|^2|\chi(\mathbf r')|^2+|\varphi(\mathbf r')|^2|\chi(\mathbf r)|^2$$
**Exactamente lo mismo.**
> Con espines ortogonales que nada cambia, dos electrones se comportan como partículas distinguibles (§D-2-b-β).
:::

### b) El mismo espín {#b-mismo-espin}

:::pasos Electrones en |φ,+⟩ y |χ,+⟩
+++ El ket físico
$$\begin{aligned}\ket\psi=\tfrac1{\sqrt2}\Big[&\ket{1\!:\!\varphi;2\!:\!\chi}-\ket{1\!:\!\chi;2\!:\!\varphi}\Big]\\\otimes\,&\ket{1\!:\!+;2\!:\!+}\end{aligned}$$
+++ La densidad de dos partículas
Sólo hay un par de espines, $(+,+)$, y ahí están los dos términos:
$$\begin{aligned}&\rho_{II}(\mathbf r,\mathbf r')\\&=2\cdot\tfrac12\big|\varphi(\mathbf r)\chi(\mathbf r')-\chi(\mathbf r)\varphi(\mathbf r')\big|^2\\&=\big|\varphi(\mathbf r)\chi(\mathbf r')-\varphi(\mathbf r')\chi(\mathbf r)\big|^2\end{aligned}$$
> Ahora directo e intercambio **interfieren**. En la diagonal $\mathbf r=\mathbf r'$ se cancelan: $\rho_{II}(\mathbf r,\mathbf r)=0$.
+++ Desarrollar el cuadrado
$$\begin{aligned}\rho_{II}=\;&|\varphi(\mathbf r)|^2|\chi(\mathbf r')|^2\\+\,&|\varphi(\mathbf r')|^2|\chi(\mathbf r)|^2\\-\,&2\,\mathrm{Re}\big[\varphi(\mathbf r)\chi(\mathbf r')\varphi^*(\mathbf r')\chi^*(\mathbf r)\big]\end{aligned}$$
+++ La densidad de una partícula
Integrando en $\mathbf r'$, el término cruzado da $-2\,\mathrm{Re}\big[\varphi(\mathbf r)\chi^*(\mathbf r)\braket\varphi\chi\big]=0$ por ortogonalidad:
$$\rho_I(\mathbf r)=|\varphi(\mathbf r)|^2+|\chi(\mathbf r)|^2$$
> La densidad de una partícula **no ve** el intercambio (si $\varphi\perp\chi$): el efecto está en las correlaciones, no en dónde está cada electrón por separado.
+++ Las integrales
$$\begin{gathered}\int\rho_I=2\\\iint\rho_{II}=1+1-2|\braket\varphi\chi|^2=2\end{gathered}$$
+++ Si $\varphi$ y $\chi$ no son ortogonales
Con $S=\braket\varphi\chi\neq0$, la norma de $\ket{1\!:\!\varphi;2\!:\!\chi}-\ket{1\!:\!\chi;2\!:\!\varphi}$ es $\sqrt{2(1-|S|^2)}$. Normalizando,
$$\begin{aligned}\rho_{II}&=\frac{\big|\varphi(\mathbf r)\chi(\mathbf r')-\varphi(\mathbf r')\chi(\mathbf r)\big|^2}{1-|S|^2}\\\rho_I&=\frac{|\varphi|^2+|\chi|^2-2\,\mathrm{Re}\big(S\varphi\chi^*\big)}{1-|S|^2}\end{aligned}$$
Las integrales siguen valiendo 2, pero $\rho_I$ **ya no** es $|\varphi|^2+|\chi|^2$.
> Si $|S|\to1$ los dos orbitales son el mismo y el estado no existe (Pauli).
:::

### c) Dos bosones {#c-bosones}

:::pasos Bosones con el mismo espín o con espines ortogonales
+++ Espines ortogonales
Todo el razonamiento de a) se repite con signo $+$: el término de intercambio tiene espines distintos y no interfiere.
$$\begin{aligned}\rho_{II}&=|\varphi(\mathbf r)|^2|\chi(\mathbf r')|^2\\&\;+|\varphi(\mathbf r')|^2|\chi(\mathbf r)|^2\\\rho_I&=|\varphi|^2+|\chi|^2\end{aligned}$$
Valen aunque $\varphi\not\perp\chi$; integrales 2 y 2.
+++ El mismo estado de espín
Como en b) pero con $+$:
$$\begin{aligned}\rho_{II}&=\frac{\big|\varphi(\mathbf r)\chi(\mathbf r')+\varphi(\mathbf r')\chi(\mathbf r)\big|^2}{1+|S|^2}\\\rho_I&=\frac{|\varphi|^2+|\chi|^2+2\,\mathrm{Re}\big(S\varphi\chi^*\big)}{1+|S|^2}\end{aligned}$$
con $S=0$ si son ortogonales. Integrales 2 y 2.
> En la diagonal, $\rho_{II}(\mathbf r,\mathbf r)=4|\varphi(\mathbf r)|^2|\chi(\mathbf r)|^2/(1+|S|^2)$: el **doble** que con espines distintos (si $S=0$). Los bosones tienden a estar juntos.
:::

## Resultado {#resultado}

:::resultado
| Sistema | $\rho_{II}(\mathbf r,\mathbf r')$ | $\rho_I(\mathbf r)$ |
|---|---|---|
| espines ortogonales (fermiones o bosones) o distinguibles con aparato ciego | $\lvert\varphi\rvert^2\lvert\chi'\rvert^2+\lvert\varphi'\rvert^2\lvert\chi\rvert^2$ | $\lvert\varphi\rvert^2+\lvert\chi\rvert^2$ |
| fermiones, mismo espín | $\lvert\varphi\chi'-\varphi'\chi\rvert^2$ | $\lvert\varphi\rvert^2+\lvert\chi\rvert^2$ |
| bosones, mismo espín | $\lvert\varphi\chi'+\varphi'\chi\rvert^2$ | $\lvert\varphi\rvert^2+\lvert\chi\rvert^2$ |

(primas: evaluadas en $\mathbf r'$; $\varphi\perp\chi$). Siempre $\int\rho_I=2$ y $\iint\rho_{II}=2$. Si $\varphi\not\perp\chi$, las fórmulas con espines ortogonales no cambian; las de mismo espín se dividen por $1\mp|S|^2$ y $\rho_I$ gana el término $\mp2\,\mathrm{Re}[S\varphi\chi^*]$.
:::

## Verificación {#verificacion}

- **Dimensiones.** $|\varphi|^2$ es 1/volumen: $\rho_I$ es una densidad por volumen y $\rho_{II}$ por volumen al cuadrado.
- **Sumas.** $\int\rho_I=N=2$ y $\iint\rho_{II}=N(N-1)=2$ en todos los casos; y $\int\rho_{II}(\mathbf r,\mathbf r')\,\mathrm d^3r'=(N-1)\rho_I(\mathbf r)$.
- **Diagonal.** Fermiones del mismo espín: $\rho_{II}(\mathbf r,\mathbf r)=0$ para todo $\mathbf r$. Bosones del mismo espín: el doble que distinguibles.
- **Límite de orbitales lejanos.** Si $\varphi$ y $\chi$ no se solapan, el término cruzado $\varphi(\mathbf r)\chi^*(\mathbf r)$ es cero en todas partes y los tres casos coinciden (§D-2-b-α).
- **Simulación con los datos del enunciado.** En una dimensión, con dos casos de orbitales: los dos primeros estados del oscilador (ortogonales) y dos gaussianas separadas una distancia $d$ (no ortogonales, $S=e^{-d^2/4}$). La lectura de las integrales da 2 y 2 en todos los casos. Las pruebas comparan con Python, donde se armó $\psi(x_1,m_1;x_2,m_2)$ completa (con espín) y se normalizó numéricamente, sin usar las fórmulas de arriba.

```sim
id: ej7-densidades
pie: Primer panel: ρ_II(x, x′) en una dimensión; la diagonal punteada es x = x′. Segundo panel: ρ_I(x) (curva de color) frente a |φ|² + |χ|² (gris discontinuo). Con orbitales ortogonales las dos curvas del segundo panel coinciden en todos los casos: el intercambio sólo se ve en ρ_II. Con gaussianas no ortogonales y el mismo espín, ρ_I se aparta: los fermiones vacían el centro y los bosones lo llenan. Con d = 0 dos fermiones del mismo espín no caben.
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
La función densidad de una partícula es casi ciega a la estadística: si los orbitales son ortogonales, $\rho_I=|\varphi|^2+|\chi|^2$ para fermiones, bosones y distinguibles. Lo que cambia son las **correlaciones**, que están en $\rho_{II}$. Dos electrones con el mismo espín tienen probabilidad cero de estar en el mismo punto y poca de estar cerca: alrededor de cada electrón hay un **hueco de Fermi** (o de intercambio). Dos bosones del mismo estado de espín, al revés, tienden a estar juntos.

Con espines opuestos no hay hueco: el espín los hace distinguibles. Por eso en el helio, o en una molécula, los dos electrones de un singlete pueden acercarse (y sentir más la repulsión) mientras que los de un triplete se evitan: el origen de la energía de intercambio del complemento B.
:::

:::error-comun Esperar que $\int\rho_I\,\mathrm d^3r=1$
$\rho_I$ cuenta partículas: su integral es $N$. Para tener una densidad de probabilidad hay que dividir por $N$.
:::

:::error-comun Creer que la antisimetría cambia la densidad electrónica
Con orbitales ortogonales, $\rho_I$ es la misma para cualquier estadística. La antisimetría se manifiesta en $\rho_{II}$, es decir, en dónde está un electrón **dado** dónde está el otro.
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Y si los dos electrones están en el singlete de espín con la parte orbital simétrica?
El estado es $\tfrac1{\sqrt2}[\ket{\varphi\chi}+\ket{\chi\varphi}]\otimes\ket{0,0}$. Sumando sobre los espines del singlete, $\rho_{II}=|\varphi\chi'+\varphi'\chi|^2$, como dos bosones del mismo espín: los electrones del singlete **se agrupan**. Y en el triplete con $M=0$, $\rho_{II}=|\varphi\chi'-\varphi'\chi|^2$, como en b). El estado $\ket{\varphi,+;\chi,-}$ de a) es la mitad singlete y la mitad triplete: su $\rho_{II}$ es el promedio de las dos.
:::

:::pregunta ¿Qué pasa con tres electrones del mismo espín?
$\rho_{II}$ sigue anulándose cuando dos posiciones coinciden, $\int\rho_I=3$ y $\iint\rho_{II}=6$. El ejercicio 9 hace el cálculo para $N\to\infty$ electrones libres y obtiene la forma del hueco: $\rho_{II}^{++}\propto1-F^2(k_Fr)$.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 7, pp. 1499–1500. Usa §C-3 (C-4), §D-2-a-α (D-17, D-18) y §D-2-b (D-33 a D-38).
- Sección 5 de esta página y su simulación `densidad-dos-particulas`.
