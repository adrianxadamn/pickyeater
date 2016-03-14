var request = require("request");
var env = require("../config/environment");
var _ = require('lodash');
var util = require('util');

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'RLViWFOkVwhbKrfuRQdZxA',
  consumer_secret: 'cdBzRkgNhjk33vGN2OyCwF5LHn4',
  token: 'SYXwKPihYkjj8qC1fikmhwTOOVYghizK',
  token_secret: '65-wVZ3xS-02U2WdPrEODsUgxy0',
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
    res.json(data);
  });
};

module.exports = {
  search: search
};

