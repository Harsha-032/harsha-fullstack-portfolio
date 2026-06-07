/**
 * Resolves local relative media URLs to point to the Django backend server
 * in local development, or keeps absolute URLs (e.g. Cloudinary) as-is.
 * 
 * @param {string} url The image or file URL from the backend
 * @returns {string} The fully resolved URL
 */
export const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Resolve relative media paths to backend host
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  try {
    const origin = new URL(apiBase).origin;
    return `${origin}${cleanPath}`;
  } catch (e) {
    return `http://127.0.0.1:8000${cleanPath}`;
  }
};
