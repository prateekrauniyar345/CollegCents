// models/userModel.js
import pool from "../config/db.js";

class User {
  static async findByMicrosoftId(providerUserId, tenantId, provider = "microsoft") {
    const [rows] = await pool.query(
      `SELECT * FROM users
       WHERE provider = ? AND provider_user_id = ? AND tenant_id = ?`,
      [provider, providerUserId, tenantId]
    );

    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    return rows[0] || null;
  }

  static async create(userData) {
    const {
      provider = "microsoft",
      provider_user_id,
      tenant_id,
      home_account_id,
      email,
      name,
      role = "user",
    } = userData;

    const [result] = await pool.query(
      `INSERT INTO users (
        provider,
        provider_user_id,
        tenant_id,
        home_account_id,
        email,
        name,
        role,
        last_login_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        provider,
        provider_user_id,
        tenant_id,
        home_account_id,
        email,
        name,
        role,
      ]
    );

    return this.findById(result.insertId);
  }

  static async updateLastLogin(id) {
    await pool.query(
      `UPDATE users
       SET last_login_at = NOW()
       WHERE id = ?`,
      [id]
    );

    return this.findById(id);
  }

  static async update(id, userData) {
    const { email, name, role } = userData;

    await pool.query(
      `UPDATE users
       SET email = ?, name = ?, role = ?
       WHERE id = ?`,
      [email, name, role, id]
    );

    return this.findById(id);
  }

  static async delete(id) {
    const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }

  static async findOrCreateFromMicrosoft(account) {
    const providerUserId = account.idTokenClaims?.oid;
    const tenantId = account.idTokenClaims?.tid || account.tenantId;

    let user = await this.findByMicrosoftId(providerUserId, tenantId);

    if (user) {
      return this.updateLastLogin(user.id);
    }

    return this.create({
      provider: "microsoft",
      provider_user_id: providerUserId,
      tenant_id: tenantId,
      home_account_id: account.homeAccountId,
      email: account.username,
      name: account.name,
      role: "user",
    });
  }
}

export default User;