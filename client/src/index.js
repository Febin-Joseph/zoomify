import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import 'react-router-dom';
import store from './redux/auth/authReducers';

// Load token from local storage
const storedToken = localStorage.getItem('token');
if (storedToken) {
  store.dispatch({ type: 'auth/setToken', payload: storedToken });
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
