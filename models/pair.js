const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true},
  createdBy: String //{type: mongoose.Schema.ObjectId, ref: 'User', required: true}
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  return this.createdBy.id === user.id;
};

const pairSchema = new mongoose.Schema({
  wine: {type: mongoose.Schema.ObjectId, ref: 'Wine', required: true},
  cheese: {type: mongoose.Schema.ObjectId, ref: 'Cheese', required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  description: String, //initial comment embedded
  comments: [ commentSchema ]
});

pairSchema.methods.belongsTo = function belongsTo(user) {
  // check if the user who created the pair is the same as the person who is logged in
  // 'this' is the instance of the hotel that we are calling the 'belongsTo' method on
  // 'user' is the user object that we will pass to this method (the user who is logged in)
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Pair', pairSchema);
