---
titulo: Funciones densidad de una y dos partículas en un gas de electrones a T = 0
numero: 9
cohen: Cohen, complemento D del cap. XIV · pp. 1502–1504
resumen: Se definen los operadores densidad de una y de dos partículas, se calcula su valor medio en un estado (anti)simetrizado de N partículas independientes y se aplica al gas de electrones libres del complemento C. La densidad de una partícula es uniforme; la de dos con espines opuestos no tiene correlación; la de dos con el mismo espín vale (k_F³/6π²)²[1 − F²(k_F r)] y se anula cuando r → 0. Alrededor de cada electrón hay un hueco de intercambio de tamaño ~λ_F que contiene exactamente un electrón del mismo espín.
---

## Enunciado {#enunciado}

**I.** Sean $N$ partículas $1,2,\dots,N$ de espín $s$, primero **no idénticas**. En el espacio $\mathscr E(i)$ de la partícula $(i)$, $\ket{i\!:\!\mathbf r_0,m}$ es un estado localizado en $\mathbf r_0$ con componente $m\hbar$ del espín sobre $Oz$.

- **a)** Con
$$\begin{aligned}F_m(\mathbf r_0)=\sum_{i=1}^N\;&\ket{i\!:\!\mathbf r_0,m}\bra{i\!:\!\mathbf r_0,m}\\\otimes&\prod_{j\neq i}\uno(j)\end{aligned}$$
mostrar que $\bra\psi F_m(\mathbf r_0)\ket\psi\,\mathrm d^3r_0$ es la probabilidad de hallar **alguna** de las partículas en $\mathrm d^3r_0$ alrededor de $\mathbf r_0$ con espín $m\hbar$.
- **b)** ¿Qué significa $\bra\psi G_{mm'}(\mathbf r_0,\mathbf r_0')\ket\psi\,\mathrm d^3r_0\,\mathrm d^3r_0'$, con
$$\begin{aligned}G_{mm'}=\sum_{i}\sum_{j\neq i}\;&\ket{i\!:\!\mathbf r_0,m;j\!:\!\mathbf r_0',m'}\\\times&\bra{i\!:\!\mathbf r_0,m;j\!:\!\mathbf r_0',m'}\\\otimes&\prod_{k\neq i,j}\uno(k)\ ?\end{aligned}$$

Los valores medios $\rho_I^m(\mathbf r_0)$ y $\rho_{II}^{mm'}(\mathbf r_0,\mathbf r_0')$ son las funciones densidad de una y de dos partículas. Siguen valiendo para partículas idénticas si $\ket\psi$ está (anti)simetrizado (ejercicio 8).

**II.** $N$ partículas en estados individuales ortonormales $\ket{u_1},\dots,\ket{u_N}$, con $\ket\psi=\sqrt{N!}\,T\ket{1\!:\!u_1;\dots;N\!:\!u_N}$, donde $T=S$ (bosones) o $A$ (fermiones). Para operadores simétricos $F=\sum_if(i)$ y $G=\sum_{i\neq j}g(i,j)$:

- **a)** Mostrar que $\bra\psi F\ket\psi=\sum_\alpha\varepsilon_\alpha\bra{1\!:\!u_1;\dots}F\,P_\alpha\ket{1\!:\!u_1;\dots}$, con $\varepsilon_\alpha=+1$ para bosones y la paridad de $P_\alpha$ para fermiones; lo mismo para $G$.
- **b)** Deducir
$$\bra\psi F\ket\psi=\sum_{i=1}^N\bra{u_i}f\ket{u_i}$$
$$\begin{aligned}\bra\psi G\ket\psi=\sum_{i\neq j}\Big[&\bra{1\!:\!u_i;2\!:\!u_j}g(1,2)\\&\times\ket{1\!:\!u_i;2\!:\!u_j}\\+\,\varepsilon&\bra{1\!:\!u_i;2\!:\!u_j}g(1,2)\\&\times\ket{1\!:\!u_j;2\!:\!u_i}\Big]\end{aligned}$$

**III.** Gas de electrones libres en una caja cúbica de arista $L$ a $T=0$, con condiciones periódicas: estados $\ket{\mathbf k,\pm}$ de función de onda $L^{-3/2}e^{i\mathbf k\cdot\mathbf r}$, con $\mathbf k$ según (26) del complemento C. $E_F=\hbar^2k_F^2/2m$ y $\lambda_F=2\pi/k_F$.

