const Pair = require('../models/pair');

//Pairs Index View

function pairsIndex(req, res) {
  Pair
    .find()
    .exec()
    .then((pairs) => {
      res.render('pairs/index', { pairs });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

function pairsNew(req, res) {
  res.render('pairs/new');
}

function pairsShow(req, res) {
  Pair
    .findById(req.params.id)
    .exec()
    .then((pair) => {
      if(!pair) return res.status(404).send('not found');
      res.render('pairs/show' , { pair });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

module.exports = {
  index: pairsIndex,
  new: pairsNew,
  show: pairsShow
};
