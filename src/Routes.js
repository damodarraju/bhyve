import React from 'react';
import { Switch, Route } from 'react-router';
import Profile from './components/Profile';
import Register from './components/Register';
import Home from './dashboard/Home';


function Routes () {
    return (
        <Switch>
            <Route path="/" exact component={Register} />
            <Route path="/home" exact component={Home} />
            <Route path="/user/profile" exact component={Profile} />
        </Switch>
    )
}

export default Routes