console.log('JS loaded!');

$( document ).ready(function() {
  var $wishlists = $('#wishlist-list');
  var $title = $('#title');

  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/api/wishlists',
    success: function(wishlists) {
      $.each(wishlists, function(i, wishlist) {
        $wishlists.append(`<li class="collection-header"> ${wishlist.title} </li>`)
        for(var j = 0; j < wishlist.restaurants.length; j++){
          console.log(wishlist);
          console.log(wishlist._id);
           $wishlists.append(`<li class="collection-item"> ${wishlist.restaurants[j].name} </li>` );
        }
      });
    },
    error: function(err) {
      console.log(err);
    }
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
});


