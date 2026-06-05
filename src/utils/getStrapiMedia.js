export const getStrapiMedia = (url) => {
  if (!url) return "";

  if (url.startsWith("http")) return url;

  const base = import.meta.env.VITE_API_URL;

  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
};