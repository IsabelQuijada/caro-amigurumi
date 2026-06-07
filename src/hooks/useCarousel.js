import { useState, useRef, useCallback, useEffect } from 'react';

export function useCarousel(totalSlides, visible = 1) {
  const max = totalSlides - visible;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent(((index % (max + 1)) + (max + 1)) % (max + 1));
  }, [max]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  const stopAuto = useCallback(() => clearInterval(timerRef.current), []);

  const startAuto = useCallback(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => ((c + 1) % (max + 1)));
    }, 1800);
  }, [max]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const progressPct = max > 0 ? (current / max) * 100 : 100;

  return { current, goTo, next, prev, startAuto, stopAuto, progressPct };
}
