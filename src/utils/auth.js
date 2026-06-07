import axios from "axios";
import { getToken } from "./cookies";
import { loginSuccess, setLoading } from "../../redux/authSlice";

export const checkLoginStatus = async (dispatch) => {
  const token = getToken();
  console.log("Retrieved token:", token);
  if (!token) {
    dispatch(setLoading(false));
    return false;
  }

  try {
    const response = await axios.get(
      "http://localhost:5000/api/admin/verify-token",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Verification response:", response.data);

    if (response.data.success) {
      dispatch(loginSuccess({ email: response.data.user.email }));
      console.log("Dispatched loginSuccess action");
      return true;
    } else {
      dispatch(setLoading(false));
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.error(
      "Token verification error:",
      error.response ? error.response.data : error.message
    );
  }

  return false;
};
