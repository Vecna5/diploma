import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/ThemeContext';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
      <ThemeProvider>
        <BrowserRouter>
        <Provider store={store}>
          <App />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
  </>
);

reportWebVitals();