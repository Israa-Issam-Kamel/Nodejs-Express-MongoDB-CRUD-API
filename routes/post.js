const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require('../models/user');


// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.send(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a new post
router.post("/", async (req, res) => {
  try {
    // Extract user id from the request body
    const userId = req.body.author;
    
    // Find the user using the provided id
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new post using the provided user data and post data
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    });

    // Save the post to the database
    await post.save();

    // Return the post data along with the user data
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
});



// Update a post by ID
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.send(post);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
