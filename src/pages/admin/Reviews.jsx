import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { toast } from 'react-toastify';
import { Star, Trash2, Package } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      // Use adminService.getReviews instead of direct api call
      const data = await adminService.getReviews({ limit: 100, page: 1 });
      console.log(' Reviews fetched:', data);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error(' Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      await adminService.deleteReview(reviewId);
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Reviews</h1>
        <p className="text-lg text-gray-600">Manage customer product reviews</p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                {/* Product Image */}
                {review.productId?.images?.[0]?.url && (
                  <img
                    src={review.productId.images[0].url}
                    alt={review.productId.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{review.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">({review.rating}/5)</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    by <span className="font-medium">{review.userId?.name || 'Anonymous'}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(review._id)}
                className="text-red-600 hover:text-red-900 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="mb-3">
              <p className="text-gray-700">{review.comment}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Package size={16} className="text-gray-400" />
              <span className="text-gray-600">
                Product: <span className="font-medium">{review.productId?.name || 'N/A'}</span>
              </span>
              {review.orderId && (
                <span className="ml-4 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;