import TransactionService from "../services/transactionService.js";

// Validation helper
const validateTransactionData = (data) => {
  const { date, description, amount, direction } = data;
  
  if (!date || !description || amount === undefined || amount === null || !direction) {
    return "date, description, amount, and direction are required.";
  }
  
  if (direction !== "debit" && direction !== "credit") {
    return "direction must be either 'debit' or 'credit'.";
  }
  
  if (isNaN(Number(amount))) {
    return "amount must be a valid number.";
  }

  return null;
};

export const getTransactions = async (req, res) => {
  try {
    // TODO: Replace with req.user.id once auth middleware is implemented
    const userId = req.query.userId || req.body.userId;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: userId is required" });
    }

    const { startDate, endDate, direction, category, type } = req.query;
    
    const transactions = await TransactionService.getAllTransactions(userId, {
      startDate,
      endDate,
      direction,
      category,
      type
    });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions.map((t) => t.toJSON()),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error retrieving transactions", error: error.message });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Replace with req.user.id once auth middleware is implemented
    const userId = req.query.userId || req.body.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: userId is required" });
    }

    const transaction = await TransactionService.getTransactionById(id, userId);

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    return res.status(200).json({
      success: true,
      data: transaction.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error retrieving transaction", error: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    // TODO: Replace with req.user.id once auth middleware is implemented
    const userId = req.body.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: userId is required" });
    }

    const validationError = validateTransactionData(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const transaction = await TransactionService.createTransaction(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating transaction", error: error.message });
  }
};

export const importTransactions = async (req, res) => {
  try {
    // TODO: Replace with req.user.id once auth middleware is implemented
    const userId = req.body.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: userId is required" });
    }

    const { transactions } = req.body;

    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({ success: false, message: "A non-empty array of transactions is required." });
    }

    // Validate all items before inserting
    for (let i = 0; i < transactions.length; i++) {
      const error = validateTransactionData(transactions[i]);
      if (error) {
        return res.status(400).json({ success: false, message: `Validation failed at index ${i}: ${error}` });
      }
    }

    const count = await TransactionService.createManyTransactions(userId, transactions);

    // Fetch the newly created transactions (optional, could just return the count)
    // For simplicity, we just return the count as requested by the expected payload.
    return res.status(201).json({
      success: true,
      message: "Transactions imported successfully",
      count,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error importing transactions", error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Replace with req.user.id once auth middleware is implemented
    const userId = req.body.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: userId is required" });
    }

    // Partial validation (only validate provided fields)
    if (req.body.direction && req.body.direction !== "debit" && req.body.direction !== "credit") {
      return res.status(400).json({ success: false, message: "direction must be either 'debit' or 'credit'." });
    }
    if (req.body.amount !== undefined && req.body.amount !== null && isNaN(Number(req.body.amount))) {
      return res.status(400).json({ success: false, message: "amount must be a valid number." });
    }

    const transaction = await TransactionService.updateTransaction(id, userId, req.body);

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found or unauthorized" });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating transaction", error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Replace with req.user.id once auth middleware is implemented
    const userId = req.body.userId || req.query.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: userId is required" });
    }

    const deleted = await TransactionService.deleteTransaction(id, userId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Transaction not found or unauthorized" });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting transaction", error: error.message });
  }
};