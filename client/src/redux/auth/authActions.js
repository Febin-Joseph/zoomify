import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://zoomify-backend.vercel.app';

// Sign Up action
export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post(`https://zoomify-backend.vercel.app/auth/signup`, userData);
  return response.data;
});

// Sign In action
export const signin = createAsyncThunk('auth/signin', async (userData) => {
  try {
    const response = await axios.post(`https://zoomify-backend.vercel.app/auth/signin`, userData);
    const { token } = response.data;
    const { _id } = response.data.user;
    localStorage.setItem('token', token);
    localStorage.setItem('_id', _id);
    return response.data;
  } catch (error) {
    throw error;
  }
});