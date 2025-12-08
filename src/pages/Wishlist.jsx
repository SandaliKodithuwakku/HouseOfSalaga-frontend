import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import wishlistService from '../services/wishlistService';
import cartService from '../services/cartService';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistService.getWishlist();
      if (response.success) {
        setWishlist(response.data);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (wishlistItemId) => {
    try {
      const response = await wishlistService.removeFromWishlist(wishlistItemId);
      if (response.success) {
        toast.success('Removed from wishlist');
        fetchWishlist();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
    }
  };

  const handleAddToCart = async (productId, wishlistItemId) => {
    try {
      const response = await cartService.addToCart(productId, 1);
      if (response.success) {
        toast.success('Added to cart');
        // Optionally remove from wishlist after adding to cart
        await handleRemoveFromWishlist(wishlistItemId);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const wishlistItems = wishlist?.items || [];

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
        <h2 className="text-2xl font-serif text-gray-900">My Wishlist</h2>
        <p className="text-gray-600 mt-1">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">
            Save items you love for later
          </p>
          <Link
            to="/shop"
            className="inline-block bg-amber-800 text-white px-8 py-3 rounded-md hover:bg-amber-900 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => {
            const product = item.productId;
            if (!product) return null;

            return (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow"
              >
                {/* Product Image */}
                <Link to={`/products/${product._id}`} className="block relative">
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img
                      src={product.images?.[0]?.url || ''}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFromWishlist(item._id);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>

                  {/* Stock Badge */}
                  {product.stock === 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Out of Stock
                    </div>
                  )}
                </Link>

                {/* Product Details */}
                <div className="p-4">
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-medium text-gray-900 mb-1 hover:text-amber-800 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      Rs. {product.price?.toLocaleString()}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product._id, item._id)}
                    disabled={product.stock === 0}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-medium transition-colors ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-amber-800 text-white hover:bg-amber-900'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
