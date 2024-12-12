import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import UserContext from './context/UserContext';
import CaptainContext from './context/CaptainContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <CaptainContext>
      <UserContext>  
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </StrictMode>
);
