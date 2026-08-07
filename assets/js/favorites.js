(function () {
  const STORAGE_KEY = 'isf_favs';
  let items = [];

  function load() {
    try { items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { items = []; }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function isFav(nombre, marca) {
    return items.some(i => i.nombre === nombre && i.marca === marca);
  }

  function updateBadge() {
    document.querySelectorAll('.fav-badge').forEach(el => {
      el.textContent = items.length;
      el.classList.toggle('fav-badge--visible', items.length > 0);
    });
  }

  function updateHearts() {
    document.querySelectorAll('.btn-fav').forEach(btn => {
      const active = isFav(btn.dataset.nombre, btn.dataset.marca);
      btn.classList.toggle('btn-fav--active', active);
      btn.querySelector('i').className = active ? 'bi bi-heart-fill' : 'bi bi-heart';
    });
  }

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
            ? `<img src="../assets/img/${encodeURIComponent(item.imagen)}" alt="${item.nombre}">`
            : `<i class="bi bi-bag"></i>`}
        </div>
        <div class="fav-item__info">
          <p class="fav-item__marca">${item.marca}</p>
          <p class="fav-item__nombre">${item.nombre}</p>
          ${item.precio
            ? `<p class="fav-item__precio">${item.precio}</p>`
            : `<p class="fav-item__precio fav-item__precio--consultar">A consultar</p>`}
        </div>
        <div class="fav-item__actions">
          <button class="fav-item__agregar btn-agregar"
            data-nombre="${item.nombre.replace(/"/g, '&quot;')}"
            data-marca="${item.marca.replace(/"/g, '&quot;')}"
            data-precio="${item.precio || ''}"
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
  }

  function closeDrawer() {
    const drawer = document.getElementById('fav-drawer');
    const overlay = document.getElementById('fav-overlay');
    if (!drawer) return;
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('cart-open');
  }

  window.Favs = {
    toggle(nombre, marca, precio, imagen) {
      const idx = items.findIndex(i => i.nombre === nombre && i.marca === marca);
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

    const catalog = document.getElementById('catalogo-contenido');
    if (catalog) {
      new MutationObserver(updateHearts).observe(catalog, { childList: true, subtree: false });
    }

    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn-fav');
      if (!btn) return;
      e.stopPropagation();
      Favs.toggle(btn.dataset.nombre, btn.dataset.marca, btn.dataset.precio, btn.dataset.imagen);
    });

    const overlay = document.getElementById('fav-overlay');
    if (overlay) overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  });
})();
