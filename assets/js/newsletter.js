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

  function debesMostrar() {
    const v = localStorage.getItem(LS_KEY);
    if (!v) return true;
    const ts = parseInt(v, 10);
    return isNaN(ts) ? true : (Date.now() - ts) / 86400000 >= CFG.cooldownDias;
  }

  function abrir() {
    document.getElementById('nl-overlay')?.classList.add('nl-show');
    document.getElementById('nl-popup')?.classList.add('nl-show');
    document.body.style.overflow = 'hidden';
  }

  function cerrar() {
    document.getElementById('nl-overlay')?.classList.remove('nl-show');
    document.getElementById('nl-popup')?.classList.remove('nl-show');
    document.body.style.overflow = '';
    localStorage.setItem(LS_KEY, Date.now().toString());
  }

  function mostrarCupon() {
    const form = document.getElementById('nl-form');
    const cupon = document.getElementById('nl-cupon');
    if (form) form.style.display = 'none';
    if (cupon) cupon.hidden = false;
    localStorage.setItem(LS_KEY, (Date.now() + 365 * 86400000).toString());
  }

  async function enviarBrevo(email) {
    if (CFG.apiKey === 'TU_API_KEY_DE_BREVO') return;
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': CFG.apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email, listIds: [CFG.listId], updateEnabled: true }),
      });
    } catch (_) {}
  }

  function init() {
    if (!debesMostrar()) return;
    const popup = document.getElementById('nl-popup');
    if (!popup) return;

    let disparado = false;
    function disparar() {
      if (disparado) return;
      disparado = true;
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
