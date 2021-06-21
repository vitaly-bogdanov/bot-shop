export const productKeyboard = (product) => ({ 
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Подробнее', callback_data: product.slug }
      ]
    ]
  } 
});

export const addKeyboard = (name) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Добавить корзину', callback_data: `cart/${name}` }
      ]
    ]
  }
});

export const backKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'В меню', callback_data: 'menu' }
      ]
    ]
  }
};