import { STATUS_LIST } from './admin.constant.js';

export const adminKeyboard = (currentStatus, callbackData) => {

	let statusList = STATUS_LIST.filter((status) => currentStatus !== status);

	return {
		reply_markup: {
	    inline_keyboard: [
	    	statusList.map((status) => ({ text: status, callback_data: `${status} ${callbackData}` }))
	    ]
	  }
	}
};