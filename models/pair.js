const mongoose = require('mongoose');

const pairSchema = new mongoose.Schema({
  wine: String,
  cheese: String,
  createdBy: String,
  description: String, //initial comment embedded
  comments: [{type: String}] //embedded
});

module.exports = mongoose.model('Pair', pairSchema);
