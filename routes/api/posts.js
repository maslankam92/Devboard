const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

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

/*
* @route POST api/posts/like/:id
* @description Likes post
* @access Private
*/
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  likePost
);

/*
* @route POST api/posts/comment/:id
* @description Creates comment
* @access Private
*/
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  createComment
);

/*
* @route DELETE api/posts/comment/:id/:comment_id
* @description Deletes comment
* @access Private
*/
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  deleteComment
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
  let errors = {};
  const deletedPost = await Post.findById(req.params.id);

  // Only owner can delete his post
  if (deletedPost.user.toString() !== req.user.id) {
    errors.notauthorized = "User is not authorized to delete this post";
    return res.status(401).json(errors);
  }
  const postRemoved = await deletedPost.remove();
  return res.json(postRemoved);
}

async function likePost(req, res) {
  const userId = req.user.id;

  const likedPost = await Post.findById(req.params.id);
  const isLikedByUser = likedPost.likes.includes(req.user.id);

  // if post is already liked by user, remove like, otherwise, add like
  if (isLikedByUser) {
    likedPost.likes = likedPost.likes.filter(like => like !== userId);
  } else {
    likedPost.likes = [userId, ...likedPost.likes];
  }
  const like = await likedPost.save();
  return res.json(like);
}

async function createComment(req, res) {
  const { isValid, errors } = validateCommentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const commentedPost = await Post.findById(req.params.id);
  const newComment = {
    text: req.body.text,
    user: req.user.id
  };

  commentedPost.comments = [newComment, ...commentedPost.comments];
  const post = await commentedPost.save();
  return res.json(post);
}

async function deleteComment(req, res) {
  const { id: postId, comment_id: commentId } = req.params;
  const post = await Post.findById(postId);
  post.comments = post.comments.filter(comment => comment.id !== commentId);
  const updatedPost = await post.save();
  return res.json(updatedPost);
}

module.exports = router;
