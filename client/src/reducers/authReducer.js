import * as Actions from "../actions/ActionTypes";

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

    default:
      return state;
  }
};

export default authReducer;
