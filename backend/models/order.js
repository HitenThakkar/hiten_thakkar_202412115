const { PrismaClient } = require('../generated/sql');
const prisma = new PrismaClient();

module.exports = {
  createOrder: async (order) => await prisma.order.create({ data: order }),
  createManyOrderItems: async (items) => await prisma.orderItem.createMany({ data: items }),
  getUserOrders: async (userId) => await prisma.order.findMany({ where: { userId }, include: { items: true } }),
};