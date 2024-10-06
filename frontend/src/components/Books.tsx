// frontend/src/components/Books.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchBooks } from '../redux/slices/bookSlice';
import { RootState, useTypedDispatch } from '../redux/store';
import BookList from './BookList';
import Filters from './Filters';
import Pagination from './Pagination';

const Books: React.FC = () => {
  const dispatch = useTypedDispatch(); // Use the typed dispatch here
  const { books, limit, currentPage, search, publisher, minRating, genres, isbn, filtersApplied } = useSelector(
    (state: RootState) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks({ limit, page: currentPage, search, publisher, minRating, genres, isbn }));
  }, [dispatch, currentPage, limit, search, publisher, minRating, genres, isbn, filtersApplied]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Books</h1>
      <Filters />
      <BookList books={books} />
      <Pagination />
    </div>
  );
};

export default Books;