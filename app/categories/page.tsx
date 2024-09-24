"use client"; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Category {
  id: number;
  name: string;
  icon: string;
}

const iconMap: Record<string, string> = {
  Cars: '🚗',
  'Real-Estate': '🏠',
  Pets: '🐶',
  Electronics: '📱',
  Fashion: '👗',
  Jobs: '💼',
  Furniture: '🛋️',
  Sports: '⚽',
  Books: '📚',
  Services: '🛠️',
  'Health-Beauty': '💄',
  Toys: '🧸',
  Groceries: '🛒',
  'Baby-Products': '👶',
  'Music-Instruments': '🎸',
  'Garden-Outdoor': '🌳',
  Travel: '✈️',
  'Movies & Games': '🎮',
  Bikes: '🚲',
  'Art-Collectibles': '🖼️',
  'Home-Appliances': '🍳',
  'Event-Planning': '🎉',
  Watches: '⌚',
  Cameras: '📷',
};

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');

        const data: Record<string, string> = await res.json();
        console.log('Fetched categories:', data);

        const categoriesArray: Category[] = Object.entries(data).map(([id, name]) => ({
          id: parseInt(id, 10),
          name,
          icon: iconMap[name] || '❓',
        }));

        setCategories(categoriesArray);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    const slugifiedName = slugify(categoryName);
    router.push(`/categories/${slugifiedName}`);
};


  const displayedCategories = showMore ? categories : categories.slice(0, 8);

  return (
    <div className="bg-white shadow-md py-4 rounded-lg py-10">
      <h1 className='text-center text-4xl font-bold py-3'>Categories</h1>
      <div className="container mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {displayedCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className="flex flex-col items-center text-center p-2 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg rounded-lg hover:bg-blue-100 text-gray-800 cursor-pointer"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <span className="font-semibold text-md">{category.name}</span>
          </div>
        ))}

        {categories.length > 4 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="col-span-full flex items-center justify-center text-blue-600 hover:underline mt-4"
          >
            {showMore ? (
              <>
                <FaChevronUp className="mr-2" />
                Show Less
              </>
            ) : (
              <>
                <FaChevronDown className="mr-2" />
                Show More
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
