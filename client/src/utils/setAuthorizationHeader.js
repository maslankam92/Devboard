import axios from "axios";

const setAuthorizationHeader = token => {
  axios.defaults.headers.authorization = token;
};
export default setAuthorizationHeader;
