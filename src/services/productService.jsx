import api from './api';

/**
 * Product Service
 * Handles all product-related API calls
 */

const productService = {
  /**
   * Get all products with optional filters
   * @param {Object} params - Query parameters (category, sort, priceMin, priceMax, search)
   * @returns {Promise} Array of products
   */
  getAllProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Get a single product by ID
   * @param {string|number} id - Product ID
   * @returns {Promise} Product object
   */
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  /**
   * Get featured products
   * @param {number} limit - Number of products to fetch
   * @returns {Promise} Array of featured products
   */
  getFeaturedProducts: async (limit = 8) => {
    try {
      const response = await api.get('/products/featured', { 
        params: { limit } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },

  /**
   * Get new arrival products
   * @param {number} limit - Number of products to fetch
   * @returns {Promise} Array of new products
   */
  getNewArrivals: async (limit = 8) => {
    try {
      const response = await api.get('/products/new-arrivals', { 
        params: { limit } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  },

  /**
   * Search products
   * @param {string} query - Search query
   * @returns {Promise} Array of matching products
   */
  searchProducts: async (query) => {
    try {
      const response = await api.get('/products/search', { 
        params: { q: query } 
      });
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  /**
   * Get products by category
   * @param {string} category - Category slug or ID
   * @param {Object} params - Additional query parameters
   * @returns {Promise} Array of products in category
   */
  getProductsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/products/category/${category}`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  /**
   * Get product categories
   * @returns {Promise} Array of categories
   */
  getCategories: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  /**
   * Get product reviews
   * @param {string|number} productId - Product ID
   * @returns {Promise} Array of reviews
   */
  getProductReviews: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}/reviews`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      throw error;
    }
  },

  /**
   * Add a product review
   * @param {string|number} productId - Product ID
   * @param {Object} reviewData - Review data (rating, comment)
   * @returns {Promise} Created review
   */
  addProductReview: async (productId, reviewData) => {
    try {
      const response = await api.post(`/products/${productId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error('Error adding product review:', error);
      throw error;
    }
  },

  /**
   * Check product availability
   * @param {string|number} productId - Product ID
   * @param {string} size - Product size
   * @returns {Promise} Availability status
   */
  checkAvailability: async (productId, size) => {
    try {
      const response = await api.get(`/products/${productId}/availability`, {
        params: { size }
      });
      return response.data;
    } catch (error) {
      console.error('Error checking product availability:', error);
      throw error;
    }
  },
};

export default productService;
