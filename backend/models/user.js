const { PrismaClient } = require('../generated/sql');
const prisma = new PrismaClient();

module.exports = {
  createUser: async (user) => await prisma.user.create({ data: user }),
  findUserByEmail: async (email) => await prisma.user.findUnique({ where: { email } }),
};