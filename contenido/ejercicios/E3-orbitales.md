---
titulo: Dos electrones de espín + en orbitales p
numero: 3
cohen: Cohen, complemento D del cap. XIV · p. 1496
resumen: Dos electrones con el mismo espín ocupan los orbitales p_x y p_y. Construimos el estado antisimétrico, vemos que no cambia si se usan otros dos orbitales p del plano xOy, y calculamos la densidad de probabilidad de posición. Resultado: los dos electrones nunca tienen el mismo azimut y prefieren estar a 90° uno del otro.
---

## Enunciado {#enunciado}

El espacio orbital de un electrón está generado por dos orbitales atómicos, $\ket{\varphi_{p_x}}$ y $\ket{\varphi_{p_y}}$, con funciones de onda

$$\begin{aligned}\varphi_{p_x}(\mathbf r)&=R(r)\,\operatorname{sen}\theta\cos\varphi\\\varphi_{p_y}(\mathbf r)&=R(r)\,\operatorname{sen}\theta\operatorname{sen}\varphi\end{aligned}$$

(complemento E_VII del Cohen, §2-b; $x\,f(r)$ y $y\,f(r)$ con $R(r)=r f(r)$).

- **a)** Escribir, en términos de $\ket{\varphi_{p_x}}$ y $\ket{\varphi_{p_y}}$, el orbital $\ket{\varphi_{p_\alpha}}$ que apunta en la dirección del plano $xOy$ que forma un ángulo $\alpha$ con $Ox$.
- **b)** Dos electrones tienen los dos el espín en $\ket+$ (valor propio $+\hbar/2$ de $S_z$). Escribir el vector de estado normalizado del sistema con un electrón en $\ket{\varphi_{p_x}}$ y el otro en $\ket{\varphi_{p_y}}$.
- **c)** Lo mismo con un electrón en $\ket{\varphi_{p_\alpha}}$ y el otro en $\ket{\varphi_{p_\beta}}$, con $\alpha$ y $\beta$ arbitrarios. Mostrar que se obtiene el mismo estado.
- **d)** En el estado de b), calcular la densidad de probabilidad $\mathcal P(r,\theta,\varphi;\,r',\theta',\varphi')$ de hallar un electrón en $(r,\theta,\varphi)$ y el otro en $(r',\theta',\varphi')$. Mostrar que la densidad electrónica $\rho(r,\theta,\varphi)$ tiene simetría de revolución alrededor de $Oz$. Hallar la densidad de probabilidad de que $\varphi-\varphi'=\varphi_0$ y discutir cómo varía con $\varphi_0$.

:::nota
En el libro, la función de $p_y$ aparece con $\cos\varphi$, igual que la de $p_x$: es una errata. $y=r\operatorname{sen}\theta\operatorname{sen}\varphi$, así que $p_y$ lleva $\operatorname{sen}\varphi$.
:::

## Qué piden y estrategia {#estrategia}

- **a)** es geometría: un orbital $p$ es «la coordenada en una dirección por una función radial», así que $p_\alpha$ es la combinación de $p_x$ y $p_y$ con los cosenos directores de esa dirección.
- **b)** y **c)** son la regla de construcción de kets físicos de §C-3 (ec. C-4) para fermiones. Como los dos espines son iguales, la parte de espín es **simétrica** y toda la antisimetría recae en la parte orbital.
- **c)** se reduce a desarrollar $p_\alpha$ y $p_\beta$ en la base $\{p_x,p_y\}$: el antisimetrizador sólo conserva el «determinante» de los coeficientes.
- **d)** es la densidad de dos partículas de §D-2-a (ec. D-18 con la posición como observable), integrada sobre las variables que no interesan. Usamos la normalización de los orbitales para hacer las integrales radiales y polares sin conocer $R(r)$.

## Solución paso a paso {#solucion}

### a) El orbital $p_\alpha$ {#a-orbital}

:::pasos El orbital que apunta en la dirección α
+++ La dirección
El vector unitario del plano $xOy$ que forma un ángulo $\alpha$ con $Ox$ es $\mathbf u_\alpha=(\cos\alpha,\operatorname{sen}\alpha,0)$. La coordenada a lo largo de él es
$$\mathbf u_\alpha\cdot\mathbf r=x\cos\alpha+y\operatorname{sen}\alpha$$
> $p_x$ es «$x$ por algo radial»; el orbital que apunta en $\mathbf u_\alpha$ es «$\mathbf u_\alpha\cdot\mathbf r$ por lo mismo».
+++ El orbital
$$\begin{aligned}\varphi_{p_\alpha}(\mathbf r)&=(x\cos\alpha+y\operatorname{sen}\alpha)\,f(r)\\&=R(r)\operatorname{sen}\theta\cos(\varphi-\alpha)\end{aligned}$$
es decir,
$$\ket{\varphi_{p_\alpha}}=\cos\alpha\,\ket{\varphi_{p_x}}+\operatorname{sen}\alpha\,\ket{\varphi_{p_y}}$$
> Está normalizado porque $p_x\perp p_y$ y $\cos^2\alpha+\operatorname{sen}^2\alpha=1$. Es el mismo orbital girado un ángulo $\alpha$ alrededor de $Oz$.
:::

### b) El estado de los dos electrones {#b-estado}

:::pasos Antisimetrizar con los dos espines en +
+++ Numerar y construir el ket producto
$$\ket u=\ket{1\!:\!\varphi_{p_x},+;\;2\!:\!\varphi_{p_y},+}$$
> Paso (i) de la regla de §C-3-a: la numeración es arbitraria.
+++ Antisimetrizar y normalizar
Los estados individuales $\ket{\varphi_{p_x},+}$ y $\ket{\varphi_{p_y},+}$ son ortogonales, así que por (C-4) con $\varepsilon=-1$:
$$\begin{aligned}\ket\psi=\tfrac1{\sqrt2}\Big[&\ket{1\!:\!\varphi_{p_x},+;2\!:\!\varphi_{p_y},+}\\-&\ket{1\!:\!\varphi_{p_y},+;2\!:\!\varphi_{p_x},+}\Big]\end{aligned}$$
+++ Separar espín y órbita
$$\begin{aligned}\ket\psi=\tfrac1{\sqrt2}\Big[&\ket{1\!:\!\varphi_{p_x};2\!:\!\varphi_{p_y}}\\-&\ket{1\!:\!\varphi_{p_y};2\!:\!\varphi_{p_x}}\Big]\\\otimes\,&\ket{1\!:\!+;2\!:\!+}\end{aligned}$$
> La parte de espín $\ket{+,+}$ es simétrica (triplete, $M=1$). Para que el total sea antisimétrico, la parte orbital tiene que ser antisimétrica.
:::

### c) Con $p_\alpha$ y $p_\beta$ se obtiene el mismo estado {#c-mismo-estado}

:::pasos Cambiar de orbitales no cambia el estado
+++ Desarrollar el ket orbital antisimetrizado
Con $\ket{p_\alpha}=c_\alpha\ket{p_x}+s_\alpha\ket{p_y}$ (abreviando $c_\alpha=\cos\alpha$, $s_\alpha=\operatorname{sen}\alpha$) y lo mismo para $\beta$:
$$\begin{aligned}&\ket{1\!:\!p_\alpha;2\!:\!p_\beta}-\ket{1\!:\!p_\beta;2\!:\!p_\alpha}\\&=(c_\alpha c_\beta-c_\beta c_\alpha)\ket{1\!:\!p_x;2\!:\!p_x}\\&+(c_\alpha s_\beta-c_\beta s_\alpha)\ket{1\!:\!p_x;2\!:\!p_y}\\&+(s_\alpha c_\beta-s_\beta c_\alpha)\ket{1\!:\!p_y;2\!:\!p_x}\\&+(s_\alpha s_\beta-s_\beta s_\alpha)\ket{1\!:\!p_y;2\!:\!p_y}\end{aligned}$$
> Los términos con el mismo orbital dos veces se cancelan: es Pauli trabajando dentro del cálculo.
+++ Reconocer el determinante
$c_\alpha s_\beta-s_\alpha c_\beta=\operatorname{sen}(\beta-\alpha)$, así que
$$\begin{aligned}&\ket{1\!:\!p_\alpha;2\!:\!p_\beta}-\ket{1\!:\!p_\beta;2\!:\!p_\alpha}\\&=\operatorname{sen}(\beta-\alpha)\\&\;\times\Big[\ket{1\!:\!p_x;2\!:\!p_y}-\ket{1\!:\!p_y;2\!:\!p_x}\Big]\end{aligned}$$
> $\operatorname{sen}(\beta-\alpha)$ es el determinante de la matriz de cambio de base $\begin{pmatrix}c_\alpha&s_\alpha\\c_\beta&s_\beta\end{pmatrix}$: el antisimetrizador sólo «ve» el determinante (B-63).
+++ Normalizar
El corchete tiene norma $\sqrt2$; por tanto, si $\operatorname{sen}(\beta-\alpha)\neq0$,
$$\ket{\psi_{\alpha\beta}}=\frac{\operatorname{sen}(\beta-\alpha)}{|\operatorname{sen}(\beta-\alpha)|}\,\ket\psi=\pm\ket\psi$$
> Un factor de fase global no cambia el estado físico: **es el mismo estado**. Si $\beta=\alpha$ (o $\alpha+\pi$), $p_\alpha$ y $p_\beta$ son el mismo orbital y el ket se anula: Pauli.
:::

