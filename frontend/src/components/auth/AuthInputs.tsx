// frontend/src/components/Modal/Auth/AuthInputs.tsx
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Login from './Login';
import SignUp from './SignUp';

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