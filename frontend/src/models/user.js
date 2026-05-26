// models/User.js
class User {
  constructor({
    id = null,
    provider = "microsoft",
    providerUserId,
    tenantId,
    email = null,
    name = null,
    role = "user",
    createdAt = null,
    updatedAt = null,
    lastLoginAt = null,
  }) {
    this.id = id ? Number(id) : null;
    this.provider = provider;
    this.providerUserId = providerUserId;
    this.tenantId = tenantId;
    this.email = email;
    this.name = name;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLoginAt = lastLoginAt;
  }

  static fromPrisma(row) {
    if (!row) return null;
    return new User({
      id: row.id,
      provider: row.provider,
      providerUserId: row.providerUserId,
      tenantId: row.tenantId,
      email: row.email,
      name: row.name,
      role: row.role,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      lastLoginAt: row.lastLoginAt,
    });
  }

  static fromMicrosoftPayload(payload) {
    return new User({
      provider: "microsoft",
      providerUserId: payload.idTokenClaims.oid,
      tenantId: payload.idTokenClaims.tid,
      email: payload.idTokenClaims.preferred_username,
      name: payload.idTokenClaims.name,
      role: "user",
    });
  }

  toCreateData() {
    return {
      provider: this.provider,
      providerUserId: this.providerUserId,
      tenantId: this.tenantId,
      email: this.email,
      name: this.name,
      role: this.role,
      lastLoginAt: new Date(),
    };
  }

  toJSON() {
    return {
      id: this.id,
      provider: this.provider,
      providerUserId: this.providerUserId,
      tenantId: this.tenantId,
      email: this.email,
      name: this.name,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLoginAt: this.lastLoginAt,
    };
  }
}

export default User;
