import React from 'react';
import ReactDOM from 'react-dom';

import 'video-react/dist/video-react.css';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import LoginAdmin from './components/admin/login/LoginAdmin';
import { Admin } from './components/admin/Admin';

import NotFound from './components/public/notfound/NotFound';
import { Public } from './components/public/Public';





ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/admin/login" component={LoginAdmin} />

        <Route path="/admin" component={Admin} />
        <Route path="/" component={Public} />
        <Route component={NotFound} />
    </Switch>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
