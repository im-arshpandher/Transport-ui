import axios from "axios";
import { loginSuccess, logout, setLoading } from "./authSlice";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post("http://localhost:5000/api/login", credentials);
    localStorage.setItem("token", response.data.token);
    dispatch(loginSuccess(response.data.user));
  } catch (error) {
    console.error("Login failed:", error);
    dispatch(logout());
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyToken = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("http://localhost:5000/api/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(loginSuccess(response.data.user));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    dispatch(logout());
  } finally {
    dispatch(setLoading(false));
  }
};
