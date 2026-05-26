class Transaction {
  constructor({
    id = null,
    userId,
    date,
    description,
    amount,
    direction,
    type = null,
    category = null,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id ? Number(id) : null;
    this.userId = userId ? Number(userId) : null;
    this.date = date ? new Date(date) : null;
    this.description = description;
    this.amount = amount !== undefined && amount !== null ? Number(amount) : null;
    this.direction = direction;
    this.type = type;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrisma(row) {
    if (!row) return null;
    return new Transaction({
      id: row.id,
      userId: row.userId,
      date: row.date,
      description: row.description,
      amount: row.amount,
      direction: row.direction,
      type: row.type,
      category: row.category,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }

  toCreateData() {
    return {
      userId: BigInt(this.userId),
      date: this.date,
      description: this.description,
      amount: this.amount,
      direction: this.direction,
      type: this.type,
      category: this.category,
    };
  }

  toUpdateData() {
    const data = {};
    if (this.date) data.date = this.date;
    if (this.description) data.description = this.description;
    if (this.amount !== null && this.amount !== undefined) data.amount = this.amount;
    if (this.direction) data.direction = this.direction;
    if (this.type !== undefined) data.type = this.type;
    if (this.category !== undefined) data.category = this.category;
    return data;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      date: this.date,
      description: this.description,
      amount: this.amount,
      direction: this.direction,
      type: this.type,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Transaction;