import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string; 
}

export default function AdDetailsPage() {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchAd() {
        setLoading(true);
        setError(null);

        try {
          const res = await fetch(`/api/ads?id=${id}`);
          if (!res.ok) throw new Error('Failed to fetch ad');

          const data = await res.json();
          console.log('Fetched ad data:', data); // Debugging

          if (data && typeof data === 'object' && 'title' in data) {
            setAd(data as Ad);
          } else {
            setError('Invalid ad data format');
          }
        } catch (error: any) {
          setError(error.message || 'Failed to load ad.');
        } finally {
          setLoading(false);
        }
      }

      fetchAd();
    }
  }, [id]);

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {ad ? (
        <div>
          <h1 className="text-2xl font-bold">{ad.title}</h1>
          <p>{ad.description}</p>
          <p>Price: ${ad.price}</p>
          <p>Category: {ad.category}</p>
          <img src={ad.imageUrl} alt={ad.title} className="w-full h-auto mt-4" />
        </div>
      ) : null}
    </div>
  );
}
