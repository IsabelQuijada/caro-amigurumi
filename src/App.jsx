import Nav     from './components/Nav/Nav';
import Hero    from './components/Hero/Hero';
import Work    from './components/Work/Work';
import Process from './components/Process/Process';
import About   from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer  from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Saltar al contenido principal</a>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
