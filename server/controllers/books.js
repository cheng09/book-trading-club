var mongoose = require('mongoose');
var Collection = mongoose.model('Collection');
var User = mongoose.model('User');
var Book = mongoose.model('Book');

var collection = [];

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

function findBookToRemove(bookid) {
  return new Promise(function(resolve, reject) {
    Book.findOne({ id: bookid })
      .exec(function(err, book) {
        if (err) {
          reject(err);
        }
        if (book) {
          resolve(book._id);
        }
      });
  });  
}

module.exports.addToCollection = function(req, res) {
  console.log('About to insert collection...');
  var bookPromise = findBook(req.body.book);
  var userPromise = findUserByEmail(req.body.user.email);
  
  Promise.all([userPromise, bookPromise]).then(function(dataArr) {
    console.log("All promises fulfilled");
    Collection.create({ owner: dataArr[0], book: dataArr[1] }, function(err, result) {
      if (err) { res.json({'message': err}); }
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
}

module.exports.allBooks = function(req, res) {
  console.log("Pulling all distinct books");
  Collection.distinct("book").populate("book").exec(function(error, results){
    if (error) { res.send(error) };
    res.json(results);
  });
}