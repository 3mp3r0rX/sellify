'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdsPage = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('/api/ads');
        const data = await res.json();
        console.log(data); // Log the data to check its structure
        if (Array.isArray(data)) {
          setAds(data);
        } else {
          setError('Failed to fetch ads');
        }
      } catch (err) {
        setError('Failed to fetch ads');
      }
    };
  
    fetchAds();
  }, []);
  

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this ad?')) {
      try {
        const res = await fetch(`/api/ads`, { method: 'DELETE' });
        if (res.ok) {
          setAds(ads.filter(ad => ad.id !== id));
        } else {
          setError('Failed to delete ad');
        }
      } catch (err) {
        setError('Failed to delete ad');
      }
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/admin/ads/edit`);
  };

  return (
    <div>
      <h1>Ads Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Description</th>
            <th className="p-3 border-b">Price</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map(ad => (
            <tr key={ad.id}>
              <td className="p-3 border-b">{ad.title}</td>
              <td className="p-3 border-b">{ad.description}</td>
              <td className="p-3 border-b">{ad.price}</td>
              <td className="p-3 border-b">
                <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(ad.id)}>
                  Edit
                </button>
                <button className="text-red-500 hover:underline" onClick={() => handleDelete(ad.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdsPage;
