import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const catalogBackgroundImage =
    'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764774115/footer_xagqdv.jpg';

  return (
    <footer className="bg-white">
      {/* Top Section - Explore Catalog */}
      <div
        className="relative bg-cover bg-center py-12 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${catalogBackgroundImage})`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-serif mb-3">
            EXPLORE OUR FASHION CATALOG
          </h2>

          <p className="text-sm mb-2">
            Discover timeless pieces crafted with care and elegance.
          </p>
          <p className="text-xs mb-5">
            From classic silhouettes to modern trends, there's something for every moment.
          </p>

          <Link
            to="/products"
            className="inline-block border border-white text-white px-6 py-2 text-sm hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            BROWSE COLLECTION →
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-[#3A3A3A] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            
            {/* Column 1 */}
            <div>
              <h3 className="text-sm font-semibold mb-3 tracking-wide">GENERAL</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white text-xs">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-white text-xs">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="text-gray-300 hover:text-white text-xs">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white text-xs">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-sm font-semibold mb-3 tracking-wide">PRODUCTS</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/products/men" className="text-gray-300 hover:text-white text-xs">
                    Men Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/products/women" className="text-gray-300 hover:text-white text-xs">
                    Women Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/products/shoes-bags" className="text-gray-300 hover:text-white text-xs">
                    Shoes & Bags
                  </Link>
                </li>
                <li>
                  <Link to="/products/accessories" className="text-gray-300 hover:text-white text-xs">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-sm font-semibold mb-3 tracking-wide">CUSTOMER SERVICE</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-white text-xs">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-300 hover:text-white text-xs">
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link to="/billing" className="text-gray-300 hover:text-white text-xs">
                    Billing Cycle
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-300 hover:text-white text-xs">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-sm font-semibold mb-3 tracking-wide">CONTACT INFO</h3>
              <ul className="space-y-2">
                <li>
                  <p className="text-gray-400 text-[10px] mb-1">Email:</p>
                  <a
                    href="mailto:support@houseofsalaga.com"
                    className="text-gray-300 hover:text-white flex items-center gap-1 text-xs"
                  >
                    <Mail className="w-3 h-3" />
                    support@houseofsalaga.com
                  </a>
                </li>

                <li>
                  <p className="text-gray-400 text-[10px] mb-1">Phone:</p>
                  <a
                    href="tel:+94777234567"
                    className="text-gray-300 hover:text-white flex items-center gap-1 text-xs"
                  >
                    <Phone className="w-3 h-3" />
                    +94 77 723 4567
                  </a>
                </li>

                <li>
                  <p className="text-gray-400 text-[10px] mb-1">Address:</p>
                  <span className="text-gray-300 flex items-center gap-1 text-xs">
                    <MapPin className="w-3 h-3" />
                    Colombo 03, Sri Lanka
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-600 pt-4">
            <p className="text-center text-gray-400 text-xs">
              © {currentYear} House of Salaga. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
