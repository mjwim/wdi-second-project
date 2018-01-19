const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Wine = require('../models/wine');
const Cheese = require('../models/cheese');
const Pair = require('../models/pair');
const User = require('../models/user');

Wine.collection.drop();
Cheese.collection.drop();
Pair.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Matthew',
    lastName: 'Wallis',
    username: 'm',
    email: 'm@m',
    password: 'm',
    passwordConfirmation: 'm'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Wine
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
        image: 'https://5304282f92ff1d1b19c1-8a2ebff5f6260504c3c482982d840415.ssl.cf3.rackcdn.com/images/products/834.jpg',
        tastingNotes: 'Gorgeous wine with amazing layers of flavors - violets and jasmine, mixed berries and sweet spices. Focused, precise and fresh with great linearity. Very long finish - this is one of the best 2000 wines.',
        pairings: ['Gorgonzola', 'Roquefort'],
        createdBy: users[0],
        rating: 5
      },
      {
        name: 'Vigna Rionda',
        style: 'Barolo',
        vintage: 2011,
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
        image: 'https://5304282f92ff1d1b19c1-8a2ebff5f6260504c3c482982d840415.ssl.cf3.rackcdn.com/images/products/16049.jpg',
        tastingNotes: 'Beautiful aromas and flavours of rich, ripe, red cherry, flinty red berries, and fresh flowers. Rich, dense and suave palate with sweet spice and marzipan accents. Long, glycerol finish with a hint of pepper.',
        pairings: ['Gorgonzola', 'Roquefort'],
        createdBy: users[0],
        rating: 5
      },
      {
        name: 'Bâtard-Montrachet, Grand Cru',
        style: 'Puligny Montrachet',
        vintage: 2013,
        grape: 'Chardonnay',
        country: 'France',
        region: 'Burgundy',
        producer: {name: 'Domaine de la Vougeraie',
          address: {
            line1: ' Rue de l\'Église',
            line2: 'Nuits-Saint-Georges',
            city: 'Côte-d\'Or',
            postcode: '21700',
            country: 'France'}},
        image: 'https://5304282f92ff1d1b19c1-8a2ebff5f6260504c3c482982d840415.ssl.cf3.rackcdn.com/images/products/28690.jpg',
        tastingNotes: 'The plot is superbly sited within Bâtard and with very old vines. Picked 26th September because it was ripe early, the wine is a fine, pale yellow, with a heavenly fragrance of white peaches, pears, and a touch of buttery banana. A huge, magical mouthful, with a vibrant mineral thread. Really gorgeous.',
        pairings: ['Gorgonzola', 'Roquefort'],
        createdBy: users[0],
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
            createdBy: users[0],
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
            createdBy: users[0],
            rating: 5
          }])
          .then((cheeses) => {
            console.log(`${cheeses.length} cheeses created!`);
            return Pair
              .create({
                wine: wines[0],
                cheese: cheeses[0],
                createdBy: users[0],
                description: 'Great pairing',
                comments: {
                  content: 'Really good, I agree',
                  createdBy: users[0]}
              });
          });
      });
  })
  // .then((pairs) => {
  //   console.log(`${pairs.length} pairs created!`);
  // })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
