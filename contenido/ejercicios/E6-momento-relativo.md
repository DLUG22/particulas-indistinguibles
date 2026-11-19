---
titulo: Valores posibles del momento angular relativo de dos partículas idénticas
numero: 6
cohen: Cohen, complemento D del cap. XIV · pp. 1497–1499
resumen: En el centro de masa, intercambiar dos partículas idénticas es invertir la posición relativa, y eso multiplica una onda de momento angular l por (−1)^l. El postulado de simetrización deja entonces sólo las l pares (bosones de espín 0, o fermiones en singlete) o sólo las impares (fermiones en triplete). Consecuencia medible: la sección eficaz total cambia.
---

## Enunciado {#enunciado}

Dos partículas idénticas de masa $m$ interactúan con un potencial que sólo depende de su distancia:

$$H=\frac{\mathbf P_1^2}{2m}+\frac{\mathbf P_2^2}{2m}+V(|\mathbf R_1-\mathbf R_2|)$$

Como en el cap. VII, §B, del Cohen, se definen

$$\begin{aligned}\mathbf R_G&=\tfrac12(\mathbf R_1+\mathbf R_2) &\mathbf P_G&=\mathbf P_1+\mathbf P_2\\\mathbf R&=\mathbf R_1-\mathbf R_2 &\mathbf P&=\tfrac12(\mathbf P_1-\mathbf P_2)\end{aligned}$$

y entonces $H=H_G+H_r$, con $H_G=\mathbf P_G^2/4m$ y $H_r=\mathbf P^2/m+V(R)$.

- **a)** Bosones idénticos de espín 0 (mesones $\pi$, por ejemplo).
  - α) En la base $\{\ket{\mathbf r_G,\mathbf r}\}$ de vectores propios comunes de $\mathbf R_G$ y $\mathbf R$, mostrar que $P_{21}\ket{\mathbf r_G,\mathbf r}=\ket{\mathbf r_G,-\mathbf r}$.
  - β) En la base $\{\ket{\mathbf p_G;E_n,l,m}\}$ de vectores propios comunes de $\mathbf P_G$, $H_r$, $\mathbf L^2$ y $L_z$ ($\mathbf L=\mathbf R\times\mathbf P$, momento angular relativo), mostrar que
  $$\begin{aligned}&\ket{\mathbf p_G;E_n,l,m}\\&=\frac{1}{(2\pi\hbar)^{3/2}}\int\!\mathrm d^3r_G\,e^{i\mathbf p_G\cdot\mathbf r_G/\hbar}\\&\times\!\int\!\mathrm d^3r\,R_{n,l}(r)Y_l^m(\theta,\varphi)\ket{\mathbf r_G,\mathbf r}\end{aligned}$$
  y que $P_{21}\ket{\mathbf p_G;E_n,l,m}=(-1)^l\ket{\mathbf p_G;E_n,l,m}$.
  - γ) ¿Qué valores de $l$ permite el postulado de simetrización?
- **b)** Fermiones idénticos de espín ½ (electrones o protones).
  - α) En la base $\{\ket{\mathbf r_G,\mathbf r;S,M}\}$ ($\mathbf S=\mathbf S_1+\mathbf S_2$), mostrar que $P_{21}\ket{\mathbf r_G,\mathbf r;S,M}=(-1)^{S+1}\ket{\mathbf r_G,-\mathbf r;S,M}$.
  - β) En la base $\{\ket{\mathbf p_G;E_n,l,m;S,M}\}$, mostrar que $P_{21}=(-1)^{S+1}(-1)^l$.
  - γ) Deducir los $l$ permitidos para el triplete y el singlete.
- **c)** *(más difícil)* Para partículas distinguibles, la sección eficaz total en el centro de masa es $\sigma=\frac{4\pi}{k^2}\sum_{l}(2l+1)\operatorname{sen}^2\delta_l$ (cap. VIII, C-58).
  - α) ¿Qué pasa si el aparato de medida es igual de sensible a las dos partículas?
  - β) Mostrar que en el caso a) $\sigma=\frac{16\pi}{k^2}\sum_{l\ \text{par}}(2l+1)\operatorname{sen}^2\delta_l$.
  - γ) Para dos fermiones idénticos de espín ½ no polarizados, mostrar que
  $$\begin{aligned}\sigma=\frac{4\pi}{k^2}\Big\{&\sum_{l\ \text{par}}(2l+1)\operatorname{sen}^2\delta_l\\+\,3\!&\sum_{l\ \text{impar}}(2l+1)\operatorname{sen}^2\delta_l\Big\}\end{aligned}$$

:::nota
Dos erratas del libro: el hamiltoniano repite $\mathbf P_1^2/2m$ (el segundo término es $\mathbf P_2^2/2m$), y el momento relativo es $\mathbf P=\tfrac12(\mathbf P_1-\mathbf P_2)$, con signo menos. Con el signo más, $\mathbf P$ sería $\mathbf P_G/2$.
:::

## Qué piden y estrategia {#estrategia}

Todo se apoya en una sola observación: **intercambiar las dos partículas deja quieto el centro de masa e invierte la coordenada relativa**, $\mathbf r\to-\mathbf r$. Eso es una **paridad** en el espacio de la coordenada relativa, y una función $R_{n,l}(r)Y_l^m$ tiene paridad $(-1)^l$. Con espín, $P_{21}$ actúa también sobre la parte de espín, donde el triplete es simétrico y el singlete antisimétrico. El postulado de simetrización fija el signo total de $P_{21}$ y, por tanto, qué $l$ sobreviven.

Para c) desarrollamos la amplitud de difusión en ondas parciales: $f(\pi-\theta)$ es $f(\theta)$ con un $(-1)^l$ en cada onda, así que $f(\theta)\pm f(\pi-\theta)$ **filtra** las $l$ pares o las impares.

## Solución paso a paso {#solucion}

### a) Bosones de espín 0 {#a-bosones}

:::pasos P₂₁ en la base de posiciones (α)
+++ Escribir el ket en términos de las posiciones individuales
$\ket{\mathbf r_G,\mathbf r}$ es el ket con la partícula 1 en $\mathbf r_1$ y la 2 en $\mathbf r_2$, donde
$$\mathbf r_1=\mathbf r_G+\tfrac{\mathbf r}2,\qquad\mathbf r_2=\mathbf r_G-\tfrac{\mathbf r}2$$
es decir, $\ket{\mathbf r_G,\mathbf r}=\ket{1\!:\!\mathbf r_G+\tfrac{\mathbf r}2;\;2\!:\!\mathbf r_G-\tfrac{\mathbf r}2}$.
+++ Aplicar $P_{21}$
Por (B-4), $P_{21}$ intercambia los estados de las dos partículas:
$$\begin{aligned}P_{21}\ket{\mathbf r_G,\mathbf r}&=\ket{1\!:\!\mathbf r_G-\tfrac{\mathbf r}2;\;2\!:\!\mathbf r_G+\tfrac{\mathbf r}2}\\&=\ket{\mathbf r_G,-\mathbf r}\end{aligned}$$
> El centro de masa es simétrico en 1 y 2 y no cambia; la posición relativa cambia de signo.
:::

:::pasos P₂₁ en la base de momento angular (β)
+++ Separar centro de masa y movimiento relativo
$H_G$ sólo depende de $\mathbf P_G$: sus estados propios son ondas planas $e^{i\mathbf p_G\cdot\mathbf r_G/\hbar}/(2\pi\hbar)^{3/2}$. $H_r$ describe una partícula de masa reducida $m/2$ en el potencial central $V(R)$: sus estados propios comunes con $\mathbf L^2$ y $L_z$ son $R_{n,l}(r)Y_l^m(\theta,\varphi)$ (cap. VII).
> $\mathbf P^2/m=\mathbf P^2/2\mu$ con $\mu=m/2$.
+++ El ket producto
La función de onda en la representación $\{\ket{\mathbf r_G,\mathbf r}\}$ es el producto de las dos, lo que da la expresión del enunciado: se integra sobre todos los $\mathbf r_G$ y $\mathbf r$ con esos coeficientes.
+++ Aplicar $P_{21}$ dentro de la integral
Por α, $P_{21}$ cambia $\ket{\mathbf r_G,\mathbf r}$ por $\ket{\mathbf r_G,-\mathbf r}$:
$$\int\!\mathrm d^3r\,R_{n,l}(r)Y_l^m(\theta,\varphi)\ket{\mathbf r_G,-\mathbf r}$$
+++ Cambiar de variable $\mathbf r\to-\mathbf r$
El jacobiano vale 1; en esféricas, $r\to r$, $\theta\to\pi-\theta$, $\varphi\to\varphi+\pi$:
$$\int\!\mathrm d^3r\,R_{n,l}(r)Y_l^m(\pi-\theta,\varphi+\pi)\ket{\mathbf r_G,\mathbf r}$$
+++ Paridad de los armónicos esféricos
$$Y_l^m(\pi-\theta,\varphi+\pi)=(-1)^lY_l^m(\theta,\varphi)$$
(Cohen, vol. I, cap. VI). Por tanto
$$\begin{aligned}&P_{21}\ket{\mathbf p_G;E_n,l,m}\\&=(-1)^l\ket{\mathbf p_G;E_n,l,m}\end{aligned}$$
> Intercambiar dos partículas idénticas, visto desde el centro de masa, es hacer una inversión espacial del movimiento relativo.
:::

