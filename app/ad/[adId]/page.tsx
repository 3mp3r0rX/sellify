'use client';

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';


const AdDetailsPage = ({ params }) => {
  const { adId } = params; 
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdDetails = async () => {
      if (adId) {
        try {
          const res = await fetch(`http://localhost:8080/api/ads/${adId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch ad details');
          }
          const data = await res.json();
          setAd(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAdDetails();
  }, [adId]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {ad && (
        <>
          <h2 className="text-2xl font-bold">{ad.title}</h2>
          <img src={`data:image/jpeg;base64,${ad.images[0].imageData}`} alt={ad.title} />
          <p>{ad.description}</p>
          <p>Price: ${ad.price.toFixed(2)}</p>
          <p>Contact Seller: {ad.sellerContact}</p>
          <button>Chat</button>
          <button>Call</button>
        </>
      )}
    </div>
  );
};

export default AdDetailsPage;
