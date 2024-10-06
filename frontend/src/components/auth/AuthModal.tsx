// frontend/src/components/Modal/Auth/AuthModal.tsx
import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/firebaseConfig';
import { closeModal } from '../../redux/slices/authModalSlice'; // Redux action to close modal
import { RootState } from '../../redux/store';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {
  const dispatch = useDispatch();
  const { open, view } = useSelector((state: RootState) => state.authModal);
  const [user] = useAuthState(auth);

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);       

  useEffect(() => {
    if (user) handleClose();
  }, [user, handleClose]);

  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          {view === 'login' && 'Login'}
          {view === 'signup' && 'Sign Up'}
          {view === 'resetPassword' && 'Reset Password'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Flex direction="column" align="center" justify="center" width="70%" pb={6}>
            {view === 'login' || view === 'signup' ? (
              <>
                <OAuthButtons />
                <Text color="gray.500" fontWeight={700}>OR</Text>
                <AuthInputs />
              </>
            ) : (
              <ResetPassword />
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;