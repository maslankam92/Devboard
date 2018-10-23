const Validator = require("validator");
const { isEmpty } = require("./helpers");

const validateExperienceInput = ({ title, company, from }) => {
  let errors = {};

  if (isEmpty(title)) {
    errors.title = "Job title is required";
  }

  if (isEmpty(company)) {
    errors.company = "Company is required";
  }

  if (isEmpty(from)) {
    errors.from = "From date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
