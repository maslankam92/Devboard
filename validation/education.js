const Validator = require("validator");
const { isEmpty } = require("./helpers");

const validateEducationInput = ({ school, degree, fieldOfStudy, from }) => {
  let errors = {};

  if (isEmpty(school)) {
    errors.school = "School name is required";
  }

  if (isEmpty(degree)) {
    errors.degree = "Degree is required";
  }

  if (isEmpty(fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study is required";
  }

  if (isEmpty(from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateEducationInput;
