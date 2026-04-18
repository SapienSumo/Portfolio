import { useScrolled } from '../hooks/useScrolled';

export default function Footer() {
  const { scrollY } = useScrolled(400);
  const visible = scrollY > 400;

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>&copy; {new Date().getFullYear()}. Made with passion by <strong>Paul Aliu</strong>. All rights reserved.</p>
        <a
          href="#home"
          className={`scroll-top${visible ? ' visible' : ''}`}
          aria-label="Back to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
