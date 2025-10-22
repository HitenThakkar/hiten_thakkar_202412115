'use client';

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { CartContext } from '../../components/CartContext';
import { apiFetch } from '../../lib/api';
import Link from 'next/link';

interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: string;
  updatedAt: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      const data = await apiFetch(`/products?page=${page}&limit=10&search=${search}&category=${category}`);
      setProducts(data.products);
      setTotal(data.total);
    }
    fetchProducts();
  }, [page, search, category]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);
  const handlePageChange = (newPage: number) => setPage(newPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ sku: '', name: '', price: 0, category: '' });

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct ? `/products/${editingProduct.id}` : '/products';
    await apiFetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, price: parseFloat(formData.price.toString()) }),
    });
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ sku: '', name: '', price: 0, category: '' });
    const data = await apiFetch(`/products?page=${page}&limit=10&search=${search}&category=${category}`);
    setProducts(data.products);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await apiFetch(`/products/${id}`, { method: 'DELETE' });
      const data = await apiFetch(`/products?page=${page}&limit=10&search=${search}&category=${category}`);
      setProducts(data.products);
      setTotal(data.total);
    }
  };

  const openModal = (product?: Product) => {
    setEditingProduct(product || null);
    setFormData(product || { sku: '', name: '', price: 0, category: '' });
    setIsModalOpen(true);
  };

  const categories = ['electronics', 'fashion', 'clothing brand', 'hardware'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="border p-2"
        />
        <select value={category} onChange={handleCategory} className="border p-2">
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        {auth?.user?.role === 'admin' && (
          <button onClick={() => openModal()} className="bg-green-500 text-white p-2">
            Add Product
          </button>
        )}
        {auth?.user?.role === 'customer' && cart?.cart.length > 0 && (
          <Link href="/cart" className="bg-blue-500 text-white p-2">
            Cart ({cart.cart.length})
          </Link>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-xl">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleCreateOrUpdate}>
              <input
                name="sku"
                value={formData.sku}
                onChange={e => setFormData({ ...formData, sku: e.target.value })}
                placeholder="SKU"
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                name="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                placeholder="Price"
                className="border p-2 mb-2 w-full"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="border p-2 mb-2 w-full"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white p-2">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2">
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>SKU: {product.sku}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Category: {product.category}</p>
            <p>Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>
            {auth?.user?.role === 'admin' ? (
              <div className="mt-2 space-x-2">
                <button onClick={() => openModal(product)} className="bg-yellow-500 text-white p-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white p-2">
                  Delete
                </button>
              </div>
            ) : auth?.user?.role === 'customer' && (
              <button
                onClick={() => cart?.addToCart(product.id, product.name, product.price)}
                className="bg-green-500 text-white p-2 mt-2"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white p-2 mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page * 10 >= total}
          className="bg-gray-500 text-white p-2"
        >
          Next
        </button>
        <span className="ml-4">Page {page} of {Math.ceil(total / 10)}</span>
      </div>
    </div>
  );
}