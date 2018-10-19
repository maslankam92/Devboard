const Validator = require("validator");
const { isEmpty } = require("./helpers");

const validateRegisterInput = ({ name, email, password, confirmPassword }) => {
  let errors = {};

  if (isEmpty(name)) {
    errors.name = "Name is required";
  } else if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (isEmpty(email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is not correct";
  }

  if (isEmpty(password)) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm password is required";
  } else if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
