/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class App extends Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(Menu, null),
            React.createElement("hr", { style: { width: '100%', height: 3 } }),
            this.props.children));
    }
}
const Menu = () => (React.createElement("ul", null,
    React.createElement("li", null,
        React.createElement(Link, { to: "/" }, "Home")),
    React.createElement("li", null,
        React.createElement(Link, { to: "/text-input-example" }, "TextInput Example")),
    React.createElement("li", null,
        React.createElement(Link, { to: "/editors-example" }, "Editors Example"))));
import TextInputExamples from './textInputExamples';
import EditorsExample from './editors';
render(React.createElement(Router, null,
    React.createElement("div", null,
        React.createElement(Route, { path: "/", component: App }),
        React.createElement(Route, { path: "/text-input-example", component: TextInputExamples }),
        React.createElement(Route, { path: "/editors-example", component: EditorsExample }))), document.getElementById('content'));
