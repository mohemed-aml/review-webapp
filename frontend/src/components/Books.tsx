// frontend/src/components/Books.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, setCurrentPage } from '../redux/slices/bookSlice';
import Filters from './Filters';
import BookList from './BookList';
import Pagination from './Pagination';
import { RootState, useTypedDispatch } from '../redux/store';

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
