export const backKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Меню', callback_data: 'menu' }
      ]
    ]
  } 
};

export const toOrderKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Оформить заказ', callback_data: 'order' },
        { text: 'Меню', callback_data: 'menu' }
      ]
    ]
  }
};