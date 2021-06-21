import { startKeyboard } from './start.keyboard.js';
import { cache } from '../../main/cache/index.js';
import { HEAD_TITLE } from './start.constant.js';

export const startAction = async function(ctx) {
  const chatId = ctx.message.chat.id;
  let userData = cache.get(chatId);
  userData.messages.forEach((id) => {
    this.deleteMessage(chatId, id);
  });
  userData.messages = [];
  let msg = await this.sendMessage(chatId, HEAD_TITLE, startKeyboard);
  userData.messages.push(msg.message_id);
  cache.set(chatId, userData);
};