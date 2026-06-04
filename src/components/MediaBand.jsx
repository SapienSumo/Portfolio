import { useEffect, useRef } from 'react';

/**
 * Wraps a run of sections in a single looping video backdrop, so one
 * continuous background spans all of them. Content sits above via z-index
 * (see `.media-band` in globals.css). Honours reduced-motion by holding the
 * video on its first frame.
 */
export default function MediaBand({ src, children }) {
  const videoRef = useRef(null);

  // Honour reduced-motion: hold the video on its first frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
    }
  }, [src]);

  return (
    <div className="media-band">
      <video
        key={src}
        ref={videoRef}
        className="media-band__video"
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="media-band__overlay" aria-hidden="true" />
      {children}
    </div>
  );
}
