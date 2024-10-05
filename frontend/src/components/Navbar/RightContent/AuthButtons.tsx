// frontend/src/components/RightContent/AuthButtons.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../ui/button'; // ShadCN Button component
import { openModal } from '../../../redux/slices/authModalSlice'; // Redux action to open modal

const AuthButtons: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex space-x-2">
      {/* Log In Button */}
      <Button
        variant="secondary"
        className="ml-4"
        onClick={() => dispatch(openModal({ view: 'login' }))}
      >
        Log In
      </Button>
      
      {/* Sign Up Button */}
      <Button
        className=""
        onClick={() => dispatch(openModal({ view: 'signup' }))}
      >
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;