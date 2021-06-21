import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class StartService {
  constructor(db = new PrismaClient()) {
    this.db = db;
  }

  async getUser(telegramId) {
    return await this.db.user.findUnique({ where: { telegramId } });
  }

  async createUser(telegramId, accountName, userName) {
    return await this.db.user.create({ data: { telegramId, accountName, userName } });
  }
};

export const startService = new StartService();

export const welcomeMessagePrint = (userName, botName) => (
  `Добро пожаловать, @${userName} ! Я @${botName}, с моей помощью ты сможешь поесть быстро и вкусно`
);