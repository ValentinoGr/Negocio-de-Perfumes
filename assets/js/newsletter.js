(function () {
  // ── Configuración ────────────────────────────────────────────────────────────
  // Para guardar los emails en Brevo (brevo.com):
  //   1. Creá una cuenta gratis en https://brevo.com
  //   2. Creá una lista de contactos (Contacts → Lists)
  //   3. Copiá tu API Key desde Account → SMTP & API → API Keys
  //   4. Reemplazá los valores de abajo
  const CFG = {
    apiKey:       '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',
    listId:       6,
    cupon:        'BIENVENIDO5',
    delaySeg:     7,
    scrollPct:    0.28,
    cooldownDias: 7,
  };
  // ─────────────────────────────────────────────────────────────────────────────

  const LS_KEY = 'nl_ts';

  // localStorage puede lanzar error (cookies bloqueadas, modo privado): sin él el popup igual abre y se puede cerrar.
  function leerTs() {
    try { return localStorage.getItem(LS_KEY); } catch { return null; }
  }

  function guardarTs(valor) {
    try { localStorage.setItem(LS_KEY, valor); } catch { /* sin persistencia */ }
  }

  function debesMostrar() {
    const v = leerTs();
    if (!v) return true;
    const ts = parseInt(v, 10);
    return isNaN(ts) ? true : (Date.now() - ts) / 86400000 >= CFG.cooldownDias;
  }

  function abrir() {
    const popup = document.getElementById('nl-popup');
    document.getElementById('nl-overlay')?.classList.add('nl-show');
    popup?.classList.add('nl-show');
    document.body.style.overflow = 'hidden';
    // Foco al diálogo y no al campo de email: evita que en el celular salte el teclado solo.
    window.FocusScope?.open(popup, popup);
  }

  function cerrar() {
    const popup = document.getElementById('nl-popup');
    if (!popup?.classList.contains('nl-show')) return;
    document.getElementById('nl-overlay')?.classList.remove('nl-show');
    popup.classList.remove('nl-show');
    document.body.style.overflow = '';
    // Si ya se suscribió (ts a un año vista) no se pisa con la fecha actual.
    if (!(parseInt(leerTs(), 10) > Date.now())) guardarTs(Date.now().toString());
    window.FocusScope?.close(popup);
  }

  // Cambia el formulario por el cupón: el formulario se desvanece, el popup acompaña el cambio de
  // alto y el cupón entra en cascada (la cascada vive en el CSS, con la clase .nl-cupon--entra).
  function mostrarCupon() {
    const popup = document.getElementById('nl-popup');
    const form = document.getElementById('nl-form');
    const cupon = document.getElementById('nl-cupon');
    guardarTs((Date.now() + 365 * 86400000).toString());
    if (!form || !cupon) return;

    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cambiar = () => {
      const alto0 = popup ? popup.offsetHeight : 0;
      form.style.display = 'none';
      cupon.hidden = false;
      cupon.classList.add('nl-cupon--entra');
      // El foco estaba en el botón que acaba de desaparecer: pasa al botón de copiar.
      document.getElementById('nl-copiar')?.focus({ preventScroll: true });
      const alto1 = popup ? popup.offsetHeight : 0;
      if (reducido || !popup?.animate || !alto0 || alto0 === alto1) return;
      // El popup está anclado abajo: animar el alto lo hace crecer o achicarse hacia arriba sin saltos.
      popup.style.overflow = 'hidden';
      const crece = popup.animate(
        [{ height: alto0 + 'px' }, { height: alto1 + 'px' }],
        { duration: 340, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
      const listo = () => { popup.style.overflow = ''; };
      crece.addEventListener('finish', listo);
      crece.addEventListener('cancel', listo);
    };

    if (reducido || !form.animate) { cambiar(); return; }
    const sale = form.animate(
      [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-4px)' }],
      { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
    );
    sale.addEventListener('finish', cambiar);
    sale.addEventListener('cancel', cambiar);
  }

  // Si Brevo no responde en 8 s se sigue igual: el cupón se muestra y el usuario no queda esperando.
  async function enviarBrevo(email) {
    if (CFG.apiKey === 'TU_API_KEY_DE_BREVO') return;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        signal: ctrl.signal,
        headers: {
          'accept': 'application/json',
          'api-key': CFG.apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, listIds: [CFG.listId], updateEnabled: true }),
      });
    } catch (_) {
    } finally {
      clearTimeout(timer);
    }
  }

  function init() {
    if (!debesMostrar()) return;
    const popup = document.getElementById('nl-popup');
    if (!popup) return;

    let disparado = false;
    let reintento;
    function disparar() {
      if (disparado) return;
      // No interrumpir si ya hay otro diálogo abierto (carrito, favoritos, producto, búsqueda): reintenta después.
      if (document.querySelector('.cart-drawer.open, .fav-drawer.open, .pmodal--visible, .gsearch--visible')) {
        clearTimeout(reintento);
        reintento = setTimeout(disparar, 1500);
        return;
      }
      disparado = true;
      clearTimeout(reintento);
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      abrir();
    }

    const timer = setTimeout(disparar, CFG.delaySeg * 1000);
    function onScroll() {
      const h = document.body.scrollHeight - window.innerHeight;
      if (h > 0 && window.scrollY / h >= CFG.scrollPct) disparar();
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    document.getElementById('nl-cerrar')?.addEventListener('click', cerrar);
    document.getElementById('nl-overlay')?.addEventListener('click', cerrar);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });

    document.getElementById('nl-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('nl-email');
      const email = (input?.value ?? '').trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input?.classList.add('nl-input--error');
        setTimeout(() => input?.classList.remove('nl-input--error'), 900);
        return;
      }
      const btn = e.target.querySelector('.nl-btn');
      if (btn) { btn.disabled = true; btn.textContent = '...'; }
      await enviarBrevo(email);
      mostrarCupon();
    });

    document.getElementById('nl-copiar')?.addEventListener('click', function () {
      navigator.clipboard?.writeText(CFG.cupon).then(() => {
        this.innerHTML = '<i class="bi bi-clipboard-check"></i> ¡Copiado!';
        setTimeout(() => {
          this.innerHTML = '<i class="bi bi-clipboard"></i> Copiar cupón';
        }, 2200);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
