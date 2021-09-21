import React from 'react';
import {Route,Switch} from 'react-router-named-route';
import { Router } from "react-router-dom";
import {createBrowserHistory} from 'history';

import App from './App';
import Login from './Login';
import Logout from './Logout';
import { RouteState } from 'react-router-named-route';
import NotFound from './NotFound';

const history = createBrowserHistory();

const needLogin = ({goRoute}:RouteState)=>{
    if (localStorage.getItem('myloggedin') === 'true'){
        return true;
    }
    goRoute('login');
}

const AppRoutes:React.FC = ()=>{

    return (
        <Router history={history}>
            <Switch>
                <Route name="login" path="/login" title="Login">
                    <Login></Login>
                </Route>
                <Route name="logout" path="/logout" title="Logout...">
                    <Logout></Logout>
                </Route>
                <Route name="home" onEnter={needLogin} path="/home/:section?" title="Home">
                    <App></App>
                </Route>
                <Route name="404" path="*" title={({ url }:RouteState)=>{
                    return 'Not found: ' + url
                }}>
                    <NotFound></NotFound>
                </Route>
            </Switch>
        </Router>
    );
}

export default AppRoutes;