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
    const container = containerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;
    const c = container.getBoundingClientRect();
    const r = card.getBoundingClientRect();
    const x = r.left - c.left;
    if (prevX.current !== null) setDir(x >= prevX.current ? 'right' : 'left');
    prevX.current = x;
    setBox({ x, y: r.top - c.top, w: r.width, h: r.height });
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
      <div className="spotlight" data-dir={dir} style={overlayStyle} aria-hidden="true">
        {/* keyed so the stretch animation replays on each move */}
        <div className="spotlight__ring" key={active} />
      </div>

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
    </div>
  );
}
