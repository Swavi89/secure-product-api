const service = require('./product.service');

exports.createProduct = async (req, res) => {
  try {
    const product = await service.createProduct(req.body);
    
    res.status(201).json({
      message: 'Product created successfully',
      product: product
    });
  } catch (error) {
    if (error.message.includes('required') || error.message.includes('cannot be negative')) {
      return res.status(400).json({ 
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create product',
      details: error.message 
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await service.getProducts();
    
    res.status(200).json({
      message: 'Products retrieved successfully',
      count: products.length,
      products: products
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve products',
      details: error.message 
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await service.getProductById(req.params.id);
    
    res.status(200).json({
      message: 'Product retrieved successfully',
      product: product
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to retrieve product',
      details: error.message 
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await service.updateProduct(req.params.id, req.body);
    
    res.status(200).json({
      message: 'Product updated successfully',
      product: product
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    
    if (error.message.includes('required') || error.message.includes('cannot be negative')) {
      return res.status(400).json({ 
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to update product',
      details: error.message 
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const result = await service.deleteProduct(req.params.id);
    
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to delete product',
      details: error.message 
    });
  }
};