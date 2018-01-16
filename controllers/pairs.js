const Pair = require('../models/pair');
const Wine = require('../models/wine');
const Cheese = require('../models/cheese');

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
  Wine
    .find()
    .exec()
    .then((wines) => {
      Cheese
        .find()
        .exec()
        .then((cheeses) => {
          res.render('pairs/new', { wines, cheeses});
        });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
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
  req.body.createdBy = req.user;
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


function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;
  Pair
    .findById(req.params.id)
    .exec()
    .then((pair) => {
      if(!pair) return res.notFound();
      pair.comments.push(req.body);
      return pair.save();
    })
    .then((pair) => {
      res.redirect(`/pairs/${pair.id}`);
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Pair
    .findById(req.params.id)
    .exec()
    .then((pair) => {
      if(!pair) return res.notFound();
      const comment = pair.comments.id(req.params.commentId);
      comment.remove();
      return pair.save();
    })
    .then((pair) => {
      res.redirect(`/pairs/${pair.id}`);
    })
    .catch(next);
}

module.exports = {
  index: pairsIndex,
  new: pairsNew,
  show: pairsShow,
  create: pairsCreate,
  edit: pairsEdit,
  update: pairsUpdate,
  delete: pairsDelete,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
