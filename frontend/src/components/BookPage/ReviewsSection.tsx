// frontend/src/components/BookPage/ReviewsSection.tsx
import React, { useState } from 'react';
import { Review } from '../../types'; // Import the Review type
import { Button } from '../ui/button'; // ShadCN Button
import { Rating } from 'react-simple-star-rating';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/authModalSlice';

type ReviewsSectionProps = {        
  reviews: Review[];
  userReview: Review | null;
  onSubmitReview: (rating: number, comment: string) => void;
  user: any; // Replace `any` with the correct user type from your store
  bookId: string;
};
const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, userReview, onSubmitReview, user, bookId }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  // Trigger auth check if the user is not authenticated
  const checkAuthAndProceed = (action: () => void) => {
    if (!user) {
      dispatch(openModal({ view: 'login' }));
    } else {
      action();
    }
  };
  // Handle submit review with validation
  const handleSubmitReview = () => {
    if (!rating || !comment) {
      setError('Please provide a rating and a comment.');
      return;
    }
    setError(null);
    onSubmitReview(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <div className="bg-gray-100 mt-8 p-2 shadow-md rounded-lg">
      {/* Review Submission Section */}
      <div className="bg-gray-100 shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">Leave a Review</h2>
        <div
          className="flex flex-col items-end"
          onClick={() => checkAuthAndProceed(() => {})} // Trigger auth on any action
        >
          <Rating
            onClick={(rate) => checkAuthAndProceed(() => setRating(rate))}
            allowFraction={true}
            transition={true}
            fillColorArray={[
              "#f14f45",
              "#f16c45",
              "#f18845",
              "#f1b345",
              "#f1d045"
            ]}    
            size={24}
            initialValue={rating} 
          />
          <textarea
            className="w-full p-2 border rounded mt-1"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => checkAuthAndProceed(() => setComment(e.target.value))}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <Button className="mt-4 w-full" onClick={() => checkAuthAndProceed(handleSubmitReview)}>
          Submit Review
        </Button>
      </div>

      {/* User's Existing Review */}
      {userReview && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">Your Review</h3>
          <Rating initialValue={userReview.rating} readonly allowFraction={true} size={24} />
          <p className="mt-2">{userReview.comment}</p>
        </div>
      )}

      {/* Other Reviews Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Other Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-300 pb-4 mb-4">
              <h3 className="text-lg font-semibold">{review.user.name}</h3>
              <Rating initialValue={review.rating} readonly allowFraction={true} size={24} />
              <p className="mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;