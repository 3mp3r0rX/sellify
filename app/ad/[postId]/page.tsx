'use client';

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { useRouter } from 'next/navigation'; // Correct import for useRouter

const AdDetailsPage = ({ params }: any) => {
  const { postId } = params; 
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();  // Initialize router here
  
  const currentUserId = 1;  // Replace with actual current user ID

  useEffect(() => {
    const fetchAdDetails = async () => {
      console.log('Fetching ad details for postId:', postId); 
      
      if (postId) {
        try {
          const res = await fetch(`http://localhost:8080/api/ads/${postId}`, {
            credentials: 'include',
          });
          
          if (!res.ok) {
            const errorData = await res.text(); 
            throw new Error(`Failed to fetch ad details: ${res.status} ${errorData}`);
          }
          
          const data = await res.json();
          setAd(data); 
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Post ID is missing');
        setLoading(false);
      }
    };

    fetchAdDetails();
  }, [postId]);

  const handleChatClick = async () => {
    if (ad && ad.posts && currentUserId === ad.posts[0].userId) {
      alert("You cannot start a chat with yourself.");
      return;
    }
  
    try {
      const roomId = postId; // Ensure roomId is set correctly
      const adPostId = ad.posts[0].id; // Ensure postId is set correctly
  
      console.log("Creating chat room with:", { roomId, postId: adPostId });
  
      const res = await fetch(`http://localhost:8080/api/create-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId, postId: adPostId }), // Pass necessary data
        credentials: 'include',
      });
  
      console.log('Response status:', res.status);
  
      // Try to parse the response as JSON
      const data = await res.text(); // Use text() to avoid JSON parsing error
      console.log('Response data:', data);
  
      if (!res.ok) {
        // Attempt to parse the response if it contains JSON
        try {
          const errorData = JSON.parse(data);
          console.error('Error data:', errorData);
          throw new Error(errorData.message || 'Failed to create room');
        } catch (e) {
          // If parsing fails, log the raw data
          console.error('Error response is not JSON:', data);
          throw new Error(data); // Fallback to raw data
        }
      }
  
      // Redirect to the chat page with the postId as a dynamic segment
      router.push(`/chat/${postId}`); // Redirecting to the chat page with dynamic route
    } catch (error) {
      console.error('Error starting chat:', error);
      setError('Failed to start chat. Please try again later.');
    }
  };
  

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col justify-center items-center bg-white rounded-lg shadow-md">
      {ad && (
        <>
          <h2 className="text-2xl font-bold mb-4">{ad.posts[0].title}</h2>
          {ad.images && ad.images.length > 0 ? (
            <img 
              src={`data:image/jpeg;base64,${ad.images[0].imageData}`} 
              alt={ad.posts[0].title} 
              className="w-full h-auto mb-4"
            />
          ) : (
            <p>No image available for this ad.</p>
          )}
          <p className="mb-2">{ad.posts[0].content}</p>
          <p className="mb-2">Price: <strong>${ad.posts[0].price.toFixed(2)}</strong></p>
          <p className="mb-2">Contact Seller: {ad.phoneNumber}</p>
          <p className="mb-4">Location: {ad.location}</p>
          <div className="flex space-x-4">
            <button 
              onClick={handleChatClick} 
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition duration-200">
              Chat
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition duration-200">
              Call
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdDetailsPage;
