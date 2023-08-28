import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import store from './redux/auth/authReducers';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
