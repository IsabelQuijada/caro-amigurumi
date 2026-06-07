import { useFadeIn } from '../../hooks/useFadeIn';
import { processSteps } from '../../data/collections';
import styles from './Process.module.css';

export default function Process() {
  const textRef  = useFadeIn();
  const stepsRef = useFadeIn();

  return (
    <section className={styles.process} aria-labelledby="process-heading">
      <div className={styles.inner}>
        <div className={styles.text} ref={textRef}>
          <p className="section-label">El oficio</p>
          <h2 id="process-heading" className="section-title">
            Cada punto<br /><em>cuenta una historia</em>
          </h2>
          <p>
            Trabajo con estambre de algodón y acrílico de alta calidad, elegido con cuidado.
            Cada amigurumi está relleno con fibra premium y terminado con ojitos de seguridad
            cosidos a mano — hecho para ser amado por años.
          </p>
        </div>

        <ol className={styles.steps} ref={stepsRef} aria-label="Proceso de creación">
          {processSteps.map(step => (
            <li key={step.num} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">{step.num}</span>
              <div className={styles.stepContent}>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
