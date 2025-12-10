import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Search, Download } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    sizes: '',
    colors: '',
    price: '',
    stock: '',
    image: null,
  });
  const [variants, setVariants] = useState([
    { size: '', color: '', stock: '' },
  ]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllProducts({ limit: 100 });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files[0]
      }));
    }
  };

  const addVariant = () => {
    setVariants(prev => [...prev, { size: '', color: '', stock: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v));
  };

  // Derived options from comma-separated inputs
  const sizesOptions = (formData.sizes || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  const colorsOptions = (formData.colors || '')
    .split(',')
    .map(c => c.trim())
    .filter(Boolean);

  // sensible defaults when admin hasn't provided options
  const sizesDefault = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colorsDefault = ['Black', 'White', 'Red', 'Blue', 'Green'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Require name, category, price, image and (either base stock or at least one fully filled variant)
    const hasValidVariant = variants.some(v => v.size || v.color || v.stock);
    if (!formData.name || !formData.category || !formData.price || !formData.image) {
      toast.error('Please fill all required fields (name, category, price, image)');
      return;
    }
    if (!formData.stock && !hasValidVariant) {
      toast.error('Please provide a base stock or add at least one variant with stock');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('image', formData.image);

      // Process sizes and colors (comma-separated inputs)
      const sizesArr = (formData.sizes || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      const colorsArr = (formData.colors || '')
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);

      // Append as JSON strings so backend can parse arrays
      if (sizesArr.length) formDataToSend.append('sizes', JSON.stringify(sizesArr));
      if (colorsArr.length) formDataToSend.append('colors', JSON.stringify(colorsArr));

      // Prepare variants if any filled
      const filledVariants = variants
        .map(v => ({ size: (v.size || '').trim(), color: (v.color || '').trim(), stock: Number(v.stock || 0) }))
        .filter(v => v.size || v.color || v.stock);
      if (filledVariants.length) formDataToSend.append('variants', JSON.stringify(filledVariants));

      await adminService.addProduct(formDataToSend);
      toast.success('Product added successfully');
      setShowAddForm(false);
      setFormData({
        name: '',
        description: '',
        category: '',
        sizes: '',
        colors: '',
        price: '',
        stock: '',
        image: null,
      });
      setVariants([{ size: '', color: '', stock: '' }]);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await adminService.deleteProduct(productId);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category?.name || product.category,
      sizes: (product.sizes || []).join(', '),
      colors: (product.colors || []).join(', '),
      price: product.price,
      stock: product.stock,
      image: null,
    });
    setVariants(
      product.variants && product.variants.length > 0
        ? product.variants
        : [{ size: '', color: '', stock: '' }]
    );
    setShowEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price) {
      toast.error('Please fill all required fields (name, category, price)');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('stock', formData.stock);
      
      // Only append image if a new one is selected
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Process sizes and colors
      const sizesArr = (formData.sizes || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      const colorsArr = (formData.colors || '')
        .split(',')
        .map(c => c.trim())
        .filter(Boolean);

      if (sizesArr.length) formDataToSend.append('sizes', JSON.stringify(sizesArr));
      if (colorsArr.length) formDataToSend.append('colors', JSON.stringify(colorsArr));

      // Process variants
      const filledVariants = variants
        .map(v => ({ size: (v.size || '').trim(), color: (v.color || '').trim(), stock: Number(v.stock || 0) }))
        .filter(v => v.size || v.color || v.stock);
      if (filledVariants.length) formDataToSend.append('variants', JSON.stringify(filledVariants));

      console.log('Updating product with data:', {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        sizes: sizesArr,
        colors: colorsArr,
        variants: filledVariants
      });

      await adminService.updateProduct(editingProduct._id, formDataToSend);
      toast.success('Product updated successfully');
      setShowEditForm(false);
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        sizes: '',
        colors: '',
        price: '',
        stock: '',
        image: null,
      });
      setVariants([{ size: '', color: '', stock: '' }]);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  };

  const cancelEdit = () => {
    setShowEditForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      sizes: '',
      colors: '',
      price: '',
      stock: '',
      image: null,
    });
    setVariants([{ size: '', color: '', stock: '' }]);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (showEditForm) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit product</h1>
          
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
                required
              >
                <option value="">Select a category</option>
                <option value="men-fashion">Men's Fashion</option>
                <option value="women-fashion">Women's Fashion</option>
                <option value="shoes-bags">Shoes & Bags</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Price:
              </label>
              <div className="flex items-center gap-2">
                <span className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                  LKR
                </span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
                  required
                />
              </div>
            </div>

            {/* Sizes (comma-separated) */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Sizes (comma-separated):
              </label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleInputChange}
                placeholder="e.g., XS, S, M, L, XL or 3, 4, 5, 6, 7, 8 or leave empty for no sizes"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
              />
              <p className="text-xs text-gray-500 mt-1">
                For clothing: XS, S, M, L, XL | For shoes: 3, 4, 5, 6, 7, 8 | For bags: leave empty
              </p>
            </div>

            {/* Colors (comma-separated) */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Colors (comma-separated):
              </label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                placeholder="e.g., Black, White, Red"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Base Stock:
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
              />
            </div>

            {/* Variants */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Variants</label>
              <p className="text-xs text-gray-500 mb-2">Add specific size/color combinations with their own stock.</p>
              <div className="space-y-3">
                {variants.map((v, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={v.size}
                      onChange={(e) => updateVariant(idx, 'size', e.target.value)}
                      placeholder="Size (e.g., M or 7)"
                      className="col-span-4 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <select
                      value={v.color}
                      onChange={(e) => updateVariant(idx, 'color', e.target.value)}
                      className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select Color</option>
                      {(colorsOptions.length > 0 ? colorsOptions : colorsDefault).map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={v.stock}
                      onChange={(e) => updateVariant(idx, 'stock', e.target.value)}
                      placeholder="Stock"
                      className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
                      min="0"
                    />
                    <button type="button" onClick={() => removeVariant(idx)} className="col-span-1 text-red-600">Remove</button>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <button type="button" onClick={addVariant} className="px-4 py-2 bg-amber-800 text-white rounded-lg">Add Variant</button>
              </div>
            </div>

            {/* Current Image Display */}
            {editingProduct?.images?.[0]?.url && (
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Current Image:
                </label>
                <img 
                  src={editingProduct.images[0].url} 
                  alt="Current product" 
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Update Image (optional):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.image?.name || ''}
                  readOnly
                  placeholder="No new file chosen"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
                <label className="px-6 py-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  Browse
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Edit size={18} />
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Add product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
              />
            </div>

            {/* Category (select) */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
                required
              >
                <option value="">Select a category</option>
                <option value="men-fashion">Men's Fashion</option>
                <option value="women-fashion">Women's Fashion</option>
                <option value="shoes-bags">Shoes &amp; Bags</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Price:
              </label>
              <div className="flex items-center gap-2">
                <span className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                  LKR
                </span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-800"
                  required
                />
              </div>
            </div>

            {/* Variants (size + color + stock) */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">Variants</label>
              <p className="text-xs text-gray-500 mb-2">Add specific size/color combinations with their own stock.</p>
              <div className="space-y-3">
                {variants.map((v, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={v.size}
                      onChange={(e) => updateVariant(idx, 'size', e.target.value)}
                      placeholder="Size (e.g., M or 7)"
                      className="col-span-4 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <select
                      value={v.color}
                      onChange={(e) => updateVariant(idx, 'color', e.target.value)}
                      className="col-span-5 px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select Color</option>
                      {(colorsOptions.length > 0 ? colorsOptions : colorsDefault).map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={v.stock}
                      onChange={(e) => updateVariant(idx, 'stock', e.target.value)}
                      placeholder="Stock"
                      className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
                      min="0"
                    />
                    <button type="button" onClick={() => removeVariant(idx)} className="col-span-1 text-red-600">Remove</button>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <button type="button" onClick={addVariant} className="px-4 py-2 bg-amber-800 text-white rounded-lg">Add Variant</button>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Images:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.image?.name || ''}
                  readOnly
                  placeholder="No file chosen"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
                <label className="px-6 py-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  Browse
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Products</h1>
          <p className="text-lg text-gray-600">Manage your product inventory</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.images?.[0]?.url || 'https://via.placeholder.com/50'}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{product.category?.name || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Rs. {product.price.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
