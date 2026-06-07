import { useRef } from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import styles from './Carousel.module.css';

export default function Carousel({ slides, visible = 1, hasProgress, hasDots, label }) {
  const { current, goTo, next, prev, startAuto, stopAuto, progressPct } =
    useCarousel(slides.length, visible);

  // Touch / swipe
  const touchStartX = useRef(0);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { stopAuto(); diff > 0 ? next() : prev(); }
  };

  // Keyboard navigation
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { stopAuto(); next(); }
    if (e.key === 'ArrowLeft')  { stopAuto(); prev(); }
  };

  const slideWidth = `${100 / visible}%`;

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
        style={{ transform: `translateX(-${current * (100 / visible)}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={styles.slide}
            style={{ width: slideWidth }}
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
        onClick={() => { stopAuto(); prev(); }}
        aria-label="Imagen anterior"
      >
        ←
      </button>
      <button
        className={`${styles.btn} ${styles.btnNext}`}
        onClick={() => { stopAuto(); next(); }}
        aria-label="Imagen siguiente"
      >
        →
      </button>

      {hasDots && (
        <div className={styles.dots} role="tablist" aria-label="Navegación de imágenes">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Imagen ${i + 1}`}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => { stopAuto(); goTo(i); }}
            />
          ))}
        </div>
      )}

      {hasProgress && (
        <div className={styles.progressWrap} aria-hidden="true">
          <div
            className={styles.progressBar}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}
    </div>
  );
}
