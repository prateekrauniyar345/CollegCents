import { upsertMicrosoftUser } from '../services/authService.js';

export const microsoftAuth = async (req, res) => {
  try {
    const { account } = req.body;

    if (!account) {
      return res.status(400).json({
        message: 'Microsoft account data is required'
      });
    }

    if (!account.providerUserId || !account.tenantId) {
      return res.status(400).json({
        message: 'providerUserId and tenantId are required'
      });
    }

    const user = await upsertMicrosoftUser(account);

    return res.status(200).json({
      message: 'User authenticated successfully',
      user
    });
  } catch (error) {
    console.error('[AUTH] Microsoft auth failed:', error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};