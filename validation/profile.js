const Validator = require("validator");
const { isEmpty } = require("./helpers");

const validateProfileInput = data => {
  let errors = {};

  if (isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  } else if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle must be between 2 and 40 characters";
  }

  if (isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (isEmpty(data.skills)) {
    errors.skills = "Skills are required";
  }

  if (!isEmpty(data.website) && !Validator.isURL(data.website)) {
    errors.website = "Website URL is not correct";
  }

  if (!isEmpty(data.youtube) && !Validator.isURL(data.youtube)) {
    errors.youtube = "Youtube URL is not correct";
  }

  if (!isEmpty(data.twitter) && !Validator.isURL(data.twitter)) {
    errors.twitter = "Twitter URL is not correct";
  }

  if (!isEmpty(data.facebook) && !Validator.isURL(data.facebook)) {
    errors.facebook = "Facebook URL is not correct";
  }

  if (!isEmpty(data.linkedin) && !Validator.isURL(data.linkedin)) {
    errors.linkedin = "LinkedIn URL is not correct";
  }

  if (!isEmpty(data.instagram) && !Validator.isURL(data.instagram)) {
    errors.instagram = "Instagram URL is not correct";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
