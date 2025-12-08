import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Edit, Trash2, Package } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/reviews/my-reviews');
      if (response.data.success) {
        setReviews(response.data.data.reviews || []);
        console.log('User reviews fetched:', response.data.data.reviews.length);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      if (response.data.success) {
        toast.success('Review deleted successfully');
        fetchMyReviews();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete review');
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
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
        <h2 className="text-2xl font-serif text-gray-900">My Reviews</h2>
        <p className="text-gray-600 mt-1">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600 mb-6">
            Share your experience with products you've purchased
          </p>
          <Link
            to="/profile/orders"
            className="inline-block bg-amber-800 text-white px-8 py-3 rounded-md hover:bg-amber-900 transition-colors"
          >
            View Orders
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Product Info */}
              <div className="flex gap-4 mb-4">
                {review.productId?.images?.[0]?.url && (
                  <img
                    src={review.productId.images[0].url}
                    alt={review.productId.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <Link
                    to={`/product/${review.productId?._id}`}
                    className="text-lg font-medium text-gray-900 hover:text-amber-800"
                  >
                    {review.productId?.name || 'Product'}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    Reviewed on {new Date(review.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                {renderStars(review.rating)}
              </div>

              {/* Review Title */}
              {review.title && (
                <h4 className="text-base font-semibold text-gray-900 mb-2">
                  {review.title}
                </h4>
              )}

              {/* Review Comment */}
              <p className="text-gray-700 mb-4">
                {review.comment}
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteReview(review._id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
