import { useState } from 'react';
import { X, Heart, ShoppingCart, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import cartService from '../../services/cartService';
import wishlistService from '../../services/wishlistService';
import { useCart } from '../../context/CartContext';

const ProductQuickView = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { updateCartCount } = useCart();

  // Extract available sizes and colors from product
  let availableSizes = [];
  let availableColors = [];

  // Get sizes from product.sizes array or from variants
  if (product.sizes && product.sizes.length > 0) {
    availableSizes = product.sizes;
  } else if (product.variants && product.variants.length > 0) {
    availableSizes = [...new Set(product.variants.map(v => v.size).filter(Boolean))];
  }

  // Get colors from product.colors array or from variants
  if (product.colors && product.colors.length > 0) {
    availableColors = product.colors;
  } else if (product.variants && product.variants.length > 0) {
    availableColors = [...new Set(product.variants.map(v => v.color).filter(Boolean))];
  }

  const handleAddToCart = async () => {
    // Only validate size if sizes are available
    if (availableSizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    // Only validate color if colors are available
    if (availableColors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    try {
      setLoading(true);
      const response = await cartService.addToCart(
        product._id,
        quantity,
        selectedSize || '',
        selectedColor || ''
      );

      if (response.success) {
        toast.success('Added to cart!');
        updateCartCount();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await wishlistService.addToWishlist(product._id);
      if (response.success) {
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.images?.[0]?.url || 'https://via.placeholder.com/400'}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-3xl font-bold text-amber-800 mb-4">
              Rs. {product.price?.toLocaleString()}
            </p>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Size {selectedSize && <span className="text-amber-800">({selectedSize})</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-amber-800 bg-amber-800 text-white'
                          : 'border-gray-300 text-gray-700 hover:border-amber-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {availableColors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Color {selectedColor && <span className="text-amber-800">({selectedColor})</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium capitalize transition-all ${
                        selectedColor === color
                          ? 'border-amber-800 bg-amber-50 text-amber-800 ring-2 ring-amber-800'
                          : 'border-gray-300 text-gray-700 hover:border-amber-800'
                      }`}
                    >
                      {selectedColor === color && <Check className="w-4 h-4 inline mr-1" />}
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                disabled={loading || product.stock === 0}
                className="flex-1 bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {loading ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                onClick={handleAddToWishlist}
                disabled={product.stock === 0}
                className="p-3 border-2 border-amber-800 text-amber-800 rounded-lg hover:bg-amber-50 transition-colors disabled:border-gray-400 disabled:text-gray-400"
                title="Add to Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Stock Info */}
            {product.stock > 0 && product.stock <= 10 && (
              <p className="text-sm text-orange-600 mt-3">
                Only {product.stock} left in stock!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
