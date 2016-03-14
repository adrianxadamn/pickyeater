var mongoose = require('./database');

var User = require('../models/user');
var Wishlist = require('../models/wishlist');

User.remove({}, function(err, users) {
  Wishlist.remove({}, function(err, users) {
    User.create(
      [
        { // 0
          name:   "Bob Neverdunk",
          googleId: "abc123",
          googleImage: "myprofilepic.img",
          email: "bob@email.com"
        },
        { // 1
          name:   "Margaret Kalanchoe",
          googleId: "xyz123",
          googleImage: "myprofilepic.png",
          email: "marg@email.com"
        }
      ], function(err, users) {
        if (err) {
          console.log(err);
        } else {
          console.log(users[0].name);
          Wishlist.create([
            {title: "List1", creator: users[0]},
            {title: "List2", creator: users[0]},
            {title: "List3", creator: users[1]}
          ],
         function(err, wishlists) {
            wishlists[0].restaurants.push({name: "Claws", address:"df", url: "dfs", pricing: 2, cuisine: "Seafood", picture_url: "dfa", diet_restriction: "df", rating: 2, rating_img_url: "dfd"});
            console.log(wishlists[0]);
            if (err) {
              console.log(err);
            } else {
              console.log(wishlists);
            }
          });
        }
    });
  });
});


