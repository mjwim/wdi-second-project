const Cheese = require('../models/cheese');

// Cheese Index View
function cheesesIndex(req, res, next) {
  Cheese
    .find()
    .exec()
    .then((cheeses) => {
      res.render('cheeses/index' , { cheeses });
    })
    .catch(next);
}

// Cheese New View
function cheesesNew(req, res) {
  res.render('cheeses/new');
}

// Cheese Show View
function cheesesShow(req, res, next) {
  Cheese
    .findById(req.params.id)
    .exec()
    .then((cheese) => {
      if(!cheese) return res.notFound();
      return res.render('cheeses/show' , { cheese });
    })
    .catch(next);
}

// Cheese Create View

function cheesesCreate(req, res, next) {
  req.body.createdBy = req.user;
  Cheese
    .create(req.body)
    .then(() => {
      res.redirect('/cheeses');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/cheeses/new', err.toString());
      }
      next(err);
    });
}

// Cheese Edit View

function cheesesEdit(req, res, next) {
  Cheese
    .findById(req.params.id)
    .exec()
    .then((cheese) => {
      if(!cheese) return res.notFound();
      res.render('cheeses/edit' , { cheese });
    })
    .catch(next);
}

// Cheese Update View

function cheesesUpdate(req, res, next) {
  Cheese
    .findById(req.params.id)
    .exec()
    .then((cheese) => {
      if(!cheese) return res.notFound();
      cheese = Object.assign(cheese, req.body);
      return cheese.save();
    })
    .then(() => {
      res.redirect(`/cheeses/${req.params.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/cheeses/${req.params.id}/edit`, err.toString());
      }
      next(err);
    });
}

// Cheese Delete View

function cheesesDelete(req, res, next) {
  Cheese
    .findById(req.params.id)
    .exec()
    .then((cheese) => {
      if(!cheese) return res.notFound();
      return cheese.remove();
    })
    .then(() => {
      res.redirect('/cheeses');
    })
    .catch(next);
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
