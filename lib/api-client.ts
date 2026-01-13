import axios from "axios";

// Create an Axios instance
export const api = axios.create({
  baseURL: "http://localhost:5050/api",
  // baseURL: "https://test.ownmali.com/api/auth-issuer",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token to Requests
api.interceptors.request.use(
  (config) => {
    // Check if we're in browser environment
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry & Errors
api.interceptors.response.use(
  (response) => response, // Return response as is if successful
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error: No response received.");
      return Promise.reject({ message: "Network Error" });
    }

    const { status } = error.response;

    if (status === 401 || status === 403) {
      console.warn("Unauthorized request: Attempting to refresh token.");

      try {
        if (typeof window !== "undefined") {
          const refreshToken = sessionStorage.getItem("refreshToken") || localStorage.getItem("refreshToken");
          if (!refreshToken) {
            console.error("No refresh token found. Redirecting to login.");
            return handleLogout();
          }

          const { data } = await axios.post(
            "http://localhost:5050/api/auth-issuer/refresh-token",
            { refreshToken }
          );

          // Store in the same location it was retrieved from
          const storage = sessionStorage.getItem("refreshToken") ? sessionStorage : localStorage;
          storage.setItem("accessToken", data.data.accessToken);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

const handleLogout = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
  return Promise.reject({ message: "Session expired. Redirecting to login." });
};

// Auth API functions
export const authAPI = {
  // Signup
  signup: async (data: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    countryCode?: string;
  }) => {
    const response = await api.post("/auth-issuer/signup", data);
    return response.data;
  },

  // Login
  login: async (data: { email: string; }) => {
    const response = await api.post("/auth-issuer/login", data);
    return response.data;
  },

  // Resend OTP
  resendOTP: async () => {
    const response = await api.post("/auth-issuer/resend-otp");
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (data: { otp: string, email: string   }) => {
    const response = await api.post("/auth-issuer/verify-otp", { otp: data.otp, email: data.email });
    return response.data;
  },


  // Update KYC status

};

export default api;
