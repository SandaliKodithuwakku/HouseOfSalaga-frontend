import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import cartService from '../services/cartService';
import orderService from '../services/orderService';

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
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
    // Load shipping info from sessionStorage
    const savedShippingInfo = sessionStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    } else {
      // Redirect to shipping page if no shipping info
      navigate('/shipping');
      return;
    }
    fetchCart();
  }, [navigate]);

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

  const handleContinueToPayment = () => {
    if (validateShippingInfo()) {
      setCurrentStep(2);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error('Your cart is empty');
        return;
      }

      if (!selectedPayment) {
        toast.error('Please select a payment method');
        return;
      }

      if (!acceptTerms) {
        toast.error('Please accept the terms and conditions');
        return;
      }

      setLoading(true);
      
      const orderData = {
        customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        deliveryAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`,
        phoneNumber: shippingInfo.phone,
        paymentMethod: selectedPayment,
        cartItems: cartItems.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      };

      console.log('Selected Payment:', selectedPayment);
      console.log('Order Data being sent:', orderData);

      const response = await orderService.createOrder(orderData);
      
      if (response.success) {
        toast.success('Order placed successfully!');
        navigate(`/order-complete?orderId=${response.data._id}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
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
       
      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-8">
            {/* Step 1 - Shipping */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 1 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="text-sm font-medium text-gray-900">Shipping</span>
            </div>

            <div className="w-16 h-0.5 bg-gray-300"></div>

            {/* Step 2 - Payment */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 2 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="text-sm font-medium text-gray-900">Payment</span>
            </div>

            <div className="w-16 h-0.5 bg-gray-300"></div>

            {/* Step 3 - Complete */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 3 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className="text-sm font-medium text-gray-900">Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Email Address"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Phone Number"
                    />
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Street Address"
                    />
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  {/* ZIP Code and Country */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="ZIP Code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Select Country
                      </label>
                      <select
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-900"
                      >
                        <option value="Sri Lanka">Sri Lanka</option>
                      </select>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleContinueToPayment}
                    className="w-full bg-amber-900 text-white py-3 rounded hover:bg-amber-800 transition-colors font-medium mt-6"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Payment Options
                </h2>

                <div className="space-y-3">
                  {/* Direct Transfer */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === 'direct_transfer'
                        ? 'border-amber-900 bg-white'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedPayment('direct_transfer')}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="direct_transfer"
                        name="payment"
                        checked={selectedPayment === 'direct_transfer'}
                        onChange={() => setSelectedPayment('direct_transfer')}
                        className="mt-1 w-4 h-4 accent-amber-900"
                      />
                      <div className="flex-1">
                        <label htmlFor="direct_transfer" className="text-gray-900 font-medium cursor-pointer block mb-1">
                          Direct Transfer
                        </label>
                        <p className="text-xs text-gray-600">
                          Bank Account NO: 12345678
                        </p>
                        <p className="text-xs text-gray-600">Account Name: HOUSE OF SALAGA</p>
                        <p className="text-xs text-gray-600">Bank: Peoples Bank</p>
                        <p className="text-xs text-gray-600">Branch: Colombo</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Please use this Order ID as the Payment Reference:{' '}
                          <span className="font-medium">Your Order ID will be displayed here</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === 'cod'
                        ? 'border-amber-900 bg-white'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedPayment('cod')}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id="cod"
                        name="payment"
                        checked={selectedPayment === 'cod'}
                        onChange={() => setSelectedPayment('cod')}
                        className="w-4 h-4 accent-amber-900"
                      />
                      <label htmlFor="cod" className="text-gray-900 font-medium cursor-pointer">
                        Cash on delivery
                      </label>
                    </div>
                  </div>

                  {/* PayPolo */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === 'paypolo'
                        ? 'border-amber-900 bg-white'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedPayment('paypolo')}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="paypolo"
                        name="payment"
                        checked={selectedPayment === 'paypolo'}
                        onChange={() => setSelectedPayment('paypolo')}
                        className="mt-1 w-4 h-4 accent-amber-900"
                      />
                      <div className="flex-1">
                        <label htmlFor="paypolo" className="text-gray-900 font-medium cursor-pointer block mb-1">
                          PayPolo
                        </label>
                        <a href="#" className="text-xs text-blue-600 hover:underline">
                          (what is PayPolo?)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Pay Earlier with Kipipay */}
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPayment === 'kipipay'
                        ? 'border-amber-900 bg-white'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedPayment('kipipay')}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        id="kipipay"
                        name="payment"
                        checked={selectedPayment === 'kipipay'}
                        onChange={() => setSelectedPayment('kipipay')}
                        className="mt-1 w-4 h-4 accent-amber-900"
                      />
                      <div className="flex-1">
                        <label htmlFor="kipipay" className="text-gray-900 font-medium cursor-pointer block">
                          Pay Earlier with Kipipay
                        </label>
                        <button className="mt-2 text-xs text-white bg-amber-900 px-3 py-1 rounded hover:bg-amber-800">
                          Click Here To Pay
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2 mt-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-amber-900"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I have read and agree to the website{' '}
                      <Link to="/terms" className="text-blue-600 hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading || !selectedPayment || !acceptTerms}
                    className="w-full bg-amber-900 text-white py-3 rounded hover:bg-amber-800 transition-colors font-medium mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Continue'}
                  </button>
                </div>
              </div>
            )}
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
      </div>
    </div>
  );
};

export default Checkout;
