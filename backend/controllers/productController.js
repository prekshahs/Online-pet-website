const Product = require('../models/Product');

// Get All Products with optional ?category
const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Product (requires category and at least one image)
const createProduct = async (req, res) => {
  try {
    if (!req.body.category || !req.body.images || !req.body.images.length) {
      return res.status(400).json({ message: "Category and at least one image required" });
    }
    const product = new Product({
      seller: req.user?._id, // omit if not using auth
      name: req.body.name,
      images: req.body.images,
      category: req.body.category,
      subcategory: req.body.subcategory,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product (Seller)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.images = req.body.images || product.images;
      product.category = req.body.category || product.category;
      product.countInStock = typeof req.body.countInStock === "number" ? req.body.countInStock : product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Products
const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  searchProducts
};
