import React from 'react';
import { Route } from 'react-router';

import { RouteNames } from './constants';

// Containers
import LayoutContainer from './pages/containers/LayoutContainer';

// Pages
import HomePage from './pages/Home';

export default (
    <Route handler={LayoutContainer}>
        <Route name={RouteNames.HOME} path='/' handler={HomePage} />
    </Route>
);
