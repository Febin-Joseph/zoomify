import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import AppRoutes from './routes/AppRoutes';
import 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);