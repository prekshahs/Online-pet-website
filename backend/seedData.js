require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Cute Golden Puppy',
    description: 'Adorable golden retriever puppy',
    price: 15000,
    images: ['https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400'],
    category: 'PETS',
    countInStock: 5,
  },
  {
    name: 'Premium Dog Food',
    description: 'Nutritious dog food 5kg pack',
    price: 1200,
    images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400'],
    category: 'PEET FOODS',
    countInStock: 50,
  },
  {
    name: 'Squeaky Ball Toy',
    description: 'Fun squeaky ball for dogs',
    price: 299,
    images: ['https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400'],
    category: 'TOYS',
    countInStock: 100,
  },
  {
    name: 'Cozy Pet Bed',
    description: 'Comfortable bed for small to medium pets',
    price: 1899,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'],
    category: 'PEETS BED',
    countInStock: 25,
  },
  {
    name: 'Fluffy Persian Cat',
    description: 'Beautiful white persian cat',
    price: 12000,
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'],
    category: 'PETS',
    countInStock: 3,
  },
  {
    name: 'Cat Food Premium',
    description: 'Healthy cat food 3kg',
    price: 899,
    images: ['https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400'],
    category: 'PEET FOODS',
    countInStock: 60,
  },
  {
    name: 'Interactive Cat Toy',
    description: 'Feather wand toy for cats',
    price: 199,
    images: ['https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400'],
    category: 'TOYS',
    countInStock: 80,
  },
  {
    name: 'Luxury Pet Bed XL',
    description: 'Extra large pet bed with cushion',
    price: 2999,
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'],
    category: 'PEETS BED',
    countInStock: 15,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedProducts();
