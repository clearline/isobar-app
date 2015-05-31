import React, { Component } from 'react';
import Router, { HistoryLocation, Route, RouteHandler } from 'react-router';
import Marty, { ApplicationContainer } from 'marty';

// Enable Marty developer tools in development
if (process.env.NODE_ENV === 'development') {
    window.Marty = Marty;
}

// Polyfill Object.assign, used by libraries
import assign from 'lodash/object/assign';
if (!Object.assign) Object.assign = assign;

// App

import App from '../App';
const app = new App();

// Wrap routes in ApplicationContainer to inject app in context
class AppContainer extends Component {
    render() {
        return (
            <ApplicationContainer app={app}>
                <RouteHandler />
            </ApplicationContainer>
        );
    }
}

// Routing

import routes from '../routes';

const container = document.getElementById('app');

Router.create({
    routes: <Route handler={AppContainer}>{routes}</Route>,
    location: HistoryLocation
})
.run(Handler => {
    React.render(<Handler />, container);
});
