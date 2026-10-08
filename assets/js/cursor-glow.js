(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let raf = 0;
  let tx = -500, ty = -500;
  let cx = -500, cy = -500;

  // El loop corre solo mientras el halo alcanza al cursor; en reposo no gasta CPU.
  function wake() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    wake();
  });

  document.addEventListener('mouseleave', () => {
    tx = -500;
    ty = -500;
    wake();
  });

  function tick() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    glow.style.transform = `translate(${cx}px, ${cy}px)`;
    raf = (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5)
      ? requestAnimationFrame(tick)
      : 0;
  }
})();
