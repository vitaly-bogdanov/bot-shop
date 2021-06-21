import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

class MenuService {
  constructor(db = new PrismaClient()) {
    this.db = db;
  }

  async getAll() {
    return this.db.category.findMany(); 
  }

  async getInlineKeyboard() {
    return (await this.getAll()).map(category => {
      return [
        { text: category.name, callback_data: category.slug }
      ];
    });
  }
};

export const menuService = new MenuService();