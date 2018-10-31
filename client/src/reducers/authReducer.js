import * as Actions from "../actions/ActionTypes";
import isEmpty from "../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, { type, user }) => {
  switch (type) {
    case Actions.REGISTER_USER:
      return {
        ...state,
        user
      };

    case Actions.SET_USER:
      return {
        isAuthenticated: !isEmpty(user),
        user
      };

    default:
      return state;
  }
};

export default authReducer;
