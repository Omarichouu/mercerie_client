import { useCallback, useRef } from "react";

export const useHorizontalScroll = ({ isRTL, scrollAmount = 300 }) => {
  const containerRef = useRef(null);

  const scrollByDirection = useCallback(
    (direction) => {
      const container = containerRef.current;
      if (!container) return;

      const delta = isRTL
        ? direction === "right"
          ? scrollAmount
          : -scrollAmount
        : direction === "left"
          ? -scrollAmount
          : scrollAmount;

      container.scrollBy({ left: delta, behavior: "smooth" });
    },
    [isRTL, scrollAmount]
  );

  return { containerRef, scrollByDirection };
};
