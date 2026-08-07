(function () {
  const inPages = window.location.pathname.includes('/pages/');
  const imgBase  = inPages ? '../assets/img/' : 'assets/img/';
  const pageBase = inPages ? '' : 'pages/';

  const overlay = document.createElement('div');
  overlay.id = 'gsearch-overlay';
  overlay.className = 'gsearch';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="gsearch__backdrop"></div>
    <div class="gsearch__panel">
      <div class="gsearch__header">
        <i class="bi bi-search gsearch__icon"></i>
        <input class="gsearch__input" type="text" placeholder="Buscar perfumes..." autocomplete="off" spellcheck="false">
        <button class="gsearch__cerrar" aria-label="Cerrar búsqueda"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="gsearch__body" id="gsearch-results"></div>
    </div>`;
  document.body.appendChild(overlay);

  const backdrop = overlay.querySelector('.gsearch__backdrop');
  const input    = overlay.querySelector('.gsearch__input');
  const cerrar   = overlay.querySelector('.gsearch__cerrar');
  const results  = document.getElementById('gsearch-results');

  let index = [];

  function buildIndex() {
    index = [];
    if (window.SEARCH_ARABES) {
      Object.values(window.SEARCH_ARABES).forEach(marca => {
        (marca.productos || []).forEach(p => {
          index.push({ nombre: p.nombre, marca: marca.nombre, precio: p.precio || null, imagen: p.imagen || null, seccion: 'arabes', label: 'Árabes' });
        });
      });
    }
    if (window.SEARCH_DISENADOR) {
      Object.values(window.SEARCH_DISENADOR).forEach(marca => {
        (marca.productos || []).forEach(p => {
          index.push({ nombre: p.nombre, marca: marca.nombre, precio: p.precio || null, imagen: p.imagen || null, seccion: 'disenador', label: 'Diseñador' });
        });
      });
    }
    if (window.SEARCH_DECANTS) {
      window.SEARCH_DECANTS.forEach(p => {
        index.push({ nombre: p.nombre, marca: 'Decant', precio: p.precio || null, imagen: p.imagen || null, seccion: 'decants', label: 'Decants' });
      });
    }
  }

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = `<p class="gsearch__hint">Empezá a escribir para buscar en todo el catálogo</p>`;
      return;
    }
    const matches = index.filter(p =>
      p.nombre.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q)
    ).slice(0, 24);

    if (matches.length === 0) {
      results.innerHTML = `<div class="gsearch__empty"><i class="bi bi-search"></i><p>Sin resultados para "<strong>${query}</strong>"</p></div>`;
      return;
    }

    results.innerHTML = matches.map(p => {
      const imgHtml = p.imagen
        ? `<img src="${imgBase}${encodeURIComponent(p.imagen)}" alt="${p.nombre}" loading="lazy">`
        : `<i class="bi bi-bag"></i>`;
      const precioHtml = p.precio
        ? `<span class="gsearch__item-precio">${p.precio}</span>`
        : `<span class="gsearch__item-precio gsearch__item-precio--consultar">A consultar</span>`;
      return `
        <a class="gsearch__item" href="${pageBase}${p.seccion}.html#${encodeURIComponent(p.nombre)}">
          <div class="gsearch__item-img">${imgHtml}</div>
          <div class="gsearch__item-info">
            <span class="gsearch__item-marca">${p.marca}</span>
            <span class="gsearch__item-nombre">${p.nombre}</span>
            ${precioHtml}
          </div>
          <span class="gsearch__badge gsearch__badge--${p.seccion}">${p.label}</span>
        </a>`;
    }).join('');
  }

  function open() {
    buildIndex();
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      overlay.classList.add('gsearch--visible');
      input.focus();
      results.innerHTML = `<p class="gsearch__hint">Empezá a escribir para buscar en todo el catálogo</p>`;
    });
  }

  function close() {
    overlay.classList.remove('gsearch--visible');
    setTimeout(() => {
      overlay.hidden = true;
      document.body.style.overflow = '';
      input.value = '';
      results.innerHTML = '';
    }, 260);
  }

  input.addEventListener('input', () => renderResults(input.value));
  cerrar.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay.hidden) close();
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); open(); }
  });

  window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (!hash) return;
    const nombre = decodeURIComponent(hash.slice(1));
    const card = [...document.querySelectorAll('.producto-card[data-nombre]')]
      .find(el => el.dataset.nombre === nombre);
    if (!card) return;
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('producto-highlight');
      setTimeout(() => card.classList.remove('producto-highlight'), 2000);
    }, 150);
  });

  window.Search = { open, close };
})();
