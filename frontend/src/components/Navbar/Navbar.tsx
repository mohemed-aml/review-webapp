// frontend/src/components/Navbar.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { logout } from '../../redux/slices/authSlice';
import RightContent from './RightContent/RightContent'; // Add this to use RightContent in Navbar
import { RootState } from '../../redux/store';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <Link to="/" className="text-xl font-bold">
            Book Review App
          </Link>
          <div className="flex items-center">
            <Link to="/books" className="mr-4">
              Books
            </Link>
            <RightContent user={user} />  
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;