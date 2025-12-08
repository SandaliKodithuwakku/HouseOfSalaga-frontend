import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { Package, Star, Heart, Settings, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProfileLayout = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { name: 'My Orders', path: '/profile/orders', icon: Package },
    { name: 'My Reviews', path: '/profile/reviews', icon: Star },
    { name: 'Wishlist', path: '/profile/wishlist', icon: Heart },
    { name: 'Settings', path: '/profile/settings', icon: Settings },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-[#A08B7A] text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            
            {/* User Info */}
            <div>
              <h1 className="text-2xl font-semibold">{user?.name || 'User'}</h1>
              <p className="text-sm text-white/90">
                Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'January 2025'}
              </p>
              <p className="text-sm text-white/90">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? 'border-amber-800 text-amber-800'
                      : 'border-transparent text-gray-600 hover:text-amber-800'
                  }`
                }
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
