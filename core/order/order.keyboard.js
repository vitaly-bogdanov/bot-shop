export const orderPaymentMethodKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Наличные', callback_data: 'cache' },
        { text: 'Банковская карта', callback_data: 'bank_card' }
      ]
    ]
  }
};

export const toStartKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Вернуться', callback_data: 'start' }
      ]
    ]
  }
};