const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./modules/auth/auth.routes');
const productRoutes = require('./modules/product/product.routes');

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

module.exports = app;