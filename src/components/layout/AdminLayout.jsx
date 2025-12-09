import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const { user, logout } = useAuth();

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  const navigation = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#D4B5A0] shadow-lg flex flex-col">
        {/* Logo Section */}
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="w-16 h-16 mx-auto bg-amber-800 rounded-full flex items-center justify-center">
            <span className="text-3xl text-white font-serif">H</span>
          </div>
          <h1 className="text-center mt-3 text-xl font-serif text-amber-800">House of Salaga</h1>
          <p className="text-center text-sm text-gray-600">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-amber-800 text-white shadow-md'
                      : 'text-gray-800 hover:bg-amber-700 hover:text-white'
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-amber-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
