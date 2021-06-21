import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv'; dotenv.config();

import { startCommand, START_ACTION, startAction } from './core/start/index.js';
import { menuAction, MENU_ACTION } from './core/menu/index.js';
import { cartAction } from './core/cart/index.js';
import { orderAction } from './core/order/index.js';
import { addActions } from './core/add/index.js';
import { productActions } from './core/product/index.js'
import { descriptionActions } from './core/description/index.js';
import { myOrderAction } from './core/myOrders/index.js';
import { adminCommand } from './core/admin/index.js';

const botClient = new TelegramBot(process.env.CLIENT_BOT_TOKEN, { polling: true });
const botAdmin = new TelegramBot(process.env.ADMIN_BOT_TOKEN, { polling: true });

botClient.on('message', function(ctx) {
  switch (ctx.text) {
    case `/${START_ACTION}`: startCommand.bind(botClient)(ctx); break;
    default: return;
  }
});

let callbackQueries = {
  start: startAction,
  menu: menuAction,
  cart: cartAction,
  order: orderAction,
  myOrder: myOrderAction,
  ...addActions,
  ...productActions,
  ...descriptionActions
}

botClient.on('callback_query', function(ctx) {
  if (callbackQueries[ctx.data]) callbackQueries[ctx.data].bind(botClient)(ctx);
});

botAdmin.on('message', function(ctx) {
  switch (ctx.text) {
    case '/start': adminCommand.bind(botAdmin)(ctx); break;
    default: return;
  }
});