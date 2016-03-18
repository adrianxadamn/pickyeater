var request = require("request");
var _ = require('lodash');
var util = require('util');
var Wishlist = require('../models/wishlist');
var User = require('../models/user')

//requests id then finds the wishlist that matches
//with the same unique id retrieved and renders the data
//in HTML
function show(req, res, next) {
  var id = req.params.id;
  Wishlist.findById(id, function(err, wishlist){
    if (err) console.log(err);
      else res.render("wishlists/show", {wishlist: wishlist, user: req.user});
  });
};

//retrieves id, then finds the wishlist that
//matches with the same unique id retrieved
var listUpdate = function (req, res, next) {
  var id = req.params.id;
  Wishlist.findById(id, function(err, wishlist) {
    if (err) {
      res.send(err);
    }
    // sets the new wishlist information if it exists in the request
    if (req.body.name) wishlist.name = req.body.name;
    if (req.body.title) wishlist.title = req.body.title;
    // saves the wishlist
    wishlist.save(function(err, updatedList) {
      if (err) {
        res.send(err);
      }
      // return the wishlist
      res.json(updatedList);
    });
  });
}

//requests specific id then finds wishlist
//that matches the same unique id retrieve
//and then deletes that wishlist
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

//randomize restaurants within a wishlist
function randomRest(req, res, next){
  var id = req.params.id;
  Wishlist.find({_id: id}, function(err, wishlist) {
    var taurs = wishlist.restaurants;
    var taur = shuffleList(taurs);
    res.json(taur);
  })
};

module.exports = {
  randomRest: randomRest,
  show: show,
  destroy: destroy,
  listUpdate: listUpdate
}
