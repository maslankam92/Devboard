const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const keys = require("../../config/keys");

/*
* @route GET api/users/register
* @description Register user
* @access Public
*/
router.post("/register", registerUser);

/*
* @route GET api/users/login
* @description Login user - returning JWT Token
* @access Public
*/
router.post("/login", getJWTToken);

/*
* @route GET api/users/current
* @description Returns current user
* @access Private
*/
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  // if user with given email already exists in db return 400
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ email: "Email already exists" });
  }
  const avatar = gravatar.url(email, {
    s: "200", // size
    r: "pg", // rating
    d: "mm" // default
  });
  const newUser = new User({
    name,
    email,
    avatar,
    password
  });
  const SALT_ROUNDS = 10;
  newUser.password = await bcrypt.hash(newUser.password, SALT_ROUNDS);

  try {
    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (err) {
    console.log(err);
  }
}

async function getJWTToken(req, res) {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ email: "User not found" });

  // Check given password vs encrypted password
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // User matched
    const { id, name, avatar } = user;
    const jwtToken = await jwt.sign({ id, name, avatar }, keys.secret, {
      expiresIn: 3600
    });
    return res.json({ success: true, token: `Bearer ${jwtToken}` });
  } else {
    return res.status(400).json({ password: "Password incorrect" });
  }
}

async function getCurrentUser(req, res) {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
}

module.exports = router;
