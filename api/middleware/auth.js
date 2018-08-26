const passport = require("passport");
const JWT = require("jsonwebtoken");
const PassportJwt = require("passport-jwt");
const User = require("../models/User");

require("dotenv").config({ path: "./.env" });
const jwtAlgorithm = "HS256";
const jwtExpiresIn = "7 days";
const jwtSecret = process.env.jwtSecret;

passport.use(User.createStrategy());

function register(req, res, next) {
  // Create a fresh user model using the submitted data
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName
  });
  // Create the user with the specified password
  // .register method made available from the passportLocalMongoose plugin
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Our register middleware failed
      next(error);
      return;
    }
    // modify the request to add the newly registered user object
    req.user = user;
    next();
  });
}

passport.use(
  new PassportJwt.Strategy(
    // Options
    {
      // Where will the JWT be passed in the HTTP request?
      // e.g. Authorization: Bearer eyJhbGc…
      jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      // What is the secret
      secretOrKey: jwtSecret,
      // What algorithm(s) was used to sign it?
      algorithms: [jwtAlgorithm]
    },
    // When we have a verified token
    (payload, done) => {
      // Find the real user from our database using the `id` in the JWT
      User.findById(payload.sub)
        .then(user => {
          // If user was found with this id
          if (user) {
            done(null, user);
          }
          // If not user was found
          else {
            done(null, false);
          }
        })
        .catch(error => {
          // If there was a failure
          done(error, false);
        });
    }
  )
);

function signJWTForUser(req, res) {
  // Get the user (either just signed in or signed up)
  const user = req.user;
  // Create a signed token
  const token = JWT.sign(
    // Payload
    {
      email: user.email
    },
    // Secret
    jwtSecret,
    // Options
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  );
  // Send the token
  res.json({ token });
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate("local", { session: true }),
  requireJWT: passport.authenticate("jwt", { session: false }),
  signJWTForUser
};
