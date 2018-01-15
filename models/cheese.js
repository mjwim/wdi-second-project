const mongoose = require('mongoose');

const cheeseSchema = new mongoose.Schema({
  name: { type: String, required: true},
  milk: { type: String },
  country: { type: String },
  region: { type: String },
  producer: {name: String,
    address: {
      line1: { type: String},
      line2: String,
      city: { type: String},
      postcode: { type: String},
      country: { type: String}
    }},
  image: { type: String },
  tastingNotes: { type: String },
  pairings: [{ type: String}],
  rating: Number
});

module.exports = mongoose.model('Cheese', cheeseSchema);
