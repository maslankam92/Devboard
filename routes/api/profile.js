const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

/*
* @route GET api/profile
* @description Gets current user profile
* @access Private
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getCurrentProfile
);

/*
* @route POST api/profile
* @description Creates or updates user profile
* @access Private
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createOrUpdateUserProfile
);

/*
* @route GET api/profile/handle/:handle
* @description Gets profile by handle
* @access Public
*/
router.get("/handle/:handle", getProfileByHandle);

/*
* @route GET api/profile/user/:user_id
* @description Gets profile by user id
* @access Public
*/
router.get("/user/:user_id", getProfileByUserId);

/*
* @route GET api/all
* @description Gets all profiles
* @access Public
*/
router.get("/all", getAllProfiles);

/*
* @route POST api/profile/experience
* @description Adds experience to profile
* @access Private
*/
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  addExperience
);

/*
* @route DELETE api/profile/experience/:exp_id
* @description Deletes experience from profile
* @access Private
*/
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  deleteExperience
);

/*
* @route POST api/profile/education
* @description Adds education to profile
* @access Private
*/
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  addEducation
);

/*
* @route DELETE api/profile/education/:edu_id
* @description Deletes education from profile
* @access Private
*/
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  deleteEducation
);

async function getCurrentProfile(req, res) {
  let errors = {};
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    ["name", "avatar"]
  );

  if (!profile) {
    errors.noprofile = "There is no profile for this user";
    return res.status(404).json(errors);
  }
  return res.json(profile);
}

async function createOrUpdateUserProfile(req, res) {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = getProfileFieldsFromRequest(req.user, req.body);
  const profile = await Profile.findOne({ user: profileFields.user });
  if (profile) {
    // Update profile
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: profileFields.user },
      { $set: profileFields },
      { new: true }
    );

    return res.json(updatedProfile);
  } else {
    // Create profile
    const createdProfile = await new Profile(profileFields).save();
    return res.json(createdProfile);
  }
}

async function getProfileByHandle(req, res) {
  let errors = {};
  let profile;
  try {
    profile = await Profile.findOne({ handle: req.params.handle }).populate(
      "user",
      ["name", "avatar"]
    );
  } catch (e) {
    errors.noprofile = "There is no profile for this user";
    return res.status(404).json(errors);
  }

  if (!profile) {
    errors.noprofile = "There is no profile for this user";
    return res.status(404).json(errors);
  }

  return res.json(profile);
}

async function getProfileByUserId(req, res) {
  let errors = {};
  let profile;

  try {
    profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
  } catch (e) {
    errors.noprofile = "There is no profile for this user";
    return res.status(404).json(errors);
  }

  if (!profile) {
    errors.noprofile = "There is no profile for this user";
    return res.status(404).json(errors);
  }

  return res.json(profile);
}

async function getAllProfiles(req, res) {
  let errors = {};
  let profiles;

  try {
    profiles = await Profile.find({}).populate("user", ["name", "avatar"]);
  } catch (e) {
    errors.noprofile = "There are no profiles";
    return res.status(404).json(errors);
  }

  if (!profiles) {
    errors.noprofile = "There are no profiles";
    return res.status(404).json(errors);
  }

  return res.json(profiles);
}

async function addExperience(req, res) {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newExp = getNewExperienceFromRequest(req.body);
  const profile = await Profile.findOne({ user: req.user.id });
  profile.experience = [newExp, ...profile.experience];
  const savedProfile = await profile.save();
  return res.json(savedProfile);
}

async function deleteExperience(req, res) {
  const deletedExpId = req.params.exp_id;
  const profile = await Profile.findOne({ user: req.user.id });
  profile.experience = profile.experience.filter(
    exp => exp.id !== deletedExpId
  );
  const savedProfile = await profile.save();
  return res.json(savedProfile);
}

async function deleteEducation(req, res) {
  const deletedEduId = req.params.edu_id;
  const profile = await Profile.findOne({ user: req.user.id });
  profile.education = profile.education.filter(edu => edu.id !== deletedEduId);
  const savedProfile = await profile.save();
  return res.json(savedProfile);
}

async function addEducation(req, res) {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newEducation = getNewEducationFromRequest(req.body);
  const profile = await Profile.findOne({ user: req.user.id });
  profile.education = [newEducation, ...profile.education];
  const savedProfile = await profile.save();
  return res.json(savedProfile);
}

function getProfileFieldsFromRequest(reqUser, body) {
  const user = reqUser.id;
  const skills = body.skills.split(",").map(s => s.trim());
  const {
    handle,
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = body;
  const social = { youtube, twitter, facebook, linkedin, instagram };
  return {
    user,
    handle,
    company,
    website,
    location,
    bio,
    status,
    githubUsername,
    skills,
    social
  };
}

function getNewExperienceFromRequest({
  title,
  company,
  location,
  from,
  to,
  current,
  descriptoin
}) {
  return { title, company, location, from, to, current, descriptoin };
}

function getNewEducationFromRequest({
  school,
  degree,
  fieldOfStudy,
  from,
  to,
  current,
  descriptoin
}) {
  return { school, degree, fieldOfStudy, from, to, current, descriptoin };
}

module.exports = router;
