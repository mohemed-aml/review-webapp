// frontend/src/components/Modal/Auth/AuthInputs.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import SignUp from './SignUp';
import { RootState } from '../../redux/store';
import { Flex } from '@chakra-ui/react';

const AuthInputs: React.FC = () => {
  const { view } = useSelector((state: RootState) => state.authModal);

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {view === 'login' && <Login />}
      {view === 'signup' && <SignUp />}
    </Flex>
  );
};

export default AuthInputs;