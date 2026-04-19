import { experience } from '../data/experience';

export default function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <h2 className="section__title">
          <span className="section__title-prefix">//</span> experience
        </h2>

        <div className="timeline">
          {experience.map(item => (
            <div key={item.id} className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__card">
                <div className="timeline__header">
                  <div>
                    <h3 className="timeline__role">{item.role}</h3>
                    <p className="timeline__company">{item.company}</p>
                  </div>
                  <div className="timeline__meta">
                    <span className="timeline__period">{item.period}</span>
                    <span className="timeline__location">{item.location}</span>
                  </div>
                </div>
                <p className="timeline__desc">{item.desc}</p>
                <div className="timeline__tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
