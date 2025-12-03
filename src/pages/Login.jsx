import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { VALIDATION } from '../utils/constants';

// Components
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import Divider from '../components/common/Divider';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login({
        email: data.email,
        password: data.password,
      });
      
      toast.success('Welcome back! 🎉');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const imageUrl = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764769877/login_qwffja.png';

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image (60% width) */}
      <div 
        className="hidden lg:block lg:w-3/5"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'white',
          minHeight: '100vh'
        }}
      >
      </div>

      {/* Right Side - Form (40% width) */}
      <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-serif text-gray-800 mb-2">
              Welcome Back to the House of Salaga !
            </h1>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              register={register}
              validation={{
                required: 'Email is required',
                pattern: {
                  value: VALIDATION.EMAIL_REGEX,
                  message: 'Invalid email address',
                },
              }}
              error={errors.email}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              register={register}
              validation={{
                required: 'Password is required',
                minLength: {
                  value: VALIDATION.PASSWORD_MIN_LENGTH,
                  message: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
                },
              }}
              error={errors.password}
            />

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                label="Remember me"
              />
              
              <Link 
                to="/forgot-password" 
                className="text-sm text-[#8B6B47] hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>

            <Divider />

            <SocialLoginButtons />

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#8B6B47] hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;