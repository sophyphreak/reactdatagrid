/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import 'typeface-roboto';
import ToolBar from '../src';
import '../style/index.scss';
import { getGlobal } from '../../../getGlobal';
const globalObject = getGlobal();
globalObject.React = React;
class App extends Component {
    render() {
        return (React.createElement("div", { style: {
                xbackground: '#5e9a2c',
                fontSize: 14,
                fontFamily: 'Roboto',
                border: '1px solid magenta',
                boxSizing: 'border-box',
            } },
            React.createElement(ToolBar, null,
                React.createElement("div", null, "xxx"),
                React.createElement("div", null, "yyy"))));
    }
}
render(React.createElement(App, null), document.getElementById('content'));
