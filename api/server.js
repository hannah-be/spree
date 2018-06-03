const express = require("express");
const bodyParser = require("body-parser");

const server = express();

// Middleware Plugins
server.use(bodyParser.json());

// Routes
server.use([require("./routes/posts")]);

// Start the server
server.listen(7000, error => {
  if (error) {
    console.error("Error starting", error);
  } else {
    console.log("Server started at http://localhost:7000/");
  }
});
