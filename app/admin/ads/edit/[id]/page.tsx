'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditAdPage = () => {
  const router = useRouter();
  const [ad, setAd] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = router.query;

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`/api/ads/${id}`);
        const data = await res.json();
        if (data) {
          setAd(data);
          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price);
          setImageUrl(data.imageUrl || '');
          setCategory(data.category || '');
          setLoading(false);
        } else {
          setError('Failed to fetch ad');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch ad');
        setLoading(false);
      }
    };

    if (id) fetchAd();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/ads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, price, imageUrl, category }),
      });

      if (res.ok) {
        router.push('/admin/ads');
      } else {
        setError('Failed to update ad');
      }
    } catch (err) {
      setError('Failed to update ad');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Ad</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} required />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditAdPage;
