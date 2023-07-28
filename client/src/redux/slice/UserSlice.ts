import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const value: AuthState = {
  isAuthorized: false,
  _id: '',
  name: '',
  email: '',
};

const initialState = {
  value: value,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem('user');
      return initialState;
    },
    logIn: (state, action: PayloadAction<User>) => {
      return { value: { isAuthorized: true, ...action.payload } };
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
