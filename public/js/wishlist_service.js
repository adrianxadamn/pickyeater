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

  $(".save-wishlist-btn").on("click", function(evt) {
    openWishlistDialog(evt);
  });


  $('#add-wishlist').on('click', function() {

    var wishlist = {
      title: $title.val()
    };

    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/api/wishlists',
      data: wishlist,
      success: function(newWishlist) {
        $wishlists.append(`<li> ${newWishlist.title} </li> <li> ${newWishlist.creator} </li>` );
      },
      error: function(err) {
        console.log(err);
      }
    })
  })

  function openWishlistDialog(evt) {
    console.log("event:", evt);
    chosenRestaurant.yelp_id = $(evt.target).closest('.card').attr('id');
    chosenRestaurant.picture_url = $(evt.target).closest('.card').children().children().attr('src');
    chosenRestaurant.name = $(evt.target).parent().children().children().attr("class");


    console.log(chosenRestaurant);
    //gather data for restaurants from DOM above evt.target and put in object global variable
    //look at .parent or .closest method of jQuery / consider adding class names to the relevant elements
    // that we are trying to extract data from

    //show dialog
  }

// When you click on "Save Wishlist", modal appears

// When you click on "Save Wishlist", want to make sure that we are grabbing restaurant id"
  $('.save-wishlist-btn').on('click', function(evt){
    $('.save-wishlist-btn').leanModal();
    openWishlistDialog(evt);
  });

});

function createWishlistDialog() {
  var wishlistTemplate1 = $('#wishlistTemplate1').html();
  var wishlistTemplate2 = $('#wishlistTemplate2').html();
  var modalWishlistTemplate = $('#modalWishlistTemplate').html();
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

  $wishlists.delegate('.remove', 'click', function (){
 var $li = $(this).closest('li');
 $.ajax({
    method: 'DELETE',
    url: 'http://localhost:3000/wishlists/' + $(this).attr('data-id'),
    success: function (){
      $li.remove();
    }
});
 });

  $wishlists.delegate('.editList', 'click', function() {
    var $li = $(this).closest('li');
    $li.find('input.name').val($li.find('span.name').html() );
    $li.find('input.title').val($li.find('span.title').html() );
    $li.addClass('edit');
  });


   $wishlists.delegate('.cancelList', 'click', function() {
   $(this).closest('li').removeClass('edit');
  });

   $wishlists.delegate('.saveEdit', 'click', function() {
    var $li = $(this).closest('li');
    var wishlist = {
    name : $li.find('input.name').val(),
    title : $li.find('input.title').val()
   };

  $.ajax({
      method: 'PUT',
      url: 'http://localhost:3000/wishlists/' + $li.attr('data-id'),
      data: wishlist,
      success: function(newWishlist) {
        // addWishlist(newWishlist);
        $li.find("span.name").html(wishlist.name)
        $li.find("span.title").html(wishlist.title)
        $li.removeClass('edit');
      },
      error: function(err) {
        console.log('err updating wishlist',err);
      }

    })
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



