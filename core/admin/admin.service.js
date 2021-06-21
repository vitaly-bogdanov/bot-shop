import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AdminService {
  constructor(db = new PrismaClient()) {
    this.db = db;
  }

  async getOrders() {
  	return this.db.order.findMany();
  }

  async setStatus(id, status) {
    return this.db.order.update({ where: { id: +id }, data: { status } });
  }
};

export const adminService = new AdminService();