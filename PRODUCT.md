# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Compradores de perfumes en Argentina que llegan al sitio de Essenza (tienda de Santa Fe con envíos a todo el país) y cierran la compra conversando por WhatsApp.

**Decisión abierta:** el cliente principal y su situación de llegada (¿desde Instagram, por recomendación, buscando árabes accesibles, decants, nicho?) no están definidos todavía; el dueño lo dijo explícitamente. No asumir un perfil ni escribir copy o decisiones que dependan de uno hasta que se confirme.

## Product Purpose
Mostrar el catálogo de Essenza (perfumes árabes, de diseñador y decants), dejar armar un pedido y pasarlo a WhatsApp con la lista de productos y el total estimado. El éxito es que la persona termine escribiendo por WhatsApp con un pedido concreto. El sitio no cobra ni confirma stock: eso pasa en la conversación.

## Positioning
Lo que el dueño identifica como diferencial:
- **Trato directo por WhatsApp:** la compra se arma y se cierra conversando con la tienda.
- **Catálogo árabe muy amplio:** unos 390 productos de 19 marcas, además de diseñador.

## Operating Context
- Los pedidos terminan en WhatsApp (+54 9 3491 411302); el carrito solo arma el mensaje.
- Pago por transferencia (datos por WhatsApp al confirmar) o efectivo (punto de encuentro acordado).
- Encargos una vez por mes, con fecha de cierre avisada por WhatsApp e Instagram; después del cierre, demora de hasta 10 días hábiles.
- Envíos a todo el país por correo. Envío gratis desde $130.000.
- El catálogo se mantiene a mano en archivos JS (`assets/js/products*.js`): precios, imágenes y stock los carga el dueño.
- Hay un popup de bienvenida que capta emails (Brevo) y da el cupón `BIENVENIDO5`, que se menciona por WhatsApp al confirmar el pedido.

## Capabilities and Constraints
- Tres catálogos: árabes (394 productos), diseñador (97) y decants (94). Todo producto tiene imagen.
- Un precio `null` significa "consultar precio"; `sinStock: true` marca sin stock y bloquea agregar al carrito (solo implementado en decants).
- Funciones actuales: carrito, favoritos, búsqueda global (Ctrl+K), buscador y filtro de precio por catálogo, modal de producto con botón de WhatsApp.
- Sin checkout ni pago online. **Plan declarado:** mantener WhatsApp por ahora y sumar pago online (Mercado Pago u otro) más adelante; no hay fecha ni proveedor decididos.
- Sitio estático (HTML, JS vanilla, SCSS, Bootstrap 5), sin build ni backend. Cualquier cambio común hay que replicarlo en las 6 páginas más la 404.
- Todas las imágenes de producto son WebP, máx. 1000 px de lado mayor.

## Brand Commitments
- Nombre: Essenza. Instagram @bbyessenza. Logo y favicon en `assets/img/essenza_sin_fondo.png` y `assets/img/Essenza FOTO DE PERFIL.png`.
- Tagline actual en el sitio: "Perfumes del mundo, en tu ciudad."
- Voz observada en el sitio actual: español rioplatense con voseo ("Probá", "Escribinos", "Podés"). Es lo que está escrito hoy; el dueño no lo fijó como compromiso.

## Evidence on Hand
- Afirmaciones que el sitio ya hace: "Perfumes 100% originales", productos importados con caja original y sellos, fundada en 2024.
- Fotos de productos para casi todo el catálogo en `assets/img/`. Muchas traen una marca de agua con una estrellita abajo a la derecha, ya presente en los originales.
- No hay testimonios, reseñas, métricas de ventas, fotos del local ni del equipo. No inventarlos.

## Product Principles
1. **El cierre ocurre en WhatsApp.** Todo en el sitio tiene que acercar a un mensaje claro y completo; no simular una tienda online que no existe.
2. **Decir la verdad sobre precio y stock.** "Consultar precio" y "Sin stock" se muestran tal cual; no se oculta ni se insinúa disponibilidad.
3. **El catálogo grande tiene que ser fácil de recorrer.** La amplitud es un diferencial solo si se puede encontrar un perfume rápido (marcas, búsqueda, filtro de precio).
4. **La confianza viene de lo verificable.** Originalidad, condiciones de encargo y envíos se explican con los hechos reales de la tienda, sin prometer más.
5. **Pensar en el pago online futuro sin adelantarlo.** No construir pasos de checkout hasta que haya proveedor y fecha.
