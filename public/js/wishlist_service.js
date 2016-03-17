console.log("wishlist_service connected");

var $wishlists;
var $title;
var $modalWishlists;
var $addWishlist;
var chosenRestaurant = {};
 //gather data for restaurants from DOM above evt.target and put in object global variable
  //look at .parent or .closest method of jQuery / consider adding class names to the relevant elements
    // that we are trying to extract data from

$( document ).ready(function() {
  $wishlists = $('#wishlist-list');
  $title = $('#title');
  $modalWishlists = $('#modal-lists');
  $addWishlist = $('#addWishlist');

  createWishlistDialog();
  $addWishlist.on('click', addRestaurantToWishlist);

  $(".save-wishlist-btn").on("click", function(evt) {
    openWishlistDialog(evt);
  });


  $('#add-wishlist').on('click', function() {

    var wishlist = {
      title: $title.val()
    };

    $.ajax({
      method: 'POST',
      url: '/api/wishlists',
      data: wishlist,
      success: function(newWishlist) {
        $wishlists.append(`<li> ${newWishlist.title} </li> <li> ${newWishlist.creator} </li>` );
      },
      error: function(err) {
        console.log(err);
      }
    });
  });

  function openWishlistDialog(evt) {
    console.log("event:", evt);
    chosenRestaurant.yelp_id = $(evt.target).closest('.card').attr('id');
    chosenRestaurant.picture_url = $(evt.target).closest('.card').children().children().attr('src');
    chosenRestaurant.name = $(evt.target).parent().children().children().attr("class");
    chosenRestaurant.address = $(evt.target).prev().attr('class');
    chosenRestaurant.rating_img_url = $(evt.target).prev().prev().attr('class');
    chosenRestaurant.cuisine = $(evt.target).prev().prev().prev().attr('class');
    chosenRestaurant.url = $(evt.target).prev().prev().prev().prev().attr('id');

    console.log("the url: ", chosenRestaurant.url);
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

//Get all wishlists:
//////////////////////
//////////////////////

function createWishlistDialog() {
  var wishlistTemplate1 = '<li><p>title: {{title}}</p>' + '<button data-id="{{_id}}" class="remove">X</button></li>'
   var wishlistTemplate2 = '<li>restaurant: {{name}}</li>'
   var modalWishlistTemplate =
   '<p><input name="title" type="radio" value="{{_id}}" id="{{_id}}" /><label for="{{_id}}">{{title}}</label></p>'
  $.ajax({
    method: 'GET',
    url: '/api/wishlists',
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
};



//Add Restaurant to Wishlist:
function addRestaurantToWishlist(evt) {
  console.log("adding restaurants to wishlist");
  //perform ajax PUT to /api/wishlists/:id including data from the object global variable
  var chosenWishlist = $("input[name=title]:checked").val();
  console.log("wishlist: ", chosenWishlist);
  console.log(chosenRestaurant);

  $.ajax({
    method: 'PUT',
    url: '/api/wishlists/' + chosenWishlist,
    data: chosenRestaurant,
    success: function(wishlist) {
      wishlist.restaurants.push(chosenRestaurant);
      Materialize.toast(`Added To ${wishlist.title}`);
      console.log(wishlist)
      // wishlist.save(function(err, wishlist) {
      //   if (err) console.log(err);
      //   console.log(wishlist);
      // });
    }
  });
};




