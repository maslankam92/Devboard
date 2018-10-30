import * as Actions from "./ActionTypes";

export const clearError = errorName => ({
  type: Actions.CLEAR_ERROR,
  errorName
});
