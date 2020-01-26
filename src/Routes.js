import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/home';
import {Restaurant} from './components/restaurant';
import {Cart} from './components/cart';
import Header from './components/header';

const Routes = () => (
    <Router>
        <Header />
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/restaurant/:id' exact component={Restaurant} />
            <Route path='/cart' exact component={Cart} />
        </Switch>
    </Router>
);

export default Routes;