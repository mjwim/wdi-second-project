const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const Wine = require('../models/wine');
const Cheese = require('../models/cheese');
const Pair = require('../models/pair');

Wine.collection.drop();
Cheese.collection.drop();
Pair.collection.drop();

Wine
  .create([{
    name: 'Chateau Margaux',
    style: 'Bordeaux',
    vintage: 2001,
    grape: 'Cabernet Sauvignon Blend',
    country: 'France',
    region: 'Bordeaux',
    producer: {name: 'Chateau Margaux',
      address: {
        line1: 'Chateau Margaux',
        line2: '',
        city: 'Margaux',
        postcode: '33460',
        country: 'France'}},
    image: '',
    tastingNotes: 'Gorgeous wine with amazing layers of flavors - violets and jasmine, mixed berries and sweet spices. Focused, precise and fresh with great linearity. Very long finish - this is one of the best 2000 wines.',
    pairings: ['Gorgonzola', 'Roquefort'],
    rating: 5
  },
  {
    name: '2011 Barolo, Vigna Rionda, Giovanni Rosso',
    style: 'Barolo',
    vintage: 2002,
    grape: 'Nebbiolo',
    country: 'Italy',
    region: 'Piedmont',
    producer: {name: 'Azienda Agricola Giovanni Rosso di Rosso Davide',
      address: {
        line1: 'Via Roddino 10/1',
        line2: 'Serralunga d\'Alba (Cn)',
        city: 'Piedmont',
        postcode: '12050',
        country: 'Italy'}},
    image: '',
    tastingNotes: 'Beautiful aromas and flavours of rich, ripe, red cherry, flinty red berries, and fresh flowers. Rich, dense and suave palate with sweet spice and marzipan accents. Long, glycerol finish with a hint of pepper.',
    pairings: ['Gorgonzola', 'Roquefort'],
    rating: 5
  }])
  .then((wines) => {
    console.log(`${wines.length} wines created!`);
    return Cheese
      .create([{
        name: 'Gorgonzola',
        milk: 'Cow',
        country: 'Italy',
        region: 'Piedmont',
        producer: {name: 'Nuova Castelli',
          address: {
            line1: 'Via Tancredi Galimberti n°4',
            line2: '',
            city: 'Reggio Emilia',
            postcode: '42124',
            country: 'Italy'
          }},
        tastingNotes: 'Gorgonzola is traditionally a rich creamy cheese, but the blue-green ripples add a sharp spicy flavor that provides an excellent contrast to its richness. The taste ranges from mild to sharp, depending on age.',
        image: 'http://www.monthlyclubs.com/media/catalog/product/cache/13/image/285x/9df78eab33525d08d6e5fb8d27136e95/g/o/gorgonzola-1.jpg',
        pairings: ['Chateau Margaux', '2011 Barolo, Vigna Rionda, Giovanni Rosso' ],
        rating: 5
      },
      {
        name: 'Roquefort',
        milk: 'Sheep',
        country: 'France',
        region: 'Roquefort-sur-Soulzon',
        producer: {name: 'Gabriel Coulet',
          address: {
            line1: '3 avenue of Lauras',
            line2: '',
            city: 'Roquefort-Sur-Soulzon',
            postcode: '12250',
            country: 'France'
          }},
        tastingNotes: 'Roquefort has a tingly pungent taste, a distinct bouquet, and a flavor that combines the sweet burnt-caramel taste of sheep\'s milk with the sharp, metallic tang of the blue mold.',
        image: 'https://www.cheesemonthclub.com/media/catalog/product/cache/13/image/285x/9df78eab33525d08d6e5fb8d27136e95/r/o/roquefort-1.jpg',
        pairings: ['Chateau Margaux', '2011 Barolo, Vigna Rionda, Giovanni Rosso' ],
        rating: 5
      }]);
  })
  .then((cheeses) => {
    console.log(`${cheeses.length} cheeses created!`);
    return Pair
      .create({
        wine: 'Chateau Margaux',
        cheese: 'Roquefort',
        createdBy: 'Admin',
        description: 'Great pairing',
        comments: ['Agreed, great pairing', 'Hmmm, I\'m not too sure about this one']
      });
  })
  .then((pairs) => {
    console.log(`${pairs.length} pairs created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
