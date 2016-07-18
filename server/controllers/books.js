var mongoose = require('mongoose');
var Collection = mongoose.model('Collection');
var User = mongoose.model('User');
var Book = mongoose.model('Book');
var Wishlist = mongoose.model('Wishlist');

var collection = [];
var wishlist = [];

var findUserByEmail = function(email) {
  return new Promise(function(resolve, reject) {
    User.findOne({ email: email })
    .exec(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result._id);
      }
    });  
  });
};

var findBook = function(reqBook) {
  return new Promise(function(resolve, reject) {
    Book.findOne({ id: reqBook.id })
      .exec(function(err, result) {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result._id);
        } else {
          var abook = { id: reqBook.id, title: reqBook.title, thumbnail: reqBook.thumbnail }
          Book.create(abook, function(err, book) {
            if (err) { reject(err) }
            resolve(book._id);
          });
        } 
      });
  });
};

module.exports.addToCollection = function(req, res) {
  var bookPromise = findBook(req.body.book);
  var userPromise = findUserByEmail(req.body.user.email);
  
  Promise.all([userPromise, bookPromise]).then(function(dataArr) {
    Collection.create({ owner: dataArr[0], book: dataArr[1] }, function(err, result) {
      if (err) { res.status(400).json({'message': err}); }
      console.log(result);
      res.json(result);
    });
  });
};

module.exports.getUserBooks = function(req, res) {
  collection = [];
  findUserByEmail(decodeURIComponent(req.params.email)).then(function(thisUser) {
    Collection.find({ owner: thisUser }).populate('book').exec(function(err, resultingCollection) {
      if (err) { res.json({ 'error': err}); }
      resultingCollection.forEach(function(datum) {                          
        var entry = {
          id: datum.book.id,
          title: datum.book.title,
          thumbnail: datum.book.thumbnail
        };
        collection.push(entry);
      });
      res.json(collection);
    });
  });
};

module.exports.deleteUserBook = function(req, res) {
  var bookid = req.params.bookid;
  var itemIndex;
  findUserByEmail(decodeURIComponent(req.params.email)).then(function(thisUser) {
    Collection.find({ owner: thisUser }).populate('book').exec(function(err, resultingCollection) {
      if (err) { throw err; }
      console.log(resultingCollection);
      resultingCollection.forEach(function(item) {
        if (item.book.id === req.params.bookid) {
          itemIndex = resultingCollection.indexOf(item);
        }
      });
      Collection.remove({ _id: resultingCollection[itemIndex]._id}, function(err, result) {
        if (err) { throw err; }
        res.json({ id: bookid });
      });
    });
  });
};

module.exports.addToWishList = function(req, res) {
  var bookPromise = findBook(req.body.book);
  var userPromise = findUserByEmail(req.body.user.email);
  
  Promise.all([userPromise, bookPromise]).then(function(dataArr) {
    Wishlist.create({ user: dataArr[0], book: dataArr[1] }, function(err, result) {
      if (err) { res.json({'message': err}); }
      res.json(result);
    });
  });
};

module.exports.getUserWishList = function(req, res) {
  wishlist = [];
  findUserByEmail(decodeURIComponent(req.params.email)).then(function(thisUser) {
    Wishlist.find({ user: thisUser }).populate('book').exec(function(err, resultingList) {
      if (err) { res.json({ 'error': err}); }
      resultingList.forEach(function(datum) {                          
        var entry = {
          id: datum.book.id,
          title: datum.book.title,
          thumbnail: datum.book.thumbnail
        };
        wishlist.push(entry);
      });
      res.json(wishlist);
    });
  });
};

module.exports.removeFromWishList = function(req, res) {
  var bookid = req.params.bookid;
  var itemIndex;
  findUserByEmail(decodeURIComponent(req.params.email)).then(function(thisUser) {
    Wishlist.find({ user: thisUser }).populate('book').exec(function(err, resultingList) {
      if (err) { throw err; }
      resultingList.forEach(function(item) {
        if (item.book.id === req.params.bookid) {
          itemIndex = resultingCollection.indexOf(item);
        }
      });
      Wishlist.remove({ _id: resultingCollection[itemIndex]._id}, function(err, result) {
        if (err) { throw err; }
        res.json({ id: bookid });
      });
    });
  });
};

module.exports.allBooks = function(req, res) {
  console.log("Pulling all distinct books");
  Collection.find().distinct("book").exec(function(err, result) {
    if (err) { throw err; }
    Book.find({_id: {$in: result}}).sort({title: 1}).exec(function(err, books) {
      if (err) {
        throw err;
      }
      res.status(200).json(books);
    });
  });
};