import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import cartService from '../services/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const fetchCartCount = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }

    try {
      const response = await cartService.getCart();
      if (response.success) {
        const count = response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartCount(0);
    }
  };

  const updateCartCount = () => {
    fetchCartCount();
  };

  useEffect(() => {
    fetchCartCount();
  }, [user]);

  const value = {
    cartCount,
    updateCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
