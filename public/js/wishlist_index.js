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


  //Create new wishlist
  //////////////////////
  //////////////////////

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
  });

  //Remove wishlist:
  //////////////////////
  //////////////////////

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

  //Edit wishlist:
  //////////////////////
  //////////////////////

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


});
