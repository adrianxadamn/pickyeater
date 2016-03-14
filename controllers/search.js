var request = require("request");
var env = require("../config/environment");
var _ = require('lodash');
var util = require('util');
/////////REFERNCE / GUIDE / WILL FINISH SOON
// var baseUri = "https://api.yelp.com/v2/search/"

// var clientIdParam     = "?client_id="     + env.YELP_CLIENT_ID;
// var clientSecretParam = "&client_secret=" + env.YELP_CLIENT_SECRET;

// var authParams = clientIdParam + clientSecretParam

// function search(req, res, next) {
//   console.log(req.body);
//   console.log("hi")

//   // Build the entire URI from the static parts above, and the user
//   // input, encoded for URIs.
//   var uri = baseUri + authParams;
//   uri += "&near=" + encodeURIComponent(req.body.search.place);

//   console.log("Attempting to connect to: ", uri);

//   // Use request to contact the API…
//   // (note: do not call the middle argument here 'res'!!!)
//   request.get(uri, function(err, response, body) {
//     var body = JSON.parse(body);

//     // Call res.send *in the API request's callback*!
//     res.send(body.response.venues);
//   });
// }

// var Yelp = require('yelp');

// var yelp = new Yelp({
//   consumer_key: 'RLViWFOkVwhbKrfuRQdZxA',
//   consumer_secret: 'cdBzRkgNhjk33vGN2OyCwF5LHn4',
//   token: 'SYXwKPihYkjj8qC1fikmhwTOOVYghizK',
//   token_secret: '65-wVZ3xS-02U2WdPrEODsUgxy0',
// });

// // See http://www.yelp.com/developers/documentation/v2/search_api
// yelp.search({ term: 'In-n-Out', location: 'Glendale CA' })
// .then(function (data) {
//   console.log("YO WHATS UP")
//   console.log(util.inspect(data, false, null))
// })
// .catch(function (err) {
//   console.error(err);
// });


// module.exports = {
//   search: search
// };
