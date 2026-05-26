import prisma from "../config/prisma.js";
import Transaction from "../models/Transaction.js";

class TransactionService {
  static async getAllTransactions(filters = {}) {
    const { userId, startDate, endDate, direction, category, type, limit } = filters;
    const where = { userId: BigInt(userId) };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }
    
    if (direction) where.direction = direction;
    if (category) where.category = category;
    if (type) where.type = type;

    const queryOptions = {
      where,
      orderBy: { date: "desc" },
    };

    if (limit) {
      queryOptions.take = parseInt(limit, 10);
    }

    const transactions = await prisma.transaction.findMany(queryOptions); 

    return transactions.map((t) => Transaction.fromPrisma(t));
  }

  static async getTransactionSummary(userId) {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const [totalCreditsResult, totalDebitsResult, monthCreditsResult, monthDebitsResult] = await Promise.all([
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { userId: BigInt(userId), direction: "credit" }
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { userId: BigInt(userId), direction: "debit" }
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { 
          userId: BigInt(userId), 
          direction: "credit",
          date: { gte: firstDayOfMonth, lte: lastDayOfMonth }
        }
      }),
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { 
          userId: BigInt(userId), 
          direction: "debit",
          date: { gte: firstDayOfMonth, lte: lastDayOfMonth }
        }
      })
    ]);

    const totalCredits = totalCreditsResult._sum.amount ? Number(totalCreditsResult._sum.amount) : 0;
    const totalDebits = totalDebitsResult._sum.amount ? Number(totalDebitsResult._sum.amount) : 0;
    
    const monthCredits = monthCreditsResult._sum.amount ? Number(monthCreditsResult._sum.amount) : 0;
    const monthDebits = monthDebitsResult._sum.amount ? Number(monthDebitsResult._sum.amount) : 0;

    const remainingBalance = totalCredits - totalDebits;
    const spendingThisMonth = monthDebits;
    const savingsThisMonth = monthCredits - monthDebits;

    return {
      spendingThisMonth,
      savingsThisMonth,
      remainingBalance
    };
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