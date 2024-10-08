// frontend/src/components/ResetPassword.tsx
import { Button, Flex, Icon, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { BsDot } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase/firebaseConfig';
import { openModal } from '../../redux/slices/authModalSlice';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={4}>Check your email :)</Text>
      ) : (
        <>
          <Text fontSize="sm" textAlign="center" mb={2}>
            Enter the email associated with your account and we will send you a reset link
          </Text>
          <form onSubmit={onSubmit}>
            <Input
              required
              name="email"
              placeholder="Email"
              type="email"
              mb={2}
              onChange={(event) => setEmail(event.target.value)}
              fontSize="10pt"
              _placeholder={{ color: 'gray.500' }}
              _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
              _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
              bg="gray.50"
            />
            <Text textAlign="center" fontSize="10pt" color="red">
              {error?.message}
            </Text>
            <Button width="100%" height="36px" mb={2} mt={2} type="submit" isLoading={sending}>
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex alignItems="center" fontSize="9pt" color="blue.500" fontWeight={700} cursor="pointer">
        <Text
          onClick={() => dispatch(openModal({ view: 'login' }))} // Dispatch logout if needed or handle navigation back to login
        >
          LOGIN
        </Text>
        <Icon as={BsDot} />
        <Text
          onClick={() => dispatch(openModal({ view: 'signup' }))} // Handle navigation to Sign Up if needed
        >
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;