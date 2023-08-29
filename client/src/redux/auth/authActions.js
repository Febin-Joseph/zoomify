import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

// Sign Up action
export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
});

// Sign In action
export const signin = createAsyncThunk('auth/signin', async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signin`, userData);
  return response.data;
});
