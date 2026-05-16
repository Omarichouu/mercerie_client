import { useEffect, useState } from "react";

export const useHeroSlider = (slideCount, intervalMs = 5000) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slideCount <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, slideCount]);

  return { currentSlide, setCurrentSlide };
};
