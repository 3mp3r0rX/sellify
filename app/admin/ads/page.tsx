'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Ad = {
  post_id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
};

type AdsResponse = {
  [key: string]: Ad[]; 
};

const AdsPage = () => {
  const [ads, setAds] = useState<AdsResponse>({});
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/high/auth/admin/posts', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch ads');
        const data: AdsResponse = await res.json();
        console.log('Fetched ads:', data);
        setAds(data);
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };
    fetchAds();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/admin/ads/edit`);
  };

  const handleDelete = async (ad: Ad, username: string) => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/high/auth/admin/posts/delete/${ad.post_id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!res.ok) throw new Error('Failed to delete post');

      setAds((prevAds) => {
        const updatedAds = { ...prevAds };
        updatedAds[username] = updatedAds[username].filter(
          (post) => post.post_id !== ad.post_id
        );
        return updatedAds;
      });
      toast.success('Post deleted successfully');
    } catch (err) {
      console.error(err);
      setError('Failed to delete post');
      toast.error('Failed to delete post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Ads Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Title</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Description</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Price</th>
              <th className="p-3 text-left border-b font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ads).map(([username, userAds]) =>
              userAds.map((ad) => (
                <tr key={ad.post_id} className="hover:bg-gray-50">
                  <td className="p-3 border-b text-gray-700">{ad.title}</td>
                  <td className="p-3 border-b text-gray-700">{ad.description}</td>
                  <td className="p-3 border-b text-gray-700">{ad.price}</td>
                  <td className="p-3 border-b">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleEdit(ad.post_id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(ad, username)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdsPage;
