import axios from 'axios';

// Base URLs from environment variables
const VOTING_BACKEND_URL = process.env.REACT_APP_VOTING_BACKEND_URL || 'http://localhost:8080';
const AUTH_SERVICE_URL = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:8081';

// Axios instance for the auth service
const authApi = axios.create({
  baseURL: AUTH_SERVICE_URL,
});

// Axios instance for the voting backend
const votingApi = axios.create({
  baseURL: VOTING_BACKEND_URL,
});

// Request interceptor to add Authorization header
function attachAuthToken(config) {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}

// Add interceptor to votingApi (authApi doesn't need it for login/register)
votingApi.interceptors.request.use(attachAuthToken, (error) => Promise.reject(error));

// Response interceptor to handle token refresh
votingApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    const originalRequest = config;

    if (response && response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const { data } = await authApi.post('/auth/refresh', { refresh_token: refreshToken });

        // Save new tokens
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Update the Authorization header
        originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;

        return votingApi(originalRequest);
      } catch (err) {
        // Handle refresh token failure
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export { authApi, votingApi };