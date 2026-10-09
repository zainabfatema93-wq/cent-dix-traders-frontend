import { create } from "zustand";
import axios from "axios";

// Allow cookies to be sent with requests
axios.defaults.withCredentials = true;

const API_URL = "https://cent-dix-traders-backend.vercel.app/api/auth";

export const useAuthStore = create((set) => ({
  // STATE

  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: false,

  // REGISTER / SIGNUP

  Signup: async (name, email, password) => {
    set({
      isLoading: true,
      error: null,
      message: null,
    });

    try {
      console.log("Sending registration request...");

      const response = await axios.post(
        `${API_URL}/register`,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Registration API response:", response.data);

      set({
        user: response.data.user || null,
        message: response.data.message || "Registration successful",
        error: null,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      console.log("Registration API error:", error);

      set({
        user: null,
        isLoading: false,
        error:
          error.response?.data?.message || error.message || "Error signing up",
        message: null,
      });

      throw error;
    }
  },

  // LOGIN

  login: async (email, password) => {
    set({
      isLoading: true,
      error: null,
      message: null,
    });

    try {
      console.log("Sending login request...");

      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Login API response:", response.data);

      set({
        user: response.data.user || null,
        message: response.data.message || "Login successful",
        error: null,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      console.log("Login API error:", error);

      set({
        user: null,
        isLoading: false,
        error:
          error.response?.data?.message || error.message || "Error logging in",
        message: null,
      });

      throw error;
    }
  },

  // FETCH USER

  fetchUser: async () => {
    set({
      fetchingUser: true,
      error: null,
    });

    try {
      console.log("Fetching current user...");

      const response = await axios.get(`${API_URL}/fetch-user`, {
        withCredentials: true,
      });

      console.log("Fetch user response:", response.data);

      set({
        user: response.data.user || null,
        fetchingUser: false,
        error: null,
      });

      return response.data;
    } catch (error) {
      console.log("Fetch user error:", error);

      set({
        user: null,
        fetchingUser: false,
      });

      return null;
    }
  },

  // LOGOUT

  logout: async () => {
    set({
      isLoading: true,
      error: null,
      message: null,
    });

    try {
      console.log("Sending logout request...");

      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      console.log("Logout API response:", response.data);

      set({
        user: null,
        message: response.data.message || "Logout successful",
        error: null,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      console.log("Logout API error:", error);

      set({
        isLoading: false,
        error:
          error.response?.data?.message || error.message || "Error logging out",
      });

      throw error;
    }
  },

  setUser: (user) => {
    set({
      user,
      error: null,
    });
  },

  // CLEAR ERROR

  clearError: () => {
    set({
      error: null,
    });
  },

  // CLEAR MESSAGE

  clearMessage: () => {
    set({
      message: null,
    });
  },
}));
