import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/home';
import {Restaurant} from './components/restaurant';

const Routes = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/restaurant/:id' exact component={Restaurant} />
        </Switch>
    </Router>
);

export default Routes;