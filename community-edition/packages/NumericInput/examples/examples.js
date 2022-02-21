/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import NumberField from '../src/NumberInput';
import '../style/index.scss';
import './index.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 56,
            enableSpinnerTools: true,
            enableClearButton: true,
            size: 18,
        };
    }
    onChange(value) {
        this.setState({
            value,
        });
    }
    render() {
        return (React.createElement("div", { className: "App", style: { padding: 10 } },
            "Uncontrolled:",
            ' ',
            React.createElement(NumberField, { ref: numberInput => (this.numberInput = numberInput), enableSpinnerTools: this.state.enableSpinnerTools, enableClearButton: this.state.enableClearButton }),
            ' ',
            "Controlled:",
            ' ',
            React.createElement(NumberField, { ref: numberInput => (this.numberInput = numberInput), spinOnArrowKeys: true, enableSpinnerTools: this.state.enableSpinnerTools, enableClearButton: this.state.enableClearButton, stepOnWheel: true, allowFloat: true, shiftStep: 10, toolPosition: "start", step: 1, clearButtonSize: this.state.size * 1, value: this.state.value, onChange: this.onChange.bind(this) }),
            React.createElement("br", null),
            React.createElement("br", null),
            "Wrapper props:",
            ' ',
            React.createElement(NumberField, { ref: numberInput => (this.numberInput = numberInput), spinOnArrowKeys: true, enableSpinnerTools: this.state.enableSpinnerTools, enableClearButton: this.state.enableClearButton, stepOnWheel: true, defaultValue: 56, onChange: value => console.log('value ', value, typeof value), wrapperProps: {
                    style: { border: '1px solid red' },
                    onClick: () => console.log('click!'),
                } }),
            ' ',
            "Normal NumericInput:",
            ' ',
            React.createElement(NumberField, { ref: numberInput => (this.numberInput = numberInput), spinOnArrowKeys: true, enableSpinnerTools: this.state.enableSpinnerTools, enableClearButton: this.state.enableClearButton, stepOnWheel: true, defaultValue: 56, clearButtonClassName: "clear-button-class", onChange: value => console.log('value ', value, typeof value) }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("button", { onMouseDown: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.startSpin(1, {
                        step: 0.1,
                    });
                }, onMouseUp: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.stopSpin();
                } }, "+0.1"),
            React.createElement("button", { onMouseDown: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.startSpin(1, {
                        step: 1,
                    });
                }, onMouseUp: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.stopSpin();
                } }, "+1"),
            React.createElement("button", { onMouseDown: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.startSpin(1, {
                        step: 10,
                    });
                }, onMouseUp: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.stopSpin();
                } }, "+10"),
            React.createElement("button", { onMouseDown: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.startSpin(1, {
                        step: -0.1,
                    });
                }, onMouseUp: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.stopSpin();
                } }, "-0.1"),
            React.createElement("button", { onMouseDown: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.startSpin(1, {
                        step: -1,
                    });
                }, onMouseUp: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.stopSpin();
                } }, "-1"),
            React.createElement("button", { onMouseDown: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.startSpin(1, {
                        step: -10,
                    });
                }, onMouseUp: event => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.numberInput.stopSpin();
                } }, "-10"),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("input", { type: "checkbox", checked: this.state.enableSpinnerTools, onChange: e => this.setState({
                    enableSpinnerTools: e.target.checked,
                }) }),
            "enableSpinnerTool",
            React.createElement("br", null),
            React.createElement("input", { type: "checkbox", checked: this.state.enableClearButton, onChange: e => this.setState({
                    enableClearButton: e.target.checked,
                }) }),
            "enableClearButton",
            React.createElement("br", null),
            "ClearButtonSize:",
            ' ',
            React.createElement("input", { style: { width: 50 }, type: "number", value: this.state.size, onChange: ev => this.setState({ size: ev.target.value }) })));
    }
}
render(React.createElement(App, null), document.getElementById('content'));
