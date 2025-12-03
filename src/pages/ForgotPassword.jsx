import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';
import { VALIDATION } from '../utils/constants';

// Components
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setEmailSent(true);
      toast.success('Password reset link sent to your email! 📧');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send reset link. Please try again.';
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
          {!emailSent ? (
            <>
              {/* Header */}
              <div className="text-center">
                <h1 className="text-3xl font-serif text-gray-800 mb-2">
                  Forgot your password ?
                </h1>
                <p className="text-gray-600 text-sm mt-2">
                  Enter your registered email address and we'll send you a link to reset your password
                </p>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Request password reset
                </Button>

                <div className="text-center mt-6">
                  <Link 
                    to="/login" 
                    className="text-sm text-[#8B6B47] hover:underline font-medium"
                  >
                    ← Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="text-center space-y-6">
                {/* Email Icon */}
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <svg 
                      className="w-10 h-10 text-green-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl font-serif text-gray-800 mb-2">
                    Check your email
                  </h1>
                  <p className="text-gray-600 text-sm">
                    We've sent a password reset link to
                  </p>
                  <p className="text-[#8B6B47] font-medium mt-1">
                    {getValues('email')}
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-sm text-gray-600">
                    Didn't receive the email? Check your spam folder or
                  </p>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEmailSent(false)}
                  >
                    Try another email address
                  </Button>

                  <div className="text-center pt-4">
                    <Link 
                      to="/login" 
                      className="text-sm text-[#8B6B47] hover:underline font-medium"
                    >
                      ← Back to Login
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;