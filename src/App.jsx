import { useTheme } from './hooks/useTheme';
import { useReveal } from './hooks/useReveal';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MediaBand from './components/MediaBand';
import Hero from './sections/Hero';
import Expertise from './sections/Expertise';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import bandBackgroundDark from './videos/work-section-background.mp4';
import bandBackgroundLight from './videos/work-section-light-background.mp4';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  useReveal();

  const bandBackground = theme === 'light' ? bandBackgroundLight : bandBackgroundDark;

  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <MediaBand src={bandBackground}>
          <Expertise />
          <Work />
        </MediaBand>
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
