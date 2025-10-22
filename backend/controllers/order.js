const { PrismaClient: PrismaClientSQL } = require('../generated/sql');
const { PrismaClient: PrismaClientMongo } = require('../generated/mongo');
const prismaSql = new PrismaClientSQL();
const prismaMongo = new PrismaClientMongo();

const createOrder = async (req, res) => {
  const { items } = req.body; // Expect { items: [{ productId, quantity }] }
  const userId = req.user.id; // From authenticate middleware

  if (!items || !items.length) {
    return res.status(400).json({ message: 'No items in cart' });
  }

  try {
    // Fetch current prices from MongoDB for server-side total calculation
    const productIds = items.map(item => item.productId);
    const products = await prismaMongo.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = products.reduce((map, p) => {
      map[p.id] = p.price;
      return map;
    }, {});

    let total = 0;
    const orderItems = items.map(item => {
      const priceAtPurchase = productMap[item.productId];
      if (!priceAtPurchase) {
        throw new Error(`Product ${item.productId} not found`);
      }
      total += priceAtPurchase * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase,
      };
    });

    // Create order in SQL (MySQL) - Updated to use 'orders'
    const order = await prismaSql.orders.create({
      data: {
        userId,
        total,
      },
    });

    // Create order_items in SQL (MySQL)
    const orderItemEntries = orderItems.map(item => ({
      orderId: order.id,
      ...item,
    }));
    await prismaSql.orderItem.createMany({
      data: orderItemEntries,
    });

    // Fetch the full order with items for response
    const fullOrder = await prismaSql.orders.findUnique({
      where: { id: order.id },
      include: { items: true }, // Assuming 'items' relation is defined
    });

    res.status(201).json(fullOrder);
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Checkout failed', error: error.message });
  }
};

module.exports = { createOrder };