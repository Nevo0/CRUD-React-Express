const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const posts = require("../../Posts");

// Get all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// Get single post
router.get("/:id", (req, res) => {
  const found = posts.some(post => post.id === parseInt(req.params.id));
  if (found) {
    res.json(posts.filter(post => post.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No post with the id of ${req.params.id}` });
  }
});

// Create post
router.post("/", (req, res) => {
  const newPost = {
    id: uuid.v4(),
    post_title: req.body.post_title,
    post_content: req.body.post_content,
    post_status: req.body.post_status,
    post_autor: req.body.post_autor,
    post_date: req.body.post_date
  };

  if (!newPost.post_title || !newPost.post_content) {
    return res.status(400).json({ msg: "Please include a title and content" });
  }

  posts.push(newPost);
  res.json(posts);
});

// Update Post
router.put("/:id", (req, res, next) => {
  const found = posts.some(post => post.id === parseInt(req.params.id));
  if (found) {
    const updatePost = req.body;
    // console.log(updatePost.post_autor);
    posts.forEach(post => {
      if (post.id === parseInt(req.params.id)) {
        post.post_title = updatePost.post_title
          ? updatePost.post_title
          : post_title;
        post.post_content = updatePost.post_content
          ? updatePost.post_content
          : post_content;
        post.post_status = updatePost.post_status
          ? updatePost.post_status
          : post_status;
        post.post_autor = updatePost.post_autor
          ? updatePost.post_autor
          : post_autor;
        post.post_date = updatePost.post_date
          ? updatePost.post_date
          : post_date;

        res.json({ msg: " Post updated", post });
        console.log(post);
      }
    });
  } else {
    res.status(400).json({ msg: `No post with the id of ${req.params.id}` });
  }
});

// Delete post
router.delete("/:id", (req, res) => {
  const found = posts.some(post => post.id == parseInt(req.params.id));
  console.log(req.params.id);
  posts.map(post => console.log(post.id));
  console.log(found);

  //   console.log(found);
  if (found) {
    res.json(posts.filter(post => post.id !== parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No post with the id of ${req.params.id}` });
  }
});

module.exports = router;
