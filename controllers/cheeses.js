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

//Cheese Create View

function cheesesCreate(req, res) {
  Cheese
    .create(req.body)
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
  create: cheesesCreate
};
