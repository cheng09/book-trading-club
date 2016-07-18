var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlSearch = require('../controllers/search');
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlBooks = require('../controllers/books');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.post('/profile', ctrlProfile.profileSet);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.get('/search/:term', ctrlSearch);

router.post('/collection', ctrlBooks.addToCollection);
router.get('/collection/:email', ctrlBooks.getUserBooks);
router.get('/collection/:email/:bookid', ctrlBooks.deleteUserBook);

router.post('/wishlist', ctrlBooks.addToWishList);
router.get('/wishlist/:email', ctrlBooks.getUserWishList)
router.get('/wishlist/:email/:bookid', ctrlBooks.removeFromWishList);
router.get('/books', ctrlBooks.allBooks);

module.exports = router;