import prisma from "../config/prisma.js";
import Transaction from "../models/Transaction.js";

class TransactionService {
  static async getAllTransactions(filters = {}) {
    const { userId, startDate, endDate, direction, category, type } = filters;
    const where = { userId: BigInt(userId) };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }
    
    if (direction) where.direction = direction;
    if (category) where.category = category;
    if (type) where.type = type;

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