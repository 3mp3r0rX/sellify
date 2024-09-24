'use client';

import { useState } from 'react';

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch({ searchQuery, location });
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1200px] bg-gray-200 items-center justify-center p-4 bg-white shadow-lg rounded-xl space-y-4 md:space-y-0">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 md:mr-3 mb-2 md:mb-0"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 md:mr-3 mb-2 md:mb-0"
      />
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