- **a)** Mostrar que $\rho_I^+=\rho_I^-=\sum_{\mathbf k}|\varphi_{\mathbf k}(\mathbf r_0)|^2=k_F^3/6\pi^2=N/2L^3$ (suma sobre $|\mathbf k|<k_F$). ¿Se podía prever?
- **b)** Mostrar que $\rho_{II}^{+-}=\rho_{II}^{-+}=\sum_{\mathbf k,\mathbf k'}|\varphi_{\mathbf k}(\mathbf r_0)\varphi_{\mathbf k'}(\mathbf r_0')|^2=k_F^6/36\pi^4$. Interpretarlo.
- **c)** Mostrar que $\rho_{II}^{++}=\rho_{II}^{--}=\frac{k_F^6}{36\pi^4}\big[1-F^2(k_Fr)\big]$, con $r=|\mathbf r_0-\mathbf r_0'|$ y $F(x)=3(\operatorname{sen}x-x\cos x)/x^3$. ¿Cómo varían con $r$? Mostrar que es prácticamente imposible hallar dos electrones del mismo espín a una distancia mucho menor que $\lambda_F$.

## Qué piden y estrategia {#estrategia}

- **I:** leer $F_m$ y $G_{mm'}$ como proyectores «hay una partícula aquí» sumados sobre las partículas.
- **II:** usar que $F$ y $G$ son simétricos (conmutan con $T$) y que $T^2=T$; después ver qué permutaciones sobreviven: para un operador de una partícula sólo la identidad; para uno de dos, la identidad y una transposición. Es el término **directo** y el de **intercambio** de la sección 5.
- **III:** aplicar II con $f=\ket{\mathbf r_0,\pm}\bra{\mathbf r_0,\pm}$ y $g=\ket{\mathbf r_0,m;\mathbf r_0',m'}\bra{\dots}$, y pasar la suma sobre $\mathbf k$ a una integral sobre la esfera de Fermi.

## Solución paso a paso {#solucion}

### I. Qué miden los operadores densidad {#parte-i}

:::pasos Densidad de una y de dos partículas
+++ a) El valor medio de F_m
Cada término $\ket{i\!:\!\mathbf r_0,m}\bra{i\!:\!\mathbf r_0,m}\otimes\prod\uno$ da, multiplicado por $\mathrm d^3r_0$, la probabilidad de que la partícula $i$ esté en $\mathrm d^3r_0$ con espín $m\hbar$, sin importar dónde estén las demás:
$$\begin{aligned}&\bra\psi\big(\ket{i\!:\!\mathbf r_0,m}\bra{i\!:\!\mathbf r_0,m}\\&\quad\otimes\textstyle\prod\uno\big)\ket\psi\,\mathrm d^3r_0\end{aligned}$$
> El producto de identidades es la suma sobre todas las posiciones y espines de las otras partículas.
+++ Sumar sobre i
Si $\mathrm d^3r_0$ es infinitesimal, la probabilidad de que **dos** partículas estén a la vez dentro es de orden $(\mathrm d^3r_0)^2$: los sucesos «la partícula $i$ está ahí» son prácticamente excluyentes y sus probabilidades se suman. $\bra\psi F_m\ket\psi\,\mathrm d^3r_0$ es la probabilidad de hallar **alguna** partícula en $\mathrm d^3r_0$ con espín $m\hbar$.
> Integrado en todo el espacio y sumado sobre $m$, $\rho_I$ da $N$: es una densidad de partículas (como en el ejercicio 7).
+++ b) El valor medio de G_mm'
Del mismo modo, $\rho_{II}^{mm'}(\mathbf r_0,\mathbf r_0')\,\mathrm d^3r_0\,\mathrm d^3r_0'$ es la probabilidad de hallar una partícula en $\mathrm d^3r_0$ con espín $m\hbar$ y **otra** (distinta: $j\neq i$) en $\mathrm d^3r_0'$ con espín $m'\hbar$.
> Mide **correlaciones**: si las partículas fueran independientes, $\rho_{II}^{mm'}\simeq\rho_I^m(\mathbf r_0)\rho_I^{m'}(\mathbf r_0')$ para $N$ grande.
+++ Partículas idénticas
$F_m$ y $G_{mm'}$ son simétricos ante cualquier permutación, así que son observables admisibles para partículas idénticas, y por el ejercicio 8 basta con calcular su valor medio en el ket (anti)simetrizado.
:::

### II. Valores medios en un estado (anti)simetrizado {#parte-ii}

Llamamos $\ket\Phi\equiv\ket{1\!:\!u_1;2\!:\!u_2;\dots;N\!:\!u_N}$, de modo que $\ket\psi=\sqrt{N!}\,T\ket\Phi$.

:::pasos a) Reducir a una suma sobre permutaciones
+++ Escribir el valor medio
$$\bra\psi F\ket\psi=N!\,\bra\Phi T^\dagger FT\ket\Phi$$
+++ Usar las propiedades de T
$T$ es hermítico, conmuta con el operador simétrico $F$ y es un proyector ($T^2=T$):
$$T^\dagger FT=FT^2=FT$$
+++ Desarrollar T
$T=\frac1{N!}\sum_\alpha\varepsilon_\alpha P_\alpha$ (sección 2), así que
$$\bra\psi F\ket\psi=\sum_\alpha\varepsilon_\alpha\bra\Phi F\,P_\alpha\ket\Phi$$
> El $N!$ del normalizador se cancela con el $1/N!$ de $T$. El mismo argumento vale para $G$, que también es simétrico.
:::

:::pasos b) Qué permutaciones sobreviven
+++ Operador de una partícula
$P_\alpha\ket\Phi$ es $\ket\Phi$ con los estados repartidos de otra manera. En $\bra\Phi f(i)P_\alpha\ket\Phi$, cada partícula $j\neq i$ aporta un factor $\braket{u_j}{u_{\alpha(j)}}$, que es cero salvo que $P_\alpha$ deje fija a $j$.
> Los estados son ortonormales: cualquier partícula «movida» por la permutación anula el producto.
+++ Sólo la identidad
Si $P_\alpha$ deja fijas a todas las $j\neq i$, también deja fija a $i$: es la identidad ($\varepsilon=1$). Queda
$$\bra\psi F\ket\psi=\sum_{i=1}^N\bra{u_i}f\ket{u_i}$$
> El valor medio de un operador de una partícula no ve la estadística: es la suma sobre los estados ocupados, como para partículas distinguibles.
+++ Operador de dos partículas
En $\bra\Phi g(i,j)P_\alpha\ket\Phi$, todas las partículas $k\neq i,j$ deben quedar fijas. Sobreviven la **identidad** y la **transposición** $(i\,j)$, con signo $\varepsilon$:
$$\begin{aligned}\bra\psi G\ket\psi=\sum_{i\neq j}\Big[&\bra{u_i,u_j}g\ket{u_i,u_j}\\+\,\varepsilon&\bra{u_i,u_j}g\ket{u_j,u_i}\Big]\end{aligned}$$
con la notación abreviada $\ket{u_i,u_j}=\ket{1\!:\!u_i;2\!:\!u_j}$ y $g=g(1,2)$.
> Primer término: **directo**. Segundo: **intercambio**. Es (D-17) de la sección 5 convertido en un valor medio.
:::

