import { useState, useEffect } from 'react';

/**
 * Returns true once the page is scrolled past `threshold` pixels.
 * Only re-renders when the boolean flips, not on every scroll event.
 */
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
