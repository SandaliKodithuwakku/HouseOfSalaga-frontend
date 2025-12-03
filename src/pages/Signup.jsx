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

const Signup = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    if (!agreedToTerms) {
      toast.error('Please agree to the Terms & Conditions');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone || '0000000000',
      });
      
      toast.success('Welcome to House of Salaga! 🎉');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const imageUrl = 'https://res.cloudinary.com/ds8hmsirb/image/upload/v1764752148/signup1_te1ijv.png';

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
              Welcome to the House of Salaga !
            </h1>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="fullName"
              type="text"
              placeholder="Full Name"
              register={register}
              validation={{
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              error={errors.fullName}
            />

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

            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              register={register}
              validation={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              }}
              error={errors.confirmPassword}
            />

            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              label="I agree to the"
              linkText="Terms & Conditions"
              linkTo="/terms"
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create Account
            </Button>

            <Divider />

            <SocialLoginButtons />

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#8B6B47] hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;