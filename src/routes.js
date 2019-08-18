import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Main from './pages/Main/Main';
import Login from './pages/Login/Login';

function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/main' component={Main}/>
            <Route component={Login}/>
        </Switch>
    );
}

export default Routes;