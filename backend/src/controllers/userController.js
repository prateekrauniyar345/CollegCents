// controllers/userController.js
import User from '../models/userModel.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

// Handle MSAL User Login (Upsert)
export const authUser = async (req, res) => {
  try {
    const { providerUserId, homeAccountId, tenantId, email, name } = req.body;

    if (!providerUserId || !email) {
      return res.status(400).json({ message: 'providerUserId and email are required' });
    }

    const userData = { providerUserId, homeAccountId, tenantId, email, name };
    const user = await User.upsertUser(userData);
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating user', error: error.message });
  }
};

// Original createUser (kept for manual testing, though authUser is the main flow now)
export const createUser = async (req, res) => {
  try {
    // This is a simplified fallback
    res.status(400).json({ message: 'Please use /auth endpoint for creating users via Microsoft login.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedUser = await User.update(id, updateData);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found or no valid fields to update' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
};