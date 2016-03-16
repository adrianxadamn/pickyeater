console.log("wishlist_service connected");


var $wishlists;
var $title;
var $modalWishlists;
var $addWishlist;

$( document ).ready(function() {
  $wishlists = $('#wishlist-list');
  $title = $('#title');
  $modalWishlists = $('#modal-lists');
  $addWishlist = $('#addWishlist');


    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/api/wishlists',
      success: function(wishlists) {
        var wishlistTemplate1 = "<li><p>title: {{title}}</p>" + "<button data-id='{{_id}}' class='remove'>X</button></li>"
        var wishlistTemplate2 = "<li>restaurant: {{name}}</li>"
        var modalWishlistTemplate = "<p><input name='{{title}}' type='radio' id='{{_id}}'/><label for='{{_id}}'>{{title}}</label></p>"

        $.each(wishlists, function(i, wishlist) {
          $wishlists.append(Mustache.render(wishlistTemplate1, wishlist));
          $modalWishlists.append(Mustache.render(modalWishlistTemplate, wishlist));
          for(var j = 0; j < wishlist.restaurants.length; j++){
            console.log(wishlist);
            console.log(wishlist._id);
            $wishlists.append(Mustache.render(wishlistTemplate2, wishlist.restaurants[j]))
          }
        });
      },
      error: function(err) {
        console.log(err);
      }
    });

});
