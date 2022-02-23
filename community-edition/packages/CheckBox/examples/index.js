/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import Checkbox from '../src';
var checked = true;
function nextValue(value, oldValue, info) {
    if (oldValue === 1) {
        //from checked to indeterminate
        return 0;
    }
    if (oldValue === 0) {
        //from  indeterminate to unchecked
        return -1;
    }
    if (oldValue === -1) {
        return 0;
    }
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: -1,
        };
    }
    onChange(value, event) {
        console.log('onChange', event, value);
        this.setState({ checked: value });
    }
    render() {
        function focus() {
            console.log('focused');
        }
        const { checked } = this.state;
        return (React.createElement("form", { className: "App", style: { padding: 20 } },
            React.createElement(Checkbox, { supportIndeterminate: true, checked: this.state.checked, browserNative: true, onFocus: focus, onChange: checked => {
                    this.setState({
                        checked,
                    });
                } }, "test"),
            React.createElement(Checkbox, { supportIndeterminate: true, onFocus: focus, focusable: false }, "test"),
            React.createElement(Checkbox, { supportIndeterminate: true, onFocus: focus, checked: true }, "test"),
            React.createElement(Checkbox, { supportIndeterminate: true, onFocus: focus, checked: null }, "test")));
    }
}
render(React.createElement(App, null), document.getElementById('content'));
