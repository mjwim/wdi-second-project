const express = require('express');
const router = express.Router();
const wines = require('../controllers/wines');
const cheeses = require('../controllers/cheeses');
const pairs = require('../controllers/pairs');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

// HOMEPAGE

router.get('/', (req, res) => res.render('statics/index'));

// WINES

// Wines Index or Create
router.route('/wines')
  .get(wines.index)
  .post(secureRoute, wines.create);

// Wines New
router.route('/wines/new')
  .get(secureRoute, wines.new);

// Wines Show/Update/Delete
router.route('/wines/:id')
  .get(secureRoute, wines.show)
  .put(secureRoute, wines.update)
  .delete(secureRoute, wines.delete);

//Wines Edit
router.route('/wines/:id/edit')
  .get(secureRoute, wines.edit);

// CHEESES

// Cheeses Index or Create
router.route('/cheeses')
  .get(cheeses.index)
  .post(secureRoute, cheeses.create);

// Cheeses New
router.route('/cheeses/new')
  .get(secureRoute, cheeses.new);

// Cheeses Show/Update/Delete
router.route('/cheeses/:id')
  .get(secureRoute, cheeses.show)
  .put(secureRoute, cheeses.update)
  .delete(secureRoute, cheeses.delete);

// Cheeses Edit
router.route('/cheeses/:id/edit')
  .get(secureRoute, cheeses.edit);

// PAIRS

// Pairs Index or Create
router.route('/pairs')
  .get(secureRoute, pairs.index)
  .post(secureRoute, pairs.create);

// Pairs New
router.route('/pairs/new')
  .get(secureRoute, pairs.new);

// Pairs Show/Update/Delete
router.route('/pairs/:id')
  .get(secureRoute, pairs.show)
  .put(secureRoute, pairs.update)
  .delete(secureRoute, pairs.delete);

// Pairs Edit
router.route('/pairs/:id/edit')
  .get(secureRoute, pairs.edit);

// Pairs Comment Create
router.route('/pairs/:id/comments')
  .post(pairs.createComment);

// Pairs Comment Delete
router.route('/pairs/:id/comments/:commentId')
  .delete(pairs.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
