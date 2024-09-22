'use client'

import { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const handleSearch = () => {
    onSearch({ priceMin, priceMax, category, location, sortBy });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md rounded-lg space-y-4 md:space-y-0">
      <input
        type="number"
        placeholder="Min Price"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
        className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 md:mr-3 mb-2 md:mb-0"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 md:mr-2 mb-2 md:mb-0"
      />
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 md:mr-2 mb-2 md:mb-0"
      >
        <option value="">Select Category</option>
        {/* Add categories dynamically here */}
      </select>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 md:mr-2 mb-2 md:mb-0"
      />
      <select
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 md:mr-2 mb-2 md:mb-0"
      >
        <option value="date">Sort by Date</option>
        <option value="price">Sort by Price</option>
        <option value="popularity">Sort by Popularity</option>
      </select>
      <button
        onClick={handleSearch}
        className="w-full md:w-1/4 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-800 transition duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
