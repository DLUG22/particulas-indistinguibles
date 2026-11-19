---
titulo: Bosones, fermiones y Pauli
numero: 4
cohen: Cohen §D-1 · pp. 1444–1446
resumen: La única diferencia formal entre bosones y fermiones es un signo, pero sus consecuencias son enormes. Con partículas independientes, los bosones se apilan en el estado más bajo y los fermiones llenan los niveles uno por uno hasta la energía de Fermi. Al contar microestados aparecen tres estadísticas distintas: Maxwell-Boltzmann, Bose-Einstein y Fermi-Dirac.
---

:::idea-central
El postulado de simetrización sólo cambia un signo, pero ese signo lo cambia todo. Para **bosones** no hay ninguna restricción sobre los estados individuales: en el estado fundamental todos se acumulan en el nivel más bajo. Para **fermiones** rige el **principio de exclusión de Pauli**: cada estado individual admite a lo sumo una partícula, así que en el estado fundamental se llenan los $N$ niveles más bajos, hasta la **energía de Fermi**. Además, como el orden de las partículas ya no cuenta, el número de microestados cambia, y de ahí salen las **estadísticas cuánticas** de Bose-Einstein y de Fermi-Dirac.
:::

:::nota
Con esta sección empieza el §D del Cohen, la «discusión»: ya no hay postulados nuevos, sino sus consecuencias físicas. El §D-1 (esta sección) trata las diferencias entre bosones y fermiones; el §D-2 (sección 5), cómo cambian los cálculos de probabilidades.
:::

## D-1 · Diferencias entre bosones y fermiones {#d-1}

En la sección 3 vimos que, para **bosones**, el postulado no limita los estados individuales a los que pueden acceder las partículas: cualquier lista de estados da un ket físico no nulo. Para **fermiones**, en cambio, $A\ket u=0$ en cuanto dos partículas comparten estado individual (C-7, C-13). Ese es el principio de exclusión de Pauli.

Pauli lo propuso para explicar los átomos de muchos electrones, antes de que existiera el postulado. Ahora sabemos que **no es una regla exclusiva de los electrones**: es una consecuencia del postulado de simetrización y vale para **todos** los fermiones idénticos (protones, neutrones, quarks, átomos de $^3$He…). Sus predicciones, muchas veces espectaculares, siempre se han confirmado en el laboratorio.

### D-1-a · Estado fundamental de partículas independientes {#d-1-a}

El hamiltoniano de partículas idénticas siempre es simétrico (C-4). Supongamos además que las partículas son **independientes**: no interactúan entre sí, al menos en una primera aproximación. Entonces el hamiltoniano es una suma de operadores de una partícula,

$$H(1,2,\dots,N)=h(1)+h(2)+\dots+h(N)\tag{D-1}$$

donde $h(1)$ sólo depende de los observables de la partícula (1). Como $H$ es simétrico, **la misma** función $h$ aparece en los $N$ términos. Para hallar los estados y energías del sistema basta resolver el problema de **una** partícula:

$$h(j)\ket{\varphi_n}=e_n\ket{\varphi_n},\qquad \ket{\varphi_n}\in\mathscr E(j)\tag{D-2}$$

Por sencillez, el Cohen supone que el espectro de $h$ es discreto y no degenerado.

