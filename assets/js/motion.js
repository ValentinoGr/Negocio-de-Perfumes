(function () {
  // Cinta de anuncio: la marquesina es un loop no esencial (WCAG 2.2.2), así que se puede pausar
  // y se detiene sola cuando sale de pantalla. La elección de pausa se recuerda entre páginas.
  const bar = document.querySelector('.anuncio-bar');
  if (!bar) return;

  const KEY = 'isf_anuncio_pausa';
  const leer = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };
  const guardar = v => { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch { /* sin persistencia */ } };

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'anuncio-bar__pausa';
  btn.innerHTML = '<i class="bi bi-pause-fill" aria-hidden="true"></i>';
  bar.appendChild(btn);

  function aplicar(pausada) {
    bar.classList.toggle('anuncio-bar--pausada', pausada);
    btn.setAttribute('aria-label', pausada ? 'Reanudar anuncios en movimiento' : 'Pausar anuncios en movimiento');
    btn.firstElementChild.className = pausada ? 'bi bi-play-fill' : 'bi bi-pause-fill';
  }

  aplicar(leer());

  btn.addEventListener('click', () => {
    const pausada = !bar.classList.contains('anuncio-bar--pausada');
    aplicar(pausada);
    guardar(pausada);
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      bar.classList.toggle('anuncio-bar--fuera', !entry.isIntersecting);
    }).observe(bar);
  }
})();
