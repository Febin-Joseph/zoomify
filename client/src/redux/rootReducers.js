import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import chatSlice from './videoCall/chatSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    chat: chatSlice,
});

export default rootReducer;