const { PrismaClient } = require('../generated/mongo');
const prisma = new PrismaClient();

module.exports = {
  getProducts: async (options) => await prisma.product.findMany(options),
  createProduct: async (product) => await prisma.product.create({ data: product }),
  updateProduct: async (id, product) => await prisma.product.update({ where: { id }, data: product }),
  deleteProduct: async (id) => await prisma.product.delete({ where: { id } }),
  searchProducts: async (search, category, skip, take, orderBy) => await prisma.product.findMany({
    where: {
      AND: [
        search ? { name: { contains: search } } : {},
        category ? { category } : {},
      ]
    },
    skip, take, orderBy,
  }),
  countProducts: async (search, category) => await prisma.product.count({
    where: {
      AND: [
        search ? { name: { contains: search } } : {},
        category ? { category } : {},
      ]
    },
  }),
};