'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Define the types
type Ad = {
  title: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
};

type AdsResponse = {
  [key: string]: Ad[]; // Keys are usernames, values are arrays of ads
};

export default function HomePage() {
  const [ads, setAds] = useState<AdsResponse>({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/ads/feeds');
        if (!res.ok) throw new Error('Failed to fetch ads');
        const data: AdsResponse = await res.json();
        console.log('Fetched ads:', data); // Log the data structure
        setAds(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchAds();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-5xl font-bold text-gray-900">Welcome to Sellify</h1>
      <p className="mt-3 text-2xl text-gray-700">
        Buy and Sell Anything, Anytime.
      </p>
      <div className="mt-6">
        <button className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          <Link href="/post-ad">Post Your Ad</Link>
        </button>
      </div>

      <div className="flex flex-col text items-center justify-center min-h-screen">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
          {/* Iterate over the keys (usernames) */}
          {Object.entries(ads).length > 0 ? (
            Object.entries(ads).map(([userName, userAds]) => (
              <div key={userName} className="user-posts">
                <h2 className="text-2xl font-bold">{userName}</h2>
                <div className="posts">
                  {/* Iterate over the ads for each user */}
                  {userAds.map((ad, index) => (
                    <div key={index} className="p-4 border rounded-md shadow-md">
                      <h3 className="text-xl font-bold">{ad.title}</h3>
                      <p className="text-gray-700">{ad.description}</p>
                      <p className="font-bold">Category: {ad.category}</p>
                      <p className="font-bold">Price: ${ad.price}</p>
                      <p className="text-sm text-gray-500">
                        Posted on: {new Date(ad.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No ads available</p>
          )}
        </div>
      </div>
    </main>
  );
}
