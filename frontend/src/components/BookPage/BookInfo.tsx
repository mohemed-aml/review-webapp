// frontend/src/components/BookPage/BookInfo.tsx
import React from 'react';
import { Book } from '../../types'; // Import the Book type
import { Button } from '../ui/button'; // ShadCN Button

type BookInfoProps = {
  book: Book;
};

const BookInfo: React.FC<BookInfoProps> = ({ book }) => {
  return (
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
  );
};

export default BookInfo;
