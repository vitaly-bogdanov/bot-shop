import { backKeyboard, toOrderKeyboard } from './cart.keyboard.js';
import { cartService } from './cart.service.js';
import { cache } from '../../main/cache/index.js';

export const cartAction = async function(ctx) {
  const chatId = ctx.message.chat.id;
  let userData = cache.get(chatId);
  userData?.messages.forEach((id) => {
    this.deleteMessage(chatId, id);
  });
  userData.messages = [];
  let text = 'Корзина пуста';
  let notEmptyCartText = '';
  let products = [];
  if (userData.cart.totalCount) {
    const productIds = Object.keys(userData.cart.products);
    const promiseProductList = await cartService.getProductsByIdsList(productIds);
    let products = await Promise.all(promiseProductList);
    text = `
      Корзина
      Сумма заказа: ${userData.cart.totalPrice} р.
    `;
    for await (let product of products) {
      userData.messages.push((await this.sendPhoto(chatId, product.image)).message_id);
      let descritpion = `
        ${product.name}
        Цена: ${product.price} р.
        Кол-во: ${userData.cart.products[product.id].count} шт.
        Описание: ${product.description}
      `;
      userData.messages.push((await this.sendMessage(chatId, descritpion)).message_id)
    }
    let toOrderMsg = await this.sendMessage(chatId, text, toOrderKeyboard);
    userData.messages.push(toOrderMsg.message_id);
  } else {
    let msg = await this.sendMessage(chatId, text, backKeyboard);
    userData.messages.push(msg.message_id);
  }
  cache.set(chatId, userData);
};
