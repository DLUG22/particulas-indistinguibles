---
titulo: Gas de electrones
numero: 8
cohen: Complemento C_XIV · pp. 1481–1495
resumen: Muchos electrones libres en una caja llenan, por el principio de Pauli, todos los estados hasta la energía de Fermi, que sólo depende de la densidad y vale unos eV en un metal. Como los estados profundos están ocupados, sólo los electrones cercanos a E_F pueden ganar energía; eso explica por qué el calor específico y la susceptibilidad de los metales son cien veces menores que lo clásico. Con bandas de energía, la posición de E_F separa conductores, aislantes y semiconductores.
---

:::idea-central
Con $N\sim10^{23}$ electrones, Pauli obliga a apilarlos en energía: el fundamental llena una **esfera de Fermi** en el espacio $\mathbf k$ hasta $E_F=\frac{\hbar^2}{2m_e}(3\pi^2N/L^3)^{2/3}$, de unos eV en un metal, cien veces más que $kT$ a temperatura ambiente. Casi todos los electrones están «congelados»: los estados a los que podrían subir ya están ocupados. Sólo una franja de ancho $\sim kT$ alrededor de $E_F$ responde al calor, a un campo magnético o a un campo eléctrico, y por eso la física de los metales es la física de la superficie de Fermi.
:::

:::nota
Las ecuaciones llevan la numeración del complemento C_XIV, (1) a (29). El §1 es el que usa el ejercicio 9 (el hueco de intercambio); el §2 es cualitativo.
:::

## 1 · Electrones libres en una caja {#caja}

Despreciamos las interacciones entre electrones y todo potencial externo, salvo el de las paredes de una caja cúbica de arista $L$, que no pueden atravesar. Dentro de la caja la energía potencial es cero: es el **pozo infinito** tridimensional.

### 1-a · El fundamental y la energía de Fermi {#fermi}

Los estados estacionarios de un electrón son

$$\begin{aligned}\varphi_{n_1n_2n_3}(\mathbf r)=\Big(\frac2L\Big)^{3/2}&\operatorname{sen}\frac{n_1\pi x}{L}\\\times\;&\operatorname{sen}\frac{n_2\pi y}{L}\operatorname{sen}\frac{n_3\pi z}{L}\end{aligned}\tag{1a}$$

$$n_1,n_2,n_3=1,2,3,\dots\tag{1b}$$

válidos para $0\le x,y,z\le L$ (fuera, la función es cero), con energía

$$E_{n_1n_2n_3}=\frac{\pi^2\hbar^2}{2m_eL^2}\big(n_1^2+n_2^2+n_3^2\big)\tag{2}$$

Cada $\varphi$ es la parte espacial de **dos** estados, uno por orientación del espín, con la misma energía porque $H$ no depende del espín. El espaciado entre niveles va como $1/L^2$: en una caja macroscópica el espectro es, en la práctica, continuo.

El fundamental se obtiene antisimetrizando el producto de los $N$ estados individuales más bajos que permite Pauli (§D-1-a). Con pocos electrones se llenan los niveles (2) uno a uno; con $N\sim10^{23}$ eso es imposible y hay que contar de forma global.

:::pasos Contar los estados por debajo de E
+++ Pasar al espacio k
Escribimos (2) como la energía de una partícula libre,
$$E=\frac{\hbar^2\mathbf k^2}{2m_e}\tag{3}$$
$$k_x=\frac{n_1\pi}{L}\quad k_y=\frac{n_2\pi}{L}\quad k_z=\frac{n_3\pi}{L}\tag{4}$$
> Cada función (1a) corresponde a un único vector $\mathbf k$ con componentes **positivas**, y viceversa.
+++ Un vector por celda
Las puntas de los vectores $\mathbf k$ forman una red cúbica de paso $\pi/L$. Cada punta es esquina de 8 cubos y cada cubo tiene 8 esquinas: en promedio hay **un** vector $\mathbf k$ por volumen $(\pi/L)^3$.
> Es la fig. 1 del Cohen, en dos dimensiones.
+++ Contar los que caben en la esfera
Los estados con energía menor que $E$ tienen $|\mathbf k|<\sqrt{2m_eE/\hbar^2}$. Sólo cuenta el octante de componentes positivas. Volumen del octante dividido por la celda, y por 2 por el espín:
$$\begin{aligned}N(E)&=2\cdot\frac18\cdot\frac{4\pi}{3}\Big(\frac{2m_eE}{\hbar^2}\Big)^{3/2}\Big(\frac L\pi\Big)^3\\&=\frac{L^3}{3\pi^2}\Big(\frac{2m_eE}{\hbar^2}\Big)^{3/2}\end{aligned}\tag{5}$$
> Para $N$ grande la red es tan fina que contar puntos es medir volumen. La simulación compara este conteo con la escalera exacta en una caja pequeña.
+++ La energía de Fermi
A $T=0$ los $N$ electrones ocupan todos los estados hasta una energía máxima $E_F$, definida por
$$N(E_F)=N\tag{6}$$
$$E_F=\frac{\hbar^2}{2m_e}\Big(3\pi^2\frac N{L^3}\Big)^{2/3}\tag{7}$$
> Sólo depende de la **densidad** $N/L^3$, como debe ser para una magnitud intensiva. Equivale a una esfera de radio $k_F=(3\pi^2N/L^3)^{1/3}$ en el espacio $\mathbf k$.
+++ La densidad de estados
$\rho(E)\,\mathrm dE$ es el número de estados entre $E$ y $E+\mathrm dE$:
$$\rho(E)=\frac{\mathrm dN}{\mathrm dE}=\frac{L^3}{2\pi^2}\Big(\frac{2m_e}{\hbar^2}\Big)^{3/2}\sqrt E\tag{8}$$
y, con (7),
$$\rho(E)=\frac32\,N\,\frac{E^{1/2}}{E_F^{3/2}}\tag{9}$$
> Crece como $\sqrt E$. A $T=0$, el número de electrones con energía entre $E$ y $E+\mathrm dE$ es $\rho(E)\,\mathrm dE$ si $E<E_F$ y cero si $E>E_F$.
:::

:::comentario
La caja sólo entra por el volumen de la celda $(\pi/L)^3$. Con un paralelepípedo de aristas $L_1,L_2,L_3$ la celda sería $\pi^3/L_1L_2L_3$: la densidad de estados depende sólo del **volumen**, y se puede mostrar que eso vale para cualquier forma de caja si es lo bastante grande.
:::

```sim
id: gas-fermi
pie: Arriba, como la fig. 2 del Cohen, la densidad de estados por unidad de volumen ρ(E)/L³ ∝ √E (gris) y el número de electrones por intervalo de energía, ν(E) = ρ(E) f(E, T) (rojo); la franja marca μ ± kT. Al medio, la distribución de Fermi-Dirac (15) frente al escalón de T = 0 (fig. 3). Con ▶ sube la temperatura: hasta T ~ 0,1 T_F sólo se redondea el borde y μ casi no se mueve; para ver algo hay que ir a decenas de miles de kelvin, porque T_F de un metal es de ~10⁴–10⁵ K. Abajo, una caja pequeña con pocos electrones: la escalera es el número exacto de estados con n₁² + n₂² + n₃² por debajo de E, la curva gris es la fórmula continua (5), y las líneas verticales comparan el último nivel ocupado con (7). Las densidades de la ayuda (Na, Cu…) son datos típicos externos al Cohen; χ se da en SI (multiplicando (23) por μ₀).
```

### 1-b · Los electrones cercanos a la energía de Fermi {#cerca-de-fermi}

Con argumentos semicuantitativos, el Cohen muestra dos consecuencias de Pauli: el calor específico y la susceptibilidad magnética de un gas de electrones.

#### α · Calor específico {#calor-especifico}

:::pasos Por qué el calor específico electrónico es tan pequeño
+++ Si los electrones fueran clásicos
Al pasar de 0 a $T$, cada uno ganaría una energía $\sim kT$, y la energía por unidad de volumen sería
$$U_{\text{cl}}(T)\simeq\frac N{L^3}\,kT\tag{10}$$
> Daría un calor específico $\partial U_{\text{cl}}/\partial T$ independiente de $T$.
+++ Pauli congela a casi todos
Un electrón con $E_F-E\gg kT$ no puede ganar $kT$: los estados a los que llegaría están ocupados. Sólo se «calientan» los que están a menos de $\sim kT$ de $E_F$ (fig. 2b). Con (9), son
$$\Delta N\simeq\rho(E_F)\,kT=\frac32\,N\,\frac{kT}{E_F}\tag{11}$$
> Una fracción $kT/E_F$ de todos. Ésta es la lectura «fracción que se calienta» de la simulación.
+++ La energía y el calor específico
Cada uno de esos $\Delta N$ gana $\sim kT$:
$$U(T)\simeq\frac N{L^3}\,\frac{kT}{E_F}\,kT\tag{12}$$
$$c_V=\frac{\partial U}{\partial T}\simeq\frac{Nk}{L^3}\,\frac{kT}{E_F}\tag{13}$$
> Lineal en $T$ y reducido en el factor $kT/E_F$. Con $E_F$ de unos eV y $kT\simeq0{,}03$ eV a temperatura ambiente, el factor es ~1/100.
:::

:::pasos Cuantitativamente: la distribución de Fermi-Dirac (comentario i)
+++ Ocupación media de un estado
A temperatura $T$, el número de electrones entre $E$ y $E+\mathrm dE$ es
$$\nu(E)\,\mathrm dE=f(E,T)\,\rho(E)\,\mathrm dE\tag{14}$$
$$f(E,T)=\frac1{e^{(E-\mu)/kT}+1}\tag{15}$$
> Es la distribución de Fermi-Dirac (se deduce en mecánica estadística, complemento B_XV). $\mu$ es el potencial químico, llamado **nivel de Fermi**.
+++ El nivel de Fermi lo fija el número de electrones
$$\int_0^{\infty}\frac{\rho(E)\,\mathrm dE}{e^{(E-\mu)/kT}+1}=N\tag{16}$$
> $\mu$ depende de $T$, pero muy despacio mientras $kT\ll E_F$. La simulación resuelve (16) numéricamente.
+++ Forma de $f$
A $T=0$, $f$ es un escalón: 1 si $E<\mu$, 0 si $E>\mu$. A $T$ pequeña, el escalón se redondea en un intervalo de unos $kT$ (fig. 3). Para el gas libre, $\mu(T\to0)=E_F$.
+++ Espectros discretos y bandas
Si el espectro es discreto ($e_1,e_2,\dots$), a $T=0$ cualquier $\mu$ entre $e_N$ y $e_{N+1}$ satisface (16); se define $\mu$ como el límite cuando $T\to0$, que cae entre los dos (a la mitad si tienen la misma degeneración). Con **bandas**, si el último estado ocupado coincide con el borde superior de una banda, $\mu$ queda en la banda prohibida; si cae dentro de una banda, $\mu=E_F$.
> Esta distinción entre «energía de Fermi» (último estado ocupado) y «nivel de Fermi» (potencial químico) es la que usa el §2.
:::

:::comentario
A temperatura ambiente el calor específico de un metal lo da casi todo la red de iones, y el de los electrones es despreciable. Pero el de la red baja como $T^3$, así que cerca de 1 K domina el de los electrones, y en los metales se observa justamente una caída **lineal** en $T$, como predice (13).
:::

#### β · Susceptibilidad magnética {#susceptibilidad}

Ponemos el gas en un campo uniforme $\mathbf B$ paralelo a $Oz$ y conservamos sólo el término paramagnético de espín:

$$W=-2\,\frac{\mu_B}{\hbar}\,B\,S_z\tag{17}$$

$$\mu_B=\frac{q\hbar}{2m_e}\tag{18}$$

Como $q<0$, el magnetón $\mu_B$ es negativo, y el espín $+$ (energía $-\mu_BB=+|\mu_B|B$) queda **por encima** del $-$. Los estados estacionarios son los mismos; la energía de cada uno sube o baja en $|\mu_B|B$ según su espín.

:::pasos El paramagnetismo de Pauli
+++ Dos densidades de estados corridas
Las densidades de estados con espín $+$ y $-$ son la mitad de $\rho$, corridas:
$$\rho_\pm(E)=\tfrac12\,\rho\big(E\pm\mu_BB\big)\tag{19}$$
> Con $\mu_B<0$, $\rho_+$ empieza en $E=|\mu_B|B$ y $\rho_-$ en $E=-|\mu_B|B$. Fig. 4 del Cohen: las dos «medias parábolas» desplazadas $2|\mu_B|B$ una respecto de la otra y llenas hasta el mismo $E_F$; por eso hay más electrones $-$ (momento magnético paralelo a $\mathbf B$).
+++ Cuántos electrones cambian de espín
Como $|\mu_B|B\ll E_F$, la diferencia de poblaciones es sólo la franja de ancho $2|\mu_B|B$ cerca de $E_F$:
$$N_--N_+\simeq\tfrac12\,\rho(E_F)\cdot2|\mu_B|B\tag{20}$$
> Otra vez: sólo los electrones de la superficie de Fermi pueden darse la vuelta.
+++ La magnetización
$$\begin{aligned}\mathcal M&=|\mu_B|\,\frac1{L^3}\big(N_--N_+\big)\\&=\mu_B^2\,B\,\frac1{L^3}\,\rho(E_F)\end{aligned}\tag{21}$$
+++ La susceptibilidad
$$\chi=\frac{\mathcal M}B=\mu_B^2\,\frac1{L^3}\,\rho(E_F)\tag{22}$$
y con (9),
$$\chi=\frac32\,\frac N{L^3}\,\frac{\mu_B^2}{E_F}\tag{23}$$
> En SI hay que multiplicar por $\mu_0$ para obtener un $\chi$ adimensional: para el sodio, $\chi\approx8\times10^{-6}$.
:::

:::comentario
(23) se calculó a $T=0$, pero vale a $T$ baja: el redondeo de la fig. 2b afecta por igual a las dos orientaciones de espín. La susceptibilidad sale **independiente de $T$**, como se observa en los metales, y no $\propto1/T$ como la de Curie para momentos libres. El motivo es el mismo que en el calor específico: los electrones $+$ querrían pasar a $-$, que es más favorable, pero casi todos tienen ocupados los estados vecinos.
:::

### 1-c · Condiciones de contorno periódicas {#periodicas}

Las funciones (1a) son ondas estacionarias, muy distintas de las ondas planas $e^{i\mathbf k\cdot\mathbf r}$ con que se suele describir a un electrón libre. La diferencia viene sólo de las paredes: dentro de la caja, ambas cumplen

$$-\frac{\hbar^2}{2m_e}\Delta\varphi(\mathbf r)=E\,\varphi(\mathbf r)\tag{24}$$

Como las ondas planas son más cómodas, se cambian las condiciones de contorno por otras, artificiales, que las admitan. Eso cambia el problema, pero sirve si (i) las nuevas funciones forman una base para las funciones definidas dentro de la caja y (ii) dan la **misma densidad de estados**. Fallarán cerca de las paredes (efectos de superficie), pero darán bien los efectos de volumen, que según §1-b sólo dependen de $\rho(E)$.

:::pasos Las condiciones de Born-von Kármán
+++ Periodicidad en lugar de paredes
Se pide que las funciones sean periódicas de período $L$:
$$\varphi(x+L,y,z)=\varphi(x,y,z)\tag{25}$$
y lo mismo en $y$ y $z$.
+++ Los vectores k permitidos
Las ondas planas cumplen (25) si
$$\begin{aligned}&k_x=\frac{2\pi}{L}n_1\quad k_y=\frac{2\pi}{L}n_2\\&k_z=\frac{2\pi}{L}n_3\end{aligned}\tag{26}$$
con $n_i$ enteros **de cualquier signo** o cero.
+++ Las funciones y sus energías
$$\varphi_{n_1n_2n_3}(\mathbf r)=\frac1{L^{3/2}}\,e^{2\pi i(n_1x+n_2y+n_3z)/L}\tag{27}$$
$$E_{n_1n_2n_3}=\frac{\hbar^2}{2m_e}\,\frac{4\pi^2}{L^2}\big(n_1^2+n_2^2+n_3^2\big)\tag{28}$$
> Normalizadas en la caja. Forman una base: cualquier función en la caja se extiende periódicamente y se desarrolla en serie de Fourier.
+++ La misma densidad de estados
Ahora la celda es $(2\pi/L)^3$, **ocho** veces mayor; pero los $\mathbf k$ llenan la esfera **entera**, no un octante. Los dos factores se compensan y $N(E)$ es otra vez (5).
> Por eso el ejercicio 9 puede trabajar con ondas planas (27) y obtener la misma $k_F$.
:::

:::comentario
Para un electrón realmente libre, la base natural es continua, $(2\pi\hbar)^{-3/2}e^{i\mathbf p\cdot\mathbf r/\hbar}$ (29), y no es normalizable. A veces conviene encerrarlo en una caja **ficticia** con condiciones BVK, mucho mayor que todo lo que interesa, para trabajar con la base discreta y normalizada (27). Al final hay que comprobar que los resultados físicos (probabilidades de transición, secciones eficaces) no dependen de $L$. En el gas de electrones de este complemento, en cambio, $L^3$ es el volumen real donde están confinados.
:::

## 2 · Electrones en sólidos {#solidos}

### 2-a · Bandas permitidas {#bandas}

El gas libre describe bastante bien a los electrones de conducción de un metal: se mueven libres por el interior y la atracción de la red les impide salir. Pero no explica por qué unos sólidos conducen y otros no, cuando la conductividad intrínseca varía en un factor $10^{30}$ entre un buen aislante y un metal puro. La explicación junta Pauli con el potencial **periódico** de los iones: las energías individuales se agrupan en **bandas permitidas** separadas por **bandas prohibidas** (complementos F_XI y O_III). En una cadena lineal de $N$ iones, cada banda tiene $2N$ estados (el 2 es el espín).

### 2-b · Dónde cae el nivel de Fermi {#nivel-fermi}

El fundamental se arma llenando los estados de las bandas desde abajo. Igual que el calor específico y la susceptibilidad, la conducción depende de los electrones cercanos a la energía más alta ocupada, $E_F$: un electrón muy por debajo no puede acelerarse en un campo eléctrico, porque los estados que alcanzaría están llenos.

:::pasos Conductores, aislantes y semiconductores
+++ Energía de Fermi dentro de una banda: conductor
Si $E_F$ cae en medio de una banda permitida, $\mu=E_F$ y justo encima hay estados vacíos accesibles: los electrones de arriba se aceleran con facilidad y se comportan casi como libres. Es un **conductor**; la banda parcialmente llena es la **banda de conducción**.
> Fig. 5a del Cohen.
+++ Bandas llenas: aislante
Si el fundamental consta de bandas completamente llenas, $E_F$ coincide con el borde superior de la última y $\mu$ cae en la banda prohibida. Ningún electrón puede acelerarse: es un **aislante**, mejor cuanto mayor sea el ancho $\Delta E$ de la banda prohibida. Las bandas profundas, llenas e inertes son las **bandas de valencia**.
> Fig. 5b. Las bandas de valencia son estrechas: vienen de niveles atómicos profundos que apenas notan a los vecinos.
+++ Si ΔE no es mucho mayor que kT: semiconductor
A $T\neq0$ algunos electrones saltan la banda prohibida. Si $\Delta E\lesssim kT$ (o no mucho mayor), hay conducción, aunque con pocos portadores: es un **semiconductor intrínseco**. El diamante, con $\Delta E\approx5$ eV, es aislante a temperatura ambiente; el silicio y el germanio, con $\Delta E<1$ eV, son semiconductores.
> La conductividad crece muy rápido con $T$; un cálculo cuantitativo da un factor $e^{-\Delta E/2kT}$.
+++ Los huecos
Cada electrón que sube deja un estado vacío en una banda casi llena: un **hueco**. En un campo eléctrico, los electrones de valencia pasan a ocupar huecos y dejan otros detrás; los huecos avanzan en sentido contrario a los electrones, como cargas **positivas**, y así se ve en el efecto Hall.
> Una banda llena no conduce (Pauli); una banda casi llena conduce como si tuviera unas pocas cargas positivas. Es una demostración espectacular del principio de exclusión.
:::

:::comentario
**Impurezas y dopaje.** En un cristal de silicio o germanio (tetravalentes), un átomo pentavalente (P, As, Sb) trae un electrón de más, ligado con apenas unas centésimas de eV porque la gran constante dieléctrica del cristal debilita la atracción: pasa fácilmente a la banda de conducción. Es un **donor**, y el semiconductor es de tipo **n**. Un átomo trivalente (B, Al, Ga) es un **aceptor**: captura un electrón de valencia y deja un hueco, tipo **p**. Esta conducción **extrínseca** aparece a temperaturas mucho menores que la intrínseca y es la base de los transistores, los rectificadores y las celdas fotoeléctricas.
:::

:::resultado
- Caja de arista $L$: $\varphi$ (1a), $E=\frac{\pi^2\hbar^2}{2m_eL^2}(n_1^2+n_2^2+n_3^2)$ (2); un $\mathbf k$ por celda $(\pi/L)^3$ (4).
- $N(E)=\frac{L^3}{3\pi^2}\big(\frac{2m_eE}{\hbar^2}\big)^{3/2}$ (5) ⇒ $E_F=\frac{\hbar^2}{2m_e}(3\pi^2N/L^3)^{2/3}$ (7), que sólo depende de la densidad.
- $\rho(E)=\frac32N\sqrt E/E_F^{3/2}$ (9). Sólo importa el volumen de la caja.
- Sólo una fracción $\sim kT/E_F$ de los electrones se excita (11): $c_V\simeq\frac{Nk}{L^3}\frac{kT}{E_F}$, lineal en $T$ (13), ~100 veces menor que el clásico (10).
- Fermi-Dirac: $f=1/(e^{(E-\mu)/kT}+1)$ (15), $\mu$ fijado por (16); $\mu(0)=E_F$ en el gas libre.
- Paramagnetismo de Pauli: $\chi=\frac32\frac N{L^3}\frac{\mu_B^2}{E_F}$ (23), independiente de $T$.
- BVK (25)–(28): misma densidad de estados con ondas planas.
- Sólidos: $E_F$ dentro de una banda ⇒ conductor; bandas llenas ⇒ aislante ($\mu$ en la prohibida); $\Delta E$ pequeño ⇒ semiconductor; huecos = cargas positivas.
:::

:::idea-fisica
El principio de exclusión convierte un gas de electrones a temperatura ambiente en algo parecido a un sólido a temperatura cero: el mar de Fermi está casi entero «congelado», con una energía cinética media de eV que no tiene nada de térmico (es la presión de Pauli, la misma que sostiene a las enanas blancas). Toda la respuesta del metal —térmica, magnética, eléctrica— ocurre en una capa delgada alrededor de $E_F$. Y la diferencia entre el cobre y el diamante, un factor $10^{30}$ en conductividad, no está en sus electrones sino en dónde cae esa capa: dentro de una banda o en un hueco entre bandas.
:::

## Esqueleto {#esqueleto}

:::esqueleto
1. **Pozo 3D:** (1a), (1b), $E\propto n_1^2+n_2^2+n_3^2$ (2); espín ×2.
2. **Espacio k:** $k_i=n_i\pi/L$ (4); un punto por $(\pi/L)^3$; octante, ×2 ⇒ $N(E)$ (5).
3. **Fermi:** $N(E_F)=N$ (6) ⇒ $E_F$ (7), sólo de $N/L^3$; $\rho(E)\propto\sqrt E$ (8), (9).
4. **Calor específico:** clásico $U\simeq NkT/L^3$ (10); Pauli: $\Delta N\simeq\frac32NkT/E_F$ (11) ⇒ $c_V\propto T$ (13).
5. **Fermi-Dirac:** $\nu=f\rho$ (14), $f$ (15), $\mu$ de (16).
6. **Pauli paramagnético:** $\rho_\pm$ corridas (19) ⇒ $N_--N_+$ (20) ⇒ $\chi=\frac32\frac N{L^3}\frac{\mu_B^2}{E_F}$ (23).
7. **BVK:** $k_i=2\pi n_i/L$ (26), celda 8 veces mayor pero esfera completa ⇒ mismo $N(E)$.
8. **Sólidos:** bandas; $E_F$ en banda ⇒ conductor; bandas llenas ⇒ aislante; $\Delta E\lesssim$ unos $kT$ ⇒ semiconductor; huecos; dopaje n y p.
:::

## Preguntas {#preguntas}

:::pregunta Si se duplica la densidad electrónica, ¿cuánto cambia $E_F$?
$E_F\propto(N/L^3)^{2/3}$ (7): se multiplica por $2^{2/3}\approx1{,}59$.
:::

:::pregunta ¿Por qué el calor específico electrónico de un metal a 300 K es ~100 veces menor que el valor clásico?
Porque sólo pueden excitarse los electrones a menos de $\sim kT$ de $E_F$: una fracción $kT/E_F\approx0{,}03/3\sim1/100$ (11), (13). Los demás tienen ocupados los estados a los que subirían.
:::

:::pregunta ¿Cómo se obtiene $N(E)$ con condiciones periódicas si la celda en el espacio $\mathbf k$ es 8 veces mayor?
Con BVK los $k_i$ pueden ser negativos, así que se cuenta la esfera completa en vez de un octante: el factor 8 se compensa y $N(E)$ es el mismo (5).
:::

:::pregunta ¿Por qué la susceptibilidad de Pauli no depende de la temperatura, a diferencia de la ley de Curie?
Porque sólo los electrones en una franja $2|\mu_B|B$ alrededor de $E_F$ pueden invertir su espín, y su número, $\rho(E_F)|\mu_B|B$, no depende de $T$ mientras $kT\ll E_F$. En la ley de Curie, cada momento magnético es libre de orientarse y la competencia con $kT$ da $1/T$.
:::

:::pregunta ¿Dónde está el nivel de Fermi $\mu$ de un aislante a $T\to0$?
En la banda prohibida: el último estado ocupado es el borde superior de la banda de valencia, el primero vacío el borde inferior de la de conducción, y $\mu$ queda entre ambos (a la mitad si sus densidades de estados son comparables), según el comentario (i) de §1-b.
:::

## Errores comunes {#errores-comunes}

:::error-comun Confundir la energía de Fermi con una energía térmica
$E_F$ existe a $T=0$ y vale unos eV ($T_F\sim10^4$–$10^5$ K): viene de Pauli, no de la agitación térmica.
:::

:::error-comun Olvidar el factor 2 del espín o el 1/8 del octante
En (5) entran los dos: el 2 porque cada $\varphi$ admite dos espines, el 1/8 porque en la caja con paredes las componentes de $\mathbf k$ son positivas. Con BVK el 1/8 desaparece, pero la celda es 8 veces mayor.
:::

:::error-comun Pensar que todos los electrones contribuyen al calor específico
Sólo una fracción $\sim kT/E_F$; tratar a todos como clásicos da un $c_V$ cien veces mayor y además constante.
:::

:::error-comun Confundir energía de Fermi y nivel de Fermi
$E_F$ es la energía del último estado ocupado a $T=0$; $\mu$ es el potencial químico de (16). Coinciden en el gas libre, pero en un aislante $\mu$ cae en la banda prohibida, por encima de $E_F$.
:::

:::error-comun Creer que una banda llena conduce porque tiene muchos electrones
Una banda llena no conduce: Pauli impide acelerar a sus electrones. Conduce una banda **parcialmente** llena, o una casi llena gracias a sus huecos.
:::

## Referencias {#referencias}

- C. Cohen-Tannoudji, B. Diu y F. Laloë, *Quantum Mechanics*, vol. II, 2.ª ed., Wiley-VCH, 2020. Complemento C_XIV, pp. 1481–1495: ecuaciones (1) a (29), figuras 1 a 6.
- Mismos autores, cap. XIV, §D-1 (sección 4 de esta página); complementos F_XI (bandas), B_XV (distribución de Fermi-Dirac); ejercicio 9 del D_XIV (el hueco de intercambio).
- Referencias que da el Cohen: Kittel; Reif; Feynman III, cap. 14.
