import headshot from '../images/headshot.png';

const FEATURED_ITEMS = [
  'Featured.com', 'Hostinger', 'Upwork', 'CareerFoundry',
  'Frontend Mentor', 'We Are Developers', 'Colorlib', 'Masai School', 'Blog du Web Design',
];

export default function Hero() {
  const marquee = [...FEATURED_ITEMS, ...FEATURED_ITEMS];

  return (
    <section className="hero section" id="home">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__greeting">Hello, I&apos;m</p>
          <h1 className="hero__name">Paul Aliu</h1>
          <p className="hero__title">Software Engineer, Front End &amp; App Developer</p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">View My Work</a>
            <a href="#contact" className="btn btn--outline">Get In Touch</a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__avatar">
            <img src={headshot} alt="Paul Aliu" />
          </div>
        </div>
      </div>

      <div className="featured">
        <div className="container">
          <p className="featured__label">As featured in</p>
          <div className="featured__track-wrapper">
            <div className="featured__track">
              {marquee.map((item, i) => (
                <span className="featured__item" key={i}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
