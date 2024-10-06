// frontend/src/types.ts

export type User = {
  _id: string;
  name: string;
  email: string;
};

export type Review = {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  description: string;
  publisher: string;
  coverImageUrl: string;
  rating: number;
};