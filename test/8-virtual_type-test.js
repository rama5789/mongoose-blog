// global imports
const assert = require('assert');
// local imports
const User = require('../src/user');

// TEST GROUP(S):-----------------
describe('Virtual types', () => {

  // TEST(S):-----------------
  it('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(joe.postCount === 1); // virtual property: postCount
        done();
      });
  });
});
