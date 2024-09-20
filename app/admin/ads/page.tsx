'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Ad = {
  post_id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
};

type AdsResponse = {
  [key: string]: Ad[]; // Keys are usernames, values are arrays of ads
};

const AdsPage = () => {
  const [ads, setAds] = useState<AdsResponse>({});
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/high/auth/admin/posts', {
          credentials: "include"
        });
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
          {Object.entries(ads).map(([username, userAds]) => (
            userAds.map(ad => (
              <tr key={ad.post_id}>
                <td className="p-3 border-b">{ad.title}</td>
                <td className="p-3 border-b">{ad.description}</td>
                <td className="p-3 border-b">{ad.price}</td>
                <td className="p-3 border-b">
                  <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(ad.post_id)}>
                    Edit
                  </button>
                  <button 
                      className="text-red-500 hover:underline" 
                      onClick={async () => {
                        const confirmed = confirm('Are you sure you want to delete this post?');
                        if (!confirmed) return;

                        try {
                          const res = await fetch(`http://localhost:8080/api/high/auth/admin/posts/delete/${ad.post_id}`, {
                            method: 'DELETE',
                            credentials: 'include'
                          });

                          if (!res.ok) throw new Error('Failed to delete post');

                          // Update the ads state to remove the deleted post
                          setAds(prevAds => {
                            const updatedAds = { ...prevAds };
                            for (const user in updatedAds) {
                              updatedAds[user] = updatedAds[user].filter(post => post.post_id !== ad.post_id);
                            }
                            return updatedAds;
                          });
                        } catch (err) {
                          console.error(err);
                          setError('Failed to delete post');
                        }
                      }}
                    >
                      Delete
                </button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdsPage;
