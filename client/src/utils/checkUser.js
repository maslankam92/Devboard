import jwt_decode from "jwt-decode";

import store from "../store";
import setAuthorizationHeader from "./setAuthorizationHeader";
import * as Actions from "../actions/ActionTypes";

const checkUser = () => {
  const token = localStorage.jwtToken;
  if (token) {
    setAuthorizationHeader(token);
    const decoded = jwt_decode(token);
    store.dispatch({
      type: Actions.SET_USER,
      user: decoded
    });
  }
};

export default checkUser;
