import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import cartService from '../services/cartService';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartService.getCart();
      if (response.success) {
        const items = response.data.cart.items || [];
        setCartItems(items);
        // Select all items by default
        setSelectedItems(new Set(items.map(item => item._id)));
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
      setSelectedItems(new Set());
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectItem = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      // Deselect all
      setSelectedItems(new Set());
    } else {
      // Select all
      setSelectedItems(new Set(cartItems.map(item => item._id)));
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
        // Remove from selected items if it was selected
        setSelectedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(cartItemId);
          return newSet;
        });
        await fetchCart();
        toast.success('Item removed from cart');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
    }
  };

  // Calculate totals based on SELECTED items only
  const subtotal = cartItems.reduce((sum, item) => {
    if (!selectedItems.has(item._id)) return sum;
    const product = item.productId;
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shippingCost = subtotal >= 25000 ? 0 : subtotal > 0 ? 500 : 0;
  const orderTotal = subtotal + shippingCost;

  const allSelected = cartItems.length > 0 && selectedItems.size === cartItems.length;
  const someSelected = selectedItems.size > 0 && selectedItems.size < cartItems.length;

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
            {/* Shopping Cart Title with Select All */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-serif text-gray-900">Shopping Cart</h1>
              
              {/* Select All Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 text-amber-800 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 font-medium">
                  Select All ({selectedItems.size}/{cartItems.length})
                </span>
              </label>
            </div>

            {/* Cart Items */}
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => {
                const product = item.productId;
                if (!product) return null;
                
                const isSelected = selectedItems.has(item._id);
                
                return (
                  <div 
                    key={item._id} 
                    className={`bg-white rounded-lg shadow-sm p-6 transition-all ${
                      isSelected ? 'ring-2 ring-amber-800' : ''
                    }`}
                  >
                    <div className="flex gap-6">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectItem(item._id)}
                        className="flex-shrink-0 w-5 h-5 text-amber-800 border-gray-300 rounded focus:ring-amber-500 cursor-pointer mt-1"
                      />

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
                          <p>
                            {item.color && <span>Color: <span className="font-medium">{item.color}</span></span>}
                            {item.color && item.size && <span> | </span>}
                            {item.size && <span>Size: <span className="font-medium">{item.size}</span></span>}
                            {!item.color && !item.size && <span className="text-gray-400">No variant selected</span>}
                          </p>
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
                          
                          {isSelected && (
                            <span className="text-sm text-gray-600">
                              Subtotal: Rs. {(product.price * item.quantity).toLocaleString()}
                            </span>
                          )}
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

              {selectedItems.size === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-600">Please select items to checkout</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({selectedItems.size} {selectedItems.size === 1 ? 'item' : 'items'})</span>
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

                    {subtotal < 25000 && subtotal > 0 && (
                      <p className="text-xs text-gray-600">
                        Add Rs. {(25000 - subtotal).toLocaleString()} more for free shipping
                      </p>
                    )}

                    <div className="border-t border-amber-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>Rs. {orderTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/shipping"
                    state={{ selectedItems: Array.from(selectedItems) }}
                    className="block w-full bg-amber-800 text-white text-center py-3 px-6 rounded-md hover:bg-amber-900 transition-colors font-medium"
                  >
                    Proceed to Checkout ({selectedItems.size} {selectedItems.size === 1 ? 'item' : 'items'})
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;