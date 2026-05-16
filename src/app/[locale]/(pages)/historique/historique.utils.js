export const formatDate = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleDateString();
};

export const generateShortId = (fullId) =>
  fullId ? fullId.slice(-8).toUpperCase() : "";
