/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from 'react';
import TextInput from '../../src';
import '../../style/index.scss';
import TextArea from '../../../TextArea';
import '../../../TextArea/style/index.scss';
import NumericInput from '../../../NumericInput';
import '../../../NumericInput/style/index.scss';
import DateInput from '../../../Calendar/DateInput';
import '../../../Calendar/style/index.scss';
import ComboBox from '../../../ComboBox';
import '../../../ComboBox/style/index.scss';
import countries from '../../../ComboBox/examples/default/countries';
class EditorsExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInputValue: 'Text',
            textAreaValue: 'Content',
            numericInputValue: '2345',
            dateInputValue: '12-12-2017',
            comboValue: 'Albania',
            acceptClearToolFocus: false,
        };
    }
    render() {
        return (React.createElement("div", { style: { margin: 30 } },
            React.createElement("div", { style: { marginBottom: 20 } },
                React.createElement("input", { type: "checkbox", checked: this.state.acceptClearToolFocus, onChange: ev => this.setState({ acceptClearToolFocus: ev.target.checked }) }),
                "acceptClearToolFocus"),
            React.createElement("table", null,
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, "TextInput:"),
                        React.createElement("td", null,
                            React.createElement(TextInput, { style: { width: 230 }, value: this.state.textInputValue, onChange: textInputValue => this.setState({ textInputValue }), acceptClearToolFocus: this.state.acceptClearToolFocus }))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "TextArea:"),
                        React.createElement("td", null,
                            React.createElement(TextArea, { style: { height: 200, width: 230 }, value: this.state.textAreaValue, onChange: textAreaValue => this.setState({ textAreaValue }) }))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "NumericInput:"),
                        React.createElement("td", null,
                            React.createElement(NumericInput, { style: { width: 230 }, value: this.state.numericInputValue, onChange: numericInputValue => this.setState({ numericInputValue }), acceptClearToolFocus: this.state.acceptClearToolFocus }))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "DateInput:"),
                        React.createElement("td", null,
                            React.createElement(DateInput, { dateFormat: "DD-MM-YYYY hh:mm:ss", style: { width: 230 }, text: this.state.dateInputValue, onTextChange: dateInputValue => this.setState({ dateInputValue }), showClock: true }))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "ComboBox:"),
                        React.createElement("td", null,
                            React.createElement(ComboBox, { inlineFlex: true, dataSource: countries, style: { width: 230 }, value: this.state.comboValue, onChange: comboValue => this.setState({ comboValue }) })))))));
    }
}
export default EditorsExample;
