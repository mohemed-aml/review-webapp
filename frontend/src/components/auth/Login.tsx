// frontend/src/components/Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { auth } from '../../firebase/firebaseConfig';
import { setUser } from '../../redux/slices/authSlice';
import { FIREBASE_ERRORS } from '../../firebase/errors';
import { openModal } from '../../redux/slices/authModalSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  if (user) {
    dispatch(setUser(user.user)); // Update Redux store with user info
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="Email or username"
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
      <Text textAlign="center" color="red" fontSize="10pt">
        {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS] || error?.message}
      </Text>
      <Button fontSize="11pt" type="submit" width="100%" height="36px" mt={2} mb={2} isLoading={loading}>
        Log In
      </Button>
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>Forgot your password?</Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() => dispatch(openModal({ view: 'resetPassword' }))}
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize={'11pt'} justifyContent={'center'}>
        <Text mr={1}>New to Reddit?</Text>
        <Text
          color={'blue.500'}
          fontWeight={700}
          cursor={'pointer'}
          onClick={() => dispatch(openModal({ view: 'signup' }))}
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};

export default Login;