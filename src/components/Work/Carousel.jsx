import { useEffect, useRef } from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import styles from './Carousel.module.css';

export default function Carousel({ slides, label, onIndexChange }) {
  const { current, next, prev, startAuto, stopAuto, progressPct } =
    useCarousel(slides.length);

  useEffect(() => { onIndexChange?.(current); }, [current, onIndexChange]);

  // Touch / swipe
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd   = (e) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    const isHorizontalSwipe = Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.25;

    if (isHorizontalSwipe) { stopAuto(); diffX > 0 ? next() : prev(); }
  };

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { stopAuto(); next(); }
    if (e.key === 'ArrowLeft')  { stopAuto(); prev(); }
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-label={label ? `Galería: ${label}` : 'Galería de imágenes'}
      onMouseEnter={startAuto}
      onMouseLeave={stopAuto}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div
        className={styles.track}
        aria-live="polite"
        aria-atomic="true"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            aria-hidden={i !== current}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        className={`${styles.btn} ${styles.btnPrev}`}
        onClick={(e) => { e.stopPropagation(); stopAuto(); prev(); }}
        aria-label="Imagen anterior"
      >
        ←
      </button>
      <button
        className={`${styles.btn} ${styles.btnNext}`}
        onClick={(e) => { e.stopPropagation(); stopAuto(); next(); }}
        aria-label="Imagen siguiente"
      >
        →
      </button>

      <div className={styles.counter} aria-hidden="true">{current + 1} / {slides.length}</div>

      <div className={styles.progressWrap} aria-hidden="true">
        <div
          className={styles.progressBar}
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
