(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let raf;
  let tx = -500, ty = -500;
  let cx = -500, cy = -500;

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    tx = -500;
    ty = -500;
  });

  function tick() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    glow.style.transform = `translate(${cx}px, ${cy}px)`;
    raf = requestAnimationFrame(tick);
  }

  tick();
})();
