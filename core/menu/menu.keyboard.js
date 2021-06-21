import { menuService } from './menu.service.js';

export const menuKeyboard = { 
  reply_markup: {
    inline_keyboard: [
      ...(await menuService.getInlineKeyboard()),
      [
        { text: 'Корзина', callback_data: 'cart' },
        { text: 'Назад', callback_data: 'start' }
      ]
    ]
  } 
};