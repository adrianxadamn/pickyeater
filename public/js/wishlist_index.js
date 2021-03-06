var $wishlists;
var $title;
var $modalWishlists;
var $addWishlist;

$( document ).ready(function() {

  var $wishlists      = $('#wishlist-list'),
      $title          = $('#title'),
      $modalWishlists = $('#modal-lists'),
      $addWishlist    = $('#addWishlist');

  showWishlists();

  function showWishlists() {
    var wishlistTemplate1     = $('#wishlistTemplate1').html(),
      wishlistTemplate2     = $('#wishlistTemplate2').html(),
      modalWishlistTemplate = $('#modalWishlistTemplate').html();

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

    //Create new wishlist
    //////////////////////
    //////////////////////
    $('#add-wishlist').on('click', function() {
      var wishlist = {
        title: $title.val()
      };
      $.ajax({
        method: 'POST',
        url: '/api/wishlists',
        data: wishlist,
        success: function(newWishlist) {
          $wishlists.append(Mustache.render(wishlistTemplate1, newWishlist));
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
        url: '/wishlists/' + $(this).attr('data-id'),
        success: function (wishlist){
          $li.remove();
          window.location.reload()
        }
      });
    });

    $('.grab-me').on('click', '.remove-rs', function () {
    var $li = $(this).closest('li');
    console.log("wl_id", $('h1').attr('id') )
    console.log("rs_id", $(this).attr('data-id') )
    $.ajax({
          method: 'DELETE',
          url: '/api/wishlists/' + $('h1').attr('id') + '/restaurants/' + $(this).attr('data-id'),
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
        url: '/wishlists/' + $li.attr('data-id'),
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
  };
});
