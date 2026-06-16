import { useState, useEffect, useRef } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible]   = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [bounce, setBounce]     = useState(false);

  const bouncingRef = useRef(false);
  const timerRef    = useRef(null);

  // Detect bottom (drives the at-bottom flash)
  useEffect(() => {
    function onScroll() {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;
      setAtBottom(nearBottom);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Only reveal the button once the Contact (last) section is in view;
  // bounce after 3s there to grab attention.
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
        setVisible(entry.isIntersecting);
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
      <span className="scroll-top__dots" aria-hidden="true">
        <span className="scroll-top__dot scroll-top__dot--apex" />
        <span className="scroll-top__dot scroll-top__dot--left" />
        <span className="scroll-top__dot scroll-top__dot--right" />
      </span>
    </a>
  );
}
