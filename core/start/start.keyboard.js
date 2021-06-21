export const startKeyboard = { 
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Меню', callback_data: 'menu' },
        { text: 'Мои заказы', callback_data: 'myOrder' }
      ],
      [
        { text: 'Промо-код', callback_data: 'promo' },
        { text: 'Поддержка', url: 't.me/kaliummati' },
      ]
    ]
  } 
};