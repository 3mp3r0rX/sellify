import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdDetailsPage() {
  const [ad, setAd] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchAd() {
        const res = await fetch(`http://localhost:8080/api/ads/${id}`);
        const data = await res.json();
        setAd(data);
      }

      fetchAd();
    }
  }, [id]);

  return (
    <div className="p-4">
      {ad ? (
        <div>
          <h1 className="text-2xl font-bold">{ad.title}</h1>
          <p>{ad.description}</p>
          <p>Price: ${ad.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
