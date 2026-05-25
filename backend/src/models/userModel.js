// Mock User Model for now (Will be replaced with MySQL logic later)
class User {
  static users = []; // In-memory storage for now
  static idCounter = 1;

  constructor(userData) {
    this.id = User.idCounter++;
    this.name = userData.name;
    this.email = userData.email;
    this.createdAt = new Date();
  }

  static async findAll() {
    // Simulate async DB call
    return Promise.resolve(this.users);
  }

  static async create(userData) {
    // Simulate async DB call
    const newUser = new User(userData);
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  static async update(id, updateData) {
    // Simulate async DB call
    const userIndex = this.users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) return Promise.resolve(null);

    const user = this.users[userIndex];
    const updatedUser = { ...user, ...updateData, id: user.id }; // Ensure ID doesn't change
    this.users[userIndex] = updatedUser;
    
    return Promise.resolve(updatedUser);
  }
}

export default User;