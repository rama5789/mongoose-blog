// global imports
const assert = require('assert');
// local imports
const User = require('../src/user');

// TEST GROUP(S):-----------------
describe('Subdocuments', () => {

  // TEST(S):-----------------
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // console.log(user);
        const post = user.posts[0];
        post.remove(); // remove the embedded post
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // console.log(user);
        assert(user.posts.length === 0);
        done();
      });
  });
});
