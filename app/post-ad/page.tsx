'use client';

import { useState } from 'react';
import { useCategories } from '../hooks/CategoriesContext';
import { useUser } from '../hooks/UserContext'; 
import LoginPopup from '../components/LoginPopup'; 

export default function PostAdPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const { categories, loading } = useCategories() || { categories: [], loading: true };
  const { userRole, setUserRole } = useUser();



  const isLoggedIn = userRole !== '';



  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || isNaN(Number(price)) || !category || !image) {
      setError('Please fill out all fields correctly.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', category);
    formData.append('images', image);

    try {
      const res = await fetch('http://localhost:8080/api/ads', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (res.ok) {
        setSuccess('Ad posted successfully!');
        setError('');
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImage(null);
      } else {
        setError('Failed to post ad');
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to post ad');
      setSuccess('');
    }
  };

  const handleLoginSuccess = (role: string) => {
    setUserRole(role);
    setLoginPopupOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6">
      {isLoginPopupOpen && <LoginPopup onSuccess={handleLoginSuccess} onClose={() => setLoginPopupOpen(false)} />}
      {isLoggedIn ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Post a New Ad</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="mb-4">
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter ad title"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter ad description"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
              />
              {image && <p className="mt-2 text-sm text-gray-600">Selected: {image.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Category</label>
              {loading ? (
                <p className="text-gray-500">Loading categories...</p>
              ) : (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </select>
              )}
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300 ease-in-out"
            >
              Post Ad
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl mb-4">You need to be logged in to post an ad.</h2>
          <button
            onClick={() => setLoginPopupOpen(true)}
            className="py-2 px-4 bg-purple-600 text-white hover:bg-purple-800 rounded-md"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