:::pasos Los vectores propios de $H$ para bosones
+++ Un ket producto ya es propio de $H$
Cada $h(j)$ actúa sólo sobre su partícula:
$$\begin{aligned}&H\ket{1\!:\!\varphi_{n_1};\dots;N\!:\!\varphi_{n_N}}\\&\quad=\big(e_{n_1}+\dots+e_{n_N}\big)\ket{1\!:\!\varphi_{n_1};\dots}\end{aligned}$$
> La energía de partículas independientes es la suma de las energías individuales.
+++ Sus permutados también, con la misma energía
Como $[H,P_\alpha]=0$ (C-25), si $\ket u$ es propio con energía $E$, entonces $HP_\alpha\ket u=P_\alpha H\ket u=E\,P_\alpha\ket u$.
> Permutar las partículas no cambia la lista de energías individuales, sólo quién tiene cada una.
+++ Simetrizar
La suma de kets propios con el mismo valor propio sigue siendo propia. El ket físico de bosones es
$$\begin{aligned}&\ket{\phi^{(S)}_{n_1,\dots,n_N}}=c\sum_\alpha P_\alpha\\&\qquad\ket{1\!:\!\varphi_{n_1};\dots;N\!:\!\varphi_{n_N}}\end{aligned}\tag{D-3}$$
con energía
$$E_{n_1,n_2,\dots,n_N}=e_{n_1}+e_{n_2}+\dots+e_{n_N}\tag{D-4}$$
> Los estados individuales $\varphi_{n_1},\dots,\varphi_{n_N}$ son **arbitrarios**: pueden repetirse.
:::

:::pasos El estado fundamental de $N$ bosones
+++ Minimizar la suma (D-4)
Sea $e_1$ el valor propio más bajo de $h$ y $\ket{\varphi_1}$ su estado. Como nada impide repetir estados, la suma es mínima si **todas** las partículas están en $\varphi_1$.
+++ Energía y ket
$$E_{1,1,\dots,1}=N\,e_1\tag{D-5}$$
$$\begin{aligned}&\ket{\phi^{(S)}_{1,1,\dots,1}}\\&\quad=\ket{1\!:\!\varphi_1;\,2\!:\!\varphi_1;\,\dots;\,N\!:\!\varphi_1}\end{aligned}\tag{D-6}$$
> Este ket ya es simétrico y está normalizado: no hay nada que simetrizar.
:::

:::pasos El estado fundamental de $N$ fermiones
+++ Ordenar los niveles
Escribimos las energías individuales en orden creciente:
$$e_1<e_2<\dots<e_n<e_{n+1}<\cdots\tag{D-7}$$
+++ Pauli prohíbe repetir
Ya no pueden estar todas en $\varphi_1$: cada estado individual admite a lo sumo un fermión. La suma (D-4) con $N$ estados **distintos** es mínima si se toman los $N$ más bajos.
> Es como llenar un recipiente desde el fondo: cada nivel acepta una sola partícula.
+++ Energía
$$E_{1,2,\dots,N}=e_1+e_2+\dots+e_N\tag{D-8}$$
+++ Ket: un determinante de Slater
$$\ket{\phi^{(A)}_{1,2,\dots,N}}=\frac{1}{\sqrt{N!}}\,D\tag{D-9}$$
donde $D$ es el determinante de Slater
$$D=\begin{vmatrix}\ket{1\!:\!\varphi_1}&\cdots&\ket{1\!:\!\varphi_N}\\\vdots&\ddots&\vdots\\\ket{N\!:\!\varphi_1}&\cdots&\ket{N\!:\!\varphi_N}\end{vmatrix}$$
> Los $N$ estados son distintos y ortonormales, así que el factor es $1/\sqrt{N!}$ (sección 3).
+++ La energía de Fermi
La energía individual más alta que queda ocupada, $e_N$, se llama **energía de Fermi** del sistema.
> Aun en el estado de menor energía, hay fermiones con energía individual alta: Pauli los obliga a ir subiendo.
:::

:::comentario
Casi siempre los niveles $e_n$ son **degenerados**. Entonces Pauli no prohíbe que dos fermiones tengan la misma energía, sino que estén en el mismo **estado**: un nivel con degeneración $g_n$ admite $g_n$ fermiones, y $e_n$ entra en (D-8) tantas veces como fermiones lo ocupen. Por ejemplo, un electrón (espín ½) en un potencial que no depende del espín tiene cada nivel orbital duplicado ($m_s=\pm\tfrac12$): caben dos electrones por nivel orbital.
:::

#### Un ejemplo con números: el oscilador armónico {#d-1-a-oscilador}

