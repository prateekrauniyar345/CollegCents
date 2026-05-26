import axiosClient from '../lib/axiosClient';
import Transaction from '../models/transaction';

export const getTransactionSummary = async (userId) => {
  try {
    const response = await axiosClient.get('/transactions/summary', { params: { userId } });
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to get transaction summary:', error);
    throw error;
  }
};

export const getTransactions = async (userId, filters = {}) => {
  try {
    const params = { userId, ...filters };
    const response = await axiosClient.get('/transactions', { params });
    if (response.data.success) {
      return response.data.data.map(Transaction.fromPayload);
    }
    return [];
  } catch (error) {
    console.error('Failed to get transactions:', error);
    throw error;
  }
};

export const createTransaction = async (transaction) => {
  try {
    const response = await axiosClient.post('/transactions', transaction.toPayload());
    if (response.data.success) {
      return Transaction.fromPayload(response.data.data);
    }
    return null;
  } catch (error) {
    console.error('Failed to create transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (id, userId, updates) => {
  try {
    const payload = { ...updates, userId };
    const response = await axiosClient.patch(`/transactions/${id}`, payload);
    if (response.data.success) {
      return Transaction.fromPayload(response.data.data);
    }
    return null;
  } catch (error) {
    console.error('Failed to update transaction:', error);
    throw error;
  }
};

export const deleteTransaction = async (id, userId) => {
  try {
    const response = await axiosClient.delete(`/transactions/${id}`, {
      data: { userId } // Sending in body as fallback, or use query param depending on backend handling
    });
    return response.data.success;
  } catch (error) {
    console.error('Failed to delete transaction:', error);
    throw error;
  }
};