### d) Densidades de probabilidad {#d-densidades}

:::pasos De la función de onda a las densidades
+++ La función de onda de dos electrones
Proyectando la parte orbital de b) sobre $\ket{1\!:\!\mathbf r;2\!:\!\mathbf r'}$:
$$\begin{aligned}\psi(\mathbf r,\mathbf r')&=\tfrac1{\sqrt2}R(r)R(r')\\&\;\times\operatorname{sen}\theta\operatorname{sen}\theta'\\&\;\times\big[\cos\varphi\operatorname{sen}\varphi'\\&\qquad-\operatorname{sen}\varphi\cos\varphi'\big]\\&=-\tfrac1{\sqrt2}R(r)R(r')\\&\;\times\operatorname{sen}\theta\operatorname{sen}\theta'\operatorname{sen}(\varphi-\varphi')\end{aligned}$$
> La parte de espín $\ket{+,+}$ sólo da un factor 1: los dos espines están fijos.
+++ La densidad «uno aquí y el otro allá»
«Un electrón en $\mathbf r$ y el otro en $\mathbf r'$» se realiza de dos maneras (1 en $\mathbf r$ y 2 en $\mathbf r'$, o al revés), que dan la misma $|\psi|^2$. Por tanto, como en el ejercicio 7,
$$\begin{aligned}&\mathcal P(r,\theta,\varphi;r',\theta',\varphi')\\&=2|\psi(\mathbf r,\mathbf r')|^2=|R(r)|^2|R(r')|^2\\&\;\times\operatorname{sen}^2\theta\operatorname{sen}^2\theta'\operatorname{sen}^2(\varphi-\varphi')\end{aligned}$$
con el elemento de volumen $r^2\operatorname{sen}\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\varphi$ para cada electrón.
> Es (D-18) con la posición como observable: término directo menos término de intercambio, al cuadrado.
+++ Las integrales que vamos a usar
La normalización de $p_x$ es
$$\begin{aligned}&\int_0^\infty\!|R|^2r^2\mathrm dr\int_0^\pi\!\operatorname{sen}^3\theta\,\mathrm d\theta\\&\;\times\int_0^{2\pi}\!\cos^2\varphi\,\mathrm d\varphi=1\end{aligned}$$
Con $\int\operatorname{sen}^3\theta\,\mathrm d\theta=\tfrac43$ y $\int\cos^2\varphi\,\mathrm d\varphi=\pi$:
$$\int_0^\infty|R(r)|^2r^2\,\mathrm dr=\frac{3}{4\pi}$$
> No hace falta conocer $R(r)$: basta su normalización.
+++ La densidad electrónica
Integramos sobre la posición del otro electrón:
$$\begin{aligned}\rho(\mathbf r)&=\int\mathcal P\,\mathrm d^3r'\\&=|R(r)|^2\operatorname{sen}^2\theta\cdot\tfrac{3}{4\pi}\cdot\tfrac43\\&\;\times\int_0^{2\pi}\!\operatorname{sen}^2(\varphi-\varphi')\,\mathrm d\varphi'\\&=|R(r)|^2\operatorname{sen}^2\theta\end{aligned}$$
porque la última integral vale $\pi$ para todo $\varphi$.
> $\rho$ **no depende de $\varphi$**: tiene simetría de revolución alrededor de $Oz$. Coincide con $|\varphi_{p_x}|^2+|\varphi_{p_y}|^2$ (ejercicio 7) e integra a 2, el número de electrones.
+++ La densidad del ángulo relativo
Para la variable $\varphi_0=\varphi_1-\varphi_2$ (con las etiquetas, que es una variable aleatoria bien definida porque $|\psi|^2$ es simétrica), integramos $|\psi|^2$ sobre $r,\theta,r',\theta'$: cada electrón aporta $\tfrac{3}{4\pi}\cdot\tfrac43=\tfrac1\pi$:
$$|\psi|^2\ \to\ \frac{1}{2\pi^2}\operatorname{sen}^2(\varphi_1-\varphi_2)$$
Y sumamos sobre todos los pares con $\varphi_1-\varphi_2=\varphi_0$:
$$p(\varphi_0)=\int_0^{2\pi}\!\frac{\operatorname{sen}^2\varphi_0}{2\pi^2}\,\mathrm d\varphi_1=\frac{\operatorname{sen}^2\varphi_0}{\pi}$$
> Normalizada: $\int_0^{2\pi}\operatorname{sen}^2\varphi_0\,\mathrm d\varphi_0/\pi=1$. Con la convención «uno y el otro» de $\mathcal P$ saldría el doble, $2\operatorname{sen}^2\varphi_0/\pi$, que integra a 2.
+++ Cómo varía con $\varphi_0$
$$\begin{aligned}p(0)&=p(\pi)=0\\p(\pm\tfrac\pi2)&=\tfrac1\pi\ \ (\text{máximo})\end{aligned}$$
> Los dos electrones **nunca** están en el mismo semiplano azimutal ($\varphi_0=0$), ni en semiplanos opuestos ($\varphi_0=\pi$), y lo más probable es que estén a 90° uno del otro.
:::

## Resultado {#resultado}

:::resultado
- **a)** $\ket{\varphi_{p_\alpha}}=\cos\alpha\ket{\varphi_{p_x}}+\operatorname{sen}\alpha\ket{\varphi_{p_y}}$.
- **b)** $\ket\psi=\tfrac1{\sqrt2}\big[\ket{1\!:\!p_x;2\!:\!p_y}-\ket{1\!:\!p_y;2\!:\!p_x}\big]\otimes\ket{1\!:\!+;2\!:\!+}$.
- **c)** Con $p_\alpha$ y $p_\beta$ el ket antisimetrizado es $\operatorname{sen}(\beta-\alpha)$ veces el de b): normalizado, el **mismo estado** (salvo un signo). Es nulo si $\beta\equiv\alpha\pmod\pi$.
- **d)** $\mathcal P=|R(r)|^2|R(r')|^2\operatorname{sen}^2\theta\operatorname{sen}^2\theta'\operatorname{sen}^2(\varphi-\varphi')$; $\rho=|R(r)|^2\operatorname{sen}^2\theta$, sin dependencia en $\varphi$; y
$$p(\varphi_0)=\frac{\operatorname{sen}^2\varphi_0}{\pi}$$
nula en $\varphi_0=0$ y $\pi$, máxima en $\varphi_0=\pm90°$.
:::

## Verificación {#verificacion}

- **Dimensiones.** $\int|R|^2r^2\mathrm dr$ es adimensional, así que $|R|^2$ tiene unidades de 1/volumen: $\mathcal P$ es una densidad por volumen al cuadrado y $\rho$ por volumen, como debe. $p(\varphi_0)$ es por radián.
- **Normalización.** $\int\rho\,\mathrm d^3r=\tfrac{3}{4\pi}\cdot\tfrac43\cdot2\pi=2$ (dos electrones) y $\int_0^{2\pi}p\,\mathrm d\varphi_0=1$.
- **Caso límite de c).** $\alpha=0$, $\beta=90°$ reproduce b) con coeficiente $+1$; $\beta=\alpha$ da cero, como exige Pauli.
- **Comparación.** Si la parte orbital fuera **simétrica**, la amplitud iría como $\operatorname{sen}(\varphi+\varphi')$ y, al promediar, $p(\varphi_0)=1/2\pi$, uniforme. Sin simetrizar (electrón 1 en $p_x$, 2 en $p_y$) da $(2-\cos2\varphi_0)/4\pi$. La media de las dos simetrías es la distribución sin simetrizar: el término de intercambio suma en una y resta en la otra.
- **Simulación con los datos del enunciado.** Por defecto, la parte orbital antisimétrica de d) y los orbitales $\alpha=30°$, $\beta=75°$ de c). El diagrama polar muestra $p(\varphi_0)$ para las tres simetrías; la lectura «$|\langle\psi_b|\psi_c\rangle|$» vale 1 para cualquier par con $\beta\not\equiv\alpha\pmod{180°}$. Las pruebas comparan con la integración numérica hecha en Python.

