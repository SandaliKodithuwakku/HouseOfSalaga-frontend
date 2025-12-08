import api from './api';

const wishlistService = {
  // Get user's wishlist - GET /api/wishlist
  getWishlist: async () => {
    const response = await api.get('/wishlist');
    return response.data;
  },

  // Add product to wishlist - POST /api/wishlist
  addToWishlist: async (productId) => {
    const response = await api.post('/wishlist', { productId });
    return response.data;
  },

  // Remove product from wishlist - DELETE /api/wishlist/:wishlistItemId
  removeFromWishlist: async (wishlistItemId) => {
    const response = await api.delete(`/wishlist/${wishlistItemId}`);
    return response.data;
  },
};

export default wishlistService;
