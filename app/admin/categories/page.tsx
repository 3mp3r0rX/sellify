'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editCategory, setEditCategory] = useState<{ id: number; name: string } | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); // Adjust the URL if necessary
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Expected an array of categories');
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
  
    fetchCategories();
  }, []);
  

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });
      const data = await res.json();
      setCategories([...categories, data]);
      setNewCategory('');
    } catch (err) {
      setError('Failed to add category');
    }
  };

  const handleEditCategory = async () => {
    if (!editCategory) return;
    try {
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCategory),
      });
      const data = await res.json();
      setCategories(categories.map(c => (c.id === data.id ? data : c)));
      setEditCategory(null);
    } catch (err) {
      setError('Failed to edit category');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`/api/categories?id=${id}`, {
          method: 'DELETE',
        });
        setCategories(categories.filter(c => c.id !== id));
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={handleAddCategory}>Add Category</button>
      {editCategory && (
        <div>
          <input
            type="text"
            value={editCategory.name}
            onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
          />
          <button onClick={handleEditCategory}>Save Changes</button>
        </div>
      )}
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => setEditCategory(category)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
