/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render } from 'react-dom';
import Menu from '../src';
import '../../NumericInput/style/index.scss';
import '../../../lib/Menu/index.css';
import 'typeface-roboto';
const radioItems = [
    { label: 'Apples' },
    { label: 'Strawberries', items: [{ label: 'x' }, { label: 'y' }] },
    '-',
    { label: 'Potatoes' },
    { label: 'Tomatoes' },
    { label: 'Onions' },
];
const items = [
    { name: 'fruit', value: 'orange', label: 'Oranges' },
    { name: 'fruit', value: 'banana', label: 'Bananas' },
    { name: 'fruit', value: 'apple', label: 'Apples' },
    { name: 'fruit', value: 'strawberry', label: 'Strawberries' },
    '-',
    {
        id: 'hello',
        label: 'Extra Child Items',
        items: [
            {
                id: 'test',
                label: 'Test',
            },
        ],
    },
];
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: { fruit: 'orange' } };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { style: { marginBottom: 20 } },
                React.createElement("b", null, "Selected:"),
                React.createElement("code", null, JSON.stringify(this.state.selected, null, 2))),
            React.createElement(Menu, { enableSelection: true, selected: this.state.selected, nameProperty: "name", valueProperty: "value", items: items, onSelectionChange: selected => this.setState({ selected }), columns: [
                    {
                        name: 'label',
                        align: 'start',
                    },
                ] })));
    }
}
render(React.createElement(App, null), document.getElementById('content'));
