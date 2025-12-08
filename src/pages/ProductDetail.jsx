import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import productService from '../services/productService';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Green'];

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchReviews();
      
      // Check if a review was just submitted
      if (sessionStorage.getItem('reviewSubmitted') === 'true') {
        console.log('Review was submitted, will refetch after delay');
        sessionStorage.removeItem('reviewSubmitted');
        // Fetch reviews again after a short delay to ensure backend processing is complete
        setTimeout(() => {
          console.log('Refetching reviews after submission');
          fetchReviews();
        }, 1000);
      }
    }
  }, [id]);

  // Re-fetch reviews when navigating back to this page or when window gains focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && id) {
        console.log('Page visible, refetching reviews');
        fetchReviews();
      }
    };

    const handleFocus = () => {
      if (id) {
        console.log('Window focused, refetching reviews');
        fetchReviews();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url);
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getProductById(id);
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      console.log('Fetching reviews for product:', id);
      const response = await api.get('/reviews', {
        params: { productId: id }
      });
      console.log('Reviews response:', response.data);
      if (response.data.success) {
        setReviews(response.data.data.reviews || []);
        console.log('Reviews set:', response.data.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Don't show error toast, just log it
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      const response = await cartService.addToCart(product._id, quantity);
      if (response.success) {
        toast.success('Added to cart!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    
    try {
      const response = await wishlistService.addToWishlist(product._id);
      if (response.success) {
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link to="/shop" className="text-gray-900 hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-gray-900">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${product.category?._id}`} className="hover:text-gray-900">
              {product.category?.name || 'Category'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={mainImage || 'https://via.placeholder.com/600x800'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(image.url)}
                      className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                        mainImage === image.url ? 'border-gray-900' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-serif text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-2">
                  <p className="text-2xl font-semibold text-gray-900">
                    Rs. {product.price.toLocaleString()}
                  </p>
                  {product.averageRating > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(product.averageRating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.totalReviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Availability:</span>
                <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="text-sm font-medium text-gray-900">
                  {product.category?.name || 'N/A'}
                </span>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color:
                </label>
                <div className="flex items-center gap-3 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md border-2 text-sm transition-all ${
                        selectedColor === color
                          ? 'border-gray-900 bg-gray-100'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Product Size:
                  </label>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-md border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded hover:bg-gray-100"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gray-900 text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="p-3 border-2 border-gray-300 rounded hover:border-gray-900 hover:text-gray-900 transition-colors"
                >
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Product Description */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Product Description
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Customer Reviews */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Customer Reviews ({reviews.length})
                </h3>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-sm">
                              {review.userId?.name || 'Anonymous'}
                            </span>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        {review.title && (
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            {review.title}
                          </h4>
                        )}
                        <p className="text-sm text-gray-700">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Catalog Section */}
        <div
          className="mt-12 relative bg-cover bg-center py-16 px-4 rounded-lg"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://res.cloudinary.com/ds8hmsirb/image/upload/v1764774115/footer_xagqdv.jpg')`,
          }}
        >
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-serif mb-4">
              EXPLORE OUR FASHION CATALOG
            </h2>
            <p className="text-sm mb-6">
              Discover timeless pieces crafted with care and elegance. Browse our complete collection and find your perfect style.
            </p>
            <Link
              to="/shop"
              className="inline-block border-2 border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              BROWSE COLLECTION →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
