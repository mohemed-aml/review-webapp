// frontend/src/components/Modal/Auth/SignUp.tsx
import React, { useState, useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { auth } from '../../firebase/firebaseConfig'; // Import your Firebase config
import { FIREBASE_ERRORS } from '../../firebase/errors'; // Error messages
import { openModal, closeModal } from '../../redux/slices/authModalSlice'; // Redux actions for modal
import { RootState } from '../../redux/store'; // RootState type
import axios from 'axios';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  // Form state
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Local error state
  const [error, setError] = useState('');

  // Firebase hook for creating user
  const [createUserWithEmailAndPassword, userCred, loading, userError] = useCreateUserWithEmailAndPassword(auth);

  // Handle form submit
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError(''); // Clear previous errors

    // Check if passwords match
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  // Handle form input change
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // Close the modal when user signs up successfully
  useEffect(() => {
    const createUserInBackend = async () => {
      if (userCred) {
        // Get Firebase ID token for the authenticated user
        const token = await userCred.user.getIdToken();

        // Send token and user data to backend
        try {
          await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/create`, {
            name: userCred.user.displayName || signUpForm.email.split('@')[0],
            email: userCred.user.email,
          }, {
            headers: {
              Authorization: `Bearer ${token}` // Send the Firebase token in headers
            }
          });

          dispatch(closeModal()); // Close modal on success
        } catch (err) {
          console.error('Error creating user in backend:', err);
        }
      }
    };

    createUserInBackend();
  }, [userCred, dispatch, signUpForm.email]);

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize="13px"
        bg="gray.50"
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '2px solid', borderColor: 'blue.500' }}
        _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
      />
      <Input
        required
        name="password"
        placeholder="Password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="13px"
        bg="gray.50"
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '2px solid', borderColor: 'blue.500' }}
        _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
      />
      <Input
        required
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize="13px"
        bg="gray.50"
        _placeholder={{ color: 'gray.500' }}
        _hover={{ bg: 'white', border: '2px solid', borderColor: 'blue.500' }}
        _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
      />
      <Text textAlign="center" color="red" fontSize="10pt">
        {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS] || userError?.message}
      </Text>
      <Button fontSize="11pt" type="submit" width="100%" height="36px" mt={2} mb={2} isLoading={loading}>
        Sign Up
      </Button>
      <Flex fontSize="11pt" justifyContent="center">
        <Text mr={1}>Already have an account?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => dispatch(openModal({ view: 'login' }))} // Open login modal
        >
          Log In
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;