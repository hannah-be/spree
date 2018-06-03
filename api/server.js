const express = require("express");
const bodyParser = require("body-parser");
const authMiddleWare = require("./middleware/auth");

const server = express();

// Middleware Plugins
server.use(bodyParser.json());
server.use(authMiddleWare.initialize); // Kick passport off

// Routes
// server.use([require("./routes/posts")]);
server.use("/", [require("./routes/posts"), require("./routes/auth")]);

// Start the server
server.listen(7000, error => {
  if (error) {
    console.error("Error starting", error);
  } else {
    console.log("Server started at http://localhost:7000/");
  }
});
