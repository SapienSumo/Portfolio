import { useState, useEffect, useRef } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible]   = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [bounce, setBounce]     = useState(false);

  const bouncingRef = useRef(false);
  const timerRef    = useRef(null);

  // Show/hide + detect bottom
  useEffect(() => {
    function onScroll() {
      const scrollY     = window.scrollY;
      const nearBottom  =
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 80;

      setVisible(scrollY > 400);
      setAtBottom(nearBottom);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bounce after 3s in the Contact (last) section
  useEffect(() => {
    const contactEl = document.getElementById('contact');
    if (!contactEl) return;

    const triggerBounce = () => {
      if (bouncingRef.current) return;
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;
      if (nearBottom) return; // already at bottom, no need
      bouncingRef.current = true;
      setBounce(true);
      setTimeout(() => {
        setBounce(false);
        bouncingRef.current = false;
      }, 1800);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timerRef.current = setTimeout(triggerBounce, 3000);
        } else {
          clearTimeout(timerRef.current);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(contactEl);
    return () => {
      observer.disconnect();
      clearTimeout(timerRef.current);
    };
  }, []);

  const cls = [
    'scroll-top',
    visible              ? 'scroll-top--visible' : '',
    atBottom && !bounce  ? 'scroll-top--pulse'   : '',
    bounce               ? 'scroll-top--bounce'  : '',
  ].filter(Boolean).join(' ');

  return (
    <a href="#home" className={cls} aria-label="Back to top">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </a>
  );
}
