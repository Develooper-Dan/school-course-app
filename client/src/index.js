//main entry point into the app
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import {Provider} from './Context'
//all Components in the App have access to the states and methods of the Provider
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
