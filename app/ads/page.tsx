'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string; 
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
      setError(null);

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

        // Validate and log fetched data
        console.log('Fetched data:', data);

        if (Array.isArray(data)) {
          setAds((prevAds) => [...prevAds, ...data]);
          // Assuming `hasMore` is determined by the length of the array
          setHasMore(data.length === 10);
        } else {
          setError('Invalid data format');
        }
      } catch (error: any) {
        setError(error.message || 'Failed to load ads. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchAds();
  }, [search, sort, page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Available Ads</h1>

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

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {ads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad) => (
            <div key={ad.id} className="border p-4 rounded-lg shadow-md bg-white hover:bg-gray-50 transition ease-in-out duration-150">
              <Image
                src={ad.imageUrl}
                alt={ad.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => (e.currentTarget.src = '/placeholder.png')} 
              />
              <h2 className="text-2xl font-semibold mt-4">{ad.title}</h2>
              <p className="text-gray-700 mt-2">{ad.description}</p>
              <p className="text-lg font-bold mt-2">${ad.price}</p>
              <p className="text-sm text-gray-500 mt-1">{ad.category}</p>
              <a href={`/ads/${ad.id}`} className="text-blue-500 hover:underline mt-4 inline-block">View Details</a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No ads available</p>
      )}

      {hasMore && !loading ? (
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      ) : (
        !hasMore && (
          <p className="text-gray-500 mt-8">No more ads to load.</p>
        )
      )}

      {loading && (
        <div className="mt-8">
          <p>Loading more ads...</p>
        </div>
      )}
    </div>
  );
}
