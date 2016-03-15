var request = require("request");
var _ = require('lodash');
var util = require('util');
var Wishlist = require('../models/wishlist');
var User = require('../models/user')

function index(req, res, next) {
  Wishlist.find({})
  .then(
    function(wishlists) {
      res.json(wishlists);
    },
    function(err) {
      console.log(err);
    }
  );
};

function post(req, res, next) {
  var wishlist = new Wishlist();
  console.log(user)
  wishlist.title = req.body.title;
  wishlist.save(function(err, savedWishlist) {
    if (err) {
      console.log(err);
    }
      res.json(wishlist);
  });
};

module.exports = {
  index: index,
  post: post
}
