import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../services/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

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

  const handleEditClick = (review) => {
    setEditingReview(review._id);
    setEditForm({
      rating: review.rating,
      title: review.title,
      comment: review.comment
    });
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditForm({ rating: 5, title: '', comment: '' });
  };

  const handleUpdateReview = async (reviewId) => {
    if (!editForm.title.trim() || !editForm.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await api.put(`/reviews/${reviewId}`, editForm);
      if (response.data.success) {
        toast.success('Review updated successfully');
        setEditingReview(null);
        fetchMyReviews();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update review');
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

  const renderEditableStars = (currentRating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setEditForm({ ...editForm, rating: star })}
            className="focus:outline-none"
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                star <= currentRating
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300 hover:text-amber-200'
              }`}
            />
          </button>
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

              {/* Edit Mode */}
              {editingReview === review._id ? (
                <div className="space-y-4">
                  {/* Editable Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    {renderEditableStars(editForm.rating)}
                  </div>

                  {/* Editable Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Summarize your review"
                    />
                  </div>

                  {/* Editable Comment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={editForm.comment}
                      onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Share your thoughts about this product"
                    />
                  </div>

                  {/* Edit Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateReview(review._id)}
                      className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Display Mode */}
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
                      onClick={() => handleEditClick(review)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-amber-800 hover:bg-amber-50 rounded-md transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;