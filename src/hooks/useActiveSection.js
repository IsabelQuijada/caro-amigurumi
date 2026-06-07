import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const handler = () => {
      let current = '';
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      });
      setActive(current);
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [sectionIds]);

  return active;
}
