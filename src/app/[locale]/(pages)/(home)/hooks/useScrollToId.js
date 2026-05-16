import { useCallback } from "react";

export const useScrollToId = () =>
  useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
