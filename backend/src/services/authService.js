// services/authService.js
import prisma from "../config/prisma.js";
import User from "../models/User.js";

export const upsertMicrosoftUser = async (account) => {
  const {
    provider = "microsoft",
    providerUserId,
    tenantId,
    email = null,
    name = null,
  } = account;

  const user = await prisma.user.upsert({
    where: {
      unique_provider_user: {
        provider,
        tenantId,
        providerUserId,
      },
    },
    update: {
      email,
      name,
      lastLoginAt: new Date(),
    },
    create: {
      provider,
      providerUserId,
      tenantId,
      email,
      name,
      role: "user",
      lastLoginAt: new Date(),
    },
  });

  return User.fromPrisma(user);
};