// src/api/authApi.js

import axiosClient from '../lib/axiosClient';


/**
 * Sends Microsoft account info to backend.
 * Backend will create user if new, update last_login_at if existing,
 * and return the saved database user.
 */
export const checkUserloginWithMicrosoft = async (account) => {
  const response = await axiosClient.post('/auth/microsoft', {
    account
  });

  if (response.status === 200) {
    return response.data;
  }else{
    return null;
  }
};