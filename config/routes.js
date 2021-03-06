var express = require('express'),
    router  = new express.Router(),
    passport = require('passport')

// Require controllers.
var usersController = require('../controllers/users');
var searchController = require('../controllers/search')

// root path:
router.get('/', function(req, res, next) {
  // res.render('index', {user: req.user});
  //check this later jerry
  res.render('home', {user: req.user})
})

// search resource paths:
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
