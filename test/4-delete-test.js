// global imports
const assert = require('assert');
// local imports
const User = require('../src/user');

// TEST GROUP(S):-----------------
describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  // TEST(S):-----------------
  // DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
  it('instance method remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove/deleteMany', (done) => {
    // Remove a bunch of records with some given criteria
    // User.remove({ name: 'Joe' })
    User.deleteMany({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  // DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
  it('class method findOneAndRemove/findOneAndDelete', (done) => {
    // User.findOneAndRemove({ name: 'Joe' })   
    User.findOneAndDelete({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove/findByIdAndDelete', (done) => {
    // User.findByIdAndRemove(joe._id) 
    User.findByIdAndDelete(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
