import api from './api';

const reviewService = {
  // Add review - POST /api/reviews
  addReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },

  // Get product reviews - GET /api/reviews?productId=X
  getProductReviews: async (productId, params = {}) => {
    const response = await api.get('/reviews', { 
      params: { productId, ...params } 
    });
    return response.data;
  },

  // Update review - PUT /api/reviews/:reviewId
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  // Delete review - DELETE /api/reviews/:reviewId
  deleteReview: async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  },
};

export default reviewService;
