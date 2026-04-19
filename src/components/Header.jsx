import { useState, useEffect, useRef } from 'react';
import { useScrolled } from '../hooks/useScrolled';
import { useScrollSpy } from '../hooks/useScrollSpy';

const NAV_LINKS = [
  { href: '#home',       label: 'home' },
  { href: '#expertise',  label: 'expertise' },
  { href: '#work',       label: 'work' },
  { href: '#experience', label: 'experience' },
  { href: '#contact',    label: 'contact' },
];

export default function Header({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const { scrolled } = useScrolled(20);
  const activeId     = useScrollSpy(NAV_LINKS.map(l => l.href.slice(1)));

  const navRef   = useRef(null);
  const linkRefs = useRef({});

  // Move the pill to the active link whenever activeId changes
  useEffect(() => {
    const activeEl = linkRefs.current[activeId];
    const navEl    = navRef.current;
    if (!activeEl || !navEl) return;

    const navRect  = navEl.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();

    setPillStyle({
      left:    linkRect.left - navRect.left,
      width:   linkRect.width,
      opacity: 1,
    });
  }, [activeId]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="container header__inner">
        <a href="#home" className="logo" onClick={closeMenu}>Paul Aliu</a>

        <nav className={`nav${menuOpen ? ' open' : ''}`} id="nav" ref={navRef}>
          {/* Sliding pill — desktop only */}
          <div className="nav__pill" style={pillStyle} aria-hidden="true" />

          <ul className="nav__list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav__link${activeId === href.slice(1) ? ' active' : ''}`}
                  ref={el => { linkRefs.current[href.slice(1)] = el; }}
                  onClick={closeMenu}
                >
                  <span className="nav__prefix">//</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__controls">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <svg className="icon icon--sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg className="icon icon--moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
