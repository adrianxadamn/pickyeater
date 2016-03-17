console.log('JS loaded!');

var $wishlists;
var $title;
var $modalWishlists;
var $addWishlist;
var $li;

$( document ).ready(function() {
  $wishlists = $('#wishlist-list');
  $title = $('#title');
  $modalWishlists = $('#modal-lists');
  $addWishlist = $('#addWishlist');

  function addStaurants() {

    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/api/wishlists',
      success: function(wishlists) {
        var wishlistTemplate1 = $('#wishlistTemplate1').html();
        var wishlistTemplate2 = $('#wishlistTemplate2').html();
        var modalWishlistTemplate = $('#modalWishlistTemplate').html();

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
  }

//event listeners

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

//carousel:
$('.slider').slider({full_width: true});

//this doesn't work!
$addWishlist.on('click', function() {
  var $card = $('#card');
  var $cardText = $('#card').text()
  $wishlists.push($cardText)
  })
});


