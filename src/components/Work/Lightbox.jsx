import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Lightbox.module.css';

export default function Lightbox({ slides, initialIndex = 0, label, theme, onClose }) {
  const [current, setCurrent] = useState(initialIndex);
  const [loadedSrc, setLoadedSrc] = useState('');
  const [failedSrc, setFailedSrc] = useState('');
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const max = slides.length - 1;
  const next = useCallback(() => setCurrent(c => (c === max ? 0 : c + 1)), [max]);
  const prev = useCallback(() => setCurrent(c => (c === 0 ? max : c - 1)), [max]);

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [next, onClose, prev]);

  useEffect(() => {
    const indexes = [current, current === 0 ? max : current - 1, current === max ? 0 : current + 1];
    const preloads = indexes.map(index => {
      const img = new Image();
      img.src = slides[index].src;
      return img;
    });

    return () => {
      preloads.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [current, max, slides]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Focus the close button on open, restore focus to the trigger on close
  useEffect(() => {
    lastFocusedRef.current = document.activeElement;
    closeBtnRef.current?.focus();
    return () => lastFocusedRef.current?.focus();
  }, []);

  const slide = slides[current];
  const loaded = loadedSrc === slide.src;
  const failed = failedSrc === slide.src;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={(e) => { e.stopPropagation(); onClose(); }}
    >
      <div
        className={`${styles.dialog} ${theme ? styles[`dialog_${theme}`] : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={label ? `Imagen ampliada: ${label}` : 'Imagen ampliada'}
        aria-live="polite"
        aria-atomic="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className={styles.imageWrap}>
          {!loaded && !failed && <span className={styles.loader}>Cargando imagen</span>}
          {failed && <span className={styles.loader}>No se pudo cargar la imagen</span>}
          <img
            className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
            src={slide.src}
            alt={slide.alt}
            loading="eager"
            decoding="async"
            onLoad={() => {
              setLoadedSrc(slide.src);
              setFailedSrc(src => (src === slide.src ? '' : src));
            }}
            onError={() => setFailedSrc(slide.src)}
          />
        </div>

        {slides.length > 1 && (
          <>
            <button
              className={`${styles.navBtn} ${styles.navBtnPrev}`}
              onClick={prev}
              aria-label="Imagen anterior"
            >
              ←
            </button>
            <button
              className={`${styles.navBtn} ${styles.navBtnNext}`}
              onClick={next}
              aria-label="Imagen siguiente"
            >
              →
            </button>
            <div className={styles.counter} aria-hidden="true">{current + 1} / {slides.length}</div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
