import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';

function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Search}/>
            <Route path='/home' component={Home}/>
        </Switch>
    );
}

export default Routes;