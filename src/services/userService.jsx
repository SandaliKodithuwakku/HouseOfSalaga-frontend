import api from './api';

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};

// Get user orders
export const getUserOrders = async (page = 1, limit = 10) => {
  const response = await api.get('/users/orders', {
    params: { page, limit }
  });
  return response.data;
};

const userService = {
  getUserProfile,
  updateUserProfile,
  getUserOrders,
};

export default userService;
