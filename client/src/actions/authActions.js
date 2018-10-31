import axios from "axios";
import jwt_decode from "jwt-decode";
import * as Actions from "./ActionTypes";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const registerUser = (user, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", user);
    history.push("/login");
  } catch (err) {
    dispatch({
      type: Actions.GET_ERRORS,
      errors: err.response.data
    });
  }
};

export const loginUser = (user, history) => async dispatch => {
  try {
    const response = await axios.post("/api/users/login", user);
    const { token } = response.data;

    localStorage.setItem("jwtToken", token);
    setAuthorizationHeader(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: Actions.SET_USER,
      user: decoded
    });
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: Actions.GET_ERRORS,
      errors: err.response.data
    });
  }
};
