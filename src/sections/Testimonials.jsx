import { testimonials } from '../data/testimonials';
import SectionTitle from '../components/SectionTitle';
import SpotlightGrid from '../components/SpotlightGrid';

const featuredIndex = Math.max(0, testimonials.findIndex(t => t.featured));

const QuoteMark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="testimonial__mark">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
);

export default function Testimonials() {
  return (
    <section className="testimonials section">
      <div className="container">
        <SectionTitle>what clients say</SectionTitle>

        <SpotlightGrid
          gridClassName="testimonials__grid reveal"
          cardClassName="testimonial"
          items={testimonials}
          getKey={t => t.id}
          defaultIndex={featuredIndex}
          renderCard={t => (
            <>
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
            </>
          )}
        />
      </div>
    </section>
  );
}
