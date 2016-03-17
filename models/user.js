var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  googleId:   { type: String, required: true },
  name:       { type: String, required: true },
  email:      { type: String, required: true }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
