const Cheese = require('../models/cheese');

// Cheese Index View
function cheesesIndex(req, res) {
  Cheese
    .find()
    .exec()
    .then((cheeses) => {
      res.render('cheeses/index' , { cheeses });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Cheese New View
function cheesesNew(req, res) {
  res.render('cheeses/new');
}

// Cheese Show View
function cheesesShow(req, res) {
  Cheese
    .findById(req.params.id)
    .exec()
    .then((cheese) => {
      if(!cheese) return res.status(404).send('not found');
      res.render('cheeses/show' , { cheese });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Cheese Create View

function cheesesCreate(req, res) {
  req.body.createdBy = req.user;
  Cheese
    .create(req.body)
    .then(() => {
      res.redirect('/cheeses');
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Cheese Edit View

function cheesesEdit(req, res) {
  Cheese
    .findById(req.params.id)
    .exec()
    .then((cheese) => {
      if(!cheese) return res.status(404).send('not found');
      res.render('cheeses/edit' , { cheese });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Cheese Update View

function cheesesUpdate(req, res) {
  Cheese
    .findById(req.params.id)
    .exec()
    .then((cheese) => {
      if(!cheese) return res.status(404).send('not found');
      cheese = Object.assign(cheese, req.body);
      return cheese.save();
    })
    .then((cheese) => {
      res.redirect(`/cheeses/${cheese.id}`);
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Cheese Delete View

function cheesesDelete(req, res) {
  Cheese
    .findById(req.params.id)
    .exec()
    .then((cheese) => {
      return cheese.remove();
    })
    .then(() => {
      res.redirect('/cheeses');
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

module.exports = {
  index: cheesesIndex,
  new: cheesesNew,
  show: cheesesShow,
  create: cheesesCreate,
  edit: cheesesEdit,
  update: cheesesUpdate,
  delete: cheesesDelete
};
