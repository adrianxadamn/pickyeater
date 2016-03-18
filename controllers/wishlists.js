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
      else res.render("wishlists/show", {wishlist: wishlist, user: req.user});
  });
};

function showAPI(req, res, next) {
  var id = req.params.id;
  Wishlist.findById(id, function(err, wishlist){
    if (err) console.log(err);
      else res.json(wishlist);
  });
};

function post(req, res, next) {
  User.findById({_id: req.session.passport.user}, function(err, user) {
    console.log(user)
    console.log("user:", user.name)
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

var listUpdate= function (req, res, next) {
var id = req.params.id;

  Wishlist.findById(id, function(err, wishlist) {

    if (err) {
      res.send(err);
    }

    // set the new wishlist information if it exists in the request
    if (req.body.name) wishlist.name = req.body.name;
    if (req.body.title) wishlist.title = req.body.title;

    // save the wishlist
    wishlist.save(function(err, updatedList) {
      if (err) {
        res.send(err);
      }
      // log a message
      console.log("Oh, that's the list!");
      // return the wishlist
      res.json(updatedList);
    });
  });
}

function addRestaurant(req, res, next) {
  console.log("params!", req.params.id)
  console.log("sessions!", req.session)
  var id = req.params.id;
  Wishlist.find({_id: req.params.id}, function(err, wishlist) {
    // console.log(id);
    console.log(err);
    console.log("HELLPPPP ", wishlist);


    wishlist[0].restaurants.push({
      name:           req.body.name,
      address:        req.body.address,
      url:            req.body.url,
      yelp_id:        req.body.yelp_id,
      cuisine:        req.body.cuisine,
      picture_url:    req.body.picture_url,
      rating:         req.body.rating,
      rating_img_url: req.body.rating_img_url
    });

    wishlist[0].save(function(err, wishlist){
      if (err) console.log(err);
      console.log('saved');
      res.json(wishlist);
    });
    console.log('wishlist');
    console.log(wishlist);
  })
}

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

// randomizer function
  // this is hoisted:
function shuffleList(restaurants) {
  return restaurants[(Math.floor(Math.random() * restaurants.length))];
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

function removeRestaurant(req, res, next) {
  var id = req.params.wl_id;
  Wishlist.findById(id, function(err, wishlist) {
    if (err) res.send(err);

    wishlist.restaurants.pull({_id: req.params.rs_id})
    wishlist.save(function(err, wishlist){
      if (err) res.send(err);

      res.json(wishlist);
    });
  });
};

module.exports = {
  index: index,
  post: post,
  show: show,
  destroy: destroy,
  addRestaurant: addRestaurant,
  listUpdate: listUpdate,
  randomRest: randomRest,
  removeRestaurant: removeRestaurant,
  showAPI: showAPI
}
