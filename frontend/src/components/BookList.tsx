// frontend/src/components/BookList.tsx
import React from 'react';
import { Link } from 'react-router-dom';

type Book = {
  _id: string;
  title: string;
  author: string;
  coverImageUrl: string;
};

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <Link to={`/books/${book._id}`} key={book._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img src={book.coverImageUrl} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold mt-4">{book.title}</h2>
          <p className="text-gray-600">{book.author}</p>
        </Link>
      ))}
    </div>
  );
};

export default BookList;