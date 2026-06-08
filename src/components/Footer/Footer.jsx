import styles from './Footer.module.css';

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img
            src={assetPath('Assets/carolinaLogo-nav.png')}
            alt="Carolina Quijada"
            className={styles.logoImg}
          />
        </div>

        <nav className={styles.nav} aria-label="Footer">
          <a href="#work">Colección</a>
          <a href="#about">Sobre mí</a>
          <a href="#contact">Contacto</a>
        </nav>

        <p className={styles.copy}>©  2026 Carolina Quijada ♥. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
