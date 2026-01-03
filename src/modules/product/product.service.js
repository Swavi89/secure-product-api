const repo = require('./product.repository');

exports.createProduct = async (data) => {
  if (!data.product_name || data.product_name.trim() === '') {
    throw new Error('Product name is required');
  }

  if (data.product_quantity === undefined || data.product_quantity === null) {
    throw new Error('Product quantity is required');
  }

  if (data.product_quantity < 0) {
    throw new Error('Product quantity cannot be negative');
  }

  const product = {
    product_name: data.product_name.trim(),
    product_quantity: Number.parseInt(data.product_quantity)
  };

  return await repo.create(product);
};

exports.getProducts = async () => {
  return await repo.findAll();
};

exports.getProductById = async (id) => {
  const product = await repo.findById(id);
  
  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};


exports.updateProduct = async (id, data) => {

  const existingProduct = await repo.findById(id);
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  if (!data.product_name || data.product_name.trim() === '') {
    throw new Error('Product name is required');
  }

  if (data.product_quantity === undefined || data.product_quantity === null) {
    throw new Error('Product quantity is required');
  }

  if (data.product_quantity < 0) {
    throw new Error('Product quantity cannot be negative');
  }

  const product = {
    product_name: data.product_name.trim(),
    product_quantity: Number.parseInt(data.product_quantity)
  };

  return await repo.update(id, product);
};


exports.deleteProduct = async (id) => {

  const existingProduct = await repo.findById(id);
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  const result = await repo.delete(id);
  
  return {
    message: 'Product deleted successfully',
    deleted: result.deleted
  };
};