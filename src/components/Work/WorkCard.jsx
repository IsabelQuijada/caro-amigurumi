import Carousel from './Carousel';
import styles from './Work.module.css';

export default function WorkCard({ collection }) {
  const { id, label, title, desc, slides, visible, hasProgress, hasDots, wide, theme } = collection;

  return (
    <article
      className={`work-card ${styles.card} ${wide ? styles.cardWide : ''}`}
      aria-label={title}
    >
      <div className={`${styles.visual} ${styles[`visual_${theme}`]}`}>
        <Carousel
          slides={slides}
          visible={visible}
          hasProgress={hasProgress}
          hasDots={hasDots}
          label={title}
        />
        <div className={styles.tag} aria-hidden="true">{label}</div>
        <div className={styles.overlay}>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
    </article>
  );
}
