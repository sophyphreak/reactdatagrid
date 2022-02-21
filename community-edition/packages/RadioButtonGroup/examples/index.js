/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render } from 'react-dom';
import Component from '../../../packages/react-class';
import RadioButtonGroup, { RadioButton } from '../src';
import '../style/index.scss';
const options = [
    {
        value: 'v1',
        label: 'label 1',
    },
    {
        value: 'v2',
        label: 'label 2',
    },
    {
        value: 'v3',
        label: 'label 3',
    },
    {
        value: 'v4',
        label: 'label 4',
    },
];
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioValue: undefined,
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(props) {
        this.setState({
            radioValue: props.checkedItemValue,
        });
    }
    getCurrentValue() {
        this.setState({ currentValue: this.rbg.getName() });
    }
    setCurrentValue() {
        this.rbg.setValue('z');
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(RadioButtonGroup, { uncheckedValue: "x", radioOptions: [
                    {
                        value: 'v1',
                        label: 'bananas',
                    },
                    {
                        value: 'v2',
                        label: 'apples',
                    },
                    {
                        value: 'v3',
                        label: 'strawberries',
                    },
                    {
                        value: 'v4',
                        label: 'chocolate',
                    },
                ], name: "validName", shouldSubmit: () => false }),
            "hello world",
            React.createElement("button", { onClick: this.getCurrentValue.bind(this) }, "Get current checked value"),
            React.createElement("button", { onClick: this.setCurrentValue.bind(this) }, "Set current checked value"),
            React.createElement(RadioButton, null, "test"),
            React.createElement(RadioButton, null, "test"),
            React.createElement(RadioButtonGroup, { shouldSubmit: () => false, ref: rbg => (this.rbg = rbg), defaultRadioValue: "x", name: "check", radioOptions: [
                    { label: 'x23', value: 'x' },
                    { label: 'y545', value: 'y' },
                    { label: 'z678', value: 'z' },
                ], stretch: true, orientation: "horizontal", radioValue: this.state.radioValue, onChange: this.onChange }),
            React.createElement("hr", null),
            React.createElement(RadioButtonGroup, { name: "my-group-name", radioValue: this.state.radioValue, onChange: this.onChange },
                React.createElement("input", { type: "checkbox", "data-radio-value": "v1" }),
                React.createElement("input", { type: "checkbox", "data-radio-value": "v2" }),
                React.createElement("input", { type: "checkbox", "data-radio-value": "v1" }),
                ({ onChange, checked }) => {
                    return (React.createElement("label", { "data-radio-value": "v4" },
                        React.createElement("input", { type: "checkbox", onChange: onChange, checked: checked }),
                        "V4"));
                },
                domProps => React.createElement("input", { ...domProps, type: "checkbox" })),
            React.createElement(RadioButtonGroup, { name: "my-group-name", radioValue: this.state.radioValue, onChange: this.onChange, style: { marginBottom: 10 } },
                React.createElement("input", { type: "checkbox", "data-radio-value": "v1" }),
                React.createElement(RadioButton, { "data-radio-value": 1, children: "v1" }, "v1!!"),
                React.createElement("div", null,
                    React.createElement("h2", null, "hello")),
                React.createElement(RadioButton, { childrenPosition: "start", "data-radio-value": 1, children: "v1" }, "v1!!"),
                React.createElement(RadioButton, { rtl: true, "data-radio-value": 2, children: "v2" }, "v2"),
                React.createElement(RadioButton, { rtl: true, childrenPosition: "start", "data-radio-value": 3, children: "v3" }, "v3")),
            React.createElement(RadioButtonGroup, { name: "my-group-name", radioValue: this.state.radioValue, onChange: this.onChange, orientation: "horizontal", radioOptions: [
                    {
                        label: 'one',
                        value: 1,
                    },
                    { label: 'two', value: 2 },
                    { label: 'three', value: 3 },
                ] })));
    }
}
window.React = React;
render(React.createElement(App, null), document.getElementById('content'));
