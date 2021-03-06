const Post = require("./Post");

Post.create([
  {
    title: "First post",
    text: "This is my first post",
    date: new Date(),
    tags: ["hello"]
  },
  {
    title: "Second post",
    text: "This is my second post",
    date: new Date(),
    tags: ["hello", "tech"]
  }
])

  .then(posts => {
    console.log("Created posts", posts);
  })
  .catch(error => {
    console.error(error);
  });
