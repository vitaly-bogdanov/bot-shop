import { adminService } from './admin.service.js';
import { adminKeyboard } from './admin.keyboard.js';
import { cache } from '../../main/cache/index.js';

export const adminCommand = async function(ctx) {
	const chatId = ctx.from.id;
	const orders = await adminService.getOrders();
	let msgs = [];

	for (let order of orders) {
		const text = `Адресс: ${order.address}\nТелефон: ${order.phone}\nСумма: ${order.totalPrice} р.\nКомментарий: ${order.comment}\nСтатус: ${order.status}`;
		msgs.push((await this.sendMessage(chatId, text, adminKeyboard(order.status, order.id))).message_id);
	}

	this.once('callback_query', async (ctx) => {
		for (let msg of msgs) {
			this.deleteMessage(chatId, msg);
		}
		let data = ctx.data.split(' ');
		const status = data[0];
		const id = data[1];
		await adminService.setStatus(id, status);
		await adminCommand.bind(this)(ctx);
	});
};