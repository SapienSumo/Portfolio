import { useEffect, useRef, useState } from 'react';
import { projects, filters, spotlight } from '../data/projects';
import SectionTitle from '../components/SectionTitle';
import ProjectThumbnail from '../components/ProjectThumbnail';
import sectionBackground from '../videos/work-section-background.mp4';

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('all');
  const videoRef = useRef(null);

  const visible = projects.filter(p =>
    activeFilter === 'all' || p.category === activeFilter
  );

  // Honour reduced-motion: hold the background video on its first frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
    }
  }, []);

  return (
    <section className="work section" id="work">
      <video
        ref={videoRef}
        className="work__video"
        src={sectionBackground}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="work__overlay" aria-hidden="true" />

      <div className="container">
        <SectionTitle>work</SectionTitle>

        <p className="work__intro reveal">
          I&apos;ve built scalable <strong>travel, event and telemedicine</strong> applications used by
          thousands, and delivered <strong>140+ projects</strong> for <strong>50+ clients</strong> worldwide.
        </p>

        {/* Filters */}
        <div className="work__filters reveal reveal-pop">
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
        <div className="work__spotlight reveal">
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
        <div className="work__grid reveal reveal-stagger">
          {visible.map(project => (
            <article key={project.id} className="project-card">
              <div className="project-card__img">
                <ProjectThumbnail category={project.category} />
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
