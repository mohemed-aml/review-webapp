// frontend/src/components/BookDetails.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookInfo from './BookInfo';
import ReviewsSection from './ReviewsSection';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { auth } from '../../firebase/firebaseConfig';
import { Book, Review } from '../../types'; // Import types

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchBookAndReviews = async () => {
      try {
        const backendBaseUrl = process.env.REACT_APP_API_BASE_URL;
        const bookResponse = await axios.get(`${backendBaseUrl}/books/${id}`);
        setBook(bookResponse.data);

        const reviewResponse = await axios.get(`${backendBaseUrl}/reviews?bookId=${id}`);
        setReviews(reviewResponse.data);

        if (user) {
          const existingReview = reviewResponse.data.find((review: Review) => review.user._id === user.uid);
          if (existingReview) setUserReview(existingReview);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching book/reviews:', error);
        setLoading(false);
      }
    };

    fetchBookAndReviews();
  }, [id, user]);

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!user) return;

    try {
      const backendBaseUrl = process.env.REACT_APP_API_BASE_URL;
      const token = await auth.currentUser?.getIdToken();

      const payload = {
        book: id,           // The book ID from the URL (should be valid ObjectId)
        user: user.uid,     // Firebase UID sent as user ID
        rating,             // Number rating
        comment,            // User's review comment
      };

      await axios.post(`${backendBaseUrl}/reviews`, {
        book: id,
        user: user.uid,
        rating,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch updated reviews after submitting
      const reviewResponse = await axios.get(`${backendBaseUrl}/reviews?bookId=${id}`);
      setReviews(reviewResponse.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <BookInfo book={book} />
      <ReviewsSection reviews={reviews} userReview={userReview} onSubmitReview={handleSubmitReview} user={user} bookId={id!} />
    </div>
  );
};

export default BookDetails;