import Prisma from '@prisma/client';

import { cache } from '../../main/cache/index.js';

const { PrismaClient } = Prisma;

class AddService {
  constructor(db = new PrismaClient()) {
    this.db = db;
  }

  async getAll() {
    return this.db.product.findMany(); 
  }

  async getActions() {
    let actions = [];
    (await this.getAll()).forEach(product => {
      actions[`cart/${product.slug}`] = async function(ctx) {
        const chatId = ctx.message.chat.id;
        const userData = cache.get(chatId);
        userData.cart.totalPrice = userData.cart.totalPrice + product.price;
        userData.cart.totalCount = userData.cart.totalCount + 1;
        if (userData.cart.products[product.id]) {
          userData.cart.products[product.id].count = userData.cart.products[product.id].count + 1;
        } else {
          userData.cart.products[product.id] = { name: product.name, count: 1, price: product.price };
        }
        cache.set(chatId, userData);
        console.log(cache.get(chatId));
      }
    });
    return actions;
  }
};

export const addService = new AddService();