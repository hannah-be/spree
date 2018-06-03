const mongoose = require("./init");

const Post = mongoose.model("Post", {
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  text: {
    type: String,
    required: [true, "Text is required"]
  },
  date: {
    type: Date
  },
  tags: {
    type: String,
    required: [true, "At least one tag is required"]
  }
});

module.exports = Post;
