'use client';

import { useState, useEffect } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editCategory, setEditCategory] = useState<{ id: number; name: string } | null>(null);
  const [error, setError] = useState<string>('');

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/ycategories');
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
      setError('Failed to fetch categories'); // Show a user-friendly message
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const res = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });
      const data = await res.json();
      console.log('Added category:', data); // Debugging log
      setCategories([...categories, data]);
      setNewCategory('');
    } catch (err) {
      setError('Failed to add category');
    }
  };

  const handleEditCategory = async () => {
    if (!editCategory) return;
    try {
      const res = await fetch('http://localhost:8080/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCategory),
      });
      const data = await res.json();
      console.log('Edited category:', data); // Debugging log
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
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <button 
          onClick={handleAddCategory} 
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {editCategory && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={editCategory.name}
            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button 
            onClick={handleEditCategory} 
            className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 uppercase text-sm">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{category.name}</td>
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
                <td colSpan={2} className="py-3 px-6 text-center">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;
