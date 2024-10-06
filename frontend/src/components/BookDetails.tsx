// frontend/src/components/BookDetails.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from './ui/button'; // ShadCN component

type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  coverImageUrl: string;
  rating: number;
};

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch individual book by ID
    const fetchBook = async () => {
      try {
        const backendBaseUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(`${backendBaseUrl}/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className="h-80 w-full object-cover rounded"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-xl text-gray-700 mb-2">by {book.author}</p>
          <p className="text-gray-600 mb-4">{book.publisher}</p>
          <p className="mb-4">{book.description}</p>
          <p className="text-lg font-semibold">Rating: {book.rating}</p>

          <Button className="mt-4">Add to Favorites</Button> {/* Example ShadCN button */}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;