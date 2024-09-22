'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

type Image = {
  image_id: number;
  image_data: string; // Base64 image data
};

type Ad = {
  title: string;
  description: string;
  price: number;
  category_name: string;
  created_at: string;
  images: Image[]; // Updated to reflect the new structure
};

type AdsResponse = {
  [key: string]: Ad[]; 
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
        console.log('Fetched ads:', data);
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
      <p className="mt-3 text-2xl text-gray-700">Buy and Sell Anything, Anytime.</p>
      
      <div className="mt-6">
        <Link href="/post-ad">
          <button className="px-5 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-800 transition duration-300">
            Post Your Ad
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mt-8 w-full max-w-6xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {Object.entries(ads).length > 0 ? (
            Object.entries(ads).map(([userName, userAds]) =>
              userAds.map((ad, index) => (
                <div key={index} className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-6 transition-transform transform hover:scale-105">
                  {ad.images.length > 0 ? (
                    <img
                      className="w-full h-48 object-cover mb-4"
                      src={`data:image/jpeg;base64,${ad.images[0].image_data}`} // Displaying the first image
                      alt={ad.title}
                    />
                  ) : (
                    <img
                      className="w-full h-48 object-cover mb-4"
                      src="https://via.placeholder.com/400x300"
                      alt="No image available"
                    />
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900">{ad.title}</h3>
                  <p className="text-gray-500 mt-1">Posted by: {userName}</p>
                  <p className="text-gray-700 mt-1">{ad.description}</p>
                  <p className="font-bold text-gray-800">Category: {ad.category_name}</p>
                  <p className="font-bold text-gray-800">Price: ${ad.price.toFixed(2)}</p>
                  
                  <p className="text-sm text-gray-500">
                    Posted on: {new Date(ad.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )
          ) : (
            <p className="text-gray-600">No ads available</p>
          )}
        </div>
      </div>
    </main>
  );
}
