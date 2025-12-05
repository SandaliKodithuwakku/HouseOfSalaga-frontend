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
  const hideNavbarFooterRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];
  
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
          
          {/* About Page */}
          <Route path="/about" element={<About />} />
          
          {/* Blog Page */}
          <Route path="/blog" element={<Blog />} />
          
          {/* Home Route */}
          <Route path="/" element={
            <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">House of Salaga</h1>
                <p className="text-gray-600 mb-6">Welcome to our fashion store!</p>
              </div>
            </div>
          } />
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