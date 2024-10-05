// frontend/src/slices/bookSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of the filter parameters
interface BookFilters {
  limit: number;
  page: number;
  search?: string;
  publisher?: string;
  minRating?: string;
  genres?: string;
  isbn?: string;
}

// Async action to fetch books based on filters and pagination
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (filters: BookFilters, thunkAPI) => {
    const { limit, page, search, publisher, minRating, genres, isbn } = filters;
    const response = await axios.get('/books', {
      params: { limit, page, search, publisher, minRating, genres, isbn },
    });
    return response.data;
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    totalPages: 1,
    currentPage: 1,
    limit: 10,
    search: '',
    publisher: '',
    minRating: '',
    genres: '',
    isbn: '',
    filtersApplied: false,
    status: 'idle',
    error: null as string | null, // Fixed error typing
  },
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; },
    setPublisher: (state, action) => { state.publisher = action.payload; },
    setMinRating: (state, action) => { state.minRating = action.payload; },
    setGenres: (state, action) => { state.genres = action.payload; },
    setIsbn: (state, action) => { state.isbn = action.payload; },
    setLimit: (state, action) => { state.limit = action.payload; },
    setFiltersApplied: (state, action) => { state.filtersApplied = action.payload; },
    setCurrentPage: (state, action) => { state.currentPage = action.payload; },
    resetFilters: (state) => {
      state.search = '';
      state.publisher = '';
      state.minRating = '';
      state.genres = '';
      state.isbn = '';
      state.filtersApplied = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload.books;
        state.totalPages = action.payload.totalPages;
        state.status = 'succeeded';
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null; // Fixed error typing
      });
  },
});

export const {
  setSearch,
  setPublisher,
  setMinRating,
  setGenres,
  setIsbn,
  setLimit,
  setFiltersApplied,
  setCurrentPage,
  resetFilters,
} = bookSlice.actions;

export default bookSlice.reducer;