import { useRef, useState, useLayoutEffect, useCallback } from 'react';

/**
 * A grid whose gradient "spotlight" highlight follows the hovered card.
 * It starts on `defaultIndex`, then travels to whatever card is hovered,
 * staying there (it never reverts). The travel direction drives a brief
 * stretch ("vacuum") animation so the highlight feels sucked toward its target.
 *
 * The overlay's position/size is measured from the DOM, so — like a moving
 * underline — its geometry is set inline; all visual styling lives in CSS.
 */
export default function SpotlightGrid({
  gridClassName,
  cardClassName,
  items,
  getKey,
  renderCard,
  defaultIndex = 0,
}) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const prevX = useRef(null);

  const [active, setActive] = useState(defaultIndex);
  const [dir, setDir] = useState('right');
  const [box, setBox] = useState(null);

  const measure = useCallback((index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    // Layout offsets (not getBoundingClientRect) so the cards' scroll-in
    // transform doesn't shift the spotlight while they animate into place.
    const x = card.offsetLeft;
    if (prevX.current !== null) setDir(x >= prevX.current ? 'right' : 'left');
    prevX.current = x;
    setBox({ x, y: card.offsetTop, w: card.offsetWidth, h: card.offsetHeight });
  }, []);

  useLayoutEffect(() => {
    measure(active);
    const onResize = () => measure(active);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active, measure]);

  const overlayStyle = box
    ? {
        width: box.w,
        height: box.h,
        transform: `translate3d(${box.x}px, ${box.y}px, 0)`,
        opacity: 1,
      }
    : { opacity: 0 };

  return (
    <div className={gridClassName} ref={containerRef}>
      {items.map((item, i) => (
        <div
          key={getKey ? getKey(item) : i}
          ref={(el) => { cardRefs.current[i] = el; }}
          className={cardClassName}
          onMouseEnter={() => setActive(i)}
        >
          {renderCard(item, i)}
        </div>
      ))}

      {/* Rendered after the cards so the stagger's :nth-child counts only cards.
          Its z-index (not DOM order) keeps it layered correctly. */}
      <div className="spotlight" data-dir={dir} style={overlayStyle} aria-hidden="true">
        {/* keyed so the stretch animation replays on each move */}
        <div className="spotlight__ring" key={active} />
      </div>
    </div>
  );
}
