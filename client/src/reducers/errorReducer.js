import * as Actions from "../actions/ActionTypes";

const errorReducer = (state = {}, payload) => {
  switch (payload.type) {
    case Actions.GET_ERRORS:
      return payload.errors;

    case Actions.CLEAR_ERROR:
      return {
        ...state,
        [payload.errorName]: ""
      };

    default:
      return state;
  }
};

export default errorReducer;
