import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, UserProps } from '../../utils/interfaces/authInterface';

const initialState: AuthState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
