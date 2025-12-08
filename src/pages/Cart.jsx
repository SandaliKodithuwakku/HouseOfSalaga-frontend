import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import cartService from '../services/cartService';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      if (response.success) {
        setCartItems(response.data.cart.items || []);
        setTotal(response.data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      // If user not logged in, show empty cart
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await cartService.updateCartItem(cartItemId, newQuantity);
      if (response.success) {
        await fetchCart();
        toast.success('Cart updated');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const response = await cartService.removeFromCart(cartItemId);
      if (response.success) {
        await fetchCart();
        toast.success('Item removed from cart');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = item.productId;
    return sum + (product?.price || 0) * item.quantity;
  }, 0);
  const shippingCost = subtotal >= 25000 ? 0 : 500;
  const orderTotal = subtotal + shippingCost;

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-amber-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Shopping Cart</h1>
          <p className="text-lg">Review your items and proceed to checkout</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Continue Shopping Link */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-800 mb-6 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Continue Shopping
        </Link>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-serif text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-amber-800 text-white px-8 py-3 rounded-md hover:bg-amber-900 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Shopping Cart Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-serif text-gray-900">Shopping Cart</h1>
            </div>

            {/* Cart Items */}
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => {
                const product = item.productId;
                if (!product) return null;
                
                return (
                  <div key={item._id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex gap-6">
                      {/* Expand/Collapse Icon */}
                      <button className="flex-shrink-0 w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center hover:border-amber-800 transition-colors">
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>

                      {/* Product Image */}
                      <Link to={`/products/${product._id}`} className="flex-shrink-0">
                        <div className="w-24 h-32 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={product.images?.[0]?.url || ''}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link to={`/products/${product._id}`}>
                          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-amber-800 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="text-sm text-gray-600 space-y-1 mb-3">
                          <p>Color: <span className="font-medium">{product.category?.name || 'Default'}</span> | Size: <span className="font-medium">S</span></p>
                          <p className="text-lg font-semibold text-gray-900">
                            Rs. {product.price?.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-12 text-center text-sm font-medium border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              disabled={item.quantity >= (product.stock || 0)}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeItem(item._id)}
                        className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-amber-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `Rs. ${shippingCost.toLocaleString()}`
                    )}
                  </span>
                </div>

                <div className="border-t border-amber-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>Rs. {orderTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/shipping"
                className="block w-full bg-amber-800 text-white text-center py-3 px-6 rounded-md hover:bg-amber-900 transition-colors font-medium"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
