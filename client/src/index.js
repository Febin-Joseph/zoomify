import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider
import './index.css';
import AppRoutes from './routes/AppRoutes';
import 'react-router-dom';
import store from './redux/auth/authReducers';

ReactDOM.render(
  <Provider store={store}> {/* Wrap the root component with Provider */}
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
