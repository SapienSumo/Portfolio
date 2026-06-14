import { useEffect } from 'react';
import Lenis from 'lenis';

// Height of the fixed header — anchor targets are offset by this so a
// section's heading doesn't tuck under the header after scrolling.
const HEADER_OFFSET = -72;

/**
 * Inertia smooth-scrolling à la regentsplace.com: the viewport trails the
 * user's input slightly and eases into place, giving an organic, "bouncy"
 * feel rather than a rigid 1:1 scroll.
 *
 * Lenis drives the native scroll position, so window scroll listeners and
 * IntersectionObservers (scroll-spy, reveal-on-scroll, back-to-top) keep
 * working untouched. Honours prefers-reduced-motion by skipping smoothing.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      // Lower lerp = more trailing/delay = bouncier, more organic glide.
      lerp: 0.075,
      // Gentle overshoot easing gives wheel/anchor scrolls a soft landing.
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Route in-page anchor clicks through Lenis so they share the same easing.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (id.length < 2) return; // ignore bare "#"
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}
