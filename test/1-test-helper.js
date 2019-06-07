// global imports
const mongoose = require('mongoose');
// local imports
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

mongoose.Promise = global.Promise;

const DATABASE = 'mongodb://localhost:27017/blog_test';
const options = {
  useNewUrlParser: true,
  useFindAndModify: false
};

// TEST SUITE:-----------------
// This hook executes only once per test suite globally
before((done) => {
  mongoose.connect(DATABASE, options);
  mongoose.connection
    .once('open', () => {
      console.log(`Connected to → DB ${DATABASE}`);
      done();
    })
    .on('error', (err) => {
      console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
    });
});

// This hook executes before begining of each test globally
beforeEach((done) => {
  // By default, mongoose lowercases all the collection names
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        // console.log(`{ users, comments, blogposts } collections got dropped.`);
        done();
      });
    });
  });
});