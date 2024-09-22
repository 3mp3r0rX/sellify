'use client'


import { createContext, useContext, useEffect, useState } from 'react';

const CategoriesContext = createContext<{ categories: Category[] }>({ categories: [] });

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        
        const data: Record<string, string> = await res.json();
        const categoriesArray: Category[] = Object.entries(data).map(([id, name]) => ({
          id: parseInt(id, 10),
          name,
          icon: '❓', // Default icon if needed
        }));

        setCategories(categoriesArray);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {loading ? <p>Loading categories...</p> : children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
