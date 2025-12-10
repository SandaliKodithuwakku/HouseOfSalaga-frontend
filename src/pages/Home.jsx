import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Heart } from 'lucide-react';
import productService from '../services/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback mock data in case backend fails
  const fallbackProducts = [
    {
      id: 1,
      name: 'Ivory Lace Midi Dress',
      price: 11200,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764782500/dress1_gqljvs.jpg',
      isNew: true,
    },
    {
      id: 2,
      name: 'Classic White Blouse',
      price: 6500,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764782500/dress2_myjyf2.jpg',
      isNew: false,
    },
    {
      id: 3,
      name: 'Elegant Evening Gown',
      price: 18900,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764782500/dress1_gqljvs.jpg',
      isNew: true,
    },
    {
      id: 4,
      name: 'Summer Floral Dress',
      price: 9800,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764782500/dress2_myjyf2.jpg',
      isNew: false,
    },
  ];

  const fallbackCategories = [
    { _id: 'men-fashion', name: 'Men Fashion', image: fallbackProducts[0].image },
    { _id: 'women-fashion', name: 'Women Fashion', image: fallbackProducts[1].image },
    { _id: 'shoes-bags', name: 'Shoes & Bags', image: fallbackProducts[2].image },
    { _id: 'accessories', name: 'Accessories', image: fallbackProducts[3].image },
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);

        // Featured products
        try {
          const resp = await productService.getFeaturedProducts(8);
          if (resp.success) {
            // resp.data may be products array or object depending on API
            const products = resp.data.products || resp.data || [];
            setFeaturedProducts(products.slice(0, 8));
          } else {
            setFeaturedProducts(fallbackProducts);
          }
        } catch (err) {
          console.error('Failed to load featured products:', err);
          setFeaturedProducts(fallbackProducts);
        }

        // Categories
        try {
          const catResp = await productService.getCategories();
          if (catResp.success) {
            // catResp.data expected to be an array
            const cats = catResp.data || [];
            setCategories(cats.slice(0, 6));
          } else {
            setCategories(fallbackCategories);
          }
        } catch (err) {
          console.error('Failed to load categories:', err);
          setCategories(fallbackCategories);
        }
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-amber-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight">
                Discover Your
                <span className="block text-amber-800">Perfect Style</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Explore our curated collection of timeless fashion pieces that blend elegance 
                with modern design. Each piece is crafted with care to make you feel confident.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-amber-800 text-white px-8 py-4 rounded-md hover:bg-amber-900 transition-colors font-medium"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-md hover:bg-amber-800 hover:text-white transition-colors font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://res.cloudinary.com/ds8hmsirb/image/upload/v1764782500/dress1_gqljvs.jpg"
                alt="Fashion Collection"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold text-amber-800">50+</p>
                <p className="text-gray-600">New Arrivals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over Rs. 25,000</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-sm text-gray-600">Handpicked with care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {categories.map((category) => {
              const catId = category._id || category.id || category.name?.toLowerCase();
              const img = category.image || category.images?.[0]?.url || fallbackProducts[0].image;
              return (
                <Link
                  key={catId}
                  to={`/shop?category=${catId}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[4/5] bg-gray-100">
                    <img
                      src={img}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-serif mb-2">{category.name}</h3>
                      <span className="text-sm flex items-center gap-2">
                        Shop Now <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600">Discover our handpicked collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => {
              const pid = product._id || product.id;
              const img = product.image || product.images?.[0]?.url || fallbackProducts[0].image;
              const name = product.name || product.title || 'Product';
              const price = product.price || product.priceInRs || 0;
              const isNew = product.isNew || product.isNewArrival || false;
              return (
                <Link
                  key={pid}
                  to={`/products/${pid}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {isNew && (
                      <span className="absolute top-3 left-3 bg-amber-800 text-white text-xs px-3 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-amber-800 transition-colors">
                      {name}
                    </h3>
                    <p className="text-xl font-semibold text-gray-900">
                      Rs. {Number(price).toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-amber-800 text-white px-8 py-3 rounded-md hover:bg-amber-900 transition-colors font-medium"
            >
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-amber-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Stay Updated with Our Latest Collections
          </h2>
          <p className="text-lg mb-8 text-amber-100">
            Subscribe to our newsletter and get 10% off your first order
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-amber-800 px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-amber-100 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Don't just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Absolutely love the quality and design! The dress fits perfectly and the fabric is amazing."
              </p>
              <p className="font-semibold text-gray-900">Sarah Johnson</p>
              <p className="text-sm text-gray-600">Verified Buyer</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Fast shipping and excellent customer service. Will definitely shop here again!"
              </p>
              <p className="font-semibold text-gray-900">Emma Wilson</p>
              <p className="text-sm text-gray-600">Verified Buyer</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Beautiful pieces that make me feel confident. The attention to detail is incredible."
              </p>
              <p className="font-semibold text-gray-900">Olivia Brown</p>
              <p className="text-sm text-gray-600">Verified Buyer</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
