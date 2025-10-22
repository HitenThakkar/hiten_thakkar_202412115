require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('./generated/mongo');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const prismaMongo = new PrismaClient();
async function testMongoConnection() {
  try {
    await prismaMongo.$connect();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

testMongoConnection().then(() => {
  const authRoutes = require('./routes/auth');
  const productRoutes = require('./routes/product');
  const orderRoutes = require('./routes/order');
  const reportRoutes = require('./routes/report');

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/reports', reportRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});