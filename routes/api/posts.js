const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");

/*
* @route POST api/posts
* @description Creates post
* @access Private
*/
router.post("/", passport.authenticate("jwt", { session: false }), createPost);

async function createPost(req, res) {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    user: req.user.id,
    text: req.body.text
  });

  const savedPost = await newPost.save();
  return res.json(savedPost);
}

module.exports = router;
