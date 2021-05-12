import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {GlobalContextProvide} from './contexts/globalContext'

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvide>
      <App />
    </GlobalContextProvide>
  </React.StrictMode>,
  document.getElementById('root')
);
