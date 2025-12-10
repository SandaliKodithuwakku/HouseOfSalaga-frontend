import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Heart } from 'lucide-react';
import productService from '../services/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Customer Snaps Images
  const customerSnaps = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1765384311/young-woman-beautiful-dress-hat_znqecx.jpg',
      username: '@sarah_style',
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1765384452/pair-brown-leather-boots_sybo8g.jpg',
      username: '@fashionista_emma',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1765384433/woman-with-bag_jn8jv0.jpg',
      username: '@maria_chic',
    },
  ];

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
    { 
      _id: 'men-fashion', 
      name: "Men's Fashion", 
      slug: 'men-fashion',
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1765380826/home_collection_2_umtpbu.jpg' 
    },
    { 
      _id: 'women-fashion', 
      name: "Women's Fashion", 
      slug: 'women-fashion',
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1765381061/home_collection_1_orrr4y.png' 
    },
    { 
      _id: 'shoes-bags', 
      name: 'Shoes & Bags', 
      slug: 'shoes-bags',
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1765380901/home_collection_3_e6kdnm.png' 
    },
    { 
      _id: 'accessories', 
      name: 'Accessories', 
      slug: 'accessories',
      image: 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1765380902/home_collection_4_lmnrqq.jpg' 
    },
  ];

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);

        // Featured products
        try {
          const resp = await productService.getAllProducts({ limit: 4 });
          if (resp.success) {
            const products = resp.data.products || resp.data || [];
            console.log('Featured products:', products); // Debug log
            setFeaturedProducts(products.slice(0, 4));
          } else {
            setFeaturedProducts([]);
          }
        } catch (err) {
          console.error('Failed to load featured products:', err);
          setFeaturedProducts([]);
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
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/ds8hmsirb/image/upload/v1765379549/home_ro8h3v.png"
            alt="Fashion Collection"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764782500/dress1_gqljvs.jpg';
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center justify-end">
          <div className="max-w-2xl text-white space-y-6 text-right">
            <h1 className="text-5xl md:text-6xl font-serif leading-tight">
              Timeless Elegance Meets
              <span className="block">Modern Style</span>
            </h1>
            <p className="text-lg leading-relaxed text-gray-200">
              Explore our curated collection of timeless fashion pieces that blend elegance 
              with modern design. Each piece is crafted with care to make you feel confident.
            </p>
            <div className="flex gap-4 justify-end">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-medium"
              >
                BROWSE COLLECTION
                <ArrowRight className="w-5 h-5" />
              </Link>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fallbackCategories.map((category) => {
              const img = category.image || 'https://via.placeholder.com/400x500';
              
              return (
                <Link
                  key={category._id}
                  to={`/shop?category=${category.slug}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[3/4] bg-gray-200">
                    <img
                      src={img}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x500?text=' + encodeURIComponent(category.name);
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <div className="p-6 text-white w-full">
                      <h3 className="text-2xl font-serif mb-2">{category.name}</h3>
                      <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
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
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => {
                const pid = product._id;
                const img = (product.images && product.images[0]?.url) || '';
                const name = product.name || 'Product';
                const price = product.price || 0;
                
                return (
                  <Link
                    key={pid}
                    to={`/products/${pid}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative flex items-center justify-center">
                      {img ? (
                        <img
                          src={img}
                          alt={name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-gray-400 text-sm">No Image</div>
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
              })
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-600">No products available at the moment.</p>
              </div>
            )}
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
      <section className="relative py-24 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
            alt="Newsletter background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-amber-800/85 to-orange-900/90"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              EXCLUSIVE OFFERS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Stay Updated with Our Latest Collections
          </h2>
          <p className="text-xl mb-10 text-amber-50">
            Subscribe to our newsletter and get <span className="font-bold text-white">10% off</span> your first order
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-6">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-lg"
            />
            <button
              type="submit"
              className="bg-white text-amber-900 px-10 py-4 rounded-lg hover:bg-amber-50 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-amber-100 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
              TESTIMONIALS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Don't just take our word for it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-amber-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Absolutely love the quality and design! The dress fits perfectly and the fabric is amazing."
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  SJ
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-amber-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Fast shipping and excellent customer service. Will definitely shop here again!"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  EW
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emma Wilson</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl text-amber-500">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Beautiful pieces that make me feel confident. The attention to detail is incredible."
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Maria Chen</p>
                  <p className="text-sm text-gray-500">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Snaps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
              #HOUSEOFSALAGA
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Customer Snaps</h2>
            <p className="text-lg text-gray-600">See how our customers style their favorite pieces</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerSnaps.map((snap) => (
              <div key={snap.id} className="group relative overflow-hidden rounded-2xl aspect-square shadow-lg hover:shadow-2xl transition-all duration-300">
                <img
                  src={snap.image}
                  alt={`Customer snap ${snap.id}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 text-white">
                    <Heart className="w-6 h-6 mb-2" />
                    <p className="font-semibold">{snap.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Share your style with us!</p>
            <button className="inline-flex items-center gap-2 bg-amber-800 text-white px-8 py-3 rounded-lg hover:bg-amber-900 transition-colors font-medium">
              Tag us @houseofsalaga
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
