// components/AdsByCategory.tsx
'use client';
import { useEffect, useState } from 'react';

export default function AdsByCategory({ category }) {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(`/api/ads?category=${category}`);
        if (res.ok) {
          const data = await res.json();
          setAds(data);
        } else {
          setError('Failed to fetch ads');
        }
      } catch (err) {
        setError('Failed to fetch ads');
      }
    };
    fetchAds();
  }, [category]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Ads in {category}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className="p-4 border rounded">
            <h2 className="text-2xl">{ad.title}</h2>
            <p>{ad.description}</p>
            <p>${ad.price}</p>
            {ad.imageUrl && <img src={ad.imageUrl} alt={ad.title} />}
          </div>
        ))}
      </div>
    </div>
  );
}
