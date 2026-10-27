import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database file paths
const DATA_DIR = join(__dirname, 'data');
const PRODUCTS_FILE = join(DATA_DIR, 'products.json');
const ORDERS_FILE = join(DATA_DIR, 'orders.json');
const CART_FILE = join(DATA_DIR, 'carts.json');

// Ensure data directory exists
try {
  await fs.access(DATA_DIR);
} catch {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

// Helper functions
async function readJSONFile(filePath, defaultData = []) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with default data
    await writeJSONFile(filePath, defaultData);
    return defaultData;
  }
}

async function writeJSONFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Initialize products data
const initialProducts = [
  {
    id: '1',
    name: 'Arnica Montana 30C',
    price: 12.99,
    originalPrice: 15.99,
    image: 'https://images.pexels.com/photos/3873193/pexels-photo-3873193.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pain Relief',
    description: 'Natural remedy for bruises, soreness, and muscle pain. Made from mountain daisy.',
    ingredients: ['Arnica Montana', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets under tongue 3 times daily or as directed by practitioner.',
    stock: 45,
    rating: 4.8,
    reviews: 127,
    isOnSale: true
  },
  {
    id: '2',
    name: 'Belladonna 200C',
    price: 14.50,
    image: 'https://images.pexels.com/photos/5946080/pexels-photo-5946080.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fever & Inflammation',
    description: 'Effective for sudden onset fever, headaches, and inflammatory conditions.',
    ingredients: ['Belladonna', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets under tongue every 2 hours during acute symptoms.',
    stock: 32,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Chamomilla 30C',
    price: 11.75,
    image: 'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Sleep & Relaxation',
    description: 'Gentle remedy for sleeplessness, teething pain, and irritability in children and adults.',
    ingredients: ['Chamomilla', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets before bedtime or as needed for calming.',
    stock: 67,
    rating: 4.9,
    reviews: 203
  },
  {
    id: '4',
    name: 'Ignatia Amara 30C',
    price: 13.25,
    image: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Emotional Support',
    description: 'Natural support for grief, emotional stress, and mood swings.',
    ingredients: ['Ignatia Amara', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets 2-3 times daily during emotional distress.',
    stock: 28,
    rating: 4.7,
    reviews: 156
  },
  {
    id: '5',
    name: 'Nux Vomica 30C',
    price: 12.50,
    image: 'https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Digestive Health',
    description: 'Excellent for digestive issues, hangover, and overindulgence symptoms.',
    ingredients: ['Nux Vomica', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets before meals or as directed.',
    stock: 41,
    rating: 4.5,
    reviews: 94
  },
  {
    id: '6',
    name: 'Pulsatilla 200C',
    price: 15.99,
    originalPrice: 18.99,
    image: 'https://images.pexels.com/photos/6207386/pexels-photo-6207386.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Respiratory Health',
    description: 'Natural remedy for respiratory conditions, allergies, and sinus issues.',
    ingredients: ['Pulsatilla', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets 3 times daily or as recommended.',
    stock: 19,
    rating: 4.8,
    reviews: 178,
    isOnSale: true
  },
  {
    id: '7',
    name: 'Rhus Toxicodendron 30C',
    price: 13.75,
    image: 'https://images.pexels.com/photos/6823576/pexels-photo-6823576.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Joint & Muscle',
    description: 'Effective for joint stiffness, arthritis, and muscle strains.',
    ingredients: ['Rhus Toxicodendron', 'Lactose', 'Sucrose'],
    usage: 'Take 3-5 pellets morning and evening.',
    stock: 35,
    rating: 4.6,
    reviews: 112
  },
  {
    id: '8',
    name: 'Calendula Cream',
    price: 18.99,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Topical Care',
    description: 'Healing cream for cuts, scrapes, and skin irritations. Natural antiseptic properties.',
    ingredients: ['Calendula Extract', 'Beeswax', 'Coconut Oil', 'Vitamin E'],
    usage: 'Apply thin layer to affected area 2-3 times daily.',
    stock: 52,
    rating: 4.9,
    reviews: 245
  }
];

// Initialize data files
await readJSONFile(PRODUCTS_FILE, initialProducts);
await readJSONFile(ORDERS_FILE, []);
await readJSONFile(CART_FILE, {});

// Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await readJSONFile(PRODUCTS_FILE, []);
    const { category, search } = req.query;
    
    let filteredProducts = products;
    
    if (category && category !== 'All Products') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }
    
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await readJSONFile(PRODUCTS_FILE, []);
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const products = await readJSONFile(PRODUCTS_FILE, []);
    const categories = ['All Products', ...new Set(products.map(p => p.category))];
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Cart routes
app.get('/api/cart/:sessionId', async (req, res) => {
  try {
    const carts = await readJSONFile(CART_FILE, {});
    const cart = carts[req.params.sessionId] || { items: [], total: 0 };
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/cart/:sessionId/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const sessionId = req.params.sessionId;
    
    const products = await readJSONFile(PRODUCTS_FILE, []);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }
    
    const carts = await readJSONFile(CART_FILE, {});
    if (!carts[sessionId]) {
      carts[sessionId] = { items: [], total: 0 };
    }
    
    const existingItem = carts[sessionId].items.find(item => item.product.id === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      carts[sessionId].items.push({ product, quantity });
    }
    
    // Recalculate total
    carts[sessionId].total = carts[sessionId].items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 0
    );
    
    await writeJSONFile(CART_FILE, carts);
    res.json(carts[sessionId]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

app.put('/api/cart/:sessionId/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = req.params.sessionId;
    
    const carts = await readJSONFile(CART_FILE, {});
    if (!carts[sessionId]) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    if (quantity <= 0) {
      carts[sessionId].items = carts[sessionId].items.filter(
        item => item.product.id !== productId
      );
    } else {
      const item = carts[sessionId].items.find(item => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    }
    
    // Recalculate total
    carts[sessionId].total = carts[sessionId].items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 0
    );
    
    await writeJSONFile(CART_FILE, carts);
    res.json(carts[sessionId]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

app.delete('/api/cart/:sessionId/remove/:productId', async (req, res) => {
  try {
    const { sessionId, productId } = req.params;
    
    const carts = await readJSONFile(CART_FILE, {});
    if (!carts[sessionId]) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    
    carts[sessionId].items = carts[sessionId].items.filter(
      item => item.product.id !== productId
    );
    
    // Recalculate total
    carts[sessionId].total = carts[sessionId].items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 0
    );
    
    await writeJSONFile(CART_FILE, carts);
    res.json(carts[sessionId]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

app.delete('/api/cart/:sessionId/clear', async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    
    const carts = await readJSONFile(CART_FILE, {});
    carts[sessionId] = { items: [], total: 0 };
    
    await writeJSONFile(CART_FILE, carts);
    res.json(carts[sessionId]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

// Order routes
app.post('/api/orders', async (req, res) => {
  try {
    const { sessionId, customerInfo, items } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in order' });
    }
    
    // Validate stock availability
    const products = await readJSONFile(PRODUCTS_FILE, []);
    for (const item of items) {
      const product = products.find(p => p.id === item.product.id);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${item.product.name}` 
        });
      }
    }
    
    // Create order
    const order = {
      id: uuidv4(),
      sessionId,
      customerInfo,
      items,
      total: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
      tax: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * 0.08,
      grandTotal: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * 1.08,
      status: 'pending',
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    // Update stock
    for (const item of items) {
      const productIndex = products.findIndex(p => p.id === item.product.id);
      if (productIndex !== -1) {
        products[productIndex].stock -= item.quantity;
      }
    }
    
    // Save order and updated products
    const orders = await readJSONFile(ORDERS_FILE, []);
    orders.push(order);
    
    await writeJSONFile(ORDERS_FILE, orders);
    await writeJSONFile(PRODUCTS_FILE, products);
    
    // Clear cart
    const carts = await readJSONFile(CART_FILE, {});
    if (carts[sessionId]) {
      carts[sessionId] = { items: [], total: 0 };
      await writeJSONFile(CART_FILE, carts);
    }
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const orders = await readJSONFile(ORDERS_FILE, []);
    const order = orders.find(o => o.id === req.params.orderId);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});