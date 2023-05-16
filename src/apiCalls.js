import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.post("http://localhost:8000/api/auth/login", userCredential, config);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