:::pasos Los l permitidos (γ)
+++ El postulado para bosones
Los kets físicos cumplen $P_{21}\ket\psi=+\ket\psi$. Como la base $\{\ket{\mathbf p_G;E_n,l,m}\}$ está formada por vectores propios de $P_{21}$, $\mathscr E_S$ está generado por los que tienen valor propio $+1$:
$$(-1)^l=+1\quad\Longrightarrow\quad l=0,2,4,\dots$$
> Dos bosones de espín 0 nunca pueden tener momento angular relativo impar.
:::

### b) Fermiones de espín ½ {#b-fermiones}

:::pasos Espín y simetría
+++ $P_{21}$ actúa sobre órbita y espín
$P_{21}=P_{21}^{\text{orb}}\otimes P_{21}^{\text{espín}}$. La parte orbital da $\ket{\mathbf r_G,-\mathbf r}$ (como en a-α). En la parte de espín (cap. X, §B):
$$\begin{aligned}S=1:\ \ket{1,1}&=\ket{++}\\\ket{1,0}&=\tfrac1{\sqrt2}\big(\ket{+-}+\ket{-+}\big)\\\ket{1,-1}&=\ket{--}\\S=0:\ \ket{0,0}&=\tfrac1{\sqrt2}\big(\ket{+-}-\ket{-+}\big)\end{aligned}$$
El triplete es simétrico ($+1$) y el singlete antisimétrico ($-1$): $P_{21}^{\text{espín}}\ket{S,M}=(-1)^{S+1}\ket{S,M}$.
+++ En la base de posiciones (α)
$$\begin{aligned}&P_{21}\ket{\mathbf r_G,\mathbf r;S,M}\\&=(-1)^{S+1}\ket{\mathbf r_G,-\mathbf r;S,M}\end{aligned}$$
+++ En la base de momento angular (β)
Repitiendo a-β para la parte orbital:
$$\begin{aligned}&P_{21}\ket{\mathbf p_G;E_n,l,m;S,M}\\&=(-1)^{S+1}(-1)^l\ket{\mathbf p_G;E_n,l,m;S,M}\end{aligned}$$
+++ El postulado para fermiones (γ)
Hace falta $P_{21}=-1$, es decir $(-1)^{S+1+l}=-1$, o sea $S+l$ par:
$$\begin{aligned}S=0\ (\text{singlete}):&\quad l=0,2,4,\dots\\S=1\ (\text{triplete}):&\quad l=1,3,5,\dots\end{aligned}$$
> Espín antisimétrico con órbita simétrica, o espín simétrico con órbita antisimétrica: el producto siempre antisimétrico.
:::

### c) Secciones eficaces {#c-secciones}

