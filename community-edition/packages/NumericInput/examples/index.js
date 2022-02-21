/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import NumberInput from '../index';
import '../style/index.scss';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enableSpinnerTools: true,
            enableClearButton: true,
            toolPosition: false,
            size: 10,
            value: null,
            disabled: false,
        };
    }
    onChange(value) {
        console.log('onChange', value, typeof value);
        this.setState({
            value,
        });
    }
    render() {
        return (React.createElement("div", { className: "App", style: { padding: 50, xbackground: 'antiquewhite' } },
            React.createElement(NumberInput, { style: { width: 100 }, value: this.state.value, onChange: this.onChange.bind(this), wrapperProps: {
                    style: {
                        xbackground: 'green',
                        xborder: '5px solid red',
                        borderRadius: 10,
                    },
                } }),
            React.createElement(TextInput, { style: { marginRight: 5, width: 200 }, placeholder: "text" }),
            React.createElement(DateInput, { style: { marginRight: 5 } }),
            React.createElement(ComboBox, { dataSource: [{ id: 1, label: 'x' }], idProperty: "id", inlineFlex: true, style: { marginRight: 5 } }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("div", null,
                React.createElement("input", { type: "number", value: this.state.size, onChange: ev => this.setState({ size: ev.target.value }) }),
                "arrowSize"),
            React.createElement(NumberInput, { style: { minWidth: 100 }, precision: 3, placeholder: "number", initialStep: 1000, step: 50, minValue: 0, maxValue: 11150, value: this.state.value, onChange: this.onChange.bind(this) })));
    }
}
render(React.createElement(App, null), document.getElementById('content'));
