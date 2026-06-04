import { useTheme } from './hooks/useTheme';
import { useReveal } from './hooks/useReveal';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Hero from './sections/Hero';
import Expertise from './sections/Expertise';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  useReveal();

  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <Expertise />
        <Work />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
