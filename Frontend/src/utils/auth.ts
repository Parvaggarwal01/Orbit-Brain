import axios from "axios";
import { BACKEND_URL } from "../config";

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    await axios.get(`${BACKEND_URL}/api/v1/content`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return false;
    }
    // For other errors (network, server), assume token is still valid
    return true;
  }
};

export const clearInvalidToken = () => {
  localStorage.removeItem("token");
  window.location.href = "/signin";
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
