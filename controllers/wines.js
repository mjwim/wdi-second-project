const Wine = require('../models/wine');


// Wine Index View
function winesIndex(req, res) {
  Wine
    .find()
    .exec()
    .then((wines) => {
      res.render('wines/index' , { wines });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Wine New View
function winesNew(req, res) {
  res.render('wines/new');
}

// Wine Show View
function winesShow(req, res) {
  Wine
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((wine) => {
      if(!wine) return res.status(404).send('not found');
      res.render('wines/show' , { wine });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Wine Create View

function winesCreate(req, res) {
  req.body.createdBy = req.user;
  Wine
    .create(req.body)
    .then(() => {
      res.redirect('/wines');
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Wine Edit View

function winesEdit(req, res) {
  Wine
    .findById(req.params.id)
    .exec()
    .then((wine) => {
      if(!wine) return res.status(404).send('not found');
      res.render('wines/edit' , { wine });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Wine Update View

function winesUpdate(req, res) {
  Wine
    .findById(req.params.id)
    .exec()
    .then((wine) => {
      if(!wine) return res.status(404).send('not found');
      wine = Object.assign(wine, req.body);
      return wine.save();
    })
    .then((wine) => {
      res.redirect(`/wines/${wine.id}`);
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

// Wine Delete View

function winesDelete(req, res) {
  Wine
    .findById(req.params.id)
    .exec()
    .then((wine) => {
      if(!wine) return res.status(404).send('Not found');
      return wine.remove();
    })
    .then(() => {
      res.redirect('/wines');
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

module.exports = {
  index: winesIndex,
  new: winesNew,
  show: winesShow,
  create: winesCreate,
  edit: winesEdit,
  update: winesUpdate,
  delete: winesDelete
};
