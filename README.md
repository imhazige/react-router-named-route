# react-router-named-route

Named Route based on react-router

## Installation
`npm i react-router-named-route`

add peer dependencies if you have not installed them yet.

`npm i history@4 react-router@5 react-router-dom@5 react-helmet`

## Usage
### Define Routes
See [example/src/AppRoutes.tsx](./example/src/AppRoutes.tsx) 
```javascript
import React from 'react';
import { Route,Switch,RouteState } from 'react-router-named-route';
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

import App from './App';
import Login from './Login';
import Logout from './Logout';
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
            </Switch>
        </Router>
    );
}

export default AppRoutes;
```

### `useRoute`
See [example/src/App.tsx](./example/src/App.tsx)
```javascript
import { useRoute } from 'react-router-named-route';

const { goRoute,setRouteParams } = useRoute();
useEffect(()=>{
    const section = Math.random() + '';
    setRouteParams({section});
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[]);
```

### `RouteState`
The hook `useRoute` will return a RouteState:

`name` - The name of the current route  
`path` - The path pattern of the current route  
`url` - The url of the current location(not include query)  
`params` - The path params of current route 
`queryParams` - query params of current route   
`location` - location instance of react-router-dom  
`history` - history instance of react-router-dom    
`setRouteParams(ops: any, reset?: boolean):` - replace route params so replace the url in navigation history    
`setQueryParams(ops: any)` - replace query params so replace the url in history
`goRoute(routeName: string, routeParams?: any)` - push to new route by route name

### `withRoute`
See [example/src/NotFound.tsx](./example/src/NotFound.tsx)

## Note
This only work with react-router@5