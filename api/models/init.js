const mongoose = require("mongoose");

// Use the promise functionality built into Node.js
mongoose.Promise = global.Promise;

// Connect to our local database
mongoose
  .connect("mongodb://localhost/spree")
  .then(() => {
    console.log("Successfully connect to database");
  })
  .catch(error => {
    // If there was an error connect to the database
    console.error("Error connect to MongoDB databse", error);
  });

module.exports = mongoose;
