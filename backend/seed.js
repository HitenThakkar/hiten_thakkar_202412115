// Use aliased imports to avoid naming conflict
const { PrismaClient: PrismaClientSQL } = require('./generated/sql');
const { PrismaClient: PrismaClientMongo } = require('./generated/mongo');
const prismaSql = new PrismaClientSQL();
const prismaMongo = new PrismaClientMongo();
const bcrypt = require('bcrypt');

async function seed() {
  const passwordHash = await bcrypt.hash('password', 10);
  await prismaSql.user.createMany({
    data: [
      { name: 'Admin', email: 'admin@gmail.com', passwordHash, role: 'admin' },
      { name: 'Customer', email: 'customer@gmail.com', passwordHash, role: 'customer' },
    ]
  });
  await prismaMongo.product.createMany({
    data: [
      { sku: 'ELEC-1001', name: 'Wireless Mouse', price: 25.99, category: 'electronics', updatedAt: new Date() },
      { sku: 'ELEC-1002', name: 'Bluetooth Headphones', price: 79.5, category: 'electronics', updatedAt: new Date() },
      { sku: 'FASH-2001', name: 'Mens Leather Jacket', price: 150, category: 'fashion', updatedAt: new Date() },
      { sku: 'CLOTH-3001', name: 'Womens Cotton T-shirt', price: 20, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'HARD-4001', name: 'Cordless Drill', price: 120, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1003', name: 'Smartphone Stand', price: 15.75, category: 'electronics', updatedAt: new Date() },
      { sku: 'CLOTH-3002', name: 'Unisex Hoodie', price: 45, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'FASH-2002', name: 'Designer Handbag', price: 220.99, category: 'fashion', updatedAt: new Date() },
      { sku: 'HARD-4002', name: 'Adjustable Wrench', price: 18.4, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1004', name: 'Gaming Keyboard', price: 89.9, category: 'electronics', updatedAt: new Date() },
      { sku: 'FASH-2003', name: 'Aviator Sunglasses', price: 55.2, category: 'fashion', updatedAt: new Date() },
      { sku: 'CLOTH-3003', name: 'Slim Fit Jeans', price: 60, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'HARD-4003', name: 'Screwdriver Set', price: 29.99, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1005', name: 'USB-C Charger', price: 29.95, category: 'electronics', updatedAt: new Date() },
      { sku: 'CLOTH-3004', name: 'Graphic Sweatshirt', price: 35.5, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'FASH-2004', name: 'Silk Scarf', price: 45, category: 'fashion', updatedAt: new Date() },
      { sku: 'HARD-4004', name: 'Toolbox Organizer', price: 75, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1006', name: 'LED Desk Lamp', price: 42.5, category: 'electronics', updatedAt: new Date() },
      { sku: 'FASH-2005', name: 'Wool Coat', price: 180, category: 'fashion', updatedAt: new Date() },
      { sku: 'CLOTH-3005', name: 'Running Shoes', price: 90, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'HARD-4005', name: 'Power Saw', price: 210, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1007', name: 'Portable Speaker', price: 55.99, category: 'electronics', updatedAt: new Date() },
      { sku: 'FASH-2006', name: 'Gold Plated Earrings', price: 70, category: 'fashion', updatedAt: new Date() },
      { sku: 'CLOTH-3006', name: 'Crew Neck T-shirt', price: 18.75, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'HARD-4006', name: 'Measuring Tape', price: 12.99, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1008', name: '4K Action Camera', price: 130, category: 'electronics', updatedAt: new Date() },
      { sku: 'FASH-2007', name: 'Linen Pants', price: 65.4, category: 'fashion', updatedAt: new Date() },
      { sku: 'CLOTH-3007', name: 'Baseball Cap', price: 22.99, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'HARD-4007', name: 'Heavy-Duty Hammer', price: 33.5, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1009', name: 'Wireless Earbuds', price: 49.99, category: 'electronics', updatedAt: new Date() },
      { sku: 'FASH-2008', name: 'Casual Sneakers', price: 75, category: 'fashion', updatedAt: new Date() },
      { sku: 'CLOTH-3008', name: 'Long Sleeve Shirt', price: 40, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'HARD-4008', name: 'Nail Gun', price: 149.95, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1010', name: 'Smart Thermostat', price: 199.99, category: 'electronics', updatedAt: new Date() },
      { sku: 'FASH-2009', name: 'Denim Skirt', price: 48.75, category: 'fashion', updatedAt: new Date() },
      { sku: 'CLOTH-3009', name: 'Canvas Jacket', price: 85, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'HARD-4009', name: 'Electric Sander', price: 115, category: 'hardware', updatedAt: new Date() },
      { sku: 'ELEC-1011', name: 'HD Webcam', price: 69.95, category: 'electronics', updatedAt: new Date() },
      { sku: 'FASH-2010', name: 'Maxi Dress', price: 95.5, category: 'fashion', updatedAt: new Date() },
      { sku: 'CLOTH-3010', name: 'Polo Shirt', price: 35, category: 'clothing brand', updatedAt: new Date() },
      { sku: 'HARD-4010', name: 'Ratchet Set', price: 99.99, category: 'hardware', updatedAt: new Date() }
    ]
  });

  // Sample orders for testing reports
  await prismaSql.orders.createMany({
    data: [
      { userId: 2, total: 150.00 }, // Customer order 1
      { userId: 2, total: 75.50 },  // Customer order 2
    ],
  });
  await prismaSql.orderItem.createMany({
    data: [
      { orderId: 1, productId: '68f7bdccd47c61ded0c7a4a0', quantity: 10, priceAtPurchase: 150.00 },
      { orderId: 2, productId: '68f7bdccd47c61ded0c7a4a1', quantity: 15, priceAtPurchase: 75.50 },
    ],
  });

  console.log('Seeded');
}

seed().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });