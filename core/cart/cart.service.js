import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class CartService {
  constructor(db = new PrismaClient()) {
    this.db = db;
  }

  async getProductById(id) {
    return this.db.product.findUnique({ where: { id: +id } });
  }

  async getProductsByIdsList(idsList) {
    return idsList.map(async (id) => {
      return await this.getProductById(id);
    });
  }
}

export const cartService = new CartService();