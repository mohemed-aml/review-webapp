// frontend/src/redux/slices/authModalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthModalState {
  open: boolean;
  view: 'login' | 'signup' | 'resetPassword';
}

const initialState: AuthModalState = {
  open: false,
  view: 'login', // Default view is 'login'
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    // Action to open the modal and set the view (login, signup, resetPassword)
    openModal: (state, action: PayloadAction<{ view: AuthModalState['view'] }>) => {
      state.open = true;
      state.view = action.payload.view;
    },
    // Action to close the modal
    closeModal: (state) => {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = authModalSlice.actions;
export default authModalSlice.reducer;