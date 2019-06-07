// global imports
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String
});

// Export the Embedded Model
module.exports = PostSchema;
