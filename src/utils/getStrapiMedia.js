export const getStrapiMedia = (url) => {
  if (!url) return "";

  // لو الرابط كامل سيبه زي ما هو
  if (url.startsWith("http")) {
    return url;
  }

  // غير ده على حسب بيئتك
  const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  return `${baseUrl}${url}`;
};