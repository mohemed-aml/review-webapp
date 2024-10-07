// frontend/src/App.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthModal from './components/auth/AuthModal';
import BookDetails from './components/BookPage/BookDetails';
import Books from './components/Books';
import FeaturedBooks from './components/FeaturedBooks';
import Navbar from './components/Navbar/Navbar';
import { auth } from './firebase/firebaseConfig';
import { setUser } from './redux/slices/authSlice';
import store from './redux/store';
import UserProfile from './components/UserProfile/UserProfile';

// Function to transform Firebase User object to SerializableUser
const getSerializableUser = (user: User | null) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const serializableUser = getSerializableUser(user);
      dispatch(setUser(serializableUser)); // Dispatch the setUser action whenever auth state changes
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
          <Route path="/profile" element={<UserProfile />} />
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