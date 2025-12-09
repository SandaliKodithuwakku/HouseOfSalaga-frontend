import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: '0.000',
    revenueGrowth: '0',
    totalOrders: 0,
    ordersGrowth: '0',
    totalProducts: 0,
    productsGrowth: '0',
    totalUsers: 0,
    usersGrowth: '0',
    totalReviews: 0,
    reviewsGrowth: '0',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const report = await adminService.getSalesReport();
      toast.success('Performance report generated successfully');
      console.log('Sales Report:', report);
      // You can download or display the report here
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome Back! Here's your business overview.</p>
      </div>

      {/* Generate Report Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleGenerateReport}
          className="bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition-colors"
        >
          Generate Performance Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Revenue */}
        <div className="bg-amber-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Revenue</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-orange-600">Rs. {parseFloat(stats.totalRevenue).toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {stats.revenueGrowth >= 0 ? '+' : ''}{stats.revenueGrowth}% from last month
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Orders</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600">{stats.totalOrders.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {stats.ordersGrowth >= 0 ? '+' : ''}{stats.ordersGrowth}% from last month
          </p>
        </div>

        {/* Total Products */}
        <div className="bg-red-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Products</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-600">{stats.totalProducts}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">+{stats.productsGrowth} from last month</p>
        </div>

        {/* Total Users */}
        <div className="bg-green-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Users</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-green-600">{stats.totalUsers.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {stats.usersGrowth >= 0 ? '+' : ''}{stats.usersGrowth}% from last month
          </p>
        </div>

        {/* Total Reviews */}
        <div className="bg-purple-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Reviews</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-purple-600">{stats.totalReviews}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">+{stats.reviewsGrowth} from last month</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
