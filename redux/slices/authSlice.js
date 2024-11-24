// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import nookies from 'nookies';

const initialState = {
  name: null,
  email: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      nookies.set(null, 'name', action.payload.name, { path: '/', maxAge: 30 * 24 * 60 * 60 });
      nookies.set(null, 'email', action.payload.email, { path: '/', maxAge: 30 * 24 * 60 * 60 });
    },
    logout() {
      nookies.destroy(null, 'name');
      nookies.destroy(null, 'email');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
