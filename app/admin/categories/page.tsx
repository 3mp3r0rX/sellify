'use client';

import { useState, useEffect } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [newCategoryDescription, setNewCategoryDescription] = useState<string>('');
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [editCategory, setEditCategory] = useState<{ id: number; name: string; description: string } | null>(null);
  const [error, setError] = useState<string>('');

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched categories:', data);
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Expected an array of categories');
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory || !newCategoryDescription || !newCategoryImage) return;
    try {
      const formData = new FormData();
      formData.append('name', newCategory);
      formData.append('description', newCategoryDescription);
      formData.append('image', newCategoryImage);

      const res = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      console.log('Added category:', data);
      setCategories([...categories, data]);
      setNewCategory('');
      setNewCategoryDescription('');
      setNewCategoryImage(null);
    } catch (err) {
      setError('Failed to add category');
    }
  };

  const handleEditCategory = async () => {
    if (!editCategory) return;
    try {
      const res = await fetch(`http://localhost:8080/api/categories/${editCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCategory),
      });
      const data = await res.json();
      console.log('Edited category:', data);
      setCategories(categories.map(c => (c.id === data.id ? data : c)));
      setEditCategory(null);
    } catch (err) {
      setError('Failed to edit category');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`http://localhost:8080/api/categories?id=${id}`, {
          method: 'DELETE',
        });
        setCategories(categories.filter(c => c.id !== id));
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      <form className="w-full bg-white shadow-md p-6 mb-6" onSubmit={e => e.preventDefault()}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2">
              Category Name
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              required
            />
          </div>
          <div className="w-full px-3 mb-6">
            <textarea
              rows={4}
              className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              placeholder="Category Description"
              required
            />
          </div>

          <div className="w-full px-3 mb-8">
            <label className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center justify-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Category image</h2>
              <p className="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file SVG, PNG, JPG or GIF.</p>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setNewCategoryImage(e.target.files ? e.target.files[0] : null)}
                accept="image/png, image/jpeg, image/webp"
                required
              />
            </label>
          </div>

          <div className="w-full md:w-full px-3 mb-6">
            <button
              className="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </div>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Image</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{category.name}</td>
                  <td className="py-3 px-6">{category.description}</td>
                  <td className="py-3 px-6">
                    <img src={category.imageUrl} alt={category.name} className="w-12 h-12 object-cover" />
                  </td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => setEditCategory(category)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-3 px-6 text-center">
                  No categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;
