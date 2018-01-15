const Pair = require('../models/pair');

//Pairs Index View

function pairsIndex(req, res) {
  Pair
    .find()
    .populate('wine cheese')
    .exec()
    .then((pairs) => {
      res.render('pairs/index', { pairs });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

//Pairs New View

function pairsNew(req, res) {
  res.render('pairs/new');
}

// Pairs Show View

function pairsShow(req, res) {
  Pair
    .findById(req.params.id)
    .populate('wine cheese')
    .exec()
    .then((pair) => {
      if(!pair) return res.status(404).send('not found');
      res.render('pairs/show' , { pair });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Pairs Create View

function pairsCreate(req, res) {
  Pair
    .create(req.body)
    .then(() => {
      res.redirect('/pairs');
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Pairs Edit View

function pairsEdit(req, res) {
  Pair
    .findById(req.params.id)
    .exec()
    .then((pair) => {
      if(!pair) return res.status(404).send('not found');
      res.render('pairs/edit' , { pair });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Pairs Update View

function pairsUpdate(req, res) {
  Pair
    .findById(req.params.id)
    .exec()
    .then((pair) => {
      if(!pair) return res.status(404).send('Not found');
      pair = Object.assign(pair, req.body);
      return pair.save();
    })
    .then((pair) => {
      res.redirect(`/pairs/${pair.id}`);
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Pairs Delete View

function pairsDelete(req, res) {
  Pair
    .findById(req.params.id)
    .exec()
    .then((pair) => {
      if(!pair) return res.status(404).send('Not found');
      return pair.remove();
    })
    .then(() => {
      res.redirect('/pairs');
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

module.exports = {
  index: pairsIndex,
  new: pairsNew,
  show: pairsShow,
  create: pairsCreate,
  edit: pairsEdit,
  update: pairsUpdate,
  delete: pairsDelete
};
