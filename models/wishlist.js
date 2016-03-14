var mongoose = require('mongoose'),
    debug    = require('debug')('app:models'),


restaurantSchema = new mongoose.Schema({
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
