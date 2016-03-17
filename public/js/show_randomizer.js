
$(document).ready(function(){
console.log("hi")
//Event listener for random
  $(".random-wishlist-btn").on("click", function(evt) {
    reRandom();
    id = evt.target.value;
    console.log(id);
    console.log("random");
    getRandom(id);
  });
});
//Template for random restaurant
var renderRandom = _.template(
  `<li> ${name} <br> <%= address %> <br> <%= url %> <br>
  <%= picture_url %> <br> <%= rating_img_url %> </li>`
);

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
      $("#random-restaurant").append(renderRandom(chosenRestaurant));
    },
    error: function(err) {
      console.log(err);
    }
  });
};

//Re-renders for another restaurant choice
function reRandom() {
  console.log("clearing previous restaurant")
  $("#random-restaurant").html(""); //this clears the current pick
}
