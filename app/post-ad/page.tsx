'use client';

import { useState } from 'react';

// Define the categories
const categories = [
  { name: 'Cars', value: 'cars' },
  { name: 'Real Estate', value: 'real-estate' },
  { name: 'Electronics', value: 'electronics' },
  { name: 'Furniture', value: 'furniture' },
  { name: 'Fashion', value: 'fashion' },
  { name: 'Services', value: 'services' },
  { name: 'Jobs', value: 'jobs' },
  { name: 'Pets', value: 'pets' },
];

export default function PostAdPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!title || !description || !price || !category) {
      setError('Title, description, price, and category are required.');
      return;
    }

    // Convert price to number
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      setError('Price must be a valid number.');
      return;
    }

    try {
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, price: priceNumber, imageUrl, category }),
      });

      if (res.ok) {
        setSuccess('Ad posted successfully!');
        // Clear form fields
        setTitle('');
        setDescription('');
        setPrice('');
        setImageUrl('');
        setCategory('');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to post ad');
      }
    } catch (error) {
      setError('Failed to post ad');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Post Ad</h1>
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter ad title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter ad description"
            rows={4}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter ad price"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter image URL"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Post Ad
        </button>
      </form>
    </div>
  );
}