:::pasos $N$ partículas en un oscilador armónico 1D
+++ Los niveles de una partícula
$e_n=\big(n-\tfrac12\big)\hbar\omega$ con $n=1,2,\dots$ (es decir, $\tfrac12\hbar\omega,\ \tfrac32\hbar\omega,\dots$), no degenerados.
> Numeramos desde $n=1$ para seguir la notación de (D-7).
+++ Bosones
Por (D-5): $E_0^{(B)}=N\,e_1=\dfrac N2\,\hbar\omega$.
> Crece linealmente con $N$, con energía $\tfrac12\hbar\omega$ por partícula.
+++ Fermiones polarizados (un solo estado de espín)
Por (D-8):
$$\begin{aligned}E_0^{(F)}&=\sum_{n=1}^{N}\Big(n-\tfrac12\Big)\hbar\omega\\&=\Big(\frac{N(N+1)}2-\frac N2\Big)\hbar\omega\\&=\frac{N^2}{2}\,\hbar\omega\end{aligned}$$
y la energía de Fermi es $e_N=\big(N-\tfrac12\big)\hbar\omega$.
> Crece como $N^2$: la energía **media** por partícula, $N\hbar\omega/2$, aumenta con el número de partículas.
+++ Fermiones de espín ½
Cada nivel admite dos. Con $N$ par se llenan $N/2$ niveles:
$$\begin{aligned}E_0^{(F,\,1/2)}&=2\sum_{n=1}^{N/2}\Big(n-\tfrac12\Big)\hbar\omega\\&=\frac{N^2}{4}\,\hbar\omega\end{aligned}$$
> La mitad que con fermiones polarizados: duplicar la degeneración reduce a la mitad la altura del «mar» de Fermi.
+++ Comparar
Para $N=12$: $E_0^{(B)}=6\,\hbar\omega$, $E_0^{(F,\,1/2)}=36\,\hbar\omega$ y $E_0^{(F)}=72\,\hbar\omega$.
> La simulación da estos mismos valores.
:::

```sim
id: llenado-niveles
pie: Elige el espectro y el número de partículas N (▶ recorre N de 1 a 14). Arriba, el estado fundamental en tres columnas. El dibujo no está a escala: los niveles están igualmente espaciados y su energía aparece a la izquierda. Junto a cada nivel de fermiones se lee ocupación/capacidad, y la línea roja gruesa marca la energía de Fermi. Abajo, E₀(N) de cada tipo de partícula. Con el espectro tipo hidrógeno y espín ½ fíjate en N = 2 y N = 10: son capas llenas (2 y 2 + 8). Es un modelo sin repulsión entre partículas.
```

:::nota Conexión nuclear
El Cohen lo menciona en una nota al pie: en un núcleo, el ket debe ser antisimétrico respecto a los **protones** entre sí y, por separado, respecto a los **neutrones** entre sí. Protones y neutrones son fermiones distintos, así que cada especie obedece su propio principio de Pauli. En el modelo de capas nuclear, protones y neutrones llenan sus niveles de forma independiente, cada especie con su propia energía de Fermi, igual que las dos columnas de fermiones de la simulación.
:::

### D-1-b · Estadísticas cuánticas {#d-1-b}

La mecánica estadística estudia sistemas con un número enorme de partículas, que muchas veces interactúan tan poco que se pueden tratar como independientes. No conocemos el estado microscópico exacto, sino propiedades globales: presión, temperatura, densidad. Un **macroestado** corresponde a muchos **microestados**, y la idea central es:

- el peso estadístico de un macroestado es proporcional al **número de microestados distintos** que le corresponden;
- en equilibrio, el sistema está en el macroestado más probable (compatible con las ligaduras).

Todo depende, pues, de **cómo se cuentan** los microestados. Y aquí el postulado de simetrización cambia las reglas.

- **Maxwell-Boltzmann (clásica).** Las partículas se tratan como si fueran de naturalezas distintas, aunque sean idénticas. Un microestado se define dando el estado individual de **cada** partícula. Dos listas con los mismos estados pero permutados entre partículas son microestados **distintos**.
- **Cuántica.** Un microestado se define dando los $N$ estados individuales ocupados, **sin importar el orden**, porque el producto tensorial se simetriza o antisimetriza. Sólo cuentan los números de ocupación $n_k$ (sección 3, C-15). Además:
  - **bosones**: $n_k$ puede ser cualquiera ⇒ estadística de **Bose-Einstein**;
  - **fermiones**: $n_k\in\{0,1\}$ por Pauli ⇒ estadística de **Fermi-Dirac**.

