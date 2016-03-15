console.log('JS loaded!');

$( document ).ready(function() {
  var $wishlists = $('#wishlist-list');
  var $title = $('#title');

  $.ajax({
    type: 'GET',
    url: '/api/wishlists',
    success: function(wishlists) {
      $.each(wishlists, function(i, wishlist) {
        console.log(wishlist);
        $wishlists.append(`<li> ${wishlist.title} </li> <li> ${wishlist.creator} </li>` );
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
      type: 'POST',
      url: '/api/wishlists',
      data: wishlist,
      success: function(newWishlist) {
        $wishlists.append(`<li> ${wishlist.title} </li> <li> ${wishlist.creator} </li>` );
      },
      error: function(err) {
        console.log(err);
      }
    })
  })
});


