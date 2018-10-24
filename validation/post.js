const Validator = require("validator");
const { isEmpty } = require("./helpers");

const validatePostInput = ({ text }) => {
  let errors = {};

  if (isEmpty(text)) {
    errors.text = "Text in comment is required";
  } else if (!Validator.isLength(text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePostInput;
