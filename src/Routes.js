import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './components/home';
import {Restaurant} from './components/restaurant';
import {Cart} from './components/cart';
import Header from './components/header';
import PrivateRoute from './components/core/privateRoute';
import {Order, Success} from './components/cart';
import UserOrders from './components/orders';
import ErrorBoundary from './components/errorBoundary/index';


const Routes = () => (
    <Router>
        <Header />
        <Switch>
            <ErrorBoundary>
                <Route path='/' exact component={Home} />
                <Route path='/restaurant/:id' exact component={Restaurant} />
                <Route path='/cart' exact component={Cart} />
                <Route path='/success' exact component={Success} />
                <PrivateRoute path='/order' exact component={Order} />
                <PrivateRoute path='/checkout' exact component={Order} isReOrder={true} />
                <PrivateRoute path='/my-orders' exact component={UserOrders} />
            </ErrorBoundary>
        </Switch>
    </Router>
);

export default Routes;