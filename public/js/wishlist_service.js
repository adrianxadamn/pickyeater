console.log("wishlist_service connected");

var $wishlists;
var $title;
var $modalWishlists;
var $addWishlist;
 //gather data for restaurants from DOM above evt.target and put in object global variable
  //look at .parent or .closest method of jQuery / consider adding class names to the relevant elements
    // that we are trying to extract data from

$( document ).ready(function() {
  $wishlists = $('#wishlist-list');
  $title = $('#title');
  $modalWishlists = $('#modal-lists');
  $addWishlist = $('#addWishlist');

  createWishlistDialog();

  function openWishlistDialog(evt) {
    console.log("event:", evt);
    var chosenRestaurant = $(evt.target).closest('.card').attr('id');

    console.log(chosenRestaurant);
    //gather data for restaurants from DOM above evt.target and put in object global variable
    //look at .parent or .closest method of jQuery / consider adding class names to the relevant elements
    // that we are trying to extract data from

    //show dialog
  }

// When you click on "Save Wishlist", modal appears
  $('.save-wishlist-btn').leanModal();

// When you click on "Save Wishlist", want to make sure that we are grabbing restaurant id"
  $('.save-wishlist-btn').on('click', function(evt){
    openWishlistDialog(evt);
  });

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

function addRestaurantToWishlist(evt) {
  console.log("adding restaurants to wishlist");
  //perform ajax PUT to /api/wishlists/:id including data from the object global variable

  //in callback, do redirect to using (window.location)
}


// var $card = $('#card');
// var $cardText = $('#card').text();
// $wishlists.push($cardText);



