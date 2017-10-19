/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import Content from './components/content.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';

import { Router, browserHistory } from 'react-router';
import routes from './routes.js';
import configureStore from '../src/redux/store/configureStore.js';
import { Provider } from 'react-redux';

configureStore(function(store){
  render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
  );
});



