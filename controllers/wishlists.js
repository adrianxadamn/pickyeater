var request = require("request");
var _ = require('lodash');
var util = require('util');
var Wishlist = require('../models/wishlist');
var User = require('../models/user')

function index(req, res, next) {
  User.findById({_id: req.session.passport.user}, function(err, user) {
    var id = user.id;
    Wishlist.find({ creator: id}, function(err, wishlists) {
      res.json(wishlists);
    })
  })

};

function show(req, res, next) {
  var id = req.params.id;
  Wishlist.findById(id, function(err, wishlist){
    if (err) console.log(err);
      else res.json(wishlist);
  });
};

function post(req, res, next) {
  User.findById({_id: req.session.passport.user}, function(err, user) {
    console.log(user)
    console.log(user.name)
    console.log(user.id)
    var user = user.id;
    var wishlist = new Wishlist();
    wishlist.title = req.body.title;
    wishlist.creator = user;
    wishlist.save(function(err, savedWishlist) {
      if (err) {
        console.log(err);
      }
        res.json(wishlist);
    });
  })
};

function destroy(req, res, next) {
  Wishlist
  .findByIdAndRemove(req.params.id)
  .then(function(results) {
    res.json(results);
  })
  .catch(function(err) {
    console.log(err);
  })
};

module.exports = {
  index: index,
  post: post,
  show: show,
  destroy: destroy
}
