import React from 'react';
import {Router, Route, IndexRoute } from 'react-router';
import Content from './components/content.js';
import Login from './components/menu/login/login.js';
import Signup from './components/menu/signup/signup.js';
import RssDialog from './components/menu/rssDialog/rssDialog.js';

export default (
    <Router>
        <Route path="/" component={Content} />
        <IndexRoute component={Content} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/rssDialog" component={RssDialog} />
    </Router>
);