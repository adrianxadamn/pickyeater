
$(document).ready(function(){

///////////EVENT LISTENER TO RANDOMIZE//////////////
  $(".random-wishlist-btn").on("click", function(evt) {
    id = evt.target.value;
    console.log(id);
    console.log("random");
    getRandom(id);
  });
});

///////////RANDOMIZES AGAIN IF YOU WANT TO CHOOSE ANOTHER RESTAURANT///////////
$('#re-randomize').on('click', function() {
  reRandom();
})

///////////TEMPLATE FOR RANDOM RESTAURANT///////////
var renderRandom = _.template(
  `
  <h4> <%= name %> </h4>
  <span> <%= address %> </span>
  <br>
  <span> <a href="<%= url %>">yelp info</a> </span>
  <br>
  <span> <img src="<%= picture_url %>"></span>
  <br>
  <span> <img src="<%= rating_img_url %>"></span>
  `
);

///////////ACTIVATE MODAL WHEN CLICK ON RANDOMIZE///////////
$('.random-button').leanModal();

///////////FUNCTION TO GET RANDOM RESTAURANT FROM WISHLIST///////////
function getRandom(id) {
  $.ajax({
    method: 'GET',
    url: "/api/wishlists/" + id,
    success: function(wishlist) {
      console.log(wishlist);
      randomRestaurant = (Math.floor(Math.random() * wishlist.restaurants.length));
      console.log(randomRestaurant);
      console.log(wishlist.restaurants[randomRestaurant]);
      var chosenRestaurant = wishlist.restaurants[randomRestaurant];
      $(".modal-content").append(renderRandom(chosenRestaurant));
    },
    error: function(err) {
      console.log(err);
    }
  });
};

///////////FUNCTION TO RE-RANDOMIZE///////////
function reRandom() {
  console.log("clearing previous restaurant")
  $(".modal-content").html(""); //this clears the current pick
  getRandom(id);
}
