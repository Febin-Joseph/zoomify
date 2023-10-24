import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import AppRoutes from './routes/AppRoutes';
import store from './redux/auth/authReducers';
import { SocketProvider } from './utils/SocketProvider';
import { ActiveScreensProvider } from './utils/ActiveScreensContext';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <SocketProvider>
        <ActiveScreensProvider>
          <AppRoutes />
        </ActiveScreensProvider>
      </SocketProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
