import { expertise } from '../data/expertise';

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
        <h2 className="section__title">
          <span className="section__title-prefix">//</span> expertise
        </h2>

        <div className="expertise__grid">
          {expertise.map(item => (
            <div
              key={item.id}
              className={`expertise__card${item.featured ? ' expertise__card--featured' : ''}`}
            >
              <div className="expertise__icon">{icons[item.id]}</div>
              <h3 className="expertise__title">{item.title}</h3>
              <p className="expertise__desc">{item.desc}</p>
              <ul className="expertise__tags">
                {item.tags.map(tag => (
                  <li key={tag} className="tag">{tag}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <blockquote className="expertise__quote">
          <p>&ldquo;Sometimes the best way to solve a problem is to help others.&rdquo;</p>
          <cite>— Uncle Iroh, <em>Avatar: The Last Airbender</em></cite>
        </blockquote>
      </div>
    </section>
  );
}
