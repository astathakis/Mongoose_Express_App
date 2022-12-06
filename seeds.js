//seeds our db on its own seperatelly of our web app
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose
  .connect('mongodb://localhost:27017/farmStand')
  .then(() => {
    console.log('mongo connection opened!!!');
  })
  .catch((err) => {
    console.log('mongo connection refused', err);
  });

// const p = new Product({
//   name: 'Ruby Grapefruit',
//   price: 1.99,
//   category: 'fruit',
// });

// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 2.0,
    category: 'vegetable',
  },
  {
    name: 'Organic Goddess Melon',
    price: 3.99,
    category: 'fruit',
  },
  {
    name: 'Organic Mini Seedless Melon',
    price: 3.0,
    category: 'fruit',
  },
  {
    name: 'Donkey Milk',
    price: 10.0,
    category: 'dairy',
  },
];

//validations should pass for insertion to succeed
Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
