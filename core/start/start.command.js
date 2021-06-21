import { startKeyboard } from './start.keyboard.js';
import { welcomeMessagePrint, startService } from './start.service.js';
import { cache } from '../../main/cache/index.js';
import { HEAD_TITLE } from './start.constant.js';

export const startCommand = async function(ctx) {

  // create user
  let user = await startService.getUser(ctx.from.id);
  if (!user) {
    user = await startService.createUser(ctx.from.id, ctx.from.username, ctx.from.first_name);
  }

  const chatId = ctx.chat.id;
  const userAccauntName = user.accountName;
  const userName = user.userName;
  const id = user.id;

  const botName = (await this.getMe()).username;

  let welcomeMsg = await this.sendMessage(chatId, welcomeMessagePrint(userName, botName));
  let startMsg = await this.sendMessage(chatId, HEAD_TITLE, startKeyboard);
  cache.set(chatId, 
    { 
      user: { id, userName, userAccauntName },
      cart: { totalPrice: 0, totalCount: 0, products: {} }, 
      messages: [ welcomeMsg.message_id, startMsg.message_id ] 
    }
  );
};