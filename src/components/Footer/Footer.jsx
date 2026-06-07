import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.cq} aria-hidden="true">CQ</span>
          <div>
            <span className={styles.name}>Carolina Quijada</span>
            <span className={styles.tagline}>Hecho con estambre y corazón</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Footer">
          <a href="#work">Colección</a>
          <a href="#about">Sobre mí</a>
          <a href="#contact">Contacto</a>
        </nav>

        <p className={styles.copy}>© 2026 Carolina Quijada. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
