export default class Transaction {
  constructor(data = {}) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.date = data.date ? new Date(data.date).toISOString().split('T')[0] : null;
    this.description = data.description || '';
    this.amount = data.amount ? parseFloat(data.amount) : 0;
    this.direction = data.direction || 'debit';
    this.type = data.type || null;
    this.category = data.category || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }

  // Used for sending to backend
  toPayload() {
    return {
      userId: this.userId,
      date: this.date,
      description: this.description,
      amount: this.amount,
      direction: this.direction,
      type: this.type,
      category: this.category
    };
  }

  static fromPayload(data) {
    if (!data) return null;
    return new Transaction(data);
  }
}
