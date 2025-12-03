import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              <div className="relative">
                <button
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  onBlur={() => setTimeout(() => setIsShopOpen(false), 200)}
                  className="flex items-center space-x-1 text-gray-800 hover:text-amber-800 font-medium transition-colors"
                >
                  <span>SHOP</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isShopOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link to="/products" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800">
                      All Products
                    </Link>
                    <Link to="/products/new" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800">
                      New Arrivals
                    </Link>
                    <Link to="/products/bestsellers" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800">
                      Best Sellers
                    </Link>
                    <Link to="/products/sale" className="block px-4 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-800">
                      Sale
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
                <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link to="/account" className="text-gray-800 hover:text-amber-800 transition-colors">
                <User className="w-5 h-5" />
              </Link>
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
                    <Link to="/products" className="block text-gray-600 hover:text-amber-800">
                      All Products
                    </Link>
                    <Link to="/products/new" className="block text-gray-600 hover:text-amber-800">
                      New Arrivals
                    </Link>
                    <Link to="/products/bestsellers" className="block text-gray-600 hover:text-amber-800">
                      Best Sellers
                    </Link>
                    <Link to="/products/sale" className="block text-gray-600 hover:text-amber-800">
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
                <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
                  <button className="text-gray-800 hover:text-amber-800">
                    <Search className="w-5 h-5" />
                  </button>
                  <Link to="/cart" className="text-gray-800 hover:text-amber-800 relative">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      0
                    </span>
                  </Link>
                  <Link to="/account" className="text-gray-800 hover:text-amber-800">
                    <User className="w-5 h-5" />
                  </Link>
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