import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Replace with real API call when ready
    setTimeout(() => {
      setStatus('sent');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <h2 className="section__title">
          <span className="section__title-prefix">//</span> contact
        </h2>

        <div className="contact__inner">
          {/* Left: info */}
          <div className="contact__text">
            <h3 className="contact__heading">Available for select freelance opportunities</h3>
            <p className="contact__sub">
              Have an exciting project you need help with? Send me an email or reach out via instant message!
            </p>

            <div className="contact__links">
              <a href="mailto:paul.iyola.aliu@gmail.com" className="contact__link contact__link--email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="2,4 12,13 22,4"/>
                </svg>
                paul.iyola.aliu@gmail.com
              </a>
            </div>

            <div className="contact__socials">
              <a href="https://linkedin.com/in/paulaliu" className="social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://github.com/paulaliu" className="social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
              <a href="https://instagram.com/paulaliu" className="social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact__form-wrap">
            <form onSubmit={handleSubmit} id="contactForm">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required />
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={status !== 'idle'}
              >
                {status === 'idle'   && 'Send Message'}
                {status === 'sending' && 'Sending…'}
                {status === 'sent'   && 'Message Sent!'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
