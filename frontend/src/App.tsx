// frontend/src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import FeaturedBooks from './components/FeaturedBooks';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';
import AuthModal from './components/auth/AuthModal';
import { ChakraProvider } from '@chakra-ui/react';
import { setUser } from './redux/slices/authSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user)); // Dispatch the setUser action whenever auth state changes
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [dispatch]);
  
  return (
    <ChakraProvider> {/* Wrap your app in ChakraProvider */}
      <Provider store={store}>
        <Navbar />
        <AuthModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
// Create a Home component to include FeaturedBooks
function Home() {
  return (
    <div>
      {/* FeaturedBooks carousel will only appear on the home page */}
      <FeaturedBooks />
    </div>
  );
}