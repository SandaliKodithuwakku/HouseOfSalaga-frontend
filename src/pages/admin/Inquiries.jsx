import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Mail, Phone, Calendar, Trash2 } from 'lucide-react';
import api from '../../services/api';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contact');
      if (response.data.success) {
        setInquiries(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await api.put(`/contact/${id}/status`, { status });
      if (response.data.success) {
        toast.success('Status updated successfully');
        fetchInquiries();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await api.delete(`/contact/${id}`);
      if (response.data.success) {
        toast.success('Inquiry deleted successfully');
        fetchInquiries();
        setSelectedInquiry(null);
      }
    } catch (error) {
      toast.error('Failed to delete inquiry');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      read: 'bg-yellow-100 text-yellow-800',
      replied: 'bg-green-100 text-green-800'
    };
    return styles[status] || styles.new;
  };

  const getSubjectLabel = (subject) => {
    const labels = {
      general: 'General Inquiry',
      product: 'Product Question',
      order: 'Order Support',
      feedback: 'Feedback'
    };
    return labels[subject] || subject;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Inquiries</h1>
        <p className="text-gray-600 mt-1">Manage customer contact messages</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-blue-600 text-sm font-medium">New Messages</p>
          <p className="text-2xl font-bold text-blue-900">
            {inquiries.filter(i => i.status === 'new').length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-yellow-600 text-sm font-medium">Read</p>
          <p className="text-2xl font-bold text-yellow-900">
            {inquiries.filter(i => i.status === 'read').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-green-600 text-sm font-medium">Replied</p>
          <p className="text-2xl font-bold text-green-900">
            {inquiries.filter(i => i.status === 'replied').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-900">All Messages ({inquiries.length})</h2>
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {inquiries.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No inquiries yet</p>
              </div>
            ) : (
              inquiries.map((inquiry) => (
                <div
                  key={inquiry._id}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedInquiry?._id === inquiry._id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {inquiry.firstName} {inquiry.lastName}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{inquiry.email}</p>
                  <p className="text-sm text-gray-500">{getSubjectLabel(inquiry.subject)}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Inquiry Details */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          {selectedInquiry ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedInquiry.firstName} {selectedInquiry.lastName}
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${selectedInquiry.email}`} className="hover:text-blue-600">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    {selectedInquiry.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${selectedInquiry.phone}`} className="hover:text-blue-600">
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteInquiry(selectedInquiry._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete inquiry"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Subject</h3>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {getSubjectLabel(selectedInquiry.subject)}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Status</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, 'new')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      selectedInquiry.status === 'new'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    New
                  </button>
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, 'read')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      selectedInquiry.status === 'read'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => updateStatus(selectedInquiry._id, 'replied')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      selectedInquiry.status === 'replied'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Replied
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 p-12">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>Select an inquiry to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
