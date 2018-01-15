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

//Wines Create

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


module.exports = router;
