import api from './api';

const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get all products (admin)
  getAllProducts: async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Add product
  addProduct: async (formData) => {
    const response = await api.post('/admin/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Update product
  updateProduct: async (productId, formData) => {
    const response = await api.put(`/admin/products/${productId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  // Delete product
  deleteProduct: async (productId) => {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
  },

  // Get all users (admin)
  getAllUsers: async (params) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Get all orders (admin)
  getAllOrders: async (params) => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/admin/orders/${orderId}`, { status });
    return response.data;
  },

  // ✨ NEW: Get all reviews (admin)
  getReviews: async (params) => {
    try {
      const response = await api.get('/reviews/admin/all', { params });
      
      const reviews = response.data.data?.reviews || [];
      const total = response.data.data?.pagination?.total || reviews.length;
      const totalPages = response.data.data?.pagination?.totalPages || 1;
      
      return {
        reviews,
        total,
        pages: totalPages
      };
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  // ✨ NEW: Update review status
  updateReviewStatus: async (reviewId, status) => {
    const response = await api.patch(`/reviews/admin/${reviewId}/status`, { status });
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/admin/reviews/${reviewId}`);
    return response.data;
  },

  // Get sales report
  getSalesReport: async () => {
    const response = await api.get('/admin/reports/sales');
    return response.data;
  },
};

export default adminService;