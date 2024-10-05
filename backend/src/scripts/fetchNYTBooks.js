// backend/src/scripts/fetchNYTBooks.js
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Book = require('../models/Book');

// Load .env file from the root of the backend directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  process.exit(1);  // Exit the app on connection failure
});

// Your NYT API Key stored in the .env file
const NYT_API_KEY = process.env.NYT_API_KEY;

// Function to fetch books from NYT Bestseller API
const fetchNYTBooks = async (publishedDate = null) => {
  try {
    let url = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${NYT_API_KEY}`;

    // Add the published_date parameter if specified
    if (publishedDate) {
      url += `&published_date=${publishedDate}`;
    }

    const response = await axios.get(url);
    const lists = response.data.results.lists || [];

    // Extracting the books from the bestseller lists
    const books = lists.flatMap(list => list.books);
    return books;
  } catch (error) {
    console.error(`Error fetching books from NYT API: ${error.response?.statusText || error.message}`);
    return [];
  }
};

// Function to insert books into MongoDB
const insertBooks = async (books) => {
  try {
    const bookDocs = books.map((book) => ({
      title: book.title || 'Unknown Title',
      author: book.author || 'Unknown Author',
      description: book.description || 'No Description',
      publisher: book.publisher || 'Unknown Publisher',
      coverImageUrl: book.book_image || '', // Use NYT book image
    }));

    await Book.insertMany(bookDocs);
    console.log(`Successfully inserted ${bookDocs.length} books into MongoDB.`);
  } catch (error) {
    console.error(`Error inserting books into MongoDB: ${error.message}`);
  }
};

// Main function to fetch and store books
const seedNYTBooks = async () => {
  try {
    const publishedDate = null;  // Set to a date like '2024-10-01' to fetch for a specific date
    const books = await fetchNYTBooks(publishedDate); // Fetch books from NYT API
    await insertBooks(books); // Insert them into MongoDB
    mongoose.connection.close(); // Close the connection when done
  } catch (error) {
    console.error(`Error during the seeding process: ${error.message}`);
  }
};

seedNYTBooks();   