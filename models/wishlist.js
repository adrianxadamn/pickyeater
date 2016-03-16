var mongoose = require('mongoose'),
    debug    = require('debug')('app:models'),


restaurantSchema = new mongoose.Schema({
  name:             { type: String },
  address:          { type: String },
  url:              { type: String },
  yelp_id:          { type: String },
  cuisine:          { type: String },
  picture_url:      { type: String },
  rating:           { type: Number },
  rating_img_url:   { type: String }
});

var wishlistSchema = new mongoose.Schema({
  restaurants:  [restaurantSchema],
  creator:      {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
                },
  title:        { type: String, required: true }
});

var Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