### III. El gas de electrones a T = 0 {#parte-iii}

Los $N$ electrones ocupan los estados $\ket{\mathbf k,\pm}$ con $|\mathbf k|<k_F$: $N/2$ con cada espín. Cada $\mathbf k$ ocupa un volumen $(2\pi/L)^3$ del espacio $\mathbf k$ (complemento C, §1-c), así que

$$\frac N2=\frac{\frac43\pi k_F^3}{(2\pi/L)^3}=\frac{k_F^3L^3}{6\pi^2}$$

:::pasos a) Densidad de una partícula
+++ El operador de una partícula
$f=\ket{\mathbf r_0,+}\bra{\mathbf r_0,+}$. Su elemento diagonal en un estado ocupado es
$$\bra{\mathbf k,\sigma}f\ket{\mathbf k,\sigma}=|\varphi_{\mathbf k}(\mathbf r_0)|^2\,\delta_{\sigma+}$$
+++ Sumar sobre los estados ocupados
Por II-b sólo cuentan los de espín $+$:
$$\rho_I^+(\mathbf r_0)=\sum_{|\mathbf k|<k_F}|\varphi_{\mathbf k}(\mathbf r_0)|^2=\frac1{L^3}\cdot\frac N2$$
+++ En términos de k_F
$$\rho_I^+=\rho_I^-=\frac{k_F^3}{6\pi^2}=\frac N{2L^3}$$
> **Se podía prever**: con ondas planas la densidad es uniforme, y la mitad de los electrones tiene cada espín.
:::

