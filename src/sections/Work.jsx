import { useState } from 'react';
import { projects, filters, spotlight } from '../data/projects';

function ProjectCardSvg({ category }) {
  if (category === 'data') {
    return (
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="var(--card-bg)"/>
        <polyline points="20,160 80,110 140,130 200,70 260,90 300,50" stroke="var(--accent)" strokeWidth="2" fill="none"/>
        <circle cx="80" cy="110" r="4" fill="var(--accent)"/>
        <circle cx="140" cy="130" r="4" fill="var(--accent)"/>
        <circle cx="200" cy="70" r="4" fill="var(--accent)"/>
        <circle cx="260" cy="90" r="4" fill="var(--accent)"/>
        <rect x="20" y="170" width="280" height="1" fill="var(--text-muted)" opacity="0.2"/>
      </svg>
    );
  }
  if (category === 'app') {
    return (
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="200" fill="var(--card-bg)"/>
        <rect x="110" y="10" width="100" height="180" rx="10" fill="var(--accent)" opacity="0.1"/>
        <rect x="120" y="25" width="80" height="120" rx="4" fill="var(--accent)" opacity="0.15"/>
        <circle cx="160" cy="165" r="8" fill="var(--accent)" opacity="0.3"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="200" fill="var(--card-bg)"/>
      <rect x="20" y="20" width="280" height="30" rx="4" fill="var(--accent)" opacity="0.15"/>
      <rect x="20" y="62" width="180" height="12" rx="2" fill="var(--text-muted)" opacity="0.3"/>
      <rect x="20" y="82" width="140" height="12" rx="2" fill="var(--text-muted)" opacity="0.2"/>
      <rect x="20" y="110" width="130" height="60" rx="4" fill="var(--accent)" opacity="0.1"/>
      <rect x="165" y="110" width="135" height="60" rx="4" fill="var(--accent)" opacity="0.08"/>
    </svg>
  );
}

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visible = projects.filter(p =>
    activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <section className="work section" id="work">
      <div className="container">
        <h2 className="section__title">
          <span className="section__title-prefix">//</span> work
        </h2>

        <p className="work__intro">
          I&apos;ve built scalable <strong>travel, event and telemedicine</strong> applications used by
          thousands, and delivered <strong>140+ projects</strong> for <strong>50+ clients</strong> worldwide.
        </p>

        {/* Filters */}
        <div className="work__filters">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn${activeFilter === f.key ? ' filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label} <span>{String(f.count).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        {/* Spotlight */}
        <div className="work__spotlight">
          <p className="spotlight__label">Featured Project</p>
          <div className="spotlight__content">
            <div className="spotlight__info">
              <h3 className="spotlight__title">{spotlight.title}</h3>
              <p className="spotlight__category">{spotlight.category}</p>
              <p className="spotlight__desc">{spotlight.desc}</p>
              <div className="spotlight__tags">
                {spotlight.tags.map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <a href="#" className="btn btn--primary btn--sm">View Project</a>
            </div>
            <div className="spotlight__visual">
              <div className="mockup mockup--phone">
                <div className="mockup__screen">
                  <div className="mockup__placeholder">
                    <svg viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="160" rx="8" fill="var(--accent)" opacity="0.1"/>
                      <rect x="10" y="20" width="80" height="45" rx="4" fill="var(--accent)" opacity="0.2"/>
                      <rect x="10" y="75" width="37" height="20" rx="4" fill="var(--accent)" opacity="0.15"/>
                      <rect x="53" y="75" width="37" height="20" rx="4" fill="var(--accent)" opacity="0.15"/>
                      <rect x="10" y="105" width="80" height="15" rx="4" fill="var(--accent)" opacity="0.1"/>
                      <rect x="10" y="128" width="55" height="15" rx="4" fill="var(--accent)" opacity="0.1"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="work__grid">
          {visible.map(project => (
            <article key={project.id} className="project-card" style={{ animation: 'fadeInCard 0.3s ease forwards' }}>
              <div className="project-card__img">
                <ProjectCardSvg category={project.category} />
              </div>
              <div className="project-card__body">
                <span className="project-card__cat">{project.categoryLabel}</span>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
