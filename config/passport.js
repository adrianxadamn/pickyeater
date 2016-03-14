//CJS ADD
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/user');


passport.use(new GoogleStrategy({
    clientID: process.env.clientId,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.baseSite
  },
//please work for D. Jim said I could do this on Master. He swore in blood.

  function(accessToken, refreshToken, profile, cb) {

    User.findOne({ 'googleId': profile.id }, function(err, user) {
      if (err) return cb(err);
      if (user) {
          console.log("welcome back!!!")
        return cb(null, user);
      } else {

        // we have a new user via OAuth!
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });

        console.log(newUser);
        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
