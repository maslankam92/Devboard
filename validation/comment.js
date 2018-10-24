const Validator = require("validator");
const { isEmpty } = require("./helpers");

const validateCommentInput = ({ text }) => {
  let errors = {};

  if (isEmpty(text)) {
    errors.text = "Comment text is required";
  } else if (!Validator.isLength(text, { max: 300 })) {
    errors.text = "Maximum post text is 300 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateCommentInput;
