/* Intro fade & removal on scroll or on first wheel/touch.
   Works when opened via file:// and when served by a local server.
*/

(function () {
  const intro = document.getElementById('intro');
  const YEAR = document.getElementById('year');
  if (YEAR) YEAR.textContent = new Date().getFullYear();

  // fadePoint controls how much scroll (in px) fades the intro
  const fadePoint = 180;

  // If user scrolls, adjust opacity. When past threshold, hide intro.
  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const t = 1 - Math.min(y / fadePoint, 1);
    intro.style.opacity = t;
    if (y >= fadePoint) {
      intro.classList.add('intro-hidden');
      window.removeEventListener('scroll', onScroll);
    }
  }

  // Allow immediate removal on wheel/key/touch for discoverability
  function onUserInteract() {
    intro.classList.add('intro-hidden');
    intro.style.opacity = 0;
    window.removeEventListener('wheel', onUserInteract);
    window.removeEventListener('keydown', onUserInteract);
    window.removeEventListener('touchstart', onUserInteract);
    window.removeEventListener('scroll', onScroll);
  }

  // Attach listeners
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('wheel', onUserInteract, { passive: true });
  window.addEventListener('keydown', onUserInteract, { passive: true });
  window.addEventListener('touchstart', onUserInteract, { passive: true });

  // If user loads the page already scrolled (rare), run once:
  onScroll();
})();