:::pasos Lo que cambia en la sección eficaz
+++ Ondas parciales
Para partículas distinguibles (cap. VIII):
$$\begin{aligned}f(\theta)=\frac1k\sum_l\,&(2l+1)e^{i\delta_l}\operatorname{sen}\delta_l\\\times\,&P_l(\cos\theta)\end{aligned}$$
y $\sigma=\int|f|^2\mathrm d\Omega=\frac{4\pi}{k^2}\sum_l(2l+1)\operatorname{sen}^2\delta_l$, usando $\int P_lP_{l'}\mathrm d\Omega=\frac{4\pi}{2l+1}\delta_{ll'}$.
+++ α) Aparato sensible a las dos partículas
En el centro de masa, si una partícula sale en $\mathbf n$ la otra sale en $-\mathbf n$. El detector en $\mathbf n$ cuenta las dos posibilidades:
$$\frac{\mathrm d\sigma}{\mathrm d\Omega}=|f(\theta)|^2+|f(\pi-\theta)|^2$$
Integrada en todo el ángulo sólido da $2\sigma$: cada choque produce **dos** cuentas.
> Contando en una semiesfera se recupera $\sigma$. Es el ejercicio 4a.
+++ La paridad de las ondas parciales
Como $P_l(-x)=(-1)^lP_l(x)$:
$$\begin{aligned}f(\pi-\theta)=\frac1k\sum_l\,&(-1)^l(2l+1)e^{i\delta_l}\\\times\,&\operatorname{sen}\delta_l\,P_l(\cos\theta)\end{aligned}$$
Por tanto
$$\begin{aligned}&f(\theta)+f(\pi-\theta)\\&\;=\tfrac2k\!\!\sum_{l\ \text{par}}\!\!(2l+1)e^{i\delta_l}\operatorname{sen}\delta_l\,P_l\\&f(\theta)-f(\pi-\theta)\\&\;=\tfrac2k\!\!\sum_{l\ \text{impar}}\!\!(2l+1)e^{i\delta_l}\operatorname{sen}\delta_l\,P_l\end{aligned}$$
> La suma conserva las ondas pares duplicadas; la resta, las impares. Es lo mismo que a) y b), visto en la amplitud.
+++ β) Bosones de espín 0
$\mathrm d\sigma/\mathrm d\Omega=|f(\theta)+f(\pi-\theta)|^2$ (ejercicio 4c). Integrando con la ortogonalidad de los $P_l$:
$$\begin{aligned}\sigma&=\frac4{k^2}\sum_{l\ \text{par}}(2l+1)^2\operatorname{sen}^2\delta_l\cdot\frac{4\pi}{2l+1}\\&=\frac{16\pi}{k^2}\sum_{l\ \text{par}}(2l+1)\operatorname{sen}^2\delta_l\end{aligned}$$
+++ γ) Fermiones de espín ½ no polarizados
La interacción no depende del espín, así que $S$ se conserva y el singlete y el triplete se dispersan por separado. Un haz no polarizado reparte la probabilidad por igual entre los 4 estados $\ket{S,M}$: $\tfrac14$ singlete y $\tfrac34$ triplete.
- Singlete (órbita simétrica): $|f+f'|^2\ \to\ \frac{16\pi}{k^2}\sum_{\text{par}}$.
- Triplete (órbita antisimétrica): $|f-f'|^2\ \to\ \frac{16\pi}{k^2}\sum_{\text{impar}}$.
$$\begin{aligned}\sigma&=\tfrac14\cdot\frac{16\pi}{k^2}\sum_{\text{par}}\\&\;+\tfrac34\cdot\frac{16\pi}{k^2}\sum_{\text{impar}}\\&=\frac{4\pi}{k^2}\Big\{\sum_{\text{par}}+3\sum_{\text{impar}}\Big\}\\&\qquad\times(2l+1)\operatorname{sen}^2\delta_l\end{aligned}$$
> Es la integral de la fórmula del ejercicio 5 con $s=\tfrac12$, $\varepsilon=-1$.
:::

## Resultado {#resultado}

:::resultado
- $P_{21}\ket{\mathbf r_G,\mathbf r}=\ket{\mathbf r_G,-\mathbf r}$ y $P_{21}\ket{\mathbf p_G;E_n,l,m}=(-1)^l\ket{\mathbf p_G;E_n,l,m}$; con espín ½, $P_{21}=(-1)^{S+1}(-1)^l$.
- **Permitidos:** bosones de espín 0 → $l$ par. Fermiones de espín ½ → $l$ par si $S=0$, $l$ impar si $S=1$.
- **Secciones eficaces:** aparato sensible a las dos (distinguibles) → $2\sigma$; bosones de espín 0 → $\frac{16\pi}{k^2}\sum_{\text{par}}(2l+1)\operatorname{sen}^2\delta_l$; fermiones ½ no polarizados → $\frac{4\pi}{k^2}\{\sum_{\text{par}}+3\sum_{\text{impar}}\}(2l+1)\operatorname{sen}^2\delta_l$.
:::

## Verificación {#verificacion}

