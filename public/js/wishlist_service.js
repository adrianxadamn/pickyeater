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

  createWishlistDialog();

  $(".save-wishlist-btn").on("click", function(evt) {
    openWishlistDialog(evt);
  });


  // $('#add-wishlist').on('click', function() {

  //   var wishlist = {
  //     title: $title.val()
  //   };

  //   $.ajax({
  //     method: 'POST',
  //     url: 'http://localhost:3000/api/wishlists',
  //     data: wishlist,
  //     success: function(newWishlist) {
  //       $wishlists.append(`<li> ${newWishlist.title} </li> <li> ${newWishlist.creator} </li>` );
  //     },
  //     error: function(err) {
  //       console.log(err);
  //     }
  //   })
  // })


  $('.modal-trigger').leanModal();

  //this doesn't work!


});

function createWishlistDialog() {
  var wishlistTemplate1 = '<li><p>title: {{title}}</p>' + '<button data-id="{{_id}}" class="remove">X</button></li>'
  var wishlistTemplate2 = '<li>restaurant: {{name}}</li>'
  var modalWishlistTemplate = '<p><input name="title" type="radio" id="{{_id}}"/><label for="{{_id}}">{{title}}</label></p>'

  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/api/wishlists',
    success: function(wishlists) {

      wishlists.forEach(function(wishlist, i) {
        //used on search_results.ejs
        $modalWishlists.append(Mustache.render(modalWishlistTemplate, wishlist));

        //used on wishlist.ejs
        $wishlists.append(Mustache.render(wishlistTemplate1, wishlist));
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

  $addWishlist.on('click', function() {
    addRestaurantToWishlist();
  });
}

function addRestaurantToWishlist() {
  console.log("adding restaurants to wishlist");
  //perform ajax POST to /api/wishlists/:id including data from the object global variable

  //in callback, do redirect to using (window.location)
}

function openWishlistDialog(evt) {
  console.log("event:", evt);
  //gather data for restaurants from DOM above evt.target and put in object global variable
  //look at .parent or .closest method of jQuery / consider adding class names to the relevant elements
    // that we are trying to extract data from

  //show dialog
}
// var $card = $('#card');
// var $cardText = $('#card').text();
// $wishlists.push($cardText);



