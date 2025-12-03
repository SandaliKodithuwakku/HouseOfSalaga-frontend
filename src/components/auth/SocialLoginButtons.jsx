import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Button from '../common/Button';

const SocialLoginButtons = () => {
  const handleGoogleLogin = () => {
    toast.info('Google login coming soon!');
  };

  const handleFacebookLogin = () => {
    toast.info('Facebook login coming soon!');
  };

  return (
    <div className="space-y-3">
      <Button
        variant="secondary"
        onClick={handleGoogleLogin}
        icon={<FcGoogle />}
      >
        Continue with Google
      </Button>

      <Button
        variant="secondary"
        onClick={handleFacebookLogin}
        icon={<FaFacebook className="text-[#1877F2]" />}
      >
        Continue with Facebook
      </Button>
    </div>
  );
};

export default SocialLoginButtons;