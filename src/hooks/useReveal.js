import { useEffect } from 'react';

/**
 * Toggles `.visible` on any element carrying the `.reveal` class as it enters
 * and leaves the viewport (see globals.css). Because it re-arms on exit, the
 * reveal animations replay every time you scroll a section back into view —
 * not just on first load. Re-scans when `deps` change, so dynamically rendered
 * blocks get picked up too.
 *
 * Respects prefers-reduced-motion: those users get everything shown at once.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      els.forEach(el => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Toggle on enter/exit so the animation plays again on the next pass.
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
