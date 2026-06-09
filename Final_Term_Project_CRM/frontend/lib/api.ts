import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("crm_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export const getApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK") {
      return `Backend is not reachable at ${API_BASE_URL}. Start the backend server and confirm MongoDB is connected.`;
    }

    if (error.code === "ECONNABORTED") {
      return `Backend request timed out at ${API_BASE_URL}. Check the backend terminal and MongoDB connection.`;
    }

    return error.response?.data?.message || error.message || "Request failed";
  }

  return "Something went wrong";
};

export default api;
