import { cache } from '../../main/cache/index.js';
import { orderPaymentMethodKeyboard, toStartKeyboard } from './order.keyboard.js';
import { orderService } from './order.service.js';

export const orderAction = async function(ctx) {
  const chatId = ctx.message.chat.id;
  let userData = cache.get(chatId);
  const userId = userData.user.id;
  const userName = userData.user.userName;
  const accountName = userData.user.userAccauntName;
  const totalPrice = userData.cart.totalPrice;
  const productsData = Object.entries(userData.cart.products).map((value) => ({ productId: value[0], count: value[1].count }));
  let phoneMsg = await this.sendMessage(chatId, 'Введите ваш телефон:');
  userData.messages.push(phoneMsg.message_id);
  this.once('message', async (ctx) => {
    userData.messages.push(ctx.message_id);
    let phone = ctx.text;
    let addressMsg = await this.sendMessage(chatId, 'Введите адресс:');
    userData.messages.push(addressMsg.message_id);
    this.once('message', async (ctx) => {
      userData.messages.push(ctx.message_id);
      let address = ctx.text;
      let commentMsg = await this.sendMessage(chatId, 'Оставьте комментарий(если требуется):');
      userData.messages.push(commentMsg.message_id);
      this.once('message', async (ctx) => {
        userData.messages.push(ctx.message_id);
        let comment = ctx.text;
        let paymentMethodMsg = await this.sendMessage(chatId, 'Выберете способ оплаты:', orderPaymentMethodKeyboard);
        userData.messages.push(paymentMethodMsg.message_id);
        this.once('callback_query', async (ctx) => {
          userData.messages.push(ctx.message_id);
          let paymentMethod = ctx.data;
          let order = await orderService.createOrder({ userId, userName, accountName, phone, address, totalPrice, comment, productsData });
          let completeMsg = await this.sendMessage(chatId, 'Заказ оформлен!', toStartKeyboard);
          userData.messages.push(completeMsg.message_id);
          cache.set(chatId, userData);
        });
      });
    });
  });
};