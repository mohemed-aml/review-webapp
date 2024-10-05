// frontend/src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';

// Make sure your global CSS is imported
import './index.css'; // or './App.css' depending on where your global styles are defined

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);