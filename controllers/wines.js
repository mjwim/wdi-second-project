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
  Wine
    .create(req.body)
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
  create: winesCreate
  // edit: winesEdit,
  // update: winesUpdate,
  // delete: winesDelete
};
