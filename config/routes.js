var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController = require('../controllers/users');
var searchController = require('../controllers/search')

// root path:
router.get('/', function(req, res, next) {
  res.render('index')
})

router.post('/search', searchController.search);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);

module.exports = router;
