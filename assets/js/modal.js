(function () {
  const modal = document.createElement('div');
  modal.id = 'producto-modal';
  modal.className = 'pmodal';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="pmodal__backdrop"></div>
    <div class="pmodal__card">
      <button class="pmodal__cerrar" aria-label="Cerrar"><i class="bi bi-x-lg"></i></button>
      <div class="pmodal__img-wrap">
        <img class="pmodal__img" src="" alt="">
        <i class="bi bi-bag pmodal__img-placeholder" hidden></i>
      </div>
      <div class="pmodal__info">
        <p class="pmodal__marca"></p>
        <h3 class="pmodal__nombre"></h3>
        <p class="pmodal__precio"></p>
        <button class="pmodal__btn-agregar btn-agregar" data-nombre="" data-marca="" data-precio="">
          <i class="bi bi-bag-plus"></i>
          <span>Agregar al carrito</span>
        </button>
        <a class="pmodal__btn-wa" href="#" target="_blank" rel="noopener">
          <i class="bi bi-whatsapp"></i>
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const backdrop  = modal.querySelector('.pmodal__backdrop');
  const cerrarBtn = modal.querySelector('.pmodal__cerrar');
  const imgEl     = modal.querySelector('.pmodal__img');
  const phEl      = modal.querySelector('.pmodal__img-placeholder');
  const marcaEl   = modal.querySelector('.pmodal__marca');
  const nombreEl  = modal.querySelector('.pmodal__nombre');
  const precioEl  = modal.querySelector('.pmodal__precio');
  const agregarBtn= modal.querySelector('.pmodal__btn-agregar');
  const waBtn     = modal.querySelector('.pmodal__btn-wa');

  function abrir(data) {
    const nombre   = data.nombre   || '';
    const marca    = data.marca    || '';
    const precio   = data.precio   || '';
    const imagen   = data.imagen   || '';
    const sinStock = data.sinStock === '1';

    marcaEl.textContent = marca;
    marcaEl.hidden = !marca;
    nombreEl.textContent = nombre;

    if (sinStock) {
      precioEl.textContent = 'Sin stock';
      precioEl.className = 'pmodal__precio pmodal__precio--sin-stock';
    } else if (precio) {
      precioEl.textContent = precio;
      precioEl.className = 'pmodal__precio';
    } else {
      precioEl.textContent = 'Consultar precio';
      precioEl.className = 'pmodal__precio pmodal__precio--consultar';
    }

    if (imagen) {
      imgEl.src = `../assets/img/${encodeURIComponent(imagen)}`;
      imgEl.alt = nombre;
      imgEl.hidden = false;
      phEl.hidden = true;
    } else {
      imgEl.src = '';
      imgEl.hidden = true;
      phEl.hidden = false;
    }

    agregarBtn.dataset.nombre = nombre;
    agregarBtn.dataset.marca  = marca;
    agregarBtn.dataset.precio = precio;
    agregarBtn.disabled = sinStock;
    agregarBtn.hidden   = sinStock;

    const precioTexto = sinStock ? 'Sin stock' : (precio || 'Consultar precio');
    const marcaTexto  = marca ? `${marca} — ` : '';
    const msg = encodeURIComponent(`Hola! Me interesa este perfume:\n\n${marcaTexto}${nombre}\nPrecio: ${precioTexto}\n\n¿Podrían confirmarme disponibilidad?`);
    waBtn.href = `https://wa.me/543491411302?text=${msg}`;

    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarW + 'px';
    requestAnimationFrame(() => modal.classList.add('pmodal--visible'));
  }

  function cerrar() {
    modal.classList.remove('pmodal--visible');
    modal.classList.add('pmodal--cerrando');
    setTimeout(() => {
      modal.hidden = true;
      modal.classList.remove('pmodal--cerrando');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      imgEl.src = '';
    }, 280);
  }

  cerrarBtn.addEventListener('click', cerrar);
  backdrop.addEventListener('click', cerrar);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) cerrar();
  });

  document.addEventListener('click', e => {
    const card = e.target.closest('.producto-card');
    if (!card) return;
    if (e.target.closest('.btn-agregar')) return;
    if (e.target.closest('.btn-fav')) return;
    abrir({
      nombre:   card.dataset.nombre,
      marca:    card.dataset.marca,
      precio:   card.dataset.precio,
      imagen:   card.dataset.imagen,
      sinStock: card.dataset.sinStock,
    });
  });
})();
