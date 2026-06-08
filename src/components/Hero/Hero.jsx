import styles from './Hero.module.css';

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-heading">
      <div className={styles.bg} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.eyebrow} aria-hidden="true">
          <span className={styles.eyebrowDot} />
          Hecho a mano con amor y estambre
        </div>

        <div className={styles.visual}>
          <div className={styles.imgWrap}>
            <img
              src={assetPath('Assets/landingPage.png')}
              alt="Colección de amigurumis de Carolina Quijada — peluches tejidos a mano"
              className={styles.img}
              priority="true"
            />
          </div>
        </div>

        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.title}>
            <span className={styles.titleLine}>Pequeñas criaturas,</span>
            <em className={styles.titleLine}>grandes corazones</em>
          </h1>

          <p className={styles.desc}>
            Cada amigurumi está tejido a mano, punto a punto —
            pequeños mundos suaves que esperan ser abrazados.
          </p>

          <div className={styles.actions}>
            <a href="#work" className="btn btn--primary">Ver la colección</a>
            <a href="#contact" className="btn btn--ghost">Encargar uno</a>
          </div>
        </div>
      </div>
    </section>
  );
}
