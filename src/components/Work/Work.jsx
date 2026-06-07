import { useFadeIn } from '../../hooks/useFadeIn';
import { collections } from '../../data/collections';
import WorkCard from './WorkCard';
import styles from './Work.module.css';

export default function Work() {
  const headerRef = useFadeIn();

  return (
    <section className={styles.work} id="work" aria-labelledby="work-heading">
      <div className={`${styles.header} work__header`} ref={headerRef}>
        <div>
          <p className="section-label">Colección</p>
          <h2 id="work-heading" className="section-title">Mi Trabajo</h2>
        </div>
        <p className={styles.sub}>Cada pieza es única, tejida con paciencia y cariño.</p>
      </div>

      <div className={styles.grid} aria-label="Colecciones de amigurumis">
        {collections.map(col => (
          <WorkCard key={col.id} collection={col} />
        ))}
      </div>
    </section>
  );
}
