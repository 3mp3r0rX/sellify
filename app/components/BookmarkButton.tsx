// components/BookmarkButton.tsx

import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

interface BookmarkButtonProps {
  adId: number;
  isBookmarked: boolean;  // Initial state: whether this ad is bookmarked
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ adId, isBookmarked }) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = async () => {
    try {
      if (bookmarked) {
        await axios.delete(`http://localhost:8080/api/user/savedads/${adId}`);
        toast.success('Removed from favorites!');
      } else {
        await axios.post('http://localhost:8080/api/user/savedads', { adId });
        toast.success('Added to favorites!');
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  return (
    <button onClick={handleBookmark}>
      {bookmarked ? (
        <span className="text-yellow-400">★</span>  // Filled star
      ) : (
        <span className="text-gray-400">☆</span>  // Empty star
      )}
    </button>
  );
};

export default BookmarkButton;
