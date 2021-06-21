export const descriptionKeyboard = (backCallbackData) => ({ 
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Назад', callback_data: backCallbackData }
      ]
    ]
  } 
});