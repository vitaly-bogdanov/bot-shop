import { menuKeyboard } from './menu.keyboard.js';
import { cache } from '../../main/cache/index.js';

export const menuAction = async function(ctx) {
  const chatId = ctx.message.chat.id;
  let userData = cache.get(chatId);
  userData.messages.forEach((id) => {
    this.deleteMessage(chatId, id);
  });
  userData.messages = [];
  let msg = await this.sendMessage(chatId, 'Меню', menuKeyboard);
  userData.messages.push(msg.message_id);
  cache.set(chatId, userData);
};