(function () {
  // Manejo de foco para diálogos (drawers, modal, buscador, popup):
  // al abrir mueve el foco adentro, lo mantiene atrapado con Tab y al cerrar lo devuelve a quien abrió.
  const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const stack = [];

  function focusables(root) {
    return [...root.querySelectorAll(FOCUSABLE)].filter(el => el.getClientRects().length > 0);
  }

  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || stack.length === 0) return;
    const { root } = stack[stack.length - 1];
    const items = focusables(root);
    if (items.length === 0) { e.preventDefault(); root.focus(); return; }
    const first = items[0];
    const last = items[items.length - 1];
    const current = document.activeElement;
    if (!root.contains(current)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && current === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && current === last) {
      e.preventDefault();
      first.focus();
    }
  });

  window.FocusScope = {
    // initial: selector o elemento que recibe el foco; si falta, el primer enfocable.
    open(root, initial) {
      if (!root || stack.some(s => s.root === root)) return;
      stack.push({ root, opener: document.activeElement });
      if (!root.hasAttribute('tabindex')) root.setAttribute('tabindex', '-1');
      const target = (typeof initial === 'string' ? root.querySelector(initial) : initial) || focusables(root)[0] || root;
      // Si el diálogo todavía es invisible (transición de visibility), el foco falla: se reintenta unos instantes.
      let intentos = 0;
      const enfocar = () => {
        if (!stack.some(s => s.root === root)) return;
        target.focus({ preventScroll: true });
        if (document.activeElement !== target && ++intentos < 6) setTimeout(enfocar, 60);
      };
      requestAnimationFrame(enfocar);
    },

    close(root) {
      const i = stack.findIndex(s => s.root === root);
      if (i < 0) return;
      const { opener } = stack.splice(i, 1)[0];
      if (opener && opener !== document.body && document.contains(opener)) {
        opener.focus({ preventScroll: true });
      }
    },
  };
})();
