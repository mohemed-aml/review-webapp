// frontend/src/components/FeaturedBooks.tsx
import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type Book = {
  _id: string;
  title: string;
  author: string;
  coverImageUrl: string;
};

export function FeaturedBooks() {
  const [books, setBooks] = React.useState<Book[]>([]);
  
  // Fetch top 15 books when the component mounts
  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        // const response = await axios.get("/books/top-15"); // Assuming this is the API to fetch top 15 books
        const response = await axios.get(`/books`, {
          params: { limit: 10 },
        });
        setBooks(response.data.books); // Assuming the response contains the books in response.data.books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col items-center py-6">
      <h2 className="text-2xl font-bold mb-2">New York Times Bestsellers</h2>

      <Carousel className="w-[90vw] relative">
        <CarouselContent className="relative">
          {books.map((book) => (
            <CarouselItem
              key={book._id}
              className="sm:basis-1/1 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Link to={`/books/${book._id}`} className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="mt-2"> {/* Adjusted margin between image and text */}
                      <h3 className="text-lg font-semibold">{book.title}</h3>
                      <p className="text-gray-600">{book.author}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
}

export default FeaturedBooks; 