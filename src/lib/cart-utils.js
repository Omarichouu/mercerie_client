export const getOrCreateUniqueId = () => {
  const storageKey = "unique_id";
  if (typeof window === "undefined") return "";

  let uniqueId = localStorage.getItem(storageKey);
  if (!uniqueId) {
    uniqueId = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    localStorage.setItem(storageKey, uniqueId);
  }

  return uniqueId;
};
