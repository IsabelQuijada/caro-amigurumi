import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './About.module.css';

const facts = [
  { num: '500+', label: 'Amigurumis creados' },
  { num: '7 años', label: 'Tejiendo' },
  { num: '∞', label: 'Amor por punto' },
];

export default function About() {
  const introRef  = useFadeIn();
  const cornerRef = useFadeIn();
  const storyRef  = useFadeIn();

  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <div className={styles.inner}>
        <div className={styles.intro} ref={introRef}>
          <p className="section-label">Sobre mí</p>
          <h2 id="about-heading" className="section-title">
            Hola, soy <em>Carolina</em>
          </h2>
        </div>

        <div className={styles.corner} ref={cornerRef}>
          <div className={styles.portrait}>
            <div className={styles.card}>
              <div className={styles.frame}>
                <img
                  src="/Assets/caroPerfil.png"
                  alt="Fotografía de Carolina Quijada, artesana"
                  className={styles.photo}
                  loading="lazy"
                />
              </div>
            </div>
            <div className={styles.badge} aria-hidden="true">
              <span className={styles.badgeScript}>hecho a mano</span>
              <span className={styles.badgeSub}>con amor ♥</span>
            </div>
          </div>
        </div>

        <div className={styles.story} ref={storyRef}>
          <p className={styles.lead}>
            Soy artesana, soñadora y fanática del estambre, radicada en México.
            El amigurumi llegó a mí una tarde tranquila y ya no me soltó.
          </p>
          <p>
            Lo que comenzó como pasatiempo se convirtió rápidamente en una forma de volcar
            cariño en algo tangible — algo que la gente puede abrazar, regalar y atesorar.
            Creo que las cosas hechas a mano tienen una calidez que los objetos fabricados
            nunca logran del todo.
          </p>
          <p>
            Cada pieza que creo es única. Aunque repita el mismo diseño, el estambre se
            comporta diferente, el relleno queda a su manera — y esa pequeña imperfección
            es la que lo hace real.
          </p>

          <p className={styles.signature}>
            Tejido con calma, con paciencia y, sobre todo, con mucho cariño.
            <span className={styles.signatureName}>— Carolina</span>
          </p>

          <dl className={styles.facts}>
            {facts.map(f => (
              <div key={f.label} className={styles.fact}>
                <dt className={styles.factNum}>{f.num}</dt>
                <dd className={styles.factLabel}>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
