var mongoose = require("mongoose");

var restaurantSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  address:          { type: String, required: true },
  url:              { type: String, required: true },
  pricing:          { type: Number, required: true },
  cuisine:          { type: String, required: true },
  picture_url:      { type: String, required: true },
  diet_restriction: { type: String, required: true },
  rating:           { type: Number, required: true },
  rating_img_url:   { type: String, required: true }
});

var searchSchema = mongoose.Schema({
  place:  { type: String, required: true },
  term:   String,
  restaurant: [restaurantSchema]
});

var Search = mongoose.model("Search", searchSchema);

module.exports = Search;
