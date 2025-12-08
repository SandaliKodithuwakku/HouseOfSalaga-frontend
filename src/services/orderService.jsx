import api from './api';

const orderService = {
  // Get user's orders - GET /api/orders
  getMyOrders: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  // Get single order by ID - GET /api/orders/:orderId
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Create new order - POST /api/orders
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Track order - GET /api/orders/:orderId/track
  trackOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}/track`);
    return response.data;
  },
};

export default orderService;
