'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import BookmarkButton from './components/BookmarkButton';
import ReportModal from './components/ReportModal'; 

type Image = {
  imageId: number;
  imageData: string; 
};

type Ad = {
  postId: number;
  title: string;
  content: string;
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
  const [loading, setLoading] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [currentAdId, setCurrentAdId] = useState<number | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(8); // Change this to adjust the number of ads per page

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); 
    return () => setLoading(true);
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/ads');
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

  const handleReportClick = (adId: number) => {
    setCurrentAdId(adId); 
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = async (reason: string) => {
    if (currentAdId === null) return;

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adId: currentAdId,
          reason,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      setIsReportModalOpen(false);
      console.log('Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  // Calculate ads for the current page
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const allAds = Object.entries(ads).flatMap(([userEmail, userAds]) => 
    userAds.map(ad => ({ ...ad, userEmail }))
  );
  const currentAds = allAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalAds = allAds.length;
  const totalPages = Math.ceil(totalAds / adsPerPage);

  return (
    <>
      {loading ? (
        <Loading /> 
      ) : (
        <main className="flex flex-col items-center justify-center min-h-screen py-12">
          <h1 className="text-5xl font-bold text-blue-gray-900">Welcome to Sellify</h1>
          <p className="mt-3 text-2xl text-gray-700">Buy and Sell Anything, Anytime.</p>
  
          <div className="mt-6">
            <Link href="/post-ad">
              <button className="px-5 py-3 bg-teal-500 text-white font-semibold rounded-xl shadow-md hover:bg-teal-600 transition duration-300">
                Post Your Ad
              </button>
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center mt-8 w-full max-w-6xl mx-auto">
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {currentAds.length > 0 ? (
                currentAds.map((ad) => (
                  <Card
                    key={ad.postId} // Use postId as key for uniqueness
                    className="border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
                  >
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
                    <Link href={`/ad/${ad.postId}`}>
                      <CardBody className="p-4">
                        <p className="text-center font-bold text-gray-800 text-lg">{ad.userEmail}</p>
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
                          {ad.content}
                        </Typography>
                        {/* Display user email */}
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal text-gray-500 mt-1"
                        >
                          Posted by: {ad.userEmail}
                        </Typography>
                      </CardBody>
                    </Link>
                    <CardFooter className="pt-0 text-center">
                      <div className="flex justify-between">
                        <BookmarkButton adId={ad.postId} isBookmarked={false} />
                        <button
                          onClick={() => handleReportClick(ad.postId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Report
                        </button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <p className="text-gray-600">No ads available</p>
              )}
            </div>

            <nav className="mb-4 flex justify-center space-x-4 pt-12" aria-label="Pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center rounded-lg border border-teal-500 px-3 py-2 text-gray-700 transition-colors duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-500 hover:text-white'}`}
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <span key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`cursor-pointer rounded-lg border border-teal-500 px-4 py-2 text-gray-700 transition-colors duration-300 ${currentPage === pageNumber ? 'bg-teal-500 text-white' : 'hover:bg-teal-100'}`}>
                {pageNumber}
              </span>
            );
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center rounded-lg border border-teal-500 px-3 py-2 text-gray-700 transition-colors duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-500 hover:text-white'}`}
          >
            <span className="sr-only">Next</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </nav>
          </div>

          <ReportModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            onSubmit={handleReportSubmit}
          />
        </main>
      )}
    </>
  );  
}
