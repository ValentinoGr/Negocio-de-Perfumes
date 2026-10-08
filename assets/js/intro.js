(function () {
  // Intro "persiana de la vitrina". La secuencia es CSS puro (ver .intro en styles.css); este script solo
  // la deja saltar y limpia el DOM al terminar. Si no corre, la persiana igual termina sola y queda fuera de pantalla.
  const root = document.documentElement;
  const intro = document.getElementById('intro');
  if (!intro) return;
  if (!root.classList.contains('intro-activa')) { intro.remove(); return; }

  let terminada = false;

  function terminar() {
    if (terminada) return;
    terminada = true;
    document.removeEventListener('keydown', saltar);
    document.removeEventListener('wheel', saltar);
    document.removeEventListener('touchmove', saltar);
    intro.remove();
  }

  // Cualquier toque, tecla o scroll la saltea: el hero arranca ya (--intro-offset pasa a 0) y la persiana se funde.
  function saltar(e) {
    if (terminada || root.classList.contains('intro-saltar')) return;
    if (e && e.type === 'click') { e.preventDefault(); e.stopPropagation(); }
    root.classList.add('intro-saltar');
    intro.style.transition = 'opacity 0.25s var(--ease-salida)';
    intro.style.opacity = '0';
    intro.style.pointerEvents = 'none';
    setTimeout(terminar, 300);
  }

  // El clic va sobre la propia intro y no se deja pasar: el toque que la saltea no debe abrir lo que hay debajo.
  intro.addEventListener('click', saltar);
  document.addEventListener('keydown', saltar);
  document.addEventListener('wheel', saltar, { passive: true });
  document.addEventListener('touchmove', saltar, { passive: true });

  intro.addEventListener('animationend', e => {
    if (e.target === intro && (e.animationName === 'introPersiana' || e.animationName === 'introFundido')) terminar();
  });
  setTimeout(terminar, 3200); // red de seguridad
})();
