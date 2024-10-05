import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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

// Get the API base URL from the environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async action to fetch books based on filters and pagination
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (filters: BookFilters, thunkAPI) => {
    const { limit, page, search, publisher, minRating, genres, isbn } = filters;
    try {
      const response = await axios.get(`${API_BASE_URL}/books`, {
        params: { limit, page, search, publisher, minRating, genres, isbn },
      });
      return response.data;
    } catch (error) {
      // Narrow the error type to AxiosError
      if (axios.isAxiosError(error)) {
        // You can access the `response` property safely now
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch books');
      } else {
        // Handle non-Axios errors
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
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
        state.error = action.payload as string; // Fixed error typing
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