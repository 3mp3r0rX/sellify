import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/search?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setResults(data);
      setError(null); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="mb-3 xl:w-96">
        <form onSubmit={handleSearch}>
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-blue-700"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-4">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p>{item.category}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