- **Dimensiones.** $1/k^2$ es un área: las tres $\sigma$ son áreas.
- **Baja energía ($ka\to0$).** Sólo cuenta $l=0$ y, para una esfera dura de radio $a$, $\delta_0=-ka$. Distinguibles: $\sigma\to4\pi a^2$. Bosones de espín 0: $16\pi a^2$, el **cuádruple** (el doble que un aparato que ve las dos). Fermiones no polarizados: $4\pi a^2$, porque sólo el singlete ($\tfrac14$ de los casos) puede usar la onda $s$. El triplete no se dispersa a baja energía.
- **Consistencia con el ejercicio 5.** Integrar en $4\pi$ la fórmula del ejercicio 5 con $s=\tfrac12$, $\varepsilon=-1$, es decir $\tfrac14|f+f'|^2+\tfrac34|f-f'|^2$, da exactamente c-γ. Y si todos los desfases pares fueran iguales a los impares «en promedio», las tres fórmulas darían $\frac{8\pi}{k^2}\sum(2l+1)\operatorname{sen}^2\delta_l=2\sigma$: la estadística sólo **redistribuye** entre ondas pares e impares lo que cuenta un aparato que ve las dos partículas.
- **Simulación con los datos del enunciado.** El Cohen no da $V(r)$: usamos una esfera dura de radio $a$ (modelo propio). Arriba, el aporte de cada $l$ al $\sigma$ del sistema elegido, con las ondas prohibidas en gris. Abajo, $\sigma(ka)$ para los tres casos. La lectura «$\sigma$ integrando $\mathrm d\sigma/\mathrm d\Omega$» integra numéricamente $|f\pm f'|^2$ en $4\pi$ y coincide con la fórmula de ondas parciales; las pruebas además comprueban el teorema óptico $\sigma=\frac{4\pi}{k}\operatorname{Im}f(0)$.

```sim
id: ej6-momento-relativo
pie: Arriba, el aporte de cada onda parcial l a la sección eficaz del sistema elegido (en πa², esfera dura de radio a, modelo propio); las ondas que el postulado prohíbe salen en gris con ✕ (su altura es la que tendrían para partículas distinguibles). Abajo, la sección eficaz total frente a ka para partículas distinguibles (gris discontinuo; punteado, «2 × distinguibles»: un aparato que cuenta las dos), bosones de espín 0 (azul) y fermiones de espín ½ no polarizados (rojo). Con ▶ se recorre la energía: a ka pequeño, 16 frente a 4.
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
Para dos partículas idénticas, «intercambiarlas» y «mirar el movimiento relativo en un espejo» son la misma operación. Por eso el postulado de simetrización se traduce en una **regla de selección sobre el momento angular relativo**: medio espectro de ondas parciales desaparece. Esto tiene consecuencias muy concretas:

- A baja energía los bosones de espín 0 dispersan **cuatro veces** más que partículas distinguibles: la onda $s$ interfiere constructivamente consigo misma «por los dos caminos».
- Dos protones en triplete no pueden estar en onda $s$: a baja energía la dispersión protón-protón es, en la práctica, sólo de singlete. Por eso la física nuclear de baja energía «ve» sobre todo la fuerza nuclear en el canal singlete $^1S_0$.
- En moléculas diatómicas homonucleares (como $^{16}$O$_2$, núcleos de espín 0) faltan la mitad de las líneas de rotación: sólo hay $l$ par (o impar, según el estado electrónico).
:::

:::error-comun Pensar que $(-1)^l$ es una propiedad de la interacción
Es pura geometría: vale para cualquier $V(R)$ central. La interacción decide los desfases $\delta_l$; el postulado decide qué $l$ entran.
:::

:::error-comun Olvidar el espín al decidir los $l$ permitidos
Para fermiones de espín ½ no hay una respuesta única: depende de $S$. Decir «los fermiones sólo tienen $l$ impar» es cierto sólo en el triplete.
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Y si fueran dos bosones de espín 1 (por ejemplo, deuterones)?
Con dos espines 1, $S=0,1,2$; los estados con $S=2$ y $S=0$ son simétricos y los de $S=1$ antisimétricos: $P_{21}^{\text{espín}}=(-1)^S$. Para bosones hace falta $(-1)^{S+l}=+1$: con $S=0$ o $2$, $l$ par; con $S=1$, $l$ impar.
:::

:::pregunta ¿Qué pasa a energías altas ($ka\gg1$)?
Contribuyen muchas ondas parciales y las sumas sobre $l$ par y sobre $l$ impar se vuelven parecidas. Entonces la $\sigma$ de bosones y la de fermiones no polarizados se acercan las dos a $2\sigma$, la de partículas distinguibles contadas por un aparato que ve las dos (curva gris punteada de la simulación). El efecto de la estadística queda confinado a ángulos cerca de 90°, donde $f(\theta)$ y $f(\pi-\theta)$ se parecen.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 6, pp. 1497–1499. Usa §B (B-4, $P_{21}$) y §C (postulado).
- Mismos autores, vol. I: cap. VI (paridad de $Y_l^m$), cap. VII §B (centro de masa y movimiento relativo), cap. VIII §C (ondas parciales, ec. C-58); vol. II, cap. X §B (singlete y triplete).
- Ejercicios 4 y 5 de esta página.
