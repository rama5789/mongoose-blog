// global imports
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  user: {   // A Comment hasOne User 
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Comment = mongoose.model('comment', CommentSchema);

// Export the Model
module.exports = Comment;
