/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import TabPage from './components/tab/TabPage.js';
//import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

render(  
  <TabPage />,
  document.getElementById('app')
);
