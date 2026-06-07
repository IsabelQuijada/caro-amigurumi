import { useState, useEffect, useRef } from 'react';
import { useScrolled } from '../../hooks/useScrolled';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Nav.module.css';

const SECTION_IDS = ['hero', 'work', 'about', 'contact'];

const links = [
  { href: '#work',    label: 'Colección' },
  { href: '#about',   label: 'Sobre mí' },
  { href: '#contact', label: 'Contacto' },
];

export default function Nav() {
  const [open, setOpen]   = useState(false);
  const scrolled          = useScrolled();
  const active            = useActiveSection(SECTION_IDS);
  const navRef            = useRef(null);
  const burgerRef         = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Return focus to burger when menu closes
  useEffect(() => {
    if (!open) burgerRef.current?.focus();
  }, [open]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      id="nav"
      ref={navRef}
      aria-label="Navegación principal"
    >
      <a href="#hero" className={styles.logo}>
        <span className={styles.logoCq} aria-hidden="true">CQ</span>
        <span className={styles.logoText}>Carolina Quijada</span>
      </a>

      <button
        className={styles.burger}
        id="burger"
        ref={burgerRef}
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="navLinks"
        onClick={() => setOpen(v => !v)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <ul
        className={`${styles.links} ${open ? styles.open : ''}`}
        id="navLinks"
        role="list"
      >
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              aria-current={active === href.slice(1) ? 'true' : undefined}
              style={{ color: active === href.slice(1) ? 'var(--terracotta)' : '' }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
