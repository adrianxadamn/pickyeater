//Template for random restaurant
var renderRandom = _.template(
  `<li> ${name} <br> ${address} <br> ${url} <br>
  ${picture_url} <br> ${rating} <br> ${rating_img_url} </li>`
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
      chosenRestaurant = (Math.floor(Math.random() * wishlist.restaurants.length));
      console.log(chosenRestaurant);
      console.log(wishlist.restaurants[chosenRestaurant]);

    },
    error: function(err) {
      console.log(err);
    }

  })
}

//Re-renders for another restaurant choice
// function reRandom() {
//   ${".re-randomize"}.html(); //this clears the current pick
//   ${".re-randomize"}.append(renderRandom); //this re-renders
// }
$(document).ready(function(){

//Event listener for random
  $(".random-wishlist-btn").on("click", function(evt) {
    id = evt.target.value;
    console.log(id);
    console.log("random");
    getRandom(id);
  });
});
//Event listener for re-random
// $(".data-re-render-btn").on("click", function(evt) {
//   console.log("random");
//   reRandom();
//   getRandom(restaurant);
// });
