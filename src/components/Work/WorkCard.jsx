import { useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Carousel from './Carousel';
import Lightbox from './Lightbox';
import styles from './Work.module.css';

export default function WorkCard({ collection }) {
  const { label, title, desc, slides, wide, theme } = collection;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Tapping opens the carousel's swipe gestures on touch devices, so the
  // full-image lightbox is reserved for pointer-driven (web) interactions.
  const canExpand = useMediaQuery('(hover: hover) and (pointer: fine)');

  const openLightbox = () => { if (canExpand) setLightboxOpen(true); };

  return (
    <article
      className={`work-card ${styles.card} ${wide ? styles.cardWide : ''}`}
      aria-label={title}
      onClick={openLightbox}
    >
      <div className={`${styles.visual} ${styles[`visual_${theme}`]}`}>
        <Carousel slides={slides} label={title} onIndexChange={setActiveIndex} />
        <div className={styles.tag} aria-hidden="true">{label}</div>
        <div className={styles.overlay}>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          slides={slides}
          initialIndex={activeIndex}
          label={title}
          theme={theme}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </article>
  );
}
