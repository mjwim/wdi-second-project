const express = require('express');
const router = express.Router();
const wines = require('../controllers/wines');
const cheeses = require('../controllers/cheeses');
const pairs = require('../controllers/pairs');


// HOMEPAGE

router.get('/', (req, res) => res.render('statics/index'));

// WINES

// Wines Index or Create
router.route('/wines')
  .get(wines.index)
  .post(wines.create);

// Wines New
router.route('/wines/new')
  .get(wines.new);

// Wines Show
router.route('/wines/:id')
  .get(wines.show);

//Wines Edit
router.route('/wines/:id/edit')
  .get(wines.edit);

// CHEESES

// Cheeses Index
router.route('/cheeses')
  .get(cheeses.index)
  .post(cheeses.create);

// Cheeses New
router.route('/cheeses/new')
  .get(cheeses.new);

// Cheeses Show
router.route('/cheeses/:id')
  .get(cheeses.show);

// Cheeses Edit
router.route('/cheeses/:id/edit')
  .get(cheeses.edit);

// PAIRS

// Pairs Index
router.route('/pairs')
  .get(pairs.index)
  .post(pairs.create);

// Pairs New
router.route('/pairs/new')
  .get(pairs.new);

// Pairs Show
router.route('/pairs/:id')
  .get(pairs.show);

// Pairs Edit
router.route('/pairs/:id/edit')
  .get(pairs.edit);

module.exports = router;
