'use client';

import { useState } from 'react';
import { useCategories } from '../hooks/CategoriesContext';
import { useUser } from '../hooks/UserContext'; 
import LoginPopup from '../components/LoginPopup'; 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LocationAutocomplete from '../components/LocationAutocomplete';

const MySwal = withReactContent(Swal);

export default function PostAdPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const { categories } = useCategories() || { categories: [], loading: true };
  const { userRole, setUserRole } = useUser();

  const isLoggedIn = userRole !== '';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files)); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // if (!title || !description || isNaN(Number(price)) || !category || !location || images.length === 0) {
    //   MySwal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'Please fill out all fields correctly.',
    //   });
    //   return;
    // }
  
  
    // Create form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', description);
    formData.append('price', price);
    formData.append('categoryId', category);
    formData.append('location', location);
    images.forEach((image) => {
      formData.append('images', image);
    });
    setLoading(true);
  
    try {
      const res = await fetch('http://localhost:8080/api/user/post/ads', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
    
      const contentType = res.headers.get('content-type');
    
      let responseData;
      if (contentType && contentType.includes('application/json')) {
        responseData = await res.json(); 
      } else {
        responseData = await res.text(); 
      }
    
      if (res.ok) {
        MySwal.fire({
          icon: 'success',
          title: 'Ad posted successfully!',
        });
        // Reset fields
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setLocation('');
        setImages([]);
      } else {
        console.log(responseData); 
        MySwal.fire({
          icon: 'error',
          title: 'Failed to post ad',
          text: responseData || 'Something went wrong',
        });
      }
    } catch (err) {
      console.error(err); 
      MySwal.fire({
        icon: 'error',
        title: 'Failed to post ad',
        text: err.message || 'Network error',
      });
    } finally {
      setLoading(false);
    }
    
  }

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
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-xl  shadow-md space-y-6">
            {/* Title Input */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter ad title"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl  shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter ad description"
              />
            </div>

            {/* Price Input */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>

            {/* Location Input */}
            <LocationAutocomplete onLocationSelect={(selectedLocation) => setLocation(selectedLocation)} />

            {/* Images Upload */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl  shadow-sm focus:outline-none focus:border-blue-500"
              />
              {images.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {images.map((image) => (
                    <p key={image.name}>{image.name}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
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
            </div>

            <button
              type="submit"
              className={`w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Ad'}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl mb-4">You need to be logged in to post an ad.</h2>
          <button
            onClick={() => setLoginPopupOpen(true)}
            className="py-2 px-4 bg-purple-600 text-white hover:bg-purple-800 rounded-xl"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
