import TransactionService from "../services/transactionService.js";

// Validation helper
// it will help us to validat the data and its types before making any operations
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


// it will help us to get the trasaction based on passed query filters
export const getTransactions = async (req, res) => {
  try {
    const { userId, startDate, endDate, direction, category, type } = req.query;
    
    const transactions = await TransactionService.getAllTransactions({
      userId,
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



export const createTransaction = async (req, res) => {
  try {
    const validationError = validateTransactionData(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    // Check if userId is provided in the body (for now, until we implement auth middleware)
    const userId = req.body.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: userId is required" });
    }

    const transaction = await TransactionService.createTransaction(req.body);

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating transaction", error: error.message });
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