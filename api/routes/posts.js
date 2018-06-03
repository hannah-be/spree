const express = require("express");
const Post = require("../models/Post");
const authMiddleWare = require("../middleware/auth");

const router = new express.Router();

router.get("/posts", (req, res) => {
  Post.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
    });
});

module.exports = router;
