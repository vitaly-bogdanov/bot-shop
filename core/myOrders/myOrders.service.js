import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class MyOrdersService {
  constructor(db = new PrismaClient()) {
    this.db = db;
  }

  async getUserOrders(telegramId) {
    return (await this.db.user.findUnique({ where: { telegramId }, include: { orders: true } })).orders;
  }
}

export const myOrdersService = new MyOrdersService();