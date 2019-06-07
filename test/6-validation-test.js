// global imports
const assert = require('assert');
// local imports
const User = require('../src/user');

// TEST GROUP(S):-----------------
describe('Validating records', () => {

  // TEST(S):-----------------
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    /* user.validate((validationResult) => {  // async method
      // console.log(validationResult);
      const { message } = validationResult.errors.name;
      assert(message === 'Name is required.');
      done();
    }); */
    const validationResult = user.validateSync(); // sync method
    // console.log(validationResult);
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });

  it('requires a user\'s name longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    // console.log(validationResult);
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save()
      .catch((validationResult) => {
        // console.log(validationResult);
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.');
        done();
      });
  });
});
