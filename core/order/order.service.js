import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class OrderService {
	constructor(db = new PrismaClient()) {
		this.db = db;
	}

	createOrder({ userId, userName, accountName, phone, address, totalPrice, comment, productsData }) {
		return this.db.order.create(
			{
				include: {
					products: true
				},
				data: {
					phone,
					address,
					totalPrice,
					userId,
					comment,
					products: { create: productsData.map(product => ({ productId: Number(product.productId), count: product.count })) }
				}
			}
		);
	}
};

export const orderService = new OrderService();