import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://zoomify-yc3r-dw7c9375m-febin-joseph.vercel.app';

// Sign Up action
export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  const { user, token } = response.data;

  // Store the token in local storage
  localStorage.setItem('token', token);

  return response.data;
});

// Sign In action
export const signin = createAsyncThunk('auth/signin', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signin`, userData);
  const { user, token } = response.data;

  // Store the token in local storage
  localStorage.setItem('token', token);

  return response.data;
});
