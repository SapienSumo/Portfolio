import { testimonials } from '../data/testimonials';

const QuoteMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="testimonial__mark">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
);

export default function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <h2 className="section__title">
          <span className="section__title-prefix">//</span> what clients say
        </h2>

        <div className="testimonials__grid">
          {testimonials.map(t => (
            <div
              key={t.id}
              className={`testimonial${t.featured ? ' testimonial--featured' : ''}`}
            >
              <div className="testimonial__quote">
                <QuoteMark />
                <p>{t.quote}</p>
              </div>
              <div className="testimonial__author">
                <div className="testimonial__avatar">{t.initials}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
