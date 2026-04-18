import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Expertise from './sections/Expertise';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';

const NAV_SECTIONS = ['home', 'expertise', 'work', 'experience', 'contact'];

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        sections={NAV_SECTIONS}
      />
      <main>
        <Hero />
        <Expertise />
        <Work />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
