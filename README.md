!["has this ever happened to you?"](https://i.imgur.com/jBpYiwX.jpg)

# -Where should we eat??
# -_I dunno. Where do you want to eat?_
# -I dunno.
# -_You pick._
# -No. I did last time. You pick.


##(...continues ad finitum...)
![#23 crying](https://i.imgur.com/q767fPH.jpg)


###Have you ever had the conversation captured above? Rest assured there is a nation of millions who have struggled with the same dilemma, night after night. But don't fear- the answer to all of your dining decision woes is here.

![Picky Eater logo](https://i.imgur.com/Z3CYOSZ.png)
###takes the decision of where to eat out of your hands and into the hands of this trusty and easy-to-use application. 

Our app helps you keep track of the restaurants you love, those you would love to try, and those that come recommended by friends and family all in one place. No more forgetting what the name of that amazing Korean BBQ place is- you have it all saved on picky eater! Take advantage of all of the up-to-date restaurant information and details available on Yelp without the hassle of having to interact with the unappealing user interface of Yelp. 

If you are feeling especially indecisive, use the 
:tada: :tada: :tada: **randomizer function** :tada: :tada: :tada:
which will make the decision where to eat for you!!

#Let us make your life easier. You deserve it.

![life is hard for the kitty with a visor on](http://i.giphy.com/COZtHnD6Anijm.gif)

#Our Roles:

**Demetra Haloutsos**: Assistant to the Presentation Manager, Documentarian, Brand Manager, and the most Beautiful  
**Dave Niederhauser**: Presentation Manager, CRUD Master, Accent Expert, and Foreign Affairs (he has affairs in foreign lands)  
**Claire Savage**: Scrum Master, README Creator, Joker, and All-Around Silly Billy  
**Jerry Ngov**: UX/Design Manager, Student-Teacher Pro, Best Trail Mix-Maker, and Lakewood Enthusiast  
**Adrian Nyuda**:  GitHub Manager, Problem Solver, Best Looking in Shorts, and Gentleist Voice  

#Our Process:

We started by thinking of a universal struggle- how to pick where to eat. This is particularly hard when you've entered "hangry" territory. We wanted to address this problem by taking the decision out of our user's hands and making this a no-brainer. We decided on a two-model structure consisting of users and wishlists. Within the wishlist model we included a restaurant schema, of which a wishlist will contain many.

![picky eater models](https://i.imgur.com/wbwMyCD.png)

#Our Design:

Our head of User Look & Feel, Jerry Ngov, came up with these wireframes. They capture a seamless user interface, to deal with the pickiest of eaters.

![wirefram design](https://i.imgur.com/oLJKHyH.png)


#Getting Started:

Start by clicking on this [link](http://infinite-plateau-47667.herokuapp.com/).
Simply sign up or login using your Google Account. You will find yourself on the Home page, where you will have the choice of navigating to the Wishlist or the Restaurants pages. If you choose to visit the Wishlist you can create a new Wishlist or visit existing Wishlists. Don't like the name of your Wishlist? Change it with the Edit function! Delete Wishlists you no longer need, or delete restaurants that you no longer want. If you choose to visit the Restaurant page, you will find a set of parameters for which to search for restaurants to your liking: Location, Number of Results, and Type of Cuisine. Restaurants will be immediately available for your perusal, at which point you may add desired restaurants to a  chosen Wishlist.    
Create several different Wishlists, i.e.:

* Mexican Cuisine
* Best Root Beer Floats
* Favorite Places in Fargo, ND

From those Wishlists, you may use the Randomizer function, which will randomly select a restaurant for you! Just click on the Randomize button and see which restaurant you will be enjoying for the evening. Don't like the selection made for you? Simply click the Redo button to get a brand new option provided by the Randomizer function.


#User Stories:

Having personally struggled with the indecisiveness of picking a place to eat, which only seems to grow with the amount of hunger we feel, our team wanted to make life a bit easier for our users. We wanted to provide a dynamic place to save all of the names and information of restaurants that our users love, or would love to try, because those are bits of information that can easily be lost in the shuffle of life. In addition to providing one place to save all of this information, we wanted to make decision-making an easy and fun process. Choosing a place to eat when you are hangry feels close to impossible, so we wanted to make life a bit easier for our users. 

![I get hangry. Im sorry](https://i.imgur.com/iVqwUvS.png)
 

Visit our [Trello](https://trello.com/b/J1hegJdy/pickyeater) to get a more detailed look into the user stories that inspired Picky Eater!
---
##[Check out our Pitch Deck](https://slack-files.com/files-pri-safe/T0351JZQ0-F0TJS1XGD/presentation_project_3.pdf?c=1458264396-0b8c9367da448e2da03b0dcf3d459e9cc4934720) for a look into the planning process and to see our beautiful faces.
#Visit us online:
- [Facebook](https://www.facebook.com/pickyeater123/)
- [Instagram](https://www.instagram.com/pickyeater_app/)
- [Twitter](https://twitter.com/pickyEater1)

---
#Technologies Used:

- [Google OAuth](https://developers.google.com/identity/protocols/OAuth2WebServer) authentication uses PassportJS and Sessions Middleware to provide login authorization  
- [Yelp API](https://www.yelp.com/developers/documentation/v2/overview) pulls various data for our restaurants schema and wishlist model  
- Node.js provides application functionality and sets in motion all kinds of asynchronous functions for a quick-reponding site  
- [jQuery](http://api.jquery.com/) and AJAX(J) also provide application responsiveness and providing all kinds of CRUD  
- [`Yelp` npm](https://www.npmjs.com/package/yelp) is a Node.js module for interfacing with Yelp's API v2.0; supports both promises and callbacks.  
- Mongoose, MongoDB, and the Mongo Shell helped us organize data on the backend and helped in connecting the front end to the back end  
- [Wexgen](https://github.com/h4w5/wexgen) helped to generate our application  
- Other npm libraries used: [Util](https://www.npmjs.com/package/util) and [Dotenv](https://www.npmjs.com/package/dotenv)   
- Our styling was organized with CSS' [Materialize](http://materializecss.com/about.html) framework  
- We used [Mustache](https://github.com/janl/mustache.js) to render our user wishlists  
- [Lodash](https://lodash.com/) made working with functions easy   


#Next Steps:

- Create a mobile-ready version
- Users will rate restaurants on the application
- Randomize will cycle through Wishlists as well as restaurants contained within a Wishlist
- Share Wishlists with other users
- Share Wishlists with people who are not users via social media and/or email
- Visit other user's pages and view their Wishlists
- Recommend restaurants and Wishlists to other users on the application

#Resources:  

- [Google OAuth](https://developers.google.com/identity/protocols/OAuth2)

- [Passport JS](http://passportjs.org/)

- [Sessions Middleware](https://github.com/expressjs/session)

- [Materialize](http://materializecss.com/about.html)

- [jQuery](http://api.jquery.com/)

- [Stack Overflow](http://stackoverflow.com/)

- [Mongoose docs](http://mongoosejs.com/)

- [Some great Youtube tutorials](https://www.youtube.com/watch?v=hMxGhHNOkCU)

