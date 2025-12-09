import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';

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
      toast.info('Generating performance report...');
      
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPos = margin;

      // Header - Company Name
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('House of Salaga', pageWidth / 2, yPos, { align: 'center' });
      yPos += 10;

      // Report Title
      pdf.setFontSize(18);
      pdf.text('Performance Report', pageWidth / 2, yPos, { align: 'center' });
      yPos += 8;

      // Date
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      pdf.text(`Generated on: ${currentDate}`, pageWidth / 2, yPos, { align: 'center' });
      yPos += 15;

      // Divider line
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 15;

      // Key Metrics Section
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Key Metrics', margin, yPos);
      yPos += 10;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');

      // Total Revenue
      pdf.setFont('helvetica', 'bold');
      pdf.text('Total Revenue:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Rs. ${parseFloat(stats.totalRevenue).toLocaleString()}`, margin + 50, yPos);
      if (stats.revenueGrowth >= 0) {
        pdf.setTextColor(0, 128, 0);
      } else {
        pdf.setTextColor(255, 0, 0);
      }
      pdf.text(`(${stats.revenueGrowth >= 0 ? '+' : ''}${stats.revenueGrowth}% from last month)`, margin + 120, yPos);
      pdf.setTextColor(0, 0, 0);
      yPos += 10;

      // Total Orders
      pdf.setFont('helvetica', 'bold');
      pdf.text('Total Orders:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${stats.totalOrders.toLocaleString()}`, margin + 50, yPos);
      if (stats.ordersGrowth >= 0) {
        pdf.setTextColor(0, 128, 0);
      } else {
        pdf.setTextColor(255, 0, 0);
      }
      pdf.text(`(${stats.ordersGrowth >= 0 ? '+' : ''}${stats.ordersGrowth}% from last month)`, margin + 120, yPos);
      pdf.setTextColor(0, 0, 0);
      yPos += 10;

      // Total Products
      pdf.setFont('helvetica', 'bold');
      pdf.text('Total Products:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${stats.totalProducts}`, margin + 50, yPos);
      yPos += 10;

      // Total Users
      pdf.setFont('helvetica', 'bold');
      pdf.text('Total Users:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${stats.totalUsers.toLocaleString()}`, margin + 50, yPos);
      if (stats.usersGrowth >= 0) {
        pdf.setTextColor(0, 128, 0);
      } else {
        pdf.setTextColor(255, 0, 0);
      }
      pdf.text(`(${stats.usersGrowth >= 0 ? '+' : ''}${stats.usersGrowth}% from last month)`, margin + 120, yPos);
      pdf.setTextColor(0, 0, 0);
      yPos += 10;

      // Total Reviews
      pdf.setFont('helvetica', 'bold');
      pdf.text('Total Reviews:', margin, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${stats.totalReviews}`, margin + 50, yPos);
      yPos += 15;

      // Average Order Value (if available)
      if (stats.averageOrderValue) {
        pdf.setFont('helvetica', 'bold');
        pdf.text('Average Order Value:', margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Rs. ${parseFloat(stats.averageOrderValue).toLocaleString()}`, margin + 50, yPos);
        yPos += 10;
      }

      // Current Month Performance
      if (stats.currentMonthRevenue !== undefined) {
        yPos += 10;
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 15;

        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Current Month Performance', margin, yPos);
        yPos += 10;

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Monthly Revenue:', margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Rs. ${parseFloat(stats.currentMonthRevenue).toLocaleString()}`, margin + 50, yPos);
        yPos += 10;

        pdf.setFont('helvetica', 'bold');
        pdf.text('Monthly Orders:', margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${stats.currentMonthOrders || 0}`, margin + 50, yPos);
        yPos += 15;
      }

      // Footer
      yPos = pageHeight - 20;
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text('House of Salaga - Business Performance Report', pageWidth / 2, yPos, { align: 'center' });

      // Save PDF
      pdf.save(`House-of-Salaga-Performance-Report-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success('Performance report downloaded successfully');
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
