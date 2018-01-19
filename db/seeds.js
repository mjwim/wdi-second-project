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
      },
      {
        name: 'Champagne Pol Roger',
        style: 'Blanc De Blancs',
        vintage: 2009,
        grape: 'Chardonnay',
        country: 'France',
        region: 'Champagne',
        producer: {name: 'Pol Roger',
          address: {
            line1: '1, Rue Winston Churchill',
            line2: '',
            city: 'Epernay',
            postcode: '51200',
            country: 'France'}},
        image: 'https://5304282f92ff1d1b19c1-8a2ebff5f6260504c3c482982d840415.ssl.cf3.rackcdn.com/images/products/45927.jpg',
        tastingNotes: 'Richer than the more linear and citric 2008, this is reflective of the warmer growing season. Abundant stone fruit, lemon pith, brioche and a hint on honey on the nose. Generously textured on the palate, with a fine mousse and the requisite seam of acidity keeping everything in check. This is a Pol Blanc de Blancs to enjoy straight off the boat, although I would expect this to gain a little added complexity and nuttiness with some age.A classic lemon citrus nose complemented by puff pastry a hint of honey and delicate white flowers. The 2009 has a gentle nature and a clean attack that may not have the vibrancy of cooler vintages but offers a creamy flow, nice weight and gentle bubbles to accompany the rhubarb and apple tang in the finish. A great vintage Champagne to get stuck into early, it slips down very easily so no need to wait. Drink 2018 – 2024. ',
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
          },
          {
            name: 'Vacherin Mont D\'Or',
            milk: 'Cow',
            country: 'France',
            region: 'Jura',
            producer: {name: 'Fromagerie Val d\'Usiers',
              address: {
                line1: 'Route du Val D\'Usiers',
                line2: '',
                city: 'Bians-les-Usiers',
                postcode: '25250',
                country: 'France'
              }},
            tastingNotes: 'Made from the rich, unpasteurised milk of alpine pastures, this cheese has a melting, voluptuous texture.',
            image: 'https://www.finecheese.co.uk/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vacherin10443_b_.jpg',
            pairings: ['Champagane'],
            createdBy: users[0],
            rating: 5
          },{
            name: 'Brie de Meaux',
            milk: 'Cow',
            country: 'France',
            region: 'Seine-et-Marne',
            producer: {name: 'Fromagerie Dongé',
              address: {
                line1: '6 Chemin de la Grande Haie',
                line2: '',
                city: 'Cousances les Triconville',
                postcode: '55500',
                country: 'France'
              }},
            tastingNotes: 'A soft velvety texture with a tender bloomy rind. Mentioned anecdotally in writings dating back to the ninth century, this cheese is an absolute classic. The taste is complex and rounded and soothing, with notes ranging from mushroom to cauliflower to sauteed cabbage and leek. The pate is a rich golden colour, contrasting the bloomy whites and deeper flaxen flourishes on the rind.',
            image: 'https://static1.squarespace.com/static/52ea5f08e4b0f68329ba2af9/t/53622e49e4b0ad70e22de994/1515078650144/France+Cow+Brie+de+Meaux.JPG?format=1500w',
            pairings: ['Champagane'],
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
