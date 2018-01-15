const mongoose = require('mongoose');

const pairSchema = new mongoose.Schema({
  wine: {type: mongoose.Schema.ObjectId, ref: 'Wine', required: true},
  cheese: {type: mongoose.Schema.ObjectId, ref: 'Cheese', required: true},
  createdBy: String,
  description: String, //initial comment embedded
  comments: [{type: String}] //embedded
});

module.exports = mongoose.model('Pair', pairSchema);
