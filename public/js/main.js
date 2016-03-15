console.log('JS loaded!');

$( document ).ready(function() {
  var $wishlists = $('#wishlist-list');
  var $title = $('#title');

  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/api/wishlists',
    success: function(wishlists) {
      var wishlistTemplate1 = "<li><p>title: {{title}}</p>" + "<button data-id='{{_id}}' class='remove'>X</button></li>"
      var wishlistTemplate2 = "<li>restaurant: {{name}}</li>"

      $.each(wishlists, function(i, wishlist) {
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

});


