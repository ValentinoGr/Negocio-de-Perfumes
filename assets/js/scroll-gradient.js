(function () {
  const stops = [
    [14, 14, 14],
    [18, 14,  8],
    [10, 12, 16],
    [18, 13,  8],
    [14, 14, 14],
  ];

  function lerp(a, b, t) { return a + (b - a) * t; }

  function colorAt(p) {
    const s = Math.max(0, Math.min(1, p)) * (stops.length - 1);
    const i = Math.floor(s);
    const t = s - i;
    const a = stops[Math.min(i, stops.length - 1)];
    const b = stops[Math.min(i + 1, stops.length - 1)];
    return `rgb(${Math.round(lerp(a[0],b[0],t))},${Math.round(lerp(a[1],b[1],t))},${Math.round(lerp(a[2],b[2],t))})`;
  }

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.body.style.backgroundColor = max > 0 ? colorAt(window.scrollY / max) : '';
      ticking = false;
    });
  }, { passive: true });
})();
