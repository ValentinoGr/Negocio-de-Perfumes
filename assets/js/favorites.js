(function () {
  const STORAGE_KEY = 'isf_favs';
  let items = [];

  function load() {
    try { items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { items = []; }
    if (!Array.isArray(items)) items = [];
  }

  // localStorage puede lanzar error (cookies bloqueadas, modo privado, cuota llena): los favoritos siguen en memoria.
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
    catch { /* sin persistencia */ }
  }

  function esc(str) {
    return String(str ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  // Mismo producto = nombre + marca + precio: hay fichas con igual nombre y distinto precio (p. ej. 100 ml y 50 ml).
  // Compatibilidad: un favorito guardado antes con otro precio sigue valiendo si el producto es el único
  // con ese nombre y marca en la página (si el precio cambió en el catálogo, el corazón no se pierde).
  const precioDe = v => v || '';

  function buscar(nombre, marca, precio, unico) {
    const idx = items.findIndex(i => i.nombre === nombre && i.marca === marca && precioDe(i.precio) === precioDe(precio));
    if (idx >= 0 || !unico) return idx;
    return items.findIndex(i => i.nombre === nombre && i.marca === marca);
  }

  function repeticiones(nombre, marca) {
    let n = 0;
    document.querySelectorAll('.btn-fav').forEach(b => {
      if (b.dataset.nombre === nombre && b.dataset.marca === marca) n++;
    });
    return n;
  }

  function updateBadge() {
    document.querySelectorAll('.fav-badge').forEach(el => {
      el.textContent = items.length;
      el.classList.toggle('fav-badge--visible', items.length > 0);
    });
  }

  function updateHearts() {
    const botones = document.querySelectorAll('.btn-fav');
    const repetidos = new Map();
    botones.forEach(btn => {
      const k = btn.dataset.nombre + '\u0000' + btn.dataset.marca;
      repetidos.set(k, (repetidos.get(k) || 0) + 1);
    });
    botones.forEach(btn => {
      const unico = repetidos.get(btn.dataset.nombre + '\u0000' + btn.dataset.marca) === 1;
      const active = buscar(btn.dataset.nombre, btn.dataset.marca, btn.dataset.precio, unico) >= 0;
      btn.classList.toggle('btn-fav--active', active);
      btn.querySelector('i').className = active ? 'bi bi-heart-fill' : 'bi bi-heart';
    });
  }

  const imgBase = window.location.pathname.includes('/pages/') ? '../assets/img/' : 'assets/img/';

  function renderDrawer() {
    const list = document.getElementById('fav-items');
    if (!list) return;

    if (items.length === 0) {
      list.innerHTML = `
        <div class="fav-empty">
          <i class="bi bi-heart"></i>
          <p>No tenés favoritos aún</p>
        </div>`;
      return;
    }

    list.innerHTML = items.map((item, i) => `
      <div class="fav-item">
        <div class="fav-item__img">
          ${item.imagen
            ? `<img src="${imgBase}${encodeURIComponent(item.imagen)}" alt="${esc(item.nombre)}">`
            : `<i class="bi bi-bag"></i>`}
        </div>
        <div class="fav-item__info">
          <p class="fav-item__marca">${esc(item.marca)}</p>
          <p class="fav-item__nombre">${esc(item.nombre)}</p>
          ${item.precio
            ? `<p class="fav-item__precio">${esc(item.precio)}</p>`
            : `<p class="fav-item__precio fav-item__precio--consultar">A consultar</p>`}
        </div>
        <div class="fav-item__actions">
          <button class="fav-item__agregar btn-agregar"
            data-nombre="${esc(item.nombre)}"
            data-marca="${esc(item.marca)}"
            data-precio="${esc(item.precio || '')}"
            aria-label="Agregar al carrito">
            <i class="bi bi-bag-plus"></i>
          </button>
          <button class="fav-item__remove" onclick="Favs.remove(${i})" aria-label="Quitar de favoritos">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>`).join('');
  }

  function openDrawer() {
    const drawer = document.getElementById('fav-drawer');
    const overlay = document.getElementById('fav-overlay');
    if (!drawer) return;
    renderDrawer();
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('cart-open');
    window.FocusScope?.open(drawer, '.fav-drawer__cerrar');
  }

  function closeDrawer() {
    const drawer = document.getElementById('fav-drawer');
    const overlay = document.getElementById('fav-overlay');
    if (!drawer) return;
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('cart-open');
    window.FocusScope?.close(drawer);
  }

  window.Favs = {
    toggle(nombre, marca, precio, imagen) {
      const idx = buscar(nombre, marca, precio, repeticiones(nombre, marca) <= 1);
      if (idx >= 0) {
        items.splice(idx, 1);
      } else {
        items.push({ nombre, marca, precio: precio || null, imagen: imagen || null });
      }
      save();
      updateBadge();
      updateHearts();
      if (document.getElementById('fav-drawer')?.classList.contains('open')) renderDrawer();
    },

    remove(index) {
      const list = document.getElementById('fav-items');
      const el = list ? list.children[index] : null;
      if (el) {
        if (el.classList.contains('removing')) return;
        el.classList.add('removing');
        setTimeout(() => {
          items.splice(index, 1);
          save();
          updateBadge();
          updateHearts();
          renderDrawer();
        }, 280);
      } else {
        items.splice(index, 1);
        save();
        updateBadge();
        updateHearts();
        renderDrawer();
      }
    },

    open: openDrawer,
    close: closeDrawer,
  };

  document.addEventListener('DOMContentLoaded', () => {
    load();
    updateBadge();
    updateHearts(); // marca los corazones de favoritos guardados (antes quedaban vacíos tras recargar)

    const catalog = document.getElementById('catalogo-contenido');
    if (catalog) {
      new MutationObserver(updateHearts).observe(catalog, { childList: true, subtree: false });
    }

    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn-fav');
      if (!btn) return;
      e.stopPropagation();
      const eraFavorito = btn.classList.contains('btn-fav--active');
      Favs.toggle(btn.dataset.nombre, btn.dataset.marca, btn.dataset.precio, btn.dataset.imagen);
      // Pop solo al marcar (no al desmarcar ni al cargar la página con favoritos guardados).
      if (!eraFavorito) {
        btn.classList.remove('btn-fav--pop');
        void btn.offsetWidth;
        btn.classList.add('btn-fav--pop');
      }
    });

    const overlay = document.getElementById('fav-overlay');
    if (overlay) overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  });
})();
