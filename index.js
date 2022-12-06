const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
//import our model
const Product = require('./models/product');

mongoose
  .connect('mongodb://localhost:27017/farmStand')
  .then(() => {
    console.log('mongo connection opened!!!');
  })
  .catch((err) => {
    console.log('mongo connection refused', err);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//async route handler
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  // console.log(products);
  // res.send('all products will be here!');
  res.render('products/index', { products });
});

//show route
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  // console.log(product);
  // res.send('details page');
  res.render('products/show', { product });
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
