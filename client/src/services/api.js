import axios from 'axios';

// The baseURL points to our backend. 
// Vite handles the environment switching for us (local vs production).
const api = axios.create({
  // In production, we use a relative path so Vercel handles the routing.
  // In development, we fall back to localhost:5000.
  baseURL: import.meta.env.PROD ? '' : (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'),
  headers: { 
    'Content-Type': 'application/json' 
  },
  timeout: 10000 
});


/**
 * Interceptor to catch 401s. 
 * Since we're using Basic Auth on the server, we intercept the challenge
 * and prompt the user manually to avoid the default browser popup loop.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If we hit a 401 and haven't tried to "retry" yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // I know window.prompt is old-school/ugly, but it's a super quick 
      // way to handle auth without building a whole login page.
      const user = window.prompt('Admin Username:');
      const pass = window.prompt('Admin Password:');
      
      if (user && pass) {
        // btoa encodes to base64 for the Authorization header
        const credentials = btoa(`${user}:${pass}`);
        originalRequest.headers['Authorization'] = `Basic ${credentials}`;
        
        // Let's try that request again with the new credentials
        return api(originalRequest);
      }
    }
    
    // Pass the error along if we can't handle it
    return Promise.reject(error);
  }
);

// TODO: Replace this prompt system with a proper JWT/Session login page eventually
export default api;



