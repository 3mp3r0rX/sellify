'use client'

import Link from "next/link";
import { useState, useEffect } from "react";


type Ad = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
};


export default function HomePage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('/api/ads');
        if (!res.ok) throw new Error('Failed to fetch ads');
        const data: Ad[] = await res.json();
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
        <button className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
        <Link href="/post-ad">Post Your Ad</Link>  
        </button>
      </div>
      <div className="flex flex-col text items-center justify-center min-h-screen">
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        {ads.map((ad) => (
          <div key={ad.id} className="p-4 border rounded-md shadow-md">
            {ad.imageUrl && (
              <img src={ad.imageUrl} alt={ad.title} className="w-80 h-60 object-cover mb-4" />
            )}
            <h2 className="text-2xl text-center font-bold">{ad.title}</h2>
            <p className="font-bold">{ad.category}</p>
            <p className="text-gray-700">{ad.description}</p>
            <p className="text-xl text-center font-bold mt-2">${ad.price}</p>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
}
