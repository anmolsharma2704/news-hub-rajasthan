// Environment configuration
export const config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'News Hub Rajasthan',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Latest news from Rajasthan',
}; 