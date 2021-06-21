import Prisma from '@prisma/client';

import { cache } from '../../main/cache/index.js';
import { descriptionKeyboard } from './description.keyboard.js';

const { PrismaClient } = Prisma;

class DescriptionService {
  constructor(db = new PrismaClient()) {
    this.db = db;
  }

  async getAll() {
    return this.db.product.findMany({ include: { category: true } });
  }

  async getActions() {
    let actions = {};
    (await this.getAll()).forEach(product => {
      actions[product.slug] = async function(ctx) {
        const chatId = ctx.message.chat.id;
        let userData = cache.get(chatId);

        if (!userData) return;

        userData.cart.totalPrice = userData.cart.totalPrice + product.price;
        userData.cart.totalCount = userData.cart.totalCount + 1;
        if (userData.cart.products[product.id]) {
          userData.cart.products[product.id].count = userData.cart.products[product.id].count + 1;
        } else {
          userData.cart.products[product.id] = { name: product.name, count: 1, price: product.price };
        }

        userData.messages.forEach((id) => {
          this.deleteMessage(chatId, id);
        });
        userData.messages = [];

        let descriptionText = `
          Название: ${product.name} \n
          Цена: ${product.price} р.
          Описание: ${product.description}
        `;
        let photoMsg = await this.sendPhoto(chatId, product.image);
        let textMsg = await this.sendMessage(chatId, descriptionText, descriptionKeyboard(product.category.slug));
        userData.messages.push(textMsg.message_id);
        userData.messages.push(photoMsg.message_id);
        cache.set(chatId, userData);
      }
    });
    return actions;
  }
}

export const descriptionService = new DescriptionService();