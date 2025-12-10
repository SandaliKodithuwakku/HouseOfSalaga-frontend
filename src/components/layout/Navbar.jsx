import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import cartService from '../../services/cartService';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCartCount();
    }
  }, [user]);

  const fetchCartCount = async () => {
    try {
      const response = await cartService.getCart();
      if (response.success) {
        const count = response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-full">
      {/* Promotional Banner */}
      <div className="bg-amber-800 text-white text-center py-3 px-4 text-sm">
        Get Free shipping on orders over Rs.25,000 !
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 flex-1">
              <Link to="/" className="text-gray-800 hover:text-amber-800 font-medium transition-colors">
                HOME
              </Link>
              
              {/* Shop Dropdown */}
              <div 
                className="relative"
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <button
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  onMouseEnter={() => setIsShopOpen(true)}
                  className="flex items-center space-x-1 text-gray-800 hover:text-amber-800 font-medium transition-colors"
                >
                  <span>SHOP</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isShopOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link 
                      to="/shop" 
                      className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => setIsShopOpen(false)}
                    >
                      All Products
                    </Link>
                    <Link 
                      to="/shop?category=men-fashion" 
                      className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => setIsShopOpen(false)}
                    >
                      Men's Fashion
                    </Link>
                    <Link 
                      to="/shop?category=women-fashion" 
                      className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => setIsShopOpen(false)}
                    >
                      Women's Fashion
                    </Link>
                    <Link 
                      to="/shop?category=shoes-bags" 
                      className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => setIsShopOpen(false)}
                    >
                      Shoes & Bags
                    </Link>
                    <Link 
                      to="/shop?category=accessories" 
                      className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                      onClick={() => setIsShopOpen(false)}
                    >
                      Accessories
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/about" className="text-gray-800 hover:text-amber-800 font-medium transition-colors">
                ABOUT
              </Link>
              <Link to="/contact" className="text-gray-800 hover:text-amber-800 font-medium transition-colors">
                CONTACT
              </Link>
            </div>

            {/* Center Logo */}
                <Link to="/" className="flex-shrink-0">
                <div className="flex flex-col items-center">
                    {/* Cloudinary Logo Image */}
                    <img 
                    src="https://res.cloudinary.com/ds8hmsirb/image/upload/v1764772930/Logo_covsob.png" 
                    alt="House of Balboa" 
                    className="h-20 w-40 object-contain"
                    />
                </div>
                </Link>

            {/* Right Icons */}
            <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
              <button className="text-gray-800 hover:text-amber-800 transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/cart" className="text-gray-800 hover:text-amber-800 transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div 
                  className="relative"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    onMouseEnter={() => setIsUserMenuOpen(true)}
                    className="flex items-center space-x-1 text-gray-800 hover:text-amber-800 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <Link 
                        to="/profile/orders" 
                        className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link 
                        to="/profile/wishlist" 
                        className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <Link 
                        to="/profile/settings" 
                        className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800 flex items-center gap-2 border-t border-gray-200"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-amber-800 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200 mt-2">
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/" className="text-gray-800 hover:text-amber-800 font-medium">
                  HOME
                </Link>
                <button
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  className="flex items-center justify-between text-gray-800 hover:text-amber-800 font-medium"
                >
                  <span>SHOP</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isShopOpen && (
                  <div className="pl-4 space-y-2">
                    <Link to="/shop" className="block text-gray-600 hover:text-amber-800">
                      All Products
                    </Link>
                    <Link to="/shop?category=new" className="block text-gray-600 hover:text-amber-800">
                      New Arrivals
                    </Link>
                    <Link to="/shop?category=bestsellers" className="block text-gray-600 hover:text-amber-800">
                      Best Sellers
                    </Link>
                    <Link to="/shop?category=sale" className="block text-gray-600 hover:text-amber-800">
                      Sale
                    </Link>
                  </div>
                )}
                <Link to="/about" className="text-gray-800 hover:text-amber-800 font-medium">
                  ABOUT
                </Link>
                <Link to="/contact" className="text-gray-800 hover:text-amber-800 font-medium">
                  CONTACT
                </Link>
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-6">
                    <button className="text-gray-800 hover:text-amber-800">
                      <Search className="w-5 h-5" />
                    </button>
                    <Link to="/cart" className="text-gray-800 hover:text-amber-800 relative">
                      <ShoppingCart className="w-5 h-5" />
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                  
                  {user ? (
                    <div className="space-y-2">
                      <Link to="/profile/orders" className="block text-gray-800 hover:text-amber-800">
                        My Orders
                      </Link>
                      <Link to="/profile/wishlist" className="block text-gray-800 hover:text-amber-800">
                        Wishlist
                      </Link>
                      <Link to="/profile/settings" className="block text-gray-800 hover:text-amber-800">
                        Settings
                      </Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" className="block text-gray-800 hover:text-amber-800">
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-gray-800 hover:text-amber-800 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="block text-center text-gray-800 hover:text-amber-800 font-medium py-2 border border-gray-300 rounded"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block text-center bg-amber-800 text-white py-2 rounded hover:bg-amber-900 font-medium"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;