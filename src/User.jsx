import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userRole: '',
    userId: '',
    username: '',
  },
  reducers: {
    login: (state, action) => {
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.userRole = '';
      state.userId = '';
      state.username = '';
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