```sim
id: ej3-orbitales
pie: Primer panel: diagrama polar de la densidad del ángulo relativo φ₀ = φ₁ − φ₂ (rojo, antisimétrica: sen²φ₀/π; azul, simétrica: uniforme; gris discontinuo, sin simetrizar). Segundo panel: la densidad de los azimuts (φ₁, φ₂) de los dos electrones en el plano xOy; la diagonal punteada es φ₁ = φ₂, donde la antisimétrica se anula, y las rayas discontinuas marcan el φ₀ elegido. Mueve α y β: el coeficiente sen(β − α) cambia, pero el estado normalizado es siempre el de b); con β = α desaparece.
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
Dos electrones con el mismo espín se «evitan» sin que haya ninguna fuerza: la antisimetría hace que la amplitud $\operatorname{sen}(\varphi-\varphi')$ se anule cuando los azimuts coinciden. Es el **hueco de intercambio** en miniatura (el ejercicio 9 lo calcula para un gas de electrones). El hueco también aparece en $\varphi_0=\pi$, y eso tiene una razón concreta: los dos orbitales disponibles son impares ($p(-\mathbf r)=-p(\mathbf r)$), así que en direcciones opuestas las dos filas del determinante son proporcionales.

El resultado de c) dice algo profundo: un determinante de Slater depende sólo del **subespacio** que ocupan los electrones, no de qué orbitales concretos se elijan para describirlo. «Un electrón en $p_x$ y otro en $p_y$» y «uno en $p_{30°}$ y otro en $p_{75°}$» son la misma frase. Por eso la densidad electrónica sale con simetría de revolución aunque cada orbital por separado no la tenga: dos electrones del mismo espín llenan todo el plano $xOy$ disponible.
:::

:::error-comun Olvidar el factor 2 entre $|\psi|^2$ y «uno aquí, el otro allá»
$|\psi(\mathbf r,\mathbf r')|^2$ es la densidad de «el 1 en $\mathbf r$ y el 2 en $\mathbf r'$». Con partículas idénticas lo medible es «uno en $\mathbf r$ y otro en $\mathbf r'$», que suma las dos asignaciones: $2|\psi|^2$. Por eso $\int\rho=2$ y no 1.
:::

:::error-comun Creer que $p_\alpha$ y $p_\beta$ dan un estado distinto
Dan un ket distinto **sin antisimetrizar**, pero el antisimetrizador proyecta los dos sobre el mismo ket de $\mathscr E_A$ (§C-2). Lo único que cambia es un factor global.
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Y si los electrones tuvieran espines opuestos, uno $\ket{p_x,+}$ y el otro $\ket{p_y,-}$?
Los espines ortogonales los hacen distinguibles en la práctica (§D-2-b-β, ejercicio 7a): no hay término de intercambio en la densidad de posición. Sale $p(\varphi_0)=(2-\cos2\varphi_0)/4\pi$, la curva gris de la simulación: mínima en $\varphi_0=0$ pero **no nula**. El hueco desaparece.
:::

:::pregunta ¿Y si los dos electrones estuvieran en $p_x$?
Con el mismo espín es imposible (el determinante se anula). Con espines opuestos la parte orbital es $p_x(\mathbf r)p_x(\mathbf r')$, simétrica, y se obtiene $p(\varphi_0)=(2+\cos2\varphi_0)/4\pi$: ahora lo más probable es $\varphi_0=0$ o $\pi$, los dos electrones a lo largo del mismo eje $Ox$.
:::

:::pregunta ¿Qué cambia si se añade un tercer electrón con espín + en el mismo espacio $\{p_x,p_y\}$?
Nada se puede añadir: un espacio orbital de dimensión 2 con el espín fijo admite como máximo dos fermiones. El determinante de Slater de $3\times3$ con sólo dos funciones independientes es cero.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 3, p. 1496. Usa §C-3 (ec. C-4, determinante de Slater, B-63) y §D-2-a (ec. D-18). Los orbitales $p$ están en el complemento E_VII, §2-b.
- Sección 3 (postulado de simetrización) y sección 5 (interferencia de intercambio) de esta página.
