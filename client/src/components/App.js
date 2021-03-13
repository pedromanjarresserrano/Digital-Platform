import React, { useEffect, useReducer } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Admin } from './admin/Admin';

import NotFound from './public/panels/notfound/NotFound';
import { Public } from './public/Public';
import 'react-slideshow-image/dist/styles.css'
import { AuthContext } from './admin/auth/AuthContext';
import { authReducer } from './admin/auth/authReducer';
import { LoginAdmin } from './admin/login/LoginAdmin.js';

const init = () => {
    return JSON.parse(localStorage.getItem('userInfo')) || { logged: false };
}

export const App = () => {

    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(user));
    }, [user])


    return (<AuthContext.Provider value={{ user, dispatch }}>
        <BrowserRouter>
            <Switch>
                <Route path="/admin/login" component={LoginAdmin} />

                <Route path="/admin" component={Admin} />
                <Route path="/" component={Public} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    </AuthContext.Provider>
    )

}