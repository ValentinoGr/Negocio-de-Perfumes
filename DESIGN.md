---
name: Essenza
description: Vitrina oscura de mármol y oro viejo para un catálogo de perfumes que se cierra por WhatsApp.
colors:
  oro-viejo: "#c9a06a"
  oro-viejo-claro: "#d4b07a"
  grafito: "#2c2c2c"
  grafito-oscuro: "#1e1e1e"
  grafito-borde: "#3a3a3a"
  tinta: "#1a1a1a"
  noche: "#131313"
  barra-anuncio: "#111111"
  niebla: "#ededec"
  blanco: "#ffffff"
  marfil: "#f0ece6"
  gris-claro: "#d6d6d6"
  gris-medio: "#888888"
  whatsapp: "#25d366"
  whatsapp-hover: "#1ebe5d"
  alerta: "#c0392b"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(4rem, 12vw, 9rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.04em"
  headline:
    fontFamily: "Oswald, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
  title:
    fontFamily: "Oswald, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.07em"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "0.02em"
  label:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.45
    letterSpacing: "0.03em"
  price:
    fontFamily: "Oswald, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "22px"
  pill: "100px"
  circle: "50%"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  xxl: "4rem"
components:
  button-agregar:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.blanco}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.45rem 0.75rem"
  button-agregar-hover:
    backgroundColor: "{colors.grafito-oscuro}"
  button-agregar-added:
    backgroundColor: "{colors.whatsapp}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.blanco}"
    typography: "{typography.price}"
    rounded: "{rounded.sm}"
    padding: "0.9rem"
  button-whatsapp-hover:
    backgroundColor: "{colors.whatsapp-hover}"
  product-card:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.grafito}"
    rounded: "{rounded.md}"
    padding: "0.9rem"
  category-card:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.blanco}"
    rounded: "0"
    padding: "2.5rem 2rem"
  search-pill:
    backgroundColor: "{colors.noche}"
    textColor: "{colors.marfil}"
    rounded: "{rounded.pill}"
    height: "56px"
    padding: "0 1.4rem"
  price-filter-button-active:
    backgroundColor: "{colors.noche}"
    textColor: "{colors.oro-viejo}"
    rounded: "{rounded.pill}"
  navbar:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.gris-claro}"
    rounded: "30px"
    padding: "1.25rem 1.5rem"
  modal-card:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.marfil}"
    rounded: "18px"
    padding: "1.4rem 1.5rem 1.75rem"
---

# Design System: Essenza

## Overview

**Creative North Star: "La vitrina de mármol"**

Essenza se ve como la vitrina de una perfumería: superficies de grafito y mármol negro, un único dorado viejo que aparece como filo de luz y no como relleno, y el frasco como protagonista. La interfaz se retira lo suficiente para que el producto brille, pero no se vuelve distante: los botones son claros, el camino hacia WhatsApp siempre está a la vista y el tono es cercano.

El sistema alterna dos mundos. Las páginas viven sobre un fondo niebla (#ededec) con tarjetas blancas y mucho aire; las piezas de marca (navbar, tarjetas de categoría, footer, modal, buscador, popup) son oscuras, con bordes dorados casi invisibles. Los titulares son Oswald en mayúsculas con tracking amplio; el texto corrido usa la fuente del sistema. El movimiento es suave y acompaña: una intro breve de persiana de vitrina la primera vez que se llega en una sesión, una entrada ordenada en el inicio (primero el titular, después las tarjetas), un fundido corto al pasar de una página a otra, aparición al hacer scroll, tarjetas que suben unos píxeles, un halo dorado que sigue al cursor en escritorio.

Rechaza dos cosas: parecer un marketplace de ofertas (banners, etiquetas chillonas, colores saturados) y parecer una plantilla genérica de tienda intercambiable con cualquier otra. Su carácter sale del contraste grafito/oro, de la tipografía de impacto y de los detalles de vitrina (mármol, filos dorados, luz).

**Key Characteristics:**
- Oscuro y sobrio en las piezas de marca; claro y aireado en el catálogo.
- Un solo acento, el oro viejo, usado con intención y en poca superficie.
- Titulares Oswald en mayúsculas con tracking; cuerpo en fuente del sistema.
- Formas suaves: píldoras para campos y filtros, esquinas amables en tarjetas y modales.
- Planas en reposo, se elevan al interactuar.
- El verde de WhatsApp es el único color "de acción" fuera de la paleta de marca.

## Colors

Una paleta casi monocroma de grafitos y blancos cálidos, con un solo acento metálico y el verde de WhatsApp como color funcional.

### Primary
- **Oro viejo** (#c9a06a): el único acento de marca. Estados activos (filtro de precio, marca seleccionada, ítem del menú), iconos y etiquetas sobre fondos oscuros, scrollbar, glow del cursor, bordes finos y el aro del buscador al enfocar. Casi siempre sobre superficies oscuras y casi siempre con transparencia en bordes y fondos (rgba(201,160,106) entre 0.07 y 0.8).
- **Oro viejo claro** (#d4b07a): solo el hover del scrollbar.

### Secondary
- **Verde WhatsApp** (#25d366, hover #1ebe5d): reservado para lo que lleva a la conversación o confirma una acción: botón flotante, "Consultar por WhatsApp", confirmación "Agregado", CTA de Información, eyebrow del popup.

### Neutral
- **Grafito** (#2c2c2c): navbar, footer, tarjetas de categoría, botón Agregar, bandas oscuras, texto de producto.
- **Grafito oscuro** (#1e1e1e): hover de botones, panel de búsqueda global, pista de la scrollbar, barra de marcas mobile.
- **Grafito borde** (#3a3a3a): divisores y bordes sobre fondos oscuros.
- **Tinta** (#1a1a1a): titulares sobre fondo claro; fondo del modal de producto y del popup de bienvenida.
- **Noche** (#131313): fondo del buscador y del filtro de precio, las dos píldoras oscuras.
- **Barra de anuncio** (#111111): fondo de la cinta superior.
- **Niebla** (#ededec): fondo de página.
- **Blanco** (#ffffff): tarjetas de producto, drawers de carrito y favoritos, sidebar de marcas.
- **Marfil** (#f0ece6): texto e iconos claros sobre oscuro (buscador, iconos del navbar).
- **Gris claro** (#d6d6d6): enlaces del navbar y del dropdown sobre oscuro.
- **Gris medio** (#888888): eyebrows, "Consultar precio", texto secundario.
- **Alerta** (#e74c3c): el contador del carrito y la acción de quitar.

### Named Rules
**The One Gold Rule.** El oro viejo aparece como filo, estado activo o luz; nunca como relleno grande ni como fondo de botón. Su rareza es lo que lo hace parecer joyería.

**The WhatsApp Is a Verb Rule.** El verde #25d366 solo marca acciones que llevan a la conversación o confirman un paso. No se usa como decoración ni como segundo acento de marca.

**The Warm Neutrals Rule.** Los fondos claros son niebla y blanco, y el texto claro sobre oscuro es marfil: nada de blanco puro frío sobre negro puro. Los negros son grafitos, no #000.

## Typography

**Display Font:** Oswald, 700 (con sans-serif como respaldo)
**Body Font:** fuente del sistema (stack de Bootstrap 5: system-ui, Segoe UI, Roboto, Arial…)
**Label/Mono Font:** la misma fuente del sistema; Oswald para etiquetas de marca y precios

**Character:** Un titular de impacto, condensado y siempre en mayúsculas, sobre un cuerpo neutro y discreto. Oswald da el aire de etiqueta de frasco; la fuente del sistema se mantiene fuera del camino. Solo se carga el peso 700 de Oswald.

### Hierarchy
- **Display** (Oswald 700, clamp(4rem, 12vw, 9rem), 1, tracking 0.04em): el "¡Bienvenidos!" del inicio. Los hero de página usan clamp(3rem, 10vw, 7rem).
- **Headline** (Oswald 700, clamp(2rem, 5vw, 3.5rem), 1, tracking 0.08em): títulos de marca dentro del catálogo.
- **Title** (Oswald 700, 1.2–1.5rem, 1.2, tracking 0.05–0.1em): títulos de bloques, tarjetas de información, cabeceras de drawers y modal.
- **Body** (sistema 400, `--t-cuerpo` 1rem en escritorio y `--t-cuerpo-chico` 0.95rem en celular y paneles angostos, 1.75–1.85): descripciones y textos de página, ancho máximo de 480–560px en subtítulos.
- **Label** (sistema 700, `--t-etiqueta` 0.75rem como piso, tracking 0.03–0.25em, mayúsculas): eyebrows, marcas, notas, botones pequeños, enlaces "Ver colección". El nombre de producto en tarjetas, carrito y favoritos usa `--t-nombre` 0.82rem.
- **Price** (Oswald 700, 1rem): precios de producto, total del carrito.

### Named Rules
**The Uppercase Voice Rule.** Todo lo que sea titular, etiqueta de marca o nombre de producto va en mayúsculas con tracking; el texto corrido nunca.

**The Italic Whisper Rule.** "Consultar precio" y "A consultar" van en cursiva, gris medio y sin peso: lo que no tiene precio se dice bajito, sin disfrazarlo de dato.

## Layout

Basado en la grilla de Bootstrap 5. El catálogo usa dos columnas en teléfono, tres desde 768px y cuatro desde 992px, con separación 3 (g-3). En escritorio, árabes y diseñador suman un sidebar de marcas de 200px, pegajoso y a pantalla completa de alto; en mobile ese sidebar se vuelve una barra horizontal de píldoras bajo el buscador. Decants es una grilla plana sin sidebar.

El ritmo vertical es generoso en secciones de página (4–5rem arriba y abajo, recortado a 2–3.5rem en mobile) y más ajustado dentro de tarjetas (0.75–1.5rem). El navbar flota como una pieza separada del borde: margen 0.75rem 1.25rem en escritorio y 0.4–0.6rem en mobile, sobre una cinta de anuncio de 32px. Las bandas oscuras de ancho completo (footer, CTA de información, estadísticas) cortan el fondo niebla.

Puntos de corte: 992px (navbar colapsa, sidebar desaparece), 768px (mobile), 600px (buscador y filtro se apilan) y 400px (teléfonos chicos). En mobile los botones "Agregar" ocultan el texto y quedan solo con icono; el drawer del carrito ocupa todo el ancho.

## Elevation & Depth

Plano en reposo, se eleva al interactuar. Las tarjetas de producto y de información llevan una sombra muy suave (0 2px 8px a 0.08 de negro) y al pasar el mouse suben entre 4 y 8px con una sombra más profunda. Las piezas oscuras (buscador, filtro, modal, popup) no dependen de la sombra: se separan del fondo por contraste tonal y un borde dorado fino de baja opacidad que se intensifica en hover y foco. Los overlays usan desenfoque de fondo (4–10px) para aislar el contenido que flota encima.

### Shadow Vocabulary
- **Reposo de tarjeta** (`box-shadow: 0 2px 8px rgba(0,0,0,0.08)`): tarjeta de producto en reposo.
- **Hover de tarjeta** (`box-shadow: 0 12px 28px rgba(0,0,0,0.14)`): tarjeta de producto elevada; la de información usa `0 20px 50px rgba(0,0,0,0.14)`.
- **Navbar** (`box-shadow: 0 4px 6px rgba(0,0,0,0.5)`): el navbar flotante.
- **Flotante oscuro** (`box-shadow: 0 24px 80px rgba(0,0,0,0.6)`): modal de producto; el popup usa `0 28px 70px rgba(0,0,0,0.65)`.
- **Pulso dorado** (`box-shadow: 0 0 0 1.5px rgba(201,160,106,0.65), 0 0 22px rgba(201,160,106,0.28)`): aro del buscador enfocado, animado entre 0.65 y 1 de opacidad.
- **Resplandor WhatsApp** (`box-shadow: 0 4px 14px rgba(37,211,102,0.35)`): botón de checkout; el flotante pulsa con un aro verde.

### Named Rules
**The Flat-Until-Touched Rule.** Las superficies están quietas hasta que se responde a ellas: la elevación y el brillo dorado son consecuencia de hover o foco, no decoración permanente.

## Shapes

Formas suaves y redondeadas, con escala creciente según el peso del objeto. Los botones pequeños usan 8px; las tarjetas de producto 12px; paneles de búsqueda, tarjetas de información y el navbar mobile 16px; el modal 18px y el popup 22px; el navbar de escritorio 30px. Los campos y filtros son píldoras completas (100px), igual que los botones de cierre y flotantes, que son círculos. La tarjeta de categoría del inicio es la excepción: esquinas rectas y mucho relleno, como una placa de grafito.

Los detalles gráficos son finos: separadores de 1px o 50px de ancho, una línea de 80×4px bajo cada marca, filos dorados de 1px y pequeñas decoraciones tipográficas (◆, caligrafía árabe, gotas y hojas en SVG) en los hero.

## Components

### Buttons
- **Shape:** esquinas suaves de 8px los pequeños, 10px los de acción en drawers, píldora de 50px los de CTA de página.
- **Agregar (primario de catálogo):** grafito (#2c2c2c) con texto blanco, 0.68rem en mayúsculas con tracking, padding 0.45rem 0.75rem. En hover se oscurece a grafito oscuro y sube 1px. Al agregar pasa a verde WhatsApp con "Agregado" durante 1.3 segundos. Sin stock: opacidad 0.35 y sin interacción.
- **Consultar por WhatsApp (checkout):** verde WhatsApp, Oswald 0.95rem en mayúsculas, 10px de radio, sombra verde; sube 2px en hover.
- **Fantasma sobre oscuro:** enlaces del footer y "Escribinos": borde grafito o dorado al 27% de opacidad, texto gris claro u oro viejo, sin relleno; en hover el borde y el texto toman el color de la red (verde o #e1306c).

### Chips y píldoras de navegación
- **Marcas en mobile:** píldoras de 20px de radio sobre una barra grafito oscuro pegajosa, Oswald 0.73rem en mayúsculas; hover grafito y blanco.
- **Filtro de precio:** control segmentado dentro de una píldora noche con borde dorado al 15%. Botones sin relleno en blanco al 35%; el activo se tiñe de oro viejo (texto #c9a06a, fondo al 10%).

### Cards / Containers
- **Tarjeta de producto:** fondo blanco, radio 12px, sombra de reposo suave. La imagen ocupa un cuadrado con degradé grafito (145°, #2c2c2c a #1e1e1e), foto contenida con 0.75rem de aire. Sobre la foto aparece una lupa translúcida y el corazón de favoritos (círculo de 38px) solo al pasar el mouse. Nombre en mayúsculas pequeñas, precio en Oswald y botón Agregar abajo.
- **Tarjeta de categoría:** placa de grafito sin radio, número grande en Oswald gris, título blanco, enlace con subrayado fino; sube 6px en hover.
- **Tarjeta de información:** radio 16px, cabecera grafito con icono y marca de agua tipográfica, cuerpo blanco con lista; sube 8px en hover.
- **Drawers (carrito y favoritos):** panel blanco de 400px que entra desde la derecha, cabecera con título Oswald, pie con total y acción verde.

### Inputs / Fields
- **Buscador de página:** píldora noche de 56px (64px en mobile) con borde dorado al 15%, icono de lupa dorado, texto marfil y placeholder dorado tenue en cursiva. En foco el borde sube al 80% y pulsa un halo dorado. El botón de limpiar aparece solo cuando hay texto.
- **Campo del popup:** píldora translúcida blanca al 6% con borde blanco al 11%; el botón blanco con texto tinta va incrustado a la derecha.
- **Búsqueda global (Ctrl+K):** panel oscuro de 16px sobre fondo desenfocado; los resultados llevan una etiqueta por sección en color propio (oro para árabes, azul claro para diseñador, verde menta para decants).

### Navigation
- **Navbar:** píldora grafito de 30px (16px en mobile) con borde inferior de 2px y sombra marcada, logo de 100px. Enlaces gris claro de 0.95rem; el activo en blanco con subrayado gris medio en escritorio. En mobile el fondo se vuelve mármol negro con un pseudo-elemento fijo de 600px para evitar el reescalado en iOS, y el menú se despliega con altura animada. El menú "Productos" es una tarjeta de mármol con borde dorado al 20%; su ítem activo toma texto oro viejo.
- **Cinta de anuncio:** barra de 32px negra con marquesina lenta (34s) en mayúsculas pequeñas doradas; la oferta de envío gratis pulsa suavemente y la cinta se pausa en hover.
- **Sidebar de marcas:** enlaces Oswald pequeños en gris que se oscurecen al pasar el mouse y marcan la sección visible con una barra izquierda de 2px.

### Modal de producto
Pieza oscura de 18px sobre un fondo negro al 72% con desenfoque. Foto grande en cuadrado, marca en oro apagado, nombre en Oswald, precio en oro viejo. Dos acciones apiladas: Agregar (grafito) y WhatsApp (verde translúcido con borde verde). Aparece con escala y desplazamiento suaves, y se cierra con fundido más corto.

### Scrollbar y glow
La scrollbar es fina, con pulgar oro viejo sobre pista grafito oscuro. En dispositivos con mouse, un halo radial dorado (600px, hasta 22% de opacidad) sigue al cursor con inercia.

## Do's and Don'ts

### Do:
- **Do** usar oro viejo (#c9a06a) solo para estados activos, filos, iconos pequeños y luz; en rgba cuando vaya en bordes y fondos.
- **Do** reservar el verde #25d366 para acciones que llevan a WhatsApp o confirman un paso.
- **Do** poner texto verde-oscuro (#0b2a17, 7,8:1) sobre botones de WhatsApp (#25d366); el blanco sobre ese verde da 1,98:1 y no pasa AA. El glifo del botón flotante conserva el blanco de marca.
- **Do** usar oro profundo (#8a6a35, 5:1) para texto e iconos de oro sobre fondos claros (panel de favoritos, filtro del sidebar); el oro #c9a06a sobre blanco da 2,3:1 y queda para superficies oscuras.
- **Do** dar a todo control táctil (`pointer: coarse`) al menos 44×44px de área; la cinta de anuncios es la excepción (pausa de 44×31, dentro del mínimo AA de 24px). El botón "Agregar" siempre lleva texto, también en celular.
- **Do** que los botones flotantes (WhatsApp, volver arriba) se oculten cuando hay un diálogo abierto (carrito, favoritos, modal, buscador, popup), y que el modal pase a dos columnas en celular horizontal.
- **Do** usar las variables de `:root` en `assets/css/styles.css` (`--oro`, `--oro-profundo`, `--grafito`, `--grafito-profundo`, `--panel-noche`, `--niebla`, `--blanco`, `--plata`, `--texto-suave-claro`, `--texto-suave-oscuro`, `--whatsapp`, `--whatsapp-hover`, `--whatsapp-tinta`, `--ease-salida`, `--ease-estandar`) en lugar de escribir el color o la curva a mano. Un color nuevo se agrega primero como variable. Los degradados y bordes con transparencia (`rgba(201,160,106,…)`) siguen escritos a mano.
- **Do** usar `--alerta` (#c0392b, 5,4:1 con blanco) para el contador del carrito; el rojo anterior (#e74c3c) daba 3,8:1. Todo campo de formulario lleva nombre accesible (`aria-label` o `<label>`) y los `aria-label` van en español.
- **Do** dejar el título del inicio sin etiqueta encima (el logo del menú ya dice Essenza); las páginas internas conservan la etiqueta "Essenza" sobre el título.
- **Do** respetar el piso tipográfico: ningún texto legible por debajo de 0.75rem (12px) y texto corrido en 0.95–1rem; usar `--t-etiqueta`, `--t-nombre`, `--t-cuerpo-chico` y `--t-cuerpo`. Excepciones: los números del contador del carrito y favoritos (0.7rem en círculos de 18px) y los glifos decorativos (✦ ◆).
- **Do** frenar todo movimiento con `--ease-salida` (sin rebote ni sobrepaso) y animar progreso con `transform: scaleX()`, nunca con `width`: la barra de scroll y la barra de envío gratis del carrito.
- **Do** mantener el texto secundario sobre grafito en #a3a3a3 o más claro y en gris #666 o más oscuro sobre niebla/blanco (mínimo 4,5:1); #444, #666 sobre grafito y #888–#bbb sobre claro quedaron retirados.
- **Do** poner titulares, etiquetas y nombres de producto en mayúsculas con tracking; Oswald solo en peso 700.
- **Do** dejar las superficies planas en reposo y mostrar elevación y brillo dorado como respuesta a hover o foco.
- **Do** usar píldoras (100px) para campos y filtros, y círculos para botones flotantes y de cierre.
- **Do** mostrar "Consultar precio" y "Sin stock" tal cual, en gris medio y sin peso.
- **Do** darle un control o un final a todo loop: la cinta de anuncio se puede pausar y se detiene fuera de pantalla; el pulso de WhatsApp hace 3 repeticiones y descansa.
- **Do** ofrecer siempre la alternativa de `prefers-reduced-motion`: sin desplazamientos ni loops, conservando los cambios de opacidad, color y sombra que informan el estado.
- **Do** poner todo `:hover` dentro de `@media (hover: hover) and (pointer: fine)`: en celular el hover queda pegado después del toque. El toque tiene su propio estado `:active` con la propiedad `scale` (0.94 en botones y chips, 0.985 en tarjetas), y el destello gris del navegador está apagado (`-webkit-tap-highlight-color: transparent`).
- **Do** dejar los campos de texto en 16px en pantallas táctiles (`pointer: coarse`) para que iOS no haga zoom al enfocar, y usar `dvh` (con `vh` de respaldo) en las alturas de `body` y diálogos para seguir la barra del navegador.
- **Do** respetar las zonas seguras con `--sa-b` y `--sa-r` (muesca y barra de inicio) en los botones flotantes, el popup y el pie del carrito; el viewport lleva `viewport-fit=cover` y nunca `user-scalable=no`.
- **Do** mantener `overscroll-behavior: contain` en los paneles con scroll propio (carrito, favoritos, ficha, buscador, sidebar) sin bloquear el jalar-para-actualizar de la página.
- **Do** aislar el pintado de cada tarjeta del catálogo (`contain: paint`) y no dejar una animación infinita por tarjeta: el brillo de carga (`img-shimmer`) solo corre en las tarjetas cercanas a la pantalla (clase `.shimmer` que pone un IntersectionObserver). Con cientos de tarjetas, lo contrario traba el menú y el scroll.
- **Do** ordenar la entrada del inicio: titular, separador y subtítulo (`fadeInUp` 0.6s con `--ease-salida`), y recién después las tarjetas de categoría con 80ms de escalonado. Las tarjetas entran con animación y no con transición, con `fill-mode: backwards` (nunca `both`: retendría el `transform` y anularía el hover).
- **Do** mantener la intro del inicio ("la persiana de la vitrina": mármol negro, logo, filo dorado y una persiana que sube con una arista dorada, ~1,9 s) como un momento raro: una vez por sesión y solo al llegar desde afuera (la decide el script del `<head>`; `?intro` la fuerza para verla), siempre saltable con un toque, una tecla o scroll, solo con `transform` y `opacity`, y con `prefers-reduced-motion` reducida a un fundido corto. El hero y las tarjetas suman `--intro-offset` a sus retrasos para entrar cuando la persiana empieza a subir; sin intro vale 0.
- **Do** dejar que las páginas se enlacen con un fundido de 0,22 s (`@view-transition { navigation: auto; }`, solo opacidad, `var(--ease-estandar)`): evita el corte seco y la página vieja queda a la vista hasta que la nueva pinta. Lo mantiene vivo un `<script>` inline mínimo justo después del `<link>` de `styles.css` en cada página; sin él Chrome no detecta la transición en las páginas internas. Los navegadores sin soporte navegan como siempre.
- **Do** tratar la entrega del cupón como un momento raro y breve: el formulario se desvanece (0,15 s), el popup acompaña el cambio de alto (0,34 s) y el cupón entra en cascada (rótulo, código que se descubre de izquierda a derecha, botón, nota) con un único destello de filo dorado sobre el código; el foco pasa al botón de copiar. Con movimiento reducido todo se resuelve con un fundido.
- **Do** marcar el foco de teclado con un anillo de 2px y 2px de separación: oro viejo (#c9a06a) sobre superficies oscuras y grafito (#2c2c2c) sobre fondos claros. Los campos de texto lo muestran en su contenedor, sin anillo doble.
- **Do** mantener fondos oscuros en grafitos (#2c2c2c, #1e1e1e, #1a1a1a, #131313) y texto claro en marfil o blanco; fondo de página niebla (#ededec).

### Don't:
- **Don't** convertir el oro viejo en un botón sólido ni en un fondo grande; pierde el aire de joyería y se acerca al "lujo ostentoso".
- **Don't** agregar colores chillones, etiquetas de descuento ni banners saturados: el sitio no es un marketplace de ofertas.
- **Don't** usar negro puro (#000) para superficies ni blanco frío sobre negro; los neutros son cálidos.
- **Don't** meter un segundo acento de marca ni usar el verde de WhatsApp como decoración.
- **Don't** reemplazar la combinación Oswald + fuente del sistema por una plantilla genérica de tienda; el carácter sale de esa tipografía y del contraste grafito/oro.
- **Don't** poner sombras fuertes permanentes sobre tarjetas en reposo.
- **Don't** agregar animaciones que corran para siempre sin pausa ni fin, ni desplazamientos que ignoren el movimiento reducido.
- **Don't** dejar un `:hover` sin condicionar, ni poner `user-select: none` en texto de contenido (nombres, precios): solo en controles.
- **Don't** reutilizar el `transition` de una clase genérica sobre un componente que declara el suyo: `.categoria-card` pisaba a `.animate-on-scroll` y el reveal dejó de funcionar sin que nadie lo notara.
- **Don't** repetir la intro en cada carga, volverla obligatoria (sin poder saltarla) ni sumarle piezas decorativas: es un solo gesto de marca. Tampoco dejar que la vea Lighthouse o una prueba automatizada (`navigator.webdriver`), para no medir contra ella.
- **Don't** poner `view-transition-name` a la barra de anuncio o al navbar (no son fijos: con la página scrolleada la transición los haría deslizarse desde fuera de pantalla), ni sumarle desplazamientos o escalas a la transición entre páginas: cada página ya trae su propia entrada y se duplicaría. Tampoco quitar el `<script>` inline que sigue al CSS sin volver a probar la transición.
