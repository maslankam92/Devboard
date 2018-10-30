import axios from "axios";
import * as Actions from "./ActionTypes";

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