De ahí vienen los nombres «bosón» y «fermión».

:::pasos Contar: dos partículas en tres estados
+++ Maxwell-Boltzmann
Cada partícula puede estar en cualquiera de los 3 estados, independientemente de la otra: $3^2=9$ microestados. En general, $W_{MB}=M^N$.
> Por ejemplo, «1 en $u_1$ y 2 en $u_2$» y «1 en $u_2$ y 2 en $u_1$» cuentan como dos.
+++ Bose-Einstein
Sólo importan las ocupaciones: $(2,0,0)$, $(0,2,0)$, $(0,0,2)$, $(1,1,0)$, $(1,0,1)$, $(0,1,1)$. Son 6. En general, $W_{BE}=\binom{M+N-1}{N}$.
> Las dos listas del ejemplo anterior son ahora **un solo** microestado, $(1,1,0)$.
+++ Fermi-Dirac
De las seis, sólo valen las que no repiten estado: $(1,1,0)$, $(1,0,1)$, $(0,1,1)$. Son 3. En general, $W_{FD}=\binom{M}{N}$.
+++ ¿Con qué probabilidad comparten estado?
Si todos los microestados son igual de probables: con MB, $3/9=\tfrac13$; con BE, $3/6=\tfrac12$; con FD, $0$.
> Los bosones tienden a **agruparse** más que las partículas clásicas, y los fermiones se **evitan**. La sección 5 muestra el mismo efecto como interferencia entre el término directo y el de intercambio.
:::

```sim
id: conteo-microestados
pie: Elige N y M. Arriba, cada casilla es una configuración de números de ocupación: cuenta como un microestado de bosones, y si tiene borde rojo (ningún estado repetido) también como uno de fermiones. El número ×k es cuántos microestados clásicos (Maxwell-Boltzmann) agrupa, N!/Πnₖ!. Abajo, el cociente entre los conteos cuánticos y el clásico corregido Mᴺ/N!: cuando hay muchos más estados que partículas (M ≫ N), los tres conteos coinciden.
```

:::pasos Cuándo los tres conteos coinciden
+++ Escribir los coeficientes binomiales como productos
$$\begin{gathered}W_{BE}=\frac{M(M+1)\cdots(M+N-1)}{N!}\\W_{FD}=\frac{M(M-1)\cdots(M-N+1)}{N!}\end{gathered}$$
> Se obtiene simplificando los factoriales de $\binom{M+N-1}{N}$ y $\binom{M}{N}$.
+++ Compararlos con el conteo clásico dividido entre $N!$
$$\begin{gathered}\frac{W_{BE}}{M^N/N!}=\prod_{k=0}^{N-1}\Big(1+\frac kM\Big)\\\frac{W_{FD}}{M^N/N!}=\prod_{k=0}^{N-1}\Big(1-\frac kM\Big)\end{gathered}$$
> Dividir $M^N$ entre $N!$ es la manera clásica de «no contar» las permutaciones de partículas idénticas.
+++ El límite $M\gg N$
Si hay muchos más estados que partículas, cada factor tiende a 1 y
$$W_{BE}\simeq W_{FD}\simeq\frac{M^N}{N!}$$
> Casi nunca dos partículas comparten estado, así que da igual si se permite (bosones) o se prohíbe (fermiones). Es el régimen de un gas diluido o caliente, donde la estadística clásica funciona.
:::

**A bajas temperaturas** las partículas se acumulan en los estados de menor energía, la condición $M\gg N$ deja de cumplirse y bosones y fermiones se comportan de forma radicalmente distinta:

