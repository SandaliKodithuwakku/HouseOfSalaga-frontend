import { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Home, Building2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    {
      _id: '1',
      type: 'home',
      name: 'Sarah Anderson',
      street: '123 Main Street',
      city: 'Colombo',
      state: 'Western Province',
      zipCode: '00100',
      phone: '0771234567',
      isDefault: true,
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'home',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    isDefault: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr._id === editingId ? { ...formData, _id: editingId } : addr
      ));
      toast.success('Address updated successfully');
      setEditingId(null);
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        _id: Date.now().toString(),
      };
      setAddresses(prev => [...prev, newAddress]);
      toast.success('Address added successfully');
    }
    
    setShowAddForm(false);
    setFormData({
      type: 'home',
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      isDefault: false,
    });
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address._id);
    setShowAddForm(true);
  };

  const handleDelete = (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    
    setAddresses(prev => prev.filter(addr => addr._id !== addressId));
    toast.success('Address deleted successfully');
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr._id === addressId
    })));
    toast.success('Default address updated');
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      type: 'home',
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      isDefault: false,
    });
  };

  if (showAddForm) {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-serif text-gray-900">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Address Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="home"
                    checked={formData.type === 'home'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="office"
                    checked={formData.type === 'office'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <Building2 className="w-4 h-4 mr-1" />
                  Office
                </label>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                />
              </div>
            </div>

            {/* ZIP Code and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-800 focus:border-amber-800"
                />
              </div>
            </div>

            {/* Set as Default */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="mr-2 rounded text-amber-800 focus:ring-amber-800"
                />
                <span className="text-sm text-gray-700">Set as default address</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition-colors"
              >
                {editingId ? 'Update Address' : 'Add Address'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-gray-900">My Addresses</h2>
          <p className="text-gray-600 mt-1">
            {addresses.length} {addresses.length === 1 ? 'address' : 'addresses'}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-600 mb-6">
            Add a delivery address to make checkout faster
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-block bg-amber-800 text-white px-8 py-3 rounded-md hover:bg-amber-900 transition-colors"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
                address.isDefault ? 'border-amber-800' : 'border-gray-200'
              }`}
            >
              {/* Address Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {address.type === 'home' ? (
                    <Home className="w-5 h-5 text-amber-800" />
                  ) : (
                    <Building2 className="w-5 h-5 text-amber-800" />
                  )}
                  <span className="font-medium text-gray-900 capitalize">
                    {address.type}
                  </span>
                </div>
                {address.isDefault && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    Default
                  </span>
                )}
              </div>

              {/* Address Details */}
              <div className="space-y-2 mb-4">
                <p className="font-medium text-gray-900">{address.name}</p>
                <p className="text-gray-600 text-sm">{address.street}</p>
                <p className="text-gray-600 text-sm">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="text-gray-600 text-sm">Phone: {address.phone}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm text-amber-800 hover:bg-amber-50 rounded-md transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {!address.isDefault && (
                  <>
                    <button
                      onClick={() => handleSetDefault(address._id)}
                      className="flex-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Set as Default
                    </button>
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
