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

function show(req, res, next) {
  var id = req.params.id;
  Wishlist.findById(id, function(err, wishlist){
    if (err) console.log(err);
      else res.json(wishlist);
  });
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
