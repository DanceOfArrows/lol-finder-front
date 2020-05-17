import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';

import configureStore from './redux/configureStore';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route path='/' component={App} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
