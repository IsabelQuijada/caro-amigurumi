import { useFadeIn } from '../../hooks/useFadeIn';
import styles from './About.module.css';

const facts = [
  { num: '200+', label: 'Amigurumis creados' },
  { num: '3 años', label: 'Tejiendo' },
  { num: '∞', label: 'Amor por punto' },
];

export default function About() {
  const portraitRef = useFadeIn();
  const textRef     = useFadeIn();

  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <div className={styles.inner}>
        <div className={styles.portrait} ref={portraitRef}>
          <div className={styles.frame}>
            <img
              src="/Assets/CaroFoto.jpg"
              alt="Fotografía de Carolina Quijada, artesana"
              className={styles.photo}
              loading="lazy"
            />
          </div>
          <div className={styles.badge} aria-hidden="true">
            <span className={styles.badgeScript}>hecho a mano</span>
            <span className={styles.badgeSub}>con amor ♥</span>
          </div>
        </div>

        <div className={styles.text} ref={textRef}>
          <p className="section-label">Sobre mí</p>
          <h2 id="about-heading" className="section-title">
            Hola, soy<br /><em>Carolina</em>
          </h2>
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
