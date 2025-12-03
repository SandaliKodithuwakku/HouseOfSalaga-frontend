import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';
import { VALIDATION } from '../utils/constants';

// Components
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Get reset token from URL
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.resetPassword(token, data.password);
      toast.success('Password reset successful! 🎉');
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reset password. Link may be expired.';
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
              Reset your password
            </h1>
            <p className="text-gray-600 text-sm mt-2">
              Please enter your new password
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="password"
              type="password"
              placeholder="New Password"
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

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              register={register}
              validation={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              }}
              error={errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Reset Password
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
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;