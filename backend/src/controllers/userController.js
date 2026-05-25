// controllers/userController.js
import UserService from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users.map((user) => user.toJSON()),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

export const authUser = async (req, res) => {
  try {
    const { providerUserId, homeAccountId, tenantId, email, name } = req.body;

    if (!providerUserId || !tenantId) {
      return res.status(400).json({
        success: false,
        message: "providerUserId and tenantId are required",
      });
    }

    const user = await UserService.upsertMicrosoftUser({
      providerUserId,
      homeAccountId,
      tenantId,
      email,
      name,
    });

    return res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      data: user.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error authenticating user",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  return res.status(400).json({
    success: false,
    message: "Please use /api/users/auth for creating users via Microsoft login.",
  });
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const user = await UserService.updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user.toJSON(),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User id is required",
      });
    }

    const deleted = await UserService.deleteUser(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};