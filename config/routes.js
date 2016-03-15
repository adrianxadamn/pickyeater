var express = require('express'),
    router  = new express.Router(),
    passport = require('passport')

// Require controllers.
var usersController = require('../controllers/users');
var searchController = require('../controllers/search');
var wishlistController = require('../controllers/wishlists');

// root path:
router.get('/', function(req, res, next) {
  res.render('home', {user: req.user})
})

router.get('/restaurants', function(req, res, next) {
  res.render('restaurants', {user: req.user});
})

// wishlists path:
router.get('/api/wishlists', wishlistController.index);

router.get('/wishlists', function(req, res, next) {
  res.render('wishlists', {user: req.user});
})

router.post('/api/wishlists', wishlistController.post);


// search resource paths
// router.get('/search', searchController.search)
router.post('/search', searchController.search);

//google Auth
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
  ));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

module.exports = router;
