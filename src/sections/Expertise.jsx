import { expertise } from '../data/expertise';
import VideoCarousel from '../components/VideoCarousel';
import SectionTitle from '../components/SectionTitle';
import SpotlightGrid from '../components/SpotlightGrid';

const featuredIndex = Math.max(0, expertise.findIndex(i => i.featured));

const icons = {
  1: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 20l-6 4 6 4M32 20l6 4-6 4M22 30l4-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  2: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 42h16M24 34v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 20l4-4 4 4 4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  3: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="4" width="20" height="40" rx="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="24" cy="38" r="2" fill="currentColor"/>
      <path d="M20 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

export default function Expertise() {
  return (
    <section className="expertise section" id="expertise">
      <div className="container">
        <SectionTitle>expertise</SectionTitle>

        <SpotlightGrid
          gridClassName="expertise__grid reveal reveal-stagger"
          cardClassName="expertise__card"
          items={expertise}
          getKey={item => item.id}
          defaultIndex={featuredIndex}
          renderCard={item => (
            <>
              <div className="expertise__icon">{icons[item.id]}</div>
              <h3 className="expertise__title">{item.title}</h3>
              <p className="expertise__desc">{item.desc}</p>
              <ul className="expertise__tags">
                {item.tags.map(tag => (
                  <li key={tag} className="tag">{tag}</li>
                ))}
              </ul>
            </>
          )}
        />

        <VideoCarousel />
      </div>
    </section>
  );
}
