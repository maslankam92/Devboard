const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../config/keys");

const opts = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secret
};

function configPassport(passport) {
  passport.use(new JwtStrategy(opts, authenticateUser));
}

async function authenticateUser(jwt_payload, done) {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    console.log(err);
  }
}

module.exports = configPassport;
