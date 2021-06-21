import { cache } from '../../main/cache/index.js';
import { myOrderMenyKeyboard } from './myOrders.keyboard.js';
import { myOrdersService } from './myOrders.service.js';

export const myOrderAction = async function(ctx) {
	const chatId = ctx.message.chat.id;
	let userData = cache.get(chatId);
  userData.messages.forEach((id) => {
    this.deleteMessage(chatId, id);
  });
  userData.messages = [];
  const telegramId = ctx.from.id;
  const orders = await myOrdersService.getUserOrders(telegramId);
  for (let order of orders) {
    const text = `Статус: ${order.status}\nСумма заказа: ${order.totalPrice}`;
    userData.messages.push((await this.sendMessage(chatId, text)).message_id);
  }
  userData.messages.push((await this.sendMessage(chatId, 'Вернуться в главное меню?', myOrderMenyKeyboard)).message_id);
  cache.set(chatId, userData);
};