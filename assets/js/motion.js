(function () {
  // Cinta de anuncio: la marquesina es un loop no esencial (WCAG 2.2.2), así que se puede pausar
  // y se detiene sola cuando sale de pantalla. La elección de pausa se recuerda entre páginas.
  const bar = document.querySelector('.anuncio-bar');
  if (!bar) return;

  const KEY = 'isf_anuncio_pausa';
  const leer = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };
  const guardar = v => { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch { /* sin persistencia */ } };

  // La cinta se arma con un bloque de mensajes y su copia (aria-hidden). Si el bloque es más angosto
  // que la pantalla, al final del ciclo queda un hueco. Se suman copias hasta cubrir el ancho más un
  // bloque, y el ciclo se mide en px (--anuncio-ciclo) para que el reinicio sea invisible.
  const track = bar.querySelector('.anuncio-bar__track');
  const MAX_BLOQUES = 10;

  function llenarCinta() {
    if (!track) return;
    track.querySelectorAll('[data-clon]').forEach(el => el.remove());
    const hijos = [...track.children];
    if (hijos.length < 2 || hijos.length % 2) return;
    const mitad = hijos.length / 2;
    const bloque = track.children[mitad].getBoundingClientRect().left - track.children[0].getBoundingClientRect().left;
    if (!(bloque > 0)) return;
    const necesarios = Math.min(MAX_BLOQUES, Math.ceil(bar.clientWidth / bloque) + 1);
    for (let b = 2; b < necesarios; b++) {
      hijos.slice(mitad).forEach(el => {
        const copia = el.cloneNode(true);
        copia.dataset.clon = '';
        copia.setAttribute('aria-hidden', 'true');
        track.appendChild(copia);
      });
    }
    track.style.setProperty('--anuncio-ciclo', `-${bloque}px`);
    sincronizarLatido();
  }

  // Las copias nacen después que el original: se alinea su latido para que no se vea desfasado.
  function sincronizarLatido() {
    const base = track.querySelector('.anuncio-bar__item--highlight')?.getAnimations?.()[0];
    if (!base) return;
    track.querySelectorAll('[data-clon].anuncio-bar__item--highlight').forEach(el => {
      el.getAnimations().forEach(a => { a.startTime = base.startTime; });
    });
  }

  if (track) {
    llenarCinta();
    if ('ResizeObserver' in window) {
      let anchoPrevio = bar.clientWidth;
      new ResizeObserver(() => {
        if (bar.clientWidth !== anchoPrevio) { anchoPrevio = bar.clientWidth; llenarCinta(); }
      }).observe(bar);
    }
    // El ancho de los íconos cambia cuando termina de cargar su fuente.
    document.fonts?.ready.then(llenarCinta);
  }

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
