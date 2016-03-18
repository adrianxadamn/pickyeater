var request = require("request");
var _ = require('lodash');
var util = require('util');
var Wishlist = require('../models/wishlist');
var User = require('../models/user')

//Finds current user's id then finds wishlists
//that matches 'creator:' with current user's id
//and renders wishlists in JSON
function index(req, res, next) {
  User.findById({_id: req.session.passport.user}, function(err, user) {
    var id = user.id;
    Wishlist.find({ creator: id}, function(err, wishlists) {
      res.json(wishlists);
    })
  })

};
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
//requests id then finds the wishlist that matches
//with the same unique id and renders the data
//in JSON
function showAPI(req, res, next) {
  var id = req.params.id;
  Wishlist.findById(id, function(err, wishlist){
    if (err) console.log(err);
      else res.json(wishlist);
  });
};
//finds current user's id then places that id in
//a variable called user. When a user creates a
//wishlist, the wishlist will have it's property
//'creator:' set to the user's unique id. The
//wishlist is now saved onto the database.
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
//stores requested id into a variable called
//'id'
function addRestaurant(req, res, next) {
  console.log("params!", req.params.id)
  console.log("sessions!", req.session)
  var id = req.params.id;
  //Finds wishlist that matches the id retrieved.
  Wishlist.find({_id: req.params.id}, function(err, wishlist) {
    // console.log(id);
    console.log(err);
    console.log("HELLPPPP ", wishlist);

    //stores all requested information into
    //restaurant properties and then is pushed
    //into wishlist's array of restaurants
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
    //saves wishlist
    wishlist[0].save(function(err, wishlist){
      if (err) console.log(err);
      console.log('saved');
      res.json(wishlist);
    });
    console.log('wishlist');
    console.log(wishlist);
  })
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

//requests wishlist id then finds the wishlist
//that matches the unique id retrieved.
function removeRestaurant(req, res, next) {
  var id = req.params.wl_id;
  Wishlist.findById(id, function(err, wishlist) {
    if (err) res.send(err);
    //pulls restaurant's id which also pulls restaurant
    //from array
    wishlist.restaurants.pull({_id: req.params.rs_id})
    //saves wishlist after removing restaurant from
    //wishlist
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
