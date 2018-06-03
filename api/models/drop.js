const Post = require("./Post");

Post.deleteMany().then(() => {
  console.log("deleted all posts");
  process.exit();
});
