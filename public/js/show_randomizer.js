
$(document).ready(function(){
console.log("hi")

//Event listener for random
  $(".random-wishlist-btn").on("click", function(evt) {
    id = evt.target.value;
    console.log(id);
    console.log("random");
    getRandom(id);
  });
});

//Re-renders for another restaurant choice
$('#re-randomize').on('click', function() {
  reRandom();
})

//Template for random restaurant
var renderRandom = _.template(

  `
  <h4> <%= name %> </h4>
  <span> <%= address %> </span>
  <br>
  <span> <a href="<%= url %>">yelp info</a> </span>
  <br>
  <span> <img src="<%= picture_url %>"></span>
  <br>
  <span> <img src="<%= rating_img_url %>"></span>`
);

 $('.random-button').leanModal();
//Function for random restaurant from the wishlist
function getRandom(id) {
  console.log("whts up");
  console.log(id)

  $.ajax({
    method: 'GET',
    url: "http://localhost:3000/api/wishlists/" + id,
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

function reRandom() {
  console.log("clearing previous restaurant")
  $(".modal-content").html(""); //this clears the current pick
  getRandom(id);
}