- Los **bosones** pueden acumularse masivamente en el estado individual más bajo: es la **condensación de Bose-Einstein**. Está detrás de la **superfluidez** del $^4$He líquido a unos pocos kelvin.
- Los **fermiones** no pueden: llenan una **esfera de Fermi** (el gas de electrones de la sección 8). Sólo pueden «condensarse» formando **pares**. El $^3$He, que es un fermión (sección 3), también se vuelve superfluido, pero a temperaturas muchísimo más bajas y por condensación de pares.

El Cohen desarrolla estas estadísticas en el volumen III; aquí basta con su origen: **contar de otra manera**.

:::resultado
- Bosones y fermiones difieren en un signo, pero sólo los fermiones tienen restricción: **Pauli**, consecuencia del postulado y válido para todo fermión.
- Partículas independientes: $H=\sum_j h(j)$ (D-1); los kets (D-3) tienen energía $e_{n_1}+\dots+e_{n_N}$ (D-4).
- Estado fundamental de **bosones**: todos en $\varphi_1$, $E=Ne_1$ (D-5, D-6).
- Estado fundamental de **fermiones**: los $N$ estados más bajos, $E=e_1+\dots+e_N$ (D-8), ket = determinante de Slater (D-9). La energía individual más alta ocupada es la **energía de Fermi**.
- Con niveles degenerados, cada nivel admite tantos fermiones como su degeneración.
- **Estadísticas:** $W_{MB}=M^N$, $W_{BE}=\binom{M+N-1}{N}$, $W_{FD}=\binom MN$. Coinciden (salvo el $N!$) cuando $M\gg N$; a baja temperatura difieren: condensación de Bose-Einstein contra esfera de Fermi.
:::

:::idea-fisica
Pauli es la razón por la que la materia ocupa espacio. Si los electrones fueran bosones, todos caerían al orbital $1s$ de cada átomo: no habría capas, ni tabla periódica, ni química. Que los fermiones «se esquiven» obliga a los electrones a subir de nivel, y esa energía extra, la de Fermi, es una presión que no depende de la temperatura: sostiene a los metales, a las estrellas enanas blancas (con electrones) y a las estrellas de neutrones. Los bosones hacen lo contrario: se apilan, y por eso existen el láser y los superfluidos.
:::

## Esqueleto {#esqueleto}

:::esqueleto
1. **El signo cuenta:** bosones sin restricción; fermiones con Pauli (consecuencia del postulado, no una regla aparte; vale para todo fermión).
2. **Independientes:** $H=h(1)+\dots+h(N)$ (D-1), $h\ket{\varphi_n}=e_n\ket{\varphi_n}$ (D-2).
3. **Bosones:** kets $c\sum_\alpha P_\alpha\ket{1\!:\!\varphi_{n_1};\dots}$ (D-3), $E=\sum e_{n_j}$ (D-4); fundamental $Ne_1$ (D-5, D-6).
4. **Fermiones:** se llenan $e_1<e_2<\dots$ (D-7); $E=e_1+\dots+e_N$ (D-8); Slater con $1/\sqrt{N!}$ (D-9); **energía de Fermi** $=e_N$.
5. **Degeneración:** un nivel con $g$ estados admite $g$ fermiones (espín ½: dos por nivel orbital). Núcleos: Pauli por separado para protones y neutrones.
6. **Contar microestados:** MB distingue permutaciones ($M^N$); BE sólo ocupaciones ($\binom{M+N-1}N$); FD ocupaciones 0 o 1 ($\binom MN$).
7. **Límite clásico:** $M\gg N$ ⇒ $W_{BE}\simeq W_{FD}\simeq M^N/N!$; a baja $T$: condensación de Bose-Einstein ($^4$He) contra esfera de Fermi ($^3$He, sólo pares).
:::

## Preguntas {#preguntas}

:::pregunta Tres fermiones polarizados en un oscilador armónico 1D. ¿Cuánto vale la energía del estado fundamental? ¿Y si fueran bosones?
Fermiones: $\big(\tfrac12+\tfrac32+\tfrac52\big)\hbar\omega=\tfrac92\hbar\omega=\tfrac{N^2}2\hbar\omega$, con energía de Fermi $\tfrac52\hbar\omega$. Bosones: $3\cdot\tfrac12\hbar\omega=\tfrac32\hbar\omega$.
:::

:::pregunta ¿Y si son tres electrones (espín ½) en el mismo oscilador, sin interacción?
Dos caben en el nivel más bajo ($m_s=\pm\tfrac12$) y el tercero sube al siguiente: $E_0=\tfrac12+\tfrac12+\tfrac32=\tfrac52\hbar\omega$, con energía de Fermi $\tfrac32\hbar\omega$. Compruébalo en la simulación con $N=3$.
:::

:::pregunta ¿Por qué el estado fundamental de $N$ partículas distinguibles e independientes tiene la misma energía que el de $N$ bosones?
Porque a las distinguibles tampoco se les restringen los estados: todas pueden estar en $\varphi_1$, con $E=Ne_1$. El ket $\ket{1\!:\!\varphi_1;\dots;N\!:\!\varphi_1}$ ya es simétrico. Las diferencias entre distinguibles y bosones aparecen en los estados excitados (cómo se cuentan y cuánto se degeneran) y en las estadísticas.
:::

:::pregunta Dos partículas pueden ocupar 3 estados con la misma probabilidad para cada microestado. ¿Cuál es la probabilidad de que estén en el mismo estado si son clásicas, bosones o fermiones?
Clásicas: $3/9=1/3$. Bosones: $3/6=1/2$. Fermiones: $0$. Los bosones se agrupan más que las clásicas y los fermiones nunca coinciden.
:::

:::pregunta ¿Por qué el $^3$He se vuelve superfluido a temperaturas mucho más bajas que el $^4$He?
El átomo de $^4$He tiene 6 fermiones (bosón) y puede condensarse en el estado más bajo (Bose-Einstein) a unos pocos kelvin. El de $^3$He tiene 5 (fermión): Pauli le impide acumularse en un estado, y sólo se vuelve superfluido cuando forma pares, que se comportan como bosones, a temperaturas mucho menores.
:::

## Errores comunes {#errores-comunes}

:::error-comun Creer que Pauli es un postulado aparte, sólo para electrones
Es una consecuencia del postulado de simetrización y vale para **todos** los fermiones idénticos: protones, neutrones, átomos de $^3$He…
:::

:::error-comun «Dos fermiones no pueden tener la misma energía»
Lo prohibido es el mismo **estado** individual, no la misma energía. Un nivel degenerado $g$ veces admite $g$ fermiones; por eso caben dos electrones en cada orbital, uno con cada espín.
:::

:::error-comun Confundir la energía de Fermi con la energía total o la media
La energía de Fermi es la energía **individual** del último nivel ocupado, $e_N$. La energía del estado fundamental es la suma (D-8), y la media por partícula es esa suma dividida entre $N$.
:::

:::error-comun Pensar que la estadística clásica vale porque las partículas «dejan de ser idénticas»
Siguen siendo idénticas. Cuando $M\gg N$ casi nunca dos comparten estado, y los tres conteos coinciden con $M^N/N!$; lo que se vuelve despreciable es el **efecto** de la simetrización, no la identidad. La sección 5 lo precisa (§D-2-b).
:::

:::error-comun Olvidar el espín al llenar niveles
Si las partículas tienen espín ½ y $h$ no depende del espín, cada nivel orbital cuenta dos veces. Llenar «uno por nivel» da una energía de Fermi y una energía total demasiado altas.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Cap. XIV, introducción del §D y §D-1, pp. 1443–1446: ecuaciones (D-1) a (D-9) y nota 9.
- Mismos autores, *Quantum Mechanics*, vol. III, Wiley-VCH, 2020: estadísticas de Bose-Einstein y Fermi-Dirac, condensación de Bose-Einstein y superfluidez (citado en §D-1-b).
- Lectura complementaria: J. J. Sakurai y J. Napolitano, *Modern Quantum Mechanics*, 3.ª ed., Cambridge University Press, 2020, §7.2.
