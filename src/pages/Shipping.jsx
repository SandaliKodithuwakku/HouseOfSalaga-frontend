import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import cartService from '../services/cartService';

const Shipping = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const shippingFee = 450;
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Sri Lanka',
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      if (response.success) {
        setCartItems(response.data.cart.items || []);
        setCartTotal(response.data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateShippingInfo = () => {
    const { firstName, lastName, email, phone, address, city, state, zipCode, country } = shippingInfo;
    
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zipCode || !country) {
      toast.error('Please fill in all required fields');
      return false;
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Phone number must be 10 digits');
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (validateShippingInfo()) {
      // Store shipping info in sessionStorage to pass to checkout
      sessionStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
      navigate('/checkout');
    }
  };

  const subtotal = cartTotal;
  const total = subtotal + shippingFee;

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-amber-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          Get free shipping on orders over Rs.25,000!
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-8">
            {/* Step 1 - Shipping */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-900 text-white">
                1
              </div>
              <span className="text-sm font-medium text-gray-900">Shipping</span>
            </div>

            <div className="w-16 h-0.5 bg-gray-300"></div>

            {/* Step 2 - Payment */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-200 text-gray-600">
                2
              </div>
              <span className="text-sm font-medium text-gray-900">Payment</span>
            </div>

            <div className="w-16 h-0.5 bg-gray-300"></div>

            {/* Step 3 - Complete */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-200 text-gray-600">
                3
              </div>
              <span className="text-sm font-medium text-gray-900">Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                    placeholder="Email Address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                    placeholder="Phone Number"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                    placeholder="Street Address"
                  />
                </div>

                {/* City and State */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      placeholder="State"
                    />
                  </div>
                </div>

                {/* ZIP Code and Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                      placeholder="ZIP Code"
                    />
                  </div>
                  <div>
                    <select
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm bg-white"
                    >
                      <option value="">Select Country</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                    </select>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={loading}
                  className="w-full bg-amber-900 text-white py-3 rounded hover:bg-amber-800 transition-colors font-medium mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Continue'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item._id} className="flex gap-3">
                      <div className="w-16 h-20 bg-white rounded overflow-hidden flex-shrink-0 border border-gray-200">
                        <img
                          src={item.productId?.images?.[0]?.url || 'https://via.placeholder.com/80x100'}
                          alt={item.productId?.name || 'Product'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {item.productId?.name || 'Product Name'}
                        </h3>
                        <p className="text-xs text-gray-600">
                          Rs. {item.productId?.price?.toLocaleString() || '0'}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600 text-center py-4">No items in cart</p>
                )}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">
                    Rs. {shippingFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold border-t border-gray-300 pt-3 mt-3">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
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

export default Shipping;
