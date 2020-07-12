import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LoginAdmin from './admin/login/LoginAdmin';
import { Admin } from './admin/Admin';

import NotFound from './public/notfound/NotFound';
import { Public } from './public/Public';



export const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/admin/login" component={LoginAdmin} />

            <Route path="/admin" component={Admin} />
            <Route path="/" component={Public} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>

);