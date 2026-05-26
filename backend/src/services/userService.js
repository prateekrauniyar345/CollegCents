import prisma from "../config/prisma.js";
import User from "../models/User.js";

class UserService {
  static async getAllUsers() {
    const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
    return users.map((user) => User.fromPrisma(user));
  }

  static async findById(id) {
    const user = await prisma.user.findUnique({ where: { id: BigInt(id) } });
    return User.fromPrisma(user);
  }

  static async upsertMicrosoftUser(payload) {
    const userObject = User.fromMicrosoftPayload(payload);

    const user = await prisma.user.upsert({
      where: {
        unique_provider_user: {
          provider: userObject.provider,
          tenantId: userObject.tenantId,
          providerUserId: userObject.providerUserId,
        },
      },
      update: {
        email: userObject.email,
        name: userObject.name,
        lastLoginAt: new Date(),
      },
      create: userObject.toCreateData(),
    });

    return User.fromPrisma(user);
  }

  static async updateUser(id, data) {
    const updateData = {};

    if (data.email !== undefined) updateData.email = data.email;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.role !== undefined) updateData.role = data.role;

    const user = await prisma.user.update({
        where: { id: BigInt(id) },
        data: updateData,
    });

    return User.fromPrisma(user);
  }

  static async deleteUser(id) {
    await prisma.user.delete({ where: { id: BigInt(id) } });
    return true;
  }
}

export default UserService;
