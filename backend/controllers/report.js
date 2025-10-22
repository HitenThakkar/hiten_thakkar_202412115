const { PrismaClient: PrismaClientSQL } = require('../generated/sql');
const { PrismaClient: PrismaClientMongo } = require('../generated/mongo');
const prismaSql = new PrismaClientSQL();
const prismaMongo = new PrismaClientMongo();

const getDailyRevenue = async (req, res) => {
  try {
    const revenues = await prismaSql.$queryRaw`
      SELECT DATE(createdAt) as date, SUM(total) as revenue 
      FROM orders  -- Updated to 'orders' table
      GROUP BY date
      ORDER BY date DESC
    `;
    console.log('Daily revenue query result:', revenues); // Log for debugging
    res.json(revenues || []); // Return empty array if no results
  } catch (error) {
    console.error('Daily revenue error:', error);
    res.status(500).json({ message: 'Failed to fetch daily revenue' });
  }
};

const getCategoryAveragePrice = async (req, res) => {
  try {
    const averages = await prismaMongo.product.groupBy({
      by: ['category'],
      _avg: { price: true },
    });
    console.log('Category average query result:', averages); // Log for debugging
    res.json(averages || []); // Return empty array if no results
  } catch (error) {
    console.error('Category average error:', error);
    res.status(500).json({ message: 'Failed to fetch category averages' });
  }
};

module.exports = { getDailyRevenue, getCategoryAveragePrice };