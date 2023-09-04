import { createSlice } from '@reduxjs/toolkit';
import { signin, signup } from './authActions';

const initialToken = localStorage.getItem('token');

const initialState = {
  user: null,
  token: initialToken || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export default authSlice.reducer;