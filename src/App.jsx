import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
            {/* Home Route */}
            <Route path="/" element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">House of Salaga</h1>
                  <p className="text-gray-600 mb-6">Welcome to our fashion store!</p>
                  <div className="space-x-4">
                    <a 
                      href="/login" 
                      className="inline-block px-6 py-2 bg-[#8B6B47] text-white rounded-md hover:bg-[#6F5639] transition-colors"
                    >
                      Login
                    </a>
                    <a 
                      href="/signup" 
                      className="inline-block px-6 py-2 border-2 border-[#8B6B47] text-[#8B6B47] rounded-md hover:bg-[#8B6B47] hover:text-white transition-colors"
                    >
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            } />
          </Routes>
          
          {/* Toast Notifications */}
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;