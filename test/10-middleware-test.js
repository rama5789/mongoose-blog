// global imports
const assert = require('assert');
// local imports
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

// TEST GROUP(S):-----------------
describe('Middlware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  // TEST(S):-----------------
  // DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
  it('users clean up dangling blogposts on remove', (done) => {
    // Before joe gets removed, all joe related blogposts get removed by using 'pre remove hook' middleware
    joe.remove()
      // .then(() => BlogPost.count())
      .then(() => BlogPost.countDocuments())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
