// backend/src/scripts/fetchBooks.js
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book'); // Assuming the Book model is in models folder

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Function to fetch books from Google Books API
const fetchBooks = async (query, maxResults = 40) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`);
    return response.data.items || [];
  } catch (error) {
    console.error(`Error fetching books from Google API: ${error.message}`);
    return [];
  }
};

// Function to insert books into MongoDB
const insertBooks = async (books) => {
  try {
    const bookDocs = books.map((book) => {
      const volumeInfo = book.volumeInfo || {};
      return {
        title: volumeInfo.title || 'Unknown Title',
        author: (volumeInfo.authors && volumeInfo.authors[0]) || 'Unknown Author',
        description: volumeInfo.description || 'No Description',
        publishedDate: volumeInfo.publishedDate || 'Unknown',
        coverImageUrl: (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) || '', // Use Google Books thumbnail
      };
    });

    await Book.insertMany(bookDocs);
    console.log(`Successfully inserted ${bookDocs.length} books into MongoDB.`);
  } catch (error) {
    console.error(`Error inserting books into MongoDB: ${error.message}`);
  }
};

// Main function to fetch and store books
const seedBooks = async () => {
  try {
    let totalBooks = 0;
    const queries = ['fiction', 'science', 'history', 'technology', 'philosophy']; // Search categories

    for (const query of queries) {
      const books = await fetchBooks(query, 40); // Fetch 40 books for each query
      await insertBooks(books);
      totalBooks += books.length;
    }

    console.log(`Total books inserted: ${totalBooks}`);
    mongoose.connection.close(); // Close the connection when done
  } catch (error) {
    console.error(`Error during the seeding process: ${error.message}`);
  }
};

seedBooks();