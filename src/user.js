// global imports
const mongoose = require('mongoose');
// local imports
const PostSchema = require('./post');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,   // custom validator
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  likes: Number,
  posts: [PostSchema],  // post sub-document
  blogPosts: [{   // A User hasMany BlogPosts
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// virtual properties don't get saved to mongodb
// dynamically evaluate posts length and attach it to postCount property
UserSchema.virtual('postCount')
  .get(function () {
    return this.posts.length;
  });

// pre middlewares -> event -> post middlewares
// here, pre hook attached to remove event 
UserSchema.pre('remove', function (next) {
  console.log('User.pre.remove middleware triggered....');
  const BlogPost = mongoose.model('blogPost');
  // this === joe
  // BlogPost.remove({ _id: { $in: this.blogPosts } })
  BlogPost.deleteMany({ _id: { $in: this.blogPosts } }) // { _id: { $in: [_blogId...] } } 
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

// Export the Model
module.exports = User;
