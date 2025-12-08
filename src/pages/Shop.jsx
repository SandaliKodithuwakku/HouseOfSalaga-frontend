import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, SlidersHorizontal, X } from 'lucide-react';
import { toast } from 'react-toastify';
import productService from '../services/productService';
import wishlistService from '../services/wishlistService';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const colors = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Red', value: 'red', hex: '#EF4444' },
    { name: 'Blue', value: 'blue', hex: '#3B82F6' },
    { name: 'Green', value: 'green', hex: '#10B981' },
    { name: 'Yellow', value: 'yellow', hex: '#F59E0B' },
    { name: 'Pink', value: 'pink', hex: '#EC4899' },
    { name: 'Purple', value: 'purple', hex: '#8B5CF6' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, priceRange, pagination.page]);

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories();
      if (response.success) {
        setCategories([
          { _id: 'all', name: 'All Products' },
          ...response.data
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      if (priceRange[1] < maxPrice) {
        params.minPrice = priceRange[0];
        params.maxPrice = priceRange[1];
      }

      const response = await productService.getAllProducts(params);
      
      if (response.success) {
        let fetchedProducts = response.data.products || [];
        
        // Client-side sorting
        if (sortBy === 'price-low') {
          fetchedProducts = fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
          fetchedProducts = fetchedProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name') {
          fetchedProducts = fetchedProducts.sort((a, b) => a.name.localeCompare(b.name));
        }

        setProducts(fetchedProducts);
        setPagination({
          ...pagination,
          total: response.data.pagination?.total || 0,
          pages: response.data.pagination?.pages || 0,
        });

        // Calculate max price from all products for slider
        if (fetchedProducts.length > 0 && maxPrice === 100000) {
          const max = Math.max(...fetchedProducts.map(p => p.price));
          setMaxPrice(Math.ceil(max / 1000) * 1000);
          setPriceRange([0, Math.ceil(max / 1000) * 1000]);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const response = await wishlistService.addToWishlist(productId);
      if (response.success) {
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, maxPrice]);
    setSortBy('featured');
    setSelectedColors([]);
    setSelectedSizes([]);
    setPagination({ ...pagination, page: 1 });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-64 bg-cover bg-center" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200)',
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif mb-2">Shop</h1>
            <p className="text-lg">Explore All Products</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Filters */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4 space-y-6">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => {
                        setSelectedCategory(category._id);
                        setPagination({ ...pagination, page: 1 });
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedCategory === category._id
                          ? 'bg-gray-900 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Price</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Rs. {priceRange[0].toLocaleString()}</span>
                    <span>Rs. {priceRange[1].toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      setPriceRange([0, parseInt(e.target.value)]);
                      setPagination({ ...pagination, page: 1 });
                    }}
                    className="w-full accent-gray-900"
                  />
                </div>
              </div>

              {/* Color Filter */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => toggleColor(color.value)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColors.includes(color.value)
                          ? 'border-gray-900 scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-2 text-sm rounded border transition-all ${
                        selectedSizes.includes(size)
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="w-full py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>
                  <p className="text-sm text-gray-600">
                    Showing {products.length} of {pagination.total} Products
                  </p>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Alphabetically, A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
                    >
                      <Link to={`/products/${product._id}`} className="block relative">
                        <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                          <img
                            src={product.images?.[0]?.url || 'https://via.placeholder.com/400x500'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {product.stock === 0 && (
                          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </Link>

                      <div className="p-3">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="text-sm font-medium text-gray-900 mb-1 hover:text-gray-600 transition-colors line-clamp-2 h-10">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-base font-semibold text-gray-900">
                            Rs. {product.price.toLocaleString()}
                          </p>
                          <button
                            onClick={() => handleAddToWishlist(product._id)}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                            disabled={product.stock === 0}
                          >
                            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                          </button>
                        </div>
                        {product.averageRating > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(product.averageRating) ? 'text-yellow-400' : 'text-gray-300'}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">
                              ({product.totalReviews})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <p className="text-gray-600 text-lg mb-4">No products found</p>
                    <button
                      onClick={resetFilters}
                      className="text-gray-900 hover:underline font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                    <button
                      onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                      disabled={pagination.page === pagination.pages}
                      className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
