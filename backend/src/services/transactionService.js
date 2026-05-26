import prisma from "../config/prisma.js";
import Transaction from "../models/Transaction.js";

class TransactionService {
  static async getAllTransactions(userId, filters = {}) {
    const where = { userId: BigInt(userId) };

    if (filters.startDate || filters.endDate) {
      where.date = {};
      if (filters.startDate) where.date.gte = new Date(filters.startDate);
      if (filters.endDate) where.date.lte = new Date(filters.endDate);
    }
    
    if (filters.direction) where.direction = filters.direction;
    if (filters.category) where.category = filters.category;
    if (filters.type) where.type = filters.type;

    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: { date: "desc" },
    });

    return transactions.map((t) => Transaction.fromPrisma(t));
  }

  static async getTransactionById(id, userId) {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: BigInt(id),
        userId: BigInt(userId),
      },
    });

    return Transaction.fromPrisma(transaction);
  }

  static async createTransaction(userId, data) {
    const transactionObj = new Transaction({ ...data, userId });
    
    const transaction = await prisma.transaction.create({
      data: transactionObj.toCreateData(),
    });

    return Transaction.fromPrisma(transaction);
  }

  static async createManyTransactions(userId, transactionsData) {
    const data = transactionsData.map((t) =>
      new Transaction({ ...t, userId }).toCreateData()
    );

    const result = await prisma.transaction.createMany({
      data,
    });

    return result.count;
  }

  static async updateTransaction(id, userId, data) {
    const existing = await this.getTransactionById(id, userId);
    if (!existing) return null;

    const transactionObj = new Transaction(data);
    const updatedData = transactionObj.toUpdateData();
    
    if (Object.keys(updatedData).length === 0) return existing;

    const transaction = await prisma.transaction.update({
      where: { id: BigInt(id) },
      data: updatedData,
    });

    return Transaction.fromPrisma(transaction);
  }

  static async deleteTransaction(id, userId) {
    const existing = await this.getTransactionById(id, userId);
    if (!existing) return false;

    await prisma.transaction.delete({
      where: { id: BigInt(id) },
    });

    return true;
  }
}

export default TransactionService;