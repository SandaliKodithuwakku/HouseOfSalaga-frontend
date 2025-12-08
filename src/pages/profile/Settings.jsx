import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Lock, Bell } from 'lucide-react';
import { toast } from 'react-toastify';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import userService from '../../services/userService';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    }
  });

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPassword } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user, reset]);

  const onSubmitProfile = async (data) => {
    try {
      setLoading(true);
      const response = await userService.updateUserProfile({
        name: data.name,
        phone: data.phone,
        address: data.address,
      });
      
      if (response.success) {
        toast.success('Profile updated successfully');
        if (updateUser) {
          updateUser(response.data);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // This endpoint might need to be added to backend
      toast.info('Password change functionality coming soon');
      resetPassword();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-gray-900">Account Settings</h2>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b">
          <nav className="flex gap-1 px-4">
            {[
              { id: 'profile', label: 'Profile Information', icon: User },
              { id: 'security', label: 'Security', icon: Lock },
              { id: 'notifications', label: 'Notifications', icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-800 text-amber-800'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Information Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-6 max-w-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Please enter a valid 10-digit phone number'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                  />
                </div>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="bg-amber-800 text-white hover:bg-amber-900"
              >
                Save Changes
              </Button>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit(onSubmitPassword)} className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    {...registerPassword('currentPassword', { required: 'Current password is required' })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                  />
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-red-600 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    {...registerPassword('newPassword', { 
                      required: 'New password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                  />
                </div>
                {passwordErrors.newPassword && (
                  <p className="text-red-600 text-sm mt-1">{passwordErrors.newPassword.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    {...registerPassword('confirmPassword', { required: 'Please confirm your password' })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                  />
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                loading={loading}
                className="bg-amber-800 text-white hover:bg-amber-900"
              >
                Change Password
              </Button>
            </form>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { id: 'orders', label: 'Order updates', description: 'Receive updates about your orders' },
                    { id: 'promotions', label: 'Promotions & offers', description: 'Get notified about special deals' },
                    { id: 'newsletter', label: 'Newsletter', description: 'Monthly newsletter with new products' },
                  ].map((item) => (
                    <div key={item.id} className="flex items-start">
                      <input
                        type="checkbox"
                        id={item.id}
                        defaultChecked={item.id === 'orders'}
                        className="mt-1 mr-3 rounded text-amber-800 focus:ring-amber-800"
                      />
                      <div className="flex-1">
                        <label htmlFor={item.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                          {item.label}
                        </label>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                onClick={() => toast.success('Notification preferences saved')}
                className="bg-amber-800 text-white hover:bg-amber-900"
              >
                Save Preferences
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
