const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");

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
  const profile = await Profile.findOne({ user: profileFields.user.id });
  if (profile) {
    // Update profile
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: profileFields.user.id },
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

function getProfileFieldsFromRequest(reqUser, body) {
  const user = reqUser.id;
  const skills = body.skills.split(",");
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

module.exports = router;
