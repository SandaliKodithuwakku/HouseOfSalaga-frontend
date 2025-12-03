import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Signup Route */}
            <Route path="/signup" element={<Signup />} />
            
            {/* Home Route */}
            <Route path="/" element={
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">House of Salaga</h1>
                  <h1 className="text-red-500 text-5xl">Tailwind Test</h1>
                  <p className="text-gray-600 mb-6">Welcome to our fashion store!</p>
                  <div className="space-x-4">
                    <a 
                      href="/signup" 
                      className="inline-block px-6 py-2 bg-[#8B6B47] text-white rounded-md hover:bg-[#6F5639] transition-colors"
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