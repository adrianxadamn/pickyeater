var request = require("request");
var env = require("../config/environment");
var _ = require('lodash');
var util = require('util');

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token: process.env.token,
  token_secret: process.env.token_secret
});



function search(req, res, next) {
  console.log("hi from search function");
  console.log(req.body);
  var location = req.body.search.place;
  var limit = parseInt(req.body.search.limit);
  var category = req.body.search.category.toLowerCase();

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({ term: "food", location: location, limit: limit, category_filter: category }, function(error, data) {
    if (error) res.json({message: error});
    console.log(util.inspect(data, false, null));
    var businesses = data.businesses;
    var temp = {};
    var results = [];
    businesses.forEach(function(el) {
      temp.name             =  el.name
      temp.address          =  el.location.display_address
      temp.url              =  el.url
      temp.picture_url      =  el.image_url
      temp.rating           =  el.rating
      temp.rating_img_url   =  el.rating_img_url
      temp.cuisine          =  [];
      el.categories.forEach(function(e) {
        temp.cuisine.push(e[0]);
      })
      results.push(temp);
    })
    res.json(results);

  });
};



module.exports = {
  search: search
};