:::pasos b) Dos partículas con espines opuestos
+++ Término directo
$g=\ket{\mathbf r_0,+;\mathbf r_0',-}\bra{\mathbf r_0,+;\mathbf r_0',-}$. Sólo contribuyen los pares con $u_i$ de espín $+$ y $u_j$ de espín $-$:
$$\sum_{\mathbf k,\mathbf k'}|\varphi_{\mathbf k}(\mathbf r_0)|^2|\varphi_{\mathbf k'}(\mathbf r_0')|^2=\Big(\frac N{2L^3}\Big)^2$$
+++ Término de intercambio
$\bra{\mathbf k,+;\mathbf k',-}g\ket{\mathbf k',-;\mathbf k,+}$ pide que la partícula 1 tenga espín $+$ en el bra y $-$ en el ket: es **cero**.
> Es el mecanismo de §D-2-b-β: espines ortogonales hacen distinguibles a los electrones.
+++ El resultado
$$\rho_{II}^{+-}=\rho_{II}^{-+}=\frac{k_F^6}{36\pi^4}=\rho_I^+\rho_I^-$$
> Interpretación: dos electrones de espines opuestos **no están correlacionados** (en este modelo sin interacción). La probabilidad de hallar uno en $\mathbf r_0$ no depende de dónde esté el otro.
:::

:::pasos c) Dos partículas con el mismo espín: el hueco de intercambio
+++ Directo menos intercambio
Ahora los dos estados tienen espín $+$ y el intercambio no se anula ($\varepsilon=-1$):
$$\begin{aligned}\rho_{II}^{++}=\sum_{\mathbf k\neq\mathbf k'}\Big[&|\varphi_{\mathbf k}(\mathbf r_0)\varphi_{\mathbf k'}(\mathbf r_0')|^2\\-\,&\varphi_{\mathbf k}^*(\mathbf r_0)\varphi_{\mathbf k'}^*(\mathbf r_0')\\&\times\varphi_{\mathbf k}(\mathbf r_0')\varphi_{\mathbf k'}(\mathbf r_0)\Big]\end{aligned}$$
+++ Quitar la restricción k ≠ k′
Si $\mathbf k=\mathbf k'$, los dos sumandos del corchete son iguales y se cancelan: añadir esos términos no cambia nada. Entonces la suma se factoriza:
$$\begin{aligned}\rho_{II}^{++}=\;&\Big(\sum_{\mathbf k}|\varphi_{\mathbf k}|^2\Big)^2\\-\;&\Big|\sum_{\mathbf k}\varphi_{\mathbf k}^*(\mathbf r_0)\varphi_{\mathbf k}(\mathbf r_0')\Big|^2\end{aligned}$$
> Es Pauli en acción: la «autointeracción» $\mathbf k=\mathbf k'$ se cancela sola.
+++ La suma de intercambio como integral
Con $\varphi_{\mathbf k}=L^{-3/2}e^{i\mathbf k\cdot\mathbf r}$ y $\mathbf r=\mathbf r_0'-\mathbf r_0$, y como cada $\mathbf k$ ocupa $(2\pi/L)^3$:
$$\sum_{\mathbf k}\varphi_{\mathbf k}^*(\mathbf r_0)\varphi_{\mathbf k}(\mathbf r_0')\simeq\int_{k<k_F}\frac{\mathrm d^3k}{(2\pi)^3}\,e^{i\mathbf k\cdot\mathbf r}$$
> El paso de la suma a la integral vale si $L\gg\lambda_F$; la simulación compara las dos.
+++ Hacer la integral
En esféricas con el eje polar sobre $\mathbf r$, la integral angular de $e^{ikr\cos\theta}$ da $4\pi\,\frac{\operatorname{sen}kr}{kr}$:
$$\begin{aligned}&\frac{4\pi}{(2\pi)^3}\int_0^{k_F}\!\!k^2\frac{\operatorname{sen}kr}{kr}\,\mathrm dk\\&=\frac{\operatorname{sen}x-x\cos x}{2\pi^2r^3}\\&=\frac{k_F^3}{6\pi^2}\,F(k_Fr)\end{aligned}$$
con $x=k_Fr$ y $F(x)=3(\operatorname{sen}x-x\cos x)/x^3$.
> $F(0)=1$: en $r=0$ la suma de intercambio es igual a la directa, $\rho_I^+$.
+++ El resultado
$$\rho_{II}^{++}=\rho_{II}^{--}=\frac{k_F^6}{36\pi^4}\Big[1-F^2(k_Fr)\Big]$$
:::

:::pasos Cómo varía con la distancia
+++ Lejos: sin correlación
$F(x)\to0$ como $\cos x/x^2$ (con oscilaciones). Para $r\gg\lambda_F$, $\rho_{II}^{++}\to(\rho_I^+)^2$: los dos electrones se ignoran.
+++ Cerca: el hueco
Para $x\ll1$, $F(x)\simeq1-x^2/10$, así que
$$\frac{\rho_{II}^{++}}{(\rho_I^+)^2}=1-F^2\simeq\frac{(k_Fr)^2}5$$
Se anula en $r=0$ y vale ½ en $k_Fr\simeq1{,}81$, es decir, $r\simeq0{,}29\,\lambda_F$.
> A distancias mucho menores que $\lambda_F$ es prácticamente **imposible** hallar dos electrones del mismo espín: cada electrón está rodeado de un **hueco de intercambio** (o de Fermi).
+++ Cuánto «vacía» el hueco
$$\begin{aligned}&\rho_I^+\int\big[1-(1-F^2)\big]\,\mathrm d^3r\\&=\frac{k_F^3}{6\pi^2}\int_0^\infty F^2(k_Fr)\,4\pi r^2\,\mathrm dr\\&=1\end{aligned}$$
> Alrededor de cada electrón falta exactamente **un** electrón del mismo espín: el hueco expulsa la carga del propio electrón. Usa $\int_0^\infty F^2x^2\,\mathrm dx=3\pi/2$.
:::

## Resultado {#resultado}

:::resultado
- $\rho_I^m\,\mathrm d^3r_0$: probabilidad de hallar alguna partícula en $\mathrm d^3r_0$ con espín $m\hbar$; $\rho_{II}^{mm'}\,\mathrm d^3r_0\,\mathrm d^3r_0'$: una en $\mathrm d^3r_0$ con $m$ y otra en $\mathrm d^3r_0'$ con $m'$.
- Estado (anti)simetrizado de estados ortonormales: $\langle F\rangle=\sum_i\bra{u_i}f\ket{u_i}$; $\langle G\rangle=\sum_{i\neq j}[\text{directo}+\varepsilon\,\text{intercambio}]$.
- Gas de electrones a $T=0$:
$$\rho_I^\pm=\frac{k_F^3}{6\pi^2}=\frac N{2L^3}$$
$$\rho_{II}^{+-}=\Big(\frac{k_F^3}{6\pi^2}\Big)^2$$
$$\rho_{II}^{++}=\Big(\frac{k_F^3}{6\pi^2}\Big)^2\Big[1-F^2(k_Fr)\Big]$$
- Hueco de intercambio: $\rho_{II}^{++}\to0$ si $r\ll\lambda_F$, mitad en $r\simeq0{,}29\,\lambda_F$, y contiene exactamente un electrón.
:::

## Verificación {#verificacion}

- **Dimensiones.** $k_F^3$ es 1/volumen: $\rho_I$ es una densidad y $\rho_{II}$ una densidad al cuadrado. $F$ es adimensional.
- **Límites.** $r\to\infty$: $\rho_{II}^{++}\to(\rho_I^+)^2$ (sin correlación). $r=0$: $\rho_{II}^{++}=0$ (Pauli).
- **Regla de suma.** $\int[\rho_{II}^{++}-(\rho_I^+)^2]\,\mathrm d^3r_0'=-\rho_I^+$: falta un electrón, como debe ser para $N$ fijo (de los $N/2$ electrones $+$, uno es el que está en $\mathbf r_0$).
- **Suma discreta.** La simulación evalúa la suma sobre los $\mathbf k$ permitidos en una caja finita, sin pasar a la integral, y la compara con $F(k_Fr)$: con unos cientos de electrones por espín ya coinciden a menos de un 1 % para $r<L/2$.

```sim
id: ej9-hueco-intercambio
pie: Arriba, la densidad de dos partículas dividida por (ρ_I)² en función de k_F r: espines opuestos (gris discontinuo, igual a 1), el mismo espín (rojo, 1 − F²) y el promedio sobre los espines de un gas no polarizado (punteado, 1 − F²/2). Los puntos son la suma discreta sobre los vectores k de una caja finita con condiciones periódicas, sin pasar a la integral; al aumentar el radio de Fermi (▶) se pegan a la curva. La línea vertical marca k_F r ≈ 1,81, donde el hueco llega a la mitad. Abajo, el corte k_z = 0 de la esfera de Fermi: cada punto es un vector k ocupado por dos electrones (uno por espín).
```

## Entendimiento físico {#entendimiento}

:::idea-fisica
La densidad de una partícula de un gas de Fermi es tan aburrida como la de un gas clásico: uniforme. Toda la física de la estadística está en $\rho_{II}$. Para espines opuestos no hay correlación, pero dos electrones del mismo espín **se evitan** en distancias del orden de la longitud de onda de Fermi, aunque no haya ninguna fuerza entre ellos: es la interferencia destructiva entre el término directo y el de intercambio, el mismo hueco del ejercicio 7 para dos electrones, ahora para $10^{23}$.

Este hueco tiene consecuencias energéticas cuando se enciende la repulsión de Coulomb: como los electrones del mismo espín se mantienen apartados, su repulsión media es menor que la que daría una nube sin correlaciones. Es la **energía de intercambio** del gas de electrones, el mismo efecto que pone al ortohelio por debajo del parahelio (sección 7) y que favorece el ferromagnetismo.
:::

:::error-comun Esperar que ρ_II⁺⁻ también tenga hueco
Con espines opuestos el término de intercambio es cero: no hay hueco de Fermi entre ellos en este modelo. (Con la repulsión de Coulomb aparece otro, el hueco de **correlación**, que no viene de la simetrización.)
:::

:::error-comun Olvidar quitar los términos k = k′
Al factorizar la suma hay que justificar que los términos $\mathbf k=\mathbf k'$ no aportan: se cancelan entre el directo y el de intercambio. Si sólo se incluyera el directo, la suma tendría un error de orden $1/N$.
:::

## ¿Qué pasa si…? {#que-pasa-si}

:::pregunta ¿Cuánto mide el hueco en un metal como el sodio?
Con $n=2{,}65\times10^{28}$ m⁻³ (sección 8), $k_F\simeq0{,}92$ Å⁻¹ y $\lambda_F\simeq6{,}8$ Å; el hueco llega a la mitad en $r\simeq1{,}8/k_F\simeq2$ Å, del orden de la distancia entre átomos.
:::

:::pregunta ¿Qué pasaría con bosones de espín 0 en los mismos estados de onda plana?
Con $\varepsilon=+1$ y estados distintos, $\rho_{II}\simeq(\rho_I)^2[1+F^2(k_Fr)]$: en $r=0$ el doble que sin correlación. Es el **agrupamiento** de bosones (efecto Hanbury Brown-Twiss), el reverso del hueco.
:::

:::pregunta ¿Y para un gas no polarizado, sin mirar el espín?
Promediando sobre los cuatro pares de espines, $\rho_{II}/\rho_I^2=1-\tfrac12F^2(k_Fr)$: en $r=0$ queda la mitad, porque sólo la mitad de los pares tiene el mismo espín.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento D_XIV, ejercicio 9, pp. 1502–1504. Usa el complemento C_XIV, §1 (relaciones (5), (7) y (26)), el ejercicio 8 y §D-2-a del capítulo.
- Ejercicio 7 de esta página (densidades de dos electrones) y sección 8 (gas de electrones).
