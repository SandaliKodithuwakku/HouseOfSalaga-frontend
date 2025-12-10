import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, Truck, X } from 'lucide-react';
import { toast } from 'react-toastify';
import orderService from '../../services/orderService';
import reviewService from '../../services/reviewService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewData, setReviewData] = useState({
    productId: '',
    orderId: '',
    rating: 0,
    title: '',
    comment: '',
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewedOrders, setReviewedOrders] = useState(new Set());

  useEffect(() => {
    fetchOrders();
    fetchUserReviews();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getMyOrders();
      if (response.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReviews = async () => {
    try {
      const response = await api.get('/reviews/my-reviews');
      if (response.data.success) {
        // Create a Set of order IDs that have been reviewed
        const reviewedOrderIds = new Set(
          response.data.data.reviews.map(review => review.orderId._id || review.orderId)
        );
        setReviewedOrders(reviewedOrderIds);
        console.log('Reviewed order IDs:', Array.from(reviewedOrderIds));
      }
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      // If error, just don't disable any buttons
      setReviewedOrders(new Set());
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium';
      case 'cancelled':
        return 'bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium';
      case 'shipped':
        return 'bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium';
      case 'in transit':
        return 'bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium';
      case 'confirmed':
      case 'processing':
      case 'pending':
        return 'bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium';
      default:
        return 'bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status?.toLowerCase() === filter);

  const handleOpenReviewModal = (order) => {
    setSelectedOrder(order);
    setReviewData({
      productId: order.items?.[0]?.productId?._id || '',
      orderId: order._id,
      rating: 0,
      title: '',
      comment: '',
    });
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSelectedOrder(null);
    setReviewData({
      productId: '',
      orderId: '',
      rating: 0,
      title: '',
      comment: '',
    });
  };

  const handleRatingClick = (rating) => {
    setReviewData({ ...reviewData, rating });
  };

  const handleSubmitReview = async () => {
    if (!reviewData.rating) {
      toast.error('Please select a rating');
      return;
    }
    if (!reviewData.comment.trim()) {
      toast.error('Please write your review');
      return;
    }

    try {
      setSubmittingReview(true);
      console.log('Submitting review:', reviewData);
      const response = await reviewService.addReview(reviewData);
      console.log('Review submission response:', response);
      if (response.success) {
        toast.success('Review submitted successfully!');
        handleCloseReviewModal();
        fetchOrders(); // Refresh orders
        fetchUserReviews(); // Refresh reviewed orders list
        
        // Store a flag to trigger review refresh on product page
        sessionStorage.setItem('reviewSubmitted', 'true');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-gray-900 mb-4">My Orders</h2>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-amber-50 rounded-lg overflow-hidden border border-amber-100">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      Order {order._id?.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {reviewedOrders.has(order._id) ? (
                      <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded font-medium">
                        ✓ Reviewed
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleOpenReviewModal(order)}
                        disabled={order.status?.toLowerCase() !== 'delivered'}
                        className="px-4 py-2 bg-amber-900 text-white text-sm rounded hover:bg-amber-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        title={order.status?.toLowerCase() !== 'delivered' ? 'You can only review delivered orders' : ''}
                      >
                        Write a review
                      </button>
                    )}
                    <span className={getStatusColor(order.status)}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium text-gray-900">{item.productId?.name || 'Unknown Product'}</span>
                        <span className="text-gray-600"> • Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  {order.estimatedDelivery && (
                    <p className="text-sm text-gray-600 mt-2">
                      Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                  <div className="flex items-center gap-4">
                    {order.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < order.rating ? 'text-amber-500' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    Total: Rs. {(order.totalAmount + order.shippingFee).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif text-gray-900">Share Your Review</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Help us improve! Tell us about your experience with our products.
                  </p>
                </div>
                <button
                  onClick={handleCloseReviewModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-3">
                  Rating<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className="focus:outline-none transition-transform hover:scale-110"
                    >
                      <svg
                        className={`w-8 h-8 ${
                          star <= reviewData.rating
                            ? 'text-amber-500 fill-current'
                            : 'text-gray-300'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title (Optional) */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  value={reviewData.title}
                  onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                  placeholder="Sum up your experience"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-base font-medium text-gray-900 mb-2">
                  Your Review<span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  rows="6"
                  placeholder="Share your thoughts about the product..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 justify-end">
              <button
                onClick={handleCloseReviewModal}
                disabled={submittingReview}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={submittingReview}
                className="px-6 py-2.5 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50"
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
