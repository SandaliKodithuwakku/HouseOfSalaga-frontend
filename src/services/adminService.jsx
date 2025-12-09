import api from './api';

const adminService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      // Fetch all required data in parallel
      const [productsRes, ordersRes, usersRes, reviewsRes] = await Promise.all([
        api.get('/products'), // Get all products
        api.get('/admin/orders'), // Get all orders
        api.get('/admin/users'), // Get all users
        api.get('/reviews'), // Get all reviews
      ]);

      // Calculate total revenue from all orders
      const orders = ordersRes.data.data.orders || [];
      const totalRevenue = orders.reduce((sum, order) => {
        return sum + (order.totalAmount + (order.shippingFee || 0));
      }, 0);

      // Get counts
      const totalOrders = ordersRes.data.data.pagination?.total || orders.length;
      const totalProducts = productsRes.data.data.pagination?.total || productsRes.data.data.products?.length || 0;
      const totalUsers = usersRes.data.data.pagination?.total || usersRes.data.data.users?.length || 0;
      const totalReviews = reviewsRes.data.data.pagination?.total || reviewsRes.data.data.reviews?.length || 0;

      // Calculate growth percentages (mock data - in real app, compare with previous period)
      // For now, we'll use random percentages between 5-20%
      const revenueGrowth = (Math.random() * 15 + 5).toFixed(1);
      const ordersGrowth = (Math.random() * 15 + 5).toFixed(1);
      const productsGrowth = (Math.random() * 10 + 2).toFixed(0);
      const usersGrowth = (Math.random() * 20 + 10).toFixed(1);
      const reviewsGrowth = (Math.random() * 10 + 1).toFixed(0);

      return {
        totalRevenue: totalRevenue.toFixed(3),
        revenueGrowth,
        totalOrders,
        ordersGrowth,
        totalProducts,
        productsGrowth,
        totalUsers,
        usersGrowth,
        totalReviews,
        reviewsGrowth,
      };
    } catch (error) {
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

  //  Get all reviews 
  getReviews: async (params) => {
    try {
      const response = await api.get('/reviews', { params });
      
      // Transform response to match expected format
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

  // Update review status
  updateReviewStatus: async (reviewId, status) => {
    const response = await api.patch(`/admin/reviews/${reviewId}/status`, { status });
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
