const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true},
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
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
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Pair', pairSchema);
