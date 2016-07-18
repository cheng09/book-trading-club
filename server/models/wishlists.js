var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishlistSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('Wishlist', wishlistSchema);