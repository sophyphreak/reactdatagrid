/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import Overlay from '../src/Overlay';
import './index.scss';
import '../style/index.scss';
import '../../Menu/style/index.scss';
const items = [
    { id: 0, label: 'First' },
    { id: 1, label: 'Second' },
    { id: 2, label: 'Third' },
    { id: 3, label: 'Fourth' },
    { id: 4, label: 'Fivth' },
];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            showButtons: true,
        };
    }
    render() {
        return (React.createElement("div", { className: "wrapper" },
            React.createElement(Overlay, { showEvent: ['click'], hideEvent: ['click'], width: "200", height: "200", positions: ['tr-br'], xhideOnClickOutside: true, xrafOnMount: true, xrelativeToViewport: true, target: (_, node) => {
                    return node ? node.parentNode : null;
                } },
                React.createElement("div", { style: {
                        visibility: 'visible',
                        border: '1px solid red',
                        width: 200,
                        height: 200,
                    } }, "dgsgsfdgdsfgdfd"))));
    }
}
const rootTree = render(React.createElement(App, null), document.getElementById('content'));
