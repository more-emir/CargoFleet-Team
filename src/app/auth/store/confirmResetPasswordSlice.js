import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import { updateUserSettings } from './userSlice';

export const resetPasswordWithFireBase = (oobCode, newPassword) => async dispatch => {
  if (!firebaseService.auth) {
    console.warn("Firebase Service didn't initialize, check your configuration");

    return () => false;
  }

  return firebaseService.auth
    .confirmPasswordReset(oobCode, newPassword)
    .then(response => {
      dispatch(
        updateUserSettings({
          ...response.user
        })
      );

      return dispatch(resetSuccess());
    })

    .catch(error => {
      const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
      const response = [];

      if (passwordErrorCodes.includes(error.code)) {
        response.push({
          type: 'password',
          message: error.message
        });
      }

      if (error.code === 'auth/invalid-api-key') {
        dispatch(showMessage({ message: error.message }));
      }

      return dispatch(resetError(response));
    });
};

const initialState = {
  success: false,
  errors: []
};

const confirmResetPasswordSlice = createSlice({
  name: 'auth/confirm',
  initialState,
  reducers: {
    resetSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    resetError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    }
  },
  extraReducers: {}
});

export const { resetSuccess, resetError } = confirmResetPasswordSlice.actions;

export default confirmResetPasswordSlice.reducer;