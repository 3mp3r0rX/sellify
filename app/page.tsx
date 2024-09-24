'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import BookmarkButton from './components/BookmarkButton';

type Image = {
  imageId: number;
  imageData: string; 
};

type Ad = {
  title: string;
  description: string;
  price: number;
  categoryName: string;
  createdAt: string;
  images: Image[]; 
};

type AdsResponse = {
  [key: string]: Ad[];
};

export default function HomePage() {
  const [ads, setAds] = useState<AdsResponse>({});
  const [error, setError] = useState('');
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); 
    return () => setLoading(true);
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/ads/feeds');
        if (!res.ok) {
          const errorMessage = await res.text(); 
          throw new Error(`Failed to fetch ads: ${errorMessage}`);
        }
        const data: AdsResponse = await res.json();
        setAds(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };    
    fetchAds();
  }, []);

  const handleAdClick = (ad: Ad) => {
    setSelectedAd(ad);
  };

  const closeModal = () => {
    setSelectedAd(null);
  };

  return (
    <>
      {loading ? (
        <Loading /> 
      ) : (
        <main className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {Object.entries(ads).length > 0 ? (
                Object.entries(ads).map(([userName, userAds]) =>
                  userAds.map((ad, index) => (
                    <Card
  key={index}
  className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
>
  <Link href={`/ad/${ad.id}`}> {/* Add this line */}
    <CardHeader
      shadow={false}
      floated={false}
      color="transparent"
      className="h-48 relative overflow-hidden"
    >
      {ad.images.length > 0 ? (
        <img
          src={`data:image/jpeg;base64,${ad.images[0].imageData}`}
          alt={ad.title}
          className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <img
          src="https://via.placeholder.com/400x300"
          alt="No image available"
          className="h-full w-full object-cover"
        />
      )}
    </CardHeader>
    <CardBody className="p-4">
      <p className="text-center font-bold text-gray-800 text-lg">{userName}</p>
      <div className="mb-2 flex items-center justify-between">
        <Typography color="blue-gray" className="font-medium text-gray-900">
          {ad.title}
        </Typography>
        <Typography color="blue-gray" className="font-medium text-green-600">
          ${ad.price.toFixed(2)}
        </Typography>
      </div>
      <Typography
        variant="small"
        color="gray"
        className="font-normal text-gray-700 truncate"
      >
        {ad.description}
      </Typography>
    </CardBody>
    <CardFooter className="pt-0 text-center">
      <BookmarkButton adId={index} isBookmarked={false} />
    </CardFooter>
  </Link> {/* Close the Link here */}
</Card>

                  ))
                )
              ) : (
                <p className="text-gray-600">No ads available</p>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );  
}
