import api from './api';

/**
 * Cart Service
 * Handles all cart-related API calls
 */

const cartService = {
  /**
   * Get user's cart
   * @returns {Promise} Cart object with items
   */
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  /**
   * Add item to cart
   * @param {string|number} productId - Product ID
   * @param {number} quantity - Quantity to add
   * @returns {Promise} Updated cart
   */
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  /**
   * Update cart item quantity
   * @param {string} cartItemId - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise} Updated cart
   */
  updateCartItem: async (cartItemId, quantity) => {
    try {
      const response = await api.put(`/cart/${cartItemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },

  /**
   * Remove item from cart
   * @param {string} cartItemId - Cart item ID
   * @returns {Promise} Updated cart
   */
  removeFromCart: async (cartItemId) => {
    try {
      const response = await api.delete(`/cart/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  /**
   * Clear entire cart
   * @returns {Promise} Empty cart
   */
  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
};

export default cartService;