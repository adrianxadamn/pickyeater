//Template for random restaurant
var renderRandom = _.template(
  `<li> ${name} <br> ${address} <br> ${url} <br>
  ${picture_url} <br> ${rating} <br> ${rating_img_url} </li>`
)
//function for random restaurant from the wishlist
function getRandom(id) {
  $.get("/api/wishlists/" + id + "/random")
  .then(
    function(restaurant) {
      console.log(restaurant);
      return renderRandom(restaurant);
    },
    function(err) {
      console.log(err);
  })
}

//re-random if user wants to choose again
//use appropriate div/id from show.ejs
${".div"}.html(); //this clears the current pick
${".div"}.append(renderRandom);

//event listener for random
// $(".random-wishlist-btn").on("click", function(evt) {
//     getRandom();
//   });
