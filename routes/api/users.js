const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
/*
* @route GET api/users/test
* @description Tests users route
* @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "users works" }));

/*
* @route GET api/users/register
* @description Register user
* @access Public
*/
router.post("/register", async (req, res) => {
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

  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});
module.exports = router;
