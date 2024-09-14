'use client';

import { useState } from 'react';

export default function PostAdPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState(''); // New state for category
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !description || isNaN(Number(price)) || !category) {
      setError('Please fill out all fields correctly.');
      return;
    }

    const res = await fetch('/api/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, price: Number(price), imageUrl, category }),
    });

    if (res.ok) {
      setSuccess('Ad posted successfully!');
      setError('');
      // Optionally reset form fields
      setTitle('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setCategory('');
    } else {
      setError('Failed to post ad');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Post a New Ad</h1>
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="mb-4">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter ad title"
          />
        </div>
        <div className="mb-4">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter ad description"
          />
        </div>
        <div className="mb-4">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select a category</option>
            <option value="cars">Cars</option>
            <option value="real-estate">Real Estate</option>
            <option value="pets">Pets</option>
            {/* Add other categories as needed */}
          </select>
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
