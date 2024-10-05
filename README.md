# Review WebApp

A book review platform where users can browse books, read and write reviews, and rate books. The platform uses a **React** frontend and a **Node.js** backend with **MongoDB** for data storage. Firebase Authentication is used for user login, and Redux is implemented for state management on the frontend.

---

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
   - [Prerequisites](#prerequisites)
   - [Clone the Repository](#clone-the-repository)
   - [Running the Project](#running-the-project)
5. [API Documentation](#api-documentation)
6. [Environment Variables](#environment-variables)
7. [Deployment](#deployment)
8. [License](#license)

---

## Tech Stack

### Frontend:
- **React**: Library for building user interfaces.
- **Redux**: State management.
- **Axios**: HTTP client for making API requests.
- **Chakra UI**: For UI components.
- **TailwindCSS**: CSS framework for styling.
- **Firebase**: For user authentication.
- **ShadCN**: Component library for responsive layouts.

### Backend:
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB (Atlas)**: NoSQL database for storing user data, reviews, and books.
- **Mongoose**: ODM library for MongoDB.
- **Cors**: Middleware to handle cross-origin requests.
- **dotenv**: Environment variables management.

---

## Features
- Browse books with pagination, search, and filter functionality.
- Write and view reviews for individual books.
- Rate books and add them to favorites.
- User authentication using Firebase (Google, Email/Password).
- Admin can add new books to the catalog.
- Responsive design using Chakra UI and TailwindCSS.

---

## Project Structure

```bash
review-webapp/
│
├── backend/                  # Express server code
│   ├── src/                  
│   │   ├── controllers/       # API Controllers
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API Routes
│   │   ├── index.js           # Entry point for backend
│   ├── .env.example           # Example environment variables for backend
│   └── package.json           # Backend dependencies and scripts
│
├── frontend/                 # React frontend code
│   ├── src/                  
│   │   ├── components/        # React components
│   │   ├── redux/             # Redux store and slices
│   │   ├── pages/             # App pages
│   │   ├── App.tsx            # Main App component
│   ├── .env.example           # Example environment variables for frontend
│   └── package.json           # Frontend dependencies and scripts
│
├── .gitignore                # Git ignore file for both frontend and backend
└── README.md                 # Project documentation
```

---

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or above)
- **npm** (v6 or above)
- **MongoDB Atlas** (or local MongoDB instance)
- **Firebase** account for authentication

### Clone the Repository
1. Open your terminal.
2. Clone the repository:
    ```bash
    git clone https://github.com/your-username/review-webapp.git
    ```
3. Navigate to the project directory:
    ```bash
    cd review-webapp
    ```

### Running the Project

#### 1. Backend Setup
1. Navigate to the backend folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
   - Rename the `.env.example` file to `.env`:
     ```bash
     mv .env.example .env
     ```
   - Add your MongoDB connection string (`MONGO_URI`) and other credentials in the `.env` file.
   
4. Start the backend server:
    ```bash
    npm start
    ```

#### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
   - Rename the `.env.example` file to `.env`:
     ```bash
     mv .env.example .env
     ```
   - Add your Firebase configuration and backend URL in the `.env` file.

4. Start the React development server:
    ```bash
    npm start
    ```

5. Open the app in your browser:
    ```
    http://localhost:3000
    ```

---

### API Documentation

#### Books
- `GET /books`: Fetch all books with pagination, search, and filter options.
- `GET /books/:id`: Fetch a specific book by ID.
- `POST /books`: Add a new book (admin only).

#### Reviews
- `GET /reviews`: Retrieve all reviews for a specific book.
- `POST /reviews`: Submit a new review for a book (only authenticated users).

#### Users
- `GET /users/:id`: Fetch user profile information.
- `PUT /users/:id`: Update user profile details.
- `POST /users/register`: Register a new user (handled via Firebase authentication).
- `POST /users/login`: Log in a user (handled via Firebase authentication).


### Environment Variables

#### Backend (`backend/.env`)
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/review-webapp?retryWrites=true&w=majority
PORT=5000
```

#### Frontend (`frontend/.env`)
```env
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
REACT_APP_API_BASE_URL=https://your-backend-url.com
```
Make sure to replace the placeholder values with the actual values from your Firebase project and the URL of your backend.

---

### Deployment

#### Vercel (Frontend)

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```
2. **Link the project to Vercel**:
   ```bash
   vercel
   ```
3. **Deploy**:
   vercel --prod
   ```
  
#### Railway (Backend)

1. Push your backend code to GitHub.
2. Link the Railway project to your GitHub repository.
3. Set environment variables in Railway:
  - MONGO_URI
  - PORT
4. Deploy using Railway dashboard.

---

### License

This project is licensed under the MIT License - see the LICENSE file for details.


### Key Details:
1. **Tech Stack & Features**: The tech stack and features of the project are clearly outlined.
2. **Project Structure**: A brief overview of the project structure is provided for both the frontend and backend.
3. **Setup Instructions**: Includes clear instructions on how to clone, install dependencies, configure environment variables, and run the project on both backend and frontend.
4. **Environment Variables**: Describes the `.env` files required for the backend and frontend.
5. **Deployment**: Instructions on how to deploy both the frontend and backend using Vercel and Railway.