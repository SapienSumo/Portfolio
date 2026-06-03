import { useRef, useEffect, useCallback } from 'react';
import { showcase } from '../data/showcase';

const AUTO_SPEED = 0.5; // px per frame (~30px/s at 60fps)
const EASE = 0.18;      // easing factor for arrow jumps

function CardInner({ item, isLink }) {
  return (
    <div className="vcard__media">
      {item.src ? (
        // #t=0.1 makes the browser show a still frame as a poster
        <video src={`${item.src}#t=0.1`} muted loop playsInline preload="metadata" aria-hidden="true" />
      ) : (
        <div className="vcard__media-ph" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </div>
      )}
      {isLink && (
        <span className="vcard__badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </span>
      )}
    </div>
  );
}

export default function VideoCarousel() {
  const trackRef = useRef(null);
  // All mutable animation state lives in a ref so the rAF loop never restarts.
  const s = useRef({ pos: 0, target: null, paused: false, period: 0, step: 0, reduce: false });

  // Measure one card step and the width of a full set (for seamless wrap).
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.children;
    const n = showcase.length;
    if (cards.length < n + 1) return;
    s.current.step = cards[1].offsetLeft - cards[0].offsetLeft;
    s.current.period = cards[n].offsetLeft - cards[0].offsetLeft;
  }, []);

  useEffect(() => {
    s.current.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    measure();

    let raf;
    const frame = () => {
      const track = trackRef.current;
      const st = s.current;
      if (track && st.period > 0) {
        if (st.target !== null) {
          // Ease toward an arrow-driven target.
          const diff = st.target - st.pos;
          if (Math.abs(diff) < 0.5) { st.pos = st.target; st.target = null; }
          else st.pos += diff * EASE;
        } else if (!st.paused && !st.reduce) {
          st.pos -= AUTO_SPEED; // conveyor drift
        }

        // Seamless wrap — keep pos within one set's width.
        let delta = 0;
        if (st.pos <= -st.period) delta = st.period;
        else if (st.pos > 0) delta = -st.period;
        if (delta) { st.pos += delta; if (st.target !== null) st.target += delta; }

        track.style.transform = `translate3d(${st.pos}px, 0, 0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [measure]);

  // dir: +1 = next (content moves left), -1 = previous. Queues if clicked rapidly.
  const nudge = (dir) => {
    const st = s.current;
    if (!st.step) return;
    const base = st.target !== null ? st.target : st.pos;
    st.target = base - dir * st.step;
  };

  const setPlaying = (e, play) => {
    const video = e.currentTarget.querySelector('video');
    if (!video) return;
    if (play) video.play().catch(() => {});
    else { video.pause(); video.currentTime = 0; }
  };

  const handleEnter = (e) => { s.current.paused = true; setPlaying(e, true); };
  const handleLeave = (e) => { s.current.paused = false; setPlaying(e, false); };

  // Render the set twice for an unbroken loop.
  const items = [...showcase, ...showcase];

  return (
    <div className="video-carousel reveal">
      <div className="video-carousel__head">
        <p className="video-carousel__label">Recent work in motion</p>
        <div className="video-carousel__nav">
          <button className="vc-arrow" onClick={() => nudge(-1)} aria-label="Previous project">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="vc-arrow" onClick={() => nudge(1)} aria-label="Next project">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="video-carousel__viewport">
        <div className="video-carousel__track" ref={trackRef}>
          {items.map((item, i) => {
            const clone = i >= showcase.length;
            const isLink = item.href && item.href !== '#';
            const shared = {
              className: 'vcard',
              onMouseEnter: handleEnter,
              onMouseLeave: handleLeave,
              'aria-hidden': clone ? 'true' : undefined,
            };
            return isLink ? (
              <a
                key={i}
                {...shared}
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={clone ? -1 : undefined}
                aria-label={`${item.title} — open project in a new tab`}
              >
                <CardInner item={item} isLink />
              </a>
            ) : (
              <div key={i} {...shared}>
                <CardInner item={item} isLink={false} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
