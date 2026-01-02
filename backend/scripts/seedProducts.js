import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Cabbage',
    description: 'Fresh and crispy cabbage, locally grown',
    price: 20,
    image: '/src/assets/items/cabbage.png',
    category: 'vegetable',
    stock: 100,
    unit: 'kg',
    rating: 4.2,
  },
  {
    name: 'Brocolli',
    description: 'Organic broccoli, rich in vitamins',
    price: 50,
    image: '/src/assets/items/brocolli.png',
    category: 'vegetable',
    stock: 80,
    unit: 'kg',
    rating: 4.5,
  },
  {
    name: 'Tomato',
    description: 'Ripe red tomatoes, farm fresh',
    price: 20,
    image: '/src/assets/items/tomato.png',
    category: 'vegetable',
    stock: 150,
    unit: 'kg',
    rating: 4.0,
  },
  {
    name: 'Potato',
    description: 'Fresh potatoes, perfect for cooking',
    price: 20,
    image: '/src/assets/items/potato.png',
    category: 'vegetable',
    stock: 200,
    unit: 'kg',
    rating: 4.1,
  },
  {
    name: 'Peas',
    description: 'Sweet green peas, locally sourced',
    price: 50,
    image: '/src/assets/items/peas.png',
    category: 'vegetable',
    stock: 60,
    unit: 'kg',
    rating: 4.3,
  },
  {
    name: 'Lady Finger',
    description: 'Fresh lady finger, tender and delicious',
    price: 20,
    image: '/src/assets/items/lady_finger.png',
    category: 'vegetable',
    stock: 90,
    unit: 'kg',
    rating: 4.0,
  },
  {
    name: 'Onion',
    description: 'Premium quality onions',
    price: 80,
    image: '/src/assets/items/onion.png',
    category: 'vegetable',
    stock: 120,
    unit: 'kg',
    rating: 4.2,
  },
  {
    name: 'Banana',
    description: 'Sweet and ripe bananas',
    price: 40,
    image: '/src/assets/items/banana.png',
    category: 'fruit',
    stock: 100,
    unit: 'dozen',
    rating: 4.4,
  },
  {
    name: 'Apple',
    description: 'Crisp and juicy red apples',
    price: 50,
    image: '/src/assets/items/Apple.png',
    category: 'fruit',
    stock: 80,
    unit: 'kg',
    rating: 4.6,
  },
  {
    name: 'Guava',
    description: 'Fresh guavas, rich in vitamin C',
    price: 60,
    image: '/src/assets/items/Guava.png',
    category: 'fruit',
    stock: 70,
    unit: 'kg',
    rating: 4.3,
  },
  {
    name: 'Kiwi',
    description: 'Imported kiwi, sweet and tangy',
    price: 120,
    image: '/src/assets/items/Kiwi.png',
    category: 'fruit',
    stock: 50,
    unit: 'kg',
    rating: 4.7,
  },
  {
    name: 'Watermelon',
    description: 'Fresh watermelon, perfect for summer',
    price: 70,
    image: '/src/assets/items/Watermelon.png',
    category: 'fruit',
    stock: 40,
    unit: 'piece',
    rating: 4.5,
  },
  {
    name: 'Grapes',
    description: 'Sweet grapes, locally grown',
    price: 50,
    image: '/src/assets/items/Grapes.png',
    category: 'fruit',
    stock: 60,
    unit: 'kg',
    rating: 4.4,
  },
  {
    name: 'Pomegranate',
    description: 'Premium pomegranates, rich in antioxidants',
    price: 100,
    image: '/src/assets/items/Pomegranate.png',
    category: 'fruit',
    stock: 45,
    unit: 'kg',
    rating: 4.6,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/freshest'
    );
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();

