const Validator = require("validator");
const { isEmpty } = require("./helpers");

const validateLoginInput = ({ email, password }) => {
  let errors = {};

  if (isEmpty(email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is not correct";
  }

  if (isEmpty(password)) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
