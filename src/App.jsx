import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import Checkout from './pages/Checkout';
import OrderComplete from './pages/OrderComplete';
import ProfileLayout from './components/layout/ProfileLayout';
import ProfileOrders from './pages/profile/Orders';
import ProfileReviews from './pages/profile/Reviews';
import ProfileWishlist from './pages/profile/Wishlist';
import ProfileAddresses from './pages/profile/Addresses';
import ProfileSettings from './pages/profile/Settings';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  
  // Routes where navbar and footer should be hidden
  const hideNavbarFooterRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/admin'];
  
  // Check if current path matches any of the routes where navbar/footer should be hidden
  const shouldShowNavbarFooter = !hideNavbarFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Conditionally render Navbar */}
      {shouldShowNavbarFooter && <Navbar />}
      
      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          
          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          {/* Main Pages */}
           
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Shop & Products */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Cart & checkout*/}
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          
          {/* Profile Routes */}
          <Route path="/profile" element={<ProfileLayout />}>
            <Route path="orders" element={<ProfileOrders />} />
            <Route path="reviews" element={<ProfileReviews />} />
            <Route path="wishlist" element={<ProfileWishlist />} />
            <Route path="addresses" element={<ProfileAddresses />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
        </Route>
          
          
        </Routes> 
      </main>

      {/* Conditionally render Footer */}
      {shouldShowNavbarFooter && <Footer />}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;