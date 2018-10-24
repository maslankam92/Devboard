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

/*
* @route GET api/posts
* @description Gets all posts
* @access Public
*/
router.get("/", getAllPosts);

/*
* @route GET api/posts/:id
* @description Gets one post
* @access Public
*/
router.get("/:id", getPost);

/*
* @route DELETE api/posts/:id
* @description Deltes post
* @access Public
*/
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

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

async function getAllPosts(req, res) {
  const posts = await Post.find({}).sort({ date: -1 });
  return res.json(posts);
}

async function getPost(req, res) {
  const post = await Post.findById(req.params.id);
  return res.json(post);
}

async function deletePost(req, res) {
  const deletedPost = await Post.findById(req.params.id);

  // Only owner can delete his post
  if (deletedPost.user.toString() !== req.user.id) {
    return res
      .status(401)
      .json({ notauthorized: "User is not authorized to delete this post" });
  }
  const postRemoved = await deletedPost.remove();
  return res.json(postRemoved);
}

module.exports = router;
