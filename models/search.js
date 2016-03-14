var mongoose = require("mongoose");

var searchSchema = mongoose.Schema({
  place:  { type: String, required: true },
  term:   String,
  restaurant: [restaurantSchema]
});

var Search = mongoose.model("Search", searchSchema);

module.exports = Search;
