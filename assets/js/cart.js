(function () {
  const STORAGE_KEY = 'isf_cart';
  const WA_NUMBER = '543491411302';
  const ENVIO_GRATIS = 130000;
  let items = [];

  function load() {
    try { items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { items = []; }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = items.length;
      const wasVisible = el.classList.contains('cart-badge--visible');
      el.classList.toggle('cart-badge--visible', items.length > 0);
      if (items.length > 0 && wasVisible) {
        el.classList.remove('cart-badge--bounce');
        void el.offsetWidth;
        el.classList.add('cart-badge--bounce');
        setTimeout(() => el.classList.remove('cart-badge--bounce'), 400);
      }
    });
  }

  function parsePrice(str) {
    if (!str) return 0;
    return parseInt(str.replace(/\D/g, ''), 10) || 0;
  }

  function renderDrawer() {
    const list = document.getElementById('cart-items');
    const totalWrap = document.getElementById('cart-total-wrap');
    if (!list) return;

    if (items.length === 0) {
      list.innerHTML = `
        <div class="cart-empty">
          <i class="bi bi-bag"></i>
          <p>Tu carrito está vacío</p>
        </div>`;
      if (totalWrap) totalWrap.style.display = 'none';
      renderShipping();
      return;
    }

    list.innerHTML = items.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item__info">
          <p class="cart-item__nombre">${item.nombre}</p>
          <p class="cart-item__marca">${item.marca}</p>
        </div>
        <div class="cart-item__right">
          ${item.precio
            ? `<p class="cart-item__precio">${item.precio}</p>`
            : `<p class="cart-item__precio--consultar">A consultar</p>`}
          <button class="cart-item__remove" onclick="Cart.remove(${i})" aria-label="Eliminar">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>`).join('');

    const total = items.reduce((acc, item) => acc + parsePrice(item.precio), 0);
    if (totalWrap) {
      totalWrap.style.display = 'flex';
      const el = document.getElementById('cart-total');
      if (el) el.textContent = total > 0 ? `$${total.toLocaleString('es-AR')}` : '';
    }
    renderShipping();
  }

  function renderShipping() {
    let el = document.getElementById('cart-shipping');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cart-shipping';
      const footer = document.querySelector('.cart-drawer__footer');
      if (footer) footer.insertBefore(el, footer.firstChild);
      else return;
    }
    if (items.length === 0) { el.hidden = true; return; }
    const total = items.reduce((acc, item) => acc + parsePrice(item.precio), 0);
    el.hidden = false;
    const pct = Math.min((total / ENVIO_GRATIS) * 100, 100);
    if (total >= ENVIO_GRATIS) {
      el.className = 'cart-shipping cart-shipping--free';
      el.innerHTML = `
        <p class="cart-shipping__msg"><i class="bi bi-truck"></i> <strong>¡Envío gratis en tu pedido!</strong></p>
        <div class="cart-shipping__bar-wrap">
          <div class="cart-shipping__bar" style="width:100%"></div>
        </div>`;
    } else {
      const faltan = (ENVIO_GRATIS - total).toLocaleString('es-AR');
      el.className = 'cart-shipping';
      el.innerHTML = `
        <p class="cart-shipping__msg">Te faltan <strong>$${faltan}</strong> para envío gratis</p>
        <div class="cart-shipping__bar-wrap">
          <div class="cart-shipping__bar" style="width:${pct.toFixed(1)}%"></div>
        </div>`;
    }
  }

  function openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer) return;
    renderDrawer();
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('cart-open');
    setTimeout(() => {
      const lastItem = document.getElementById('cart-items')?.lastElementChild;
      if (lastItem?.classList.contains('cart-item')) {
        lastItem.classList.add('cart-item--new');
        setTimeout(() => lastItem.classList.remove('cart-item--new'), 900);
      }
    }, 80);
  }

  function closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer) return;
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('cart-open');
  }

  window.Cart = {
    add(nombre, marca, precio) {
      items.push({ nombre, marca, precio: precio || null });
      save();
      updateBadge();
      openDrawer();
    },

    remove(index) {
      const list = document.getElementById('cart-items');
      const el = list ? list.children[index] : null;
      if (el) {
        el.classList.add('removing');
        setTimeout(() => {
          items.splice(index, 1);
          save();
          updateBadge();
          renderDrawer();
        }, 280);
      } else {
        items.splice(index, 1);
        save();
        updateBadge();
        renderDrawer();
      }
    },

    open: openDrawer,
    close: closeDrawer,

    checkout() {
      if (items.length === 0) return;
      const lista = items.map(i =>
        `• ${i.nombre} (${i.marca})${i.precio ? ' — ' + i.precio : ''}`
      ).join('\n');
      const total = items.reduce((acc, i) => acc + parsePrice(i.precio), 0);
      const totalStr = total > 0
        ? `\n\nTotal estimado: $${total.toLocaleString('es-AR')}`
        : '';
      const msg = encodeURIComponent(
        `Hola! Me interesan los siguientes productos:\n\n${lista}${totalStr}\n\n¿Podrían confirmarme disponibilidad?`
      );
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    load();
    updateBadge();

    document.addEventListener('click', e => {
      const btn = e.target.closest('.btn-agregar');
      if (!btn) return;
      const { nombre, marca, precio } = btn.dataset;
      Cart.add(nombre, marca, precio || null);
      const icon = btn.querySelector('i');
      const span = btn.querySelector('span');
      btn.classList.add('added');
      if (icon) icon.className = 'bi bi-check-lg';
      if (span) span.textContent = 'Agregado';
      setTimeout(() => {
        btn.classList.remove('added');
        if (icon) icon.className = 'bi bi-bag-plus';
        if (span) span.textContent = 'Agregar';
      }, 1300);
    });

    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
  });
})();
