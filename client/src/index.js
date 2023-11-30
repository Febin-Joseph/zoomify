import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import rootReducer from './redux/rootReducers';
import { SocketProvider } from './utils/SocketProvider';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
})

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
