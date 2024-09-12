'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAds() {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          search,
          sort,
          page: page.toString(),
          limit: '10',
        }).toString();

        const res = await fetch(`/api/ads?${query}`);
        if (!res.ok) throw new Error('Failed to fetch ads');

        const data = await res.json();
        setAds((prevAds) => [...prevAds, ...data.ads]);
        setHasMore(data.hasMore);
      } catch (error) {
        setError('Failed to load ads');
      } finally {
        setLoading(false);
      }
    }
    fetchAds();
  }, [search, sort, page]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Available Ads</h1>
      
      {/* Search and Sort Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ads..."
          className="p-2 border border-gray-300 rounded flex-1"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border border-gray-300 rounded mt-4 md:mt-0 md:ml-4 flex-1"
        >
          <option value="latest">Sort by Latest</option>
          <option value="priceAsc">Sort by Price: Low to High</option>
          <option value="priceDesc">Sort by Price: High to Low</option>
        </select>
      </div>
      
      {/* Display Ads */}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div key={ad.id} className="border p-4 rounded-lg shadow-md bg-white hover:bg-gray-50 transition ease-in-out duration-150">
              <Image src={ad.imageUrl || '/placeholder.png'} alt={ad.title} width={500} height={300} className="w-full h-48 object-cover rounded-lg"/>
              <h2 className="text-2xl font-semibold mt-4">{ad.title}</h2>
              <p className="text-gray-700 mt-2">{ad.description}</p>
              <p className="text-lg font-bold mt-2">${ad.price}</p>
              <a href={`/ads/${ad.id}`} className="text-blue-500 hover:underline mt-4 inline-block">View Details</a>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No ads available</p>
        )}
      </div>
      
      {/* Pagination */}
      {hasMore && (
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={loading}
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );  
}