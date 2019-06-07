// global imports
const assert = require('assert');
// local imports
const User = require('../src/user');

// TEST GROUP(S):-----------------
describe('Creating records', () => {

  // TEST(S):-----------------
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' }); // joe.isNew -> true

    joe.save()
      .then(() => {
        // Has joe been saved successfully?
        assert(!joe.isNew); // joe.isNew -> false
        done();
      });
  });

});
