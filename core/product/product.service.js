import Prisma from '@prisma/client';

import { productKeyboard, backKeyboard, addKeyboard } from './product.keyboard.js';
import { cache } from '../../main/cache/index.js';

const { PrismaClient } = Prisma;

class ProductService {
  constructor(db = new PrismaClient()) {
    this.db = db;
  }

  async getAll() {
    return this.db.category.findMany({ include: { products: true } }); 
  }

  async getActions() {
    let actions = {};
    (await this.getAll()).forEach(category => {
      actions[category.slug] = async function(ctx) {
        const chatId = ctx.message.chat.id;
        let userData = cache.get(chatId);
        userData.messages.forEach(id => {
          this.deleteMessage(chatId, id);
        });
        userData.messages = [];
        for await (let product of category.products) {
          let phMsg = await this.sendPhoto(chatId, product.image, productKeyboard(product));
          const previewText = `${product.name}\n${product.price} р.`;
          let addMsg = await this.sendMessage(chatId, previewText, addKeyboard(product.slug));
          userData.messages.push(addMsg.message_id);
          userData.messages.push(phMsg.message_id);
        }
        let msg = await this.sendMessage(chatId, 'Или вернуться к меню?', backKeyboard);
        userData.messages.push(msg.message_id);
        cache.set(chatId, userData);
      }
    });
    return actions;
  }
};

export const productService = new ProductService();