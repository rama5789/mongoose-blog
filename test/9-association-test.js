// global imports
const assert = require('assert');
// local imports
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

// TEST GROUP(S):-----------------
describe('Assocations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
    comment = new Comment({ content: 'Congrats on great post' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  // TEST(S):-----------------
  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')  // fetch user and its related blogPosts 
      .then((user) => {
        // console.log(JSON.stringify(user, 0, 2));
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({   // fetch user and its related blogPosts and its related comments and its related user
        path: 'blogPosts',
        // model: 'blogPost', // providing model name is optional
        populate: {
          path: 'comments',
          // model: 'comment',
          populate: {
            path: 'user',
            // model: 'user'
          }
        }
      })
      .then((user) => {
        // console.log(JSON.stringify(user, 0, 2));
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
