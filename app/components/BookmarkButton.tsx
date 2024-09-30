
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

interface BookmarkButtonProps {
  adId: number;
  isBookmarked: boolean;  
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
        <span className="text-yellow-500 text-xl">★</span> 
      ) : (
        <span className="text-gray-500 text-xl">☆</span> 
      )}
    </button>
  );
};

export default BookmarkButton;
