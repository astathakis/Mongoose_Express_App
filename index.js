const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');

//essential for the edit route form handler
const methodOverride = require('method-override');

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

//middleware compound
//to get the data from the post request body and use PUT on form
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//categories additional
const categories = ['fruit', 'vegetable', 'dairy'];

//async route handler
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  // console.log(products);
  // res.send('all products will be here!');
  res.render('products/index', { products });
});

//serve the form
app.get('/products/new', (req, res) => {
  res.render('products/new', { categories });
});

//create a new product
app.post('/products', async (req, res) => {
  // console.log(req.body);
  const newProduct = new Product(req.body);
  await newProduct.save();
  // console.log(newProduct);
  res.redirect(`/products/${newProduct._id}`);
});

//show route
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  // console.log(product);
  // res.send('details page');
  res.render('products/show', { product });
});

//edit product
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  res.render('products/edit', { product, categories });
});

//using put to entirily update our product
//also remember to use method-override
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.redirect(`/products/${product._id}`);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
