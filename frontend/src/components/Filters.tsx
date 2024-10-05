// frontend/src/components/Filters.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch, setPublisher, setMinRating, setGenres, setIsbn, setFiltersApplied, resetFilters } from '../redux/slices/bookSlice';
import { RootState } from '../redux/store';

const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { search, publisher, minRating, genres, isbn } = useSelector((state: RootState) => state.books);

  const handleSearch = () => {
    dispatch(setFiltersApplied(true));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="p-2 border rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Publisher"
          value={publisher}
          onChange={(e) => dispatch(setPublisher(e.target.value))}
          className="p-2 border rounded-md w-full"
        />
        <input
          type="text"
          placeholder="Genres (comma-separated)"
          value={genres}
          onChange={(e) => dispatch(setGenres(e.target.value))}
          className="p-2 border rounded-md w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => dispatch(setMinRating(e.target.value))}
          className="p-2 border rounded-md w-full"
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => dispatch(setIsbn(e.target.value))}
          className="p-2 border rounded-md w-full"
        />
      </div>
      <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2">
        Search
      </button>
      {(search || publisher || minRating || genres || isbn) && (
        <button onClick={handleClearFilters} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default Filters;