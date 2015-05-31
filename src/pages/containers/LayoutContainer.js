import React, { Component, PropTypes } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { RouteHandler } from 'react-router';
import { NavItemLink } from 'react-router-bootstrap';

import { RouteNames } from '../../constants';

export default class LayoutContainer extends Component {
    static contextTypes = {
        router: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <Navbar brand='Isobar' fixedTop>
                    <Nav>
                        <NavItemLink to={RouteNames.HOME}>Home</NavItemLink>
                    </Nav>
                </Navbar>
                <RouteHandler />
            </div>
        );
    }
}
