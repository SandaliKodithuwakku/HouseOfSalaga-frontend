import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import orderService from '../services/orderService';

const OrderComplete = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    // Load shipping info from sessionStorage
    const savedShippingInfo = sessionStorage.getItem('shippingInfo');
    if (savedShippingInfo) {
      setShippingInfo(JSON.parse(savedShippingInfo));
    }
    
    if (orderId) {
      fetchOrder();
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrderById(orderId);
      if (response.success) {
        console.log('Order data:', response.data);
        console.log('Payment method:', response.data.paymentMethod);
        setOrder(response.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const getPaymentMethodLabel = (method) => {
    if (method === 'cash_on_delivery') return 'Cash on Delivery';
    if (method === 'direct_transfer') return 'Direct Transfer';
    return method;
  };

  if (loading) {
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
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-green-600 text-white">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-900">Shipping</span>
            </div>

            <div className="w-16 h-0.5 bg-green-600"></div>

            {/* Step 2 - Payment */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-green-600 text-white">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-900">Payment</span>
            </div>

            <div className="w-16 h-0.5 bg-green-600"></div>

            {/* Step 3 - Complete */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-green-600 text-white">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-900">Complete</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="border-2 border-green-600 rounded-lg p-6 mb-8 bg-green-50">
          {order && order.paymentMethod === 'direct_transfer' ? (
            <div className="text-center text-green-800">
              <p className="text-lg font-medium mb-2">
                Thank you. Your order has been Received.
              </p>
              <p className="text-base">
                Please send your bank slip to <span className="font-semibold">+94 77 235 4567</span>
              </p>
            </div>
          ) : (
            <p className="text-center text-green-800 text-lg font-medium">
              Thank you. Your order has been Received
            </p>
          )}
        </div>

        {/* Order Details */}
        {order ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {/* Order Number */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Order number:</p>
                <p className="text-gray-900 font-medium">{order._id?.slice(-8) || 'N/A'}</p>
              </div>

              {/* Date */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Date:</p>
                <p className="text-gray-900 font-medium">
                  {order.createdAt ? formatDate(order.createdAt) : 'N/A'}
                </p>
              </div>

              {/* Total */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Total:</p>
                <p className="text-gray-900 font-medium">
                  Rs. {((order.totalAmount || 0) + (order.shippingFee || 0)).toLocaleString()}.00
                </p>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment method:</p>
                <p className="text-gray-900 font-medium">
                  {getPaymentMethodLabel(order.paymentMethod)}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 font-medium mb-1">
                  {order.customerName || (shippingInfo ? `${shippingInfo.firstName} ${shippingInfo.lastName}` : order.userId?.name || 'Customer')}
                </p>
                <p className="text-gray-700 text-sm">
                  {order.deliveryAddress || 'No address provided'}
                </p>
                {order.phoneNumber && (
                  <p className="text-gray-700 text-sm mt-1">
                    Phone: {order.phoneNumber}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Order details not available</p>
            <Link
              to="/profile/orders"
              className="text-amber-900 hover:underline font-medium"
            >
              View your orders
            </Link>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/profile/orders"
            className="px-8 py-3 border-2 border-amber-900 text-amber-900 rounded hover:bg-amber-50 transition-colors font-medium text-center"
          >
            View Orders
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3 bg-amber-900 text-white rounded hover:bg-amber-800 transition-colors font-medium text-center"
          >
            Continue Shopping
          </Link>
        </div>

        
      </div>
    </div>
  );
};

export default OrderComplete;
