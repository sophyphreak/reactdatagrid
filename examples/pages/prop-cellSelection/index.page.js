/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import DataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import { getGlobal } from '@inovua/reactdatagrid-community/getGlobal';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
const globalObject = getGlobal();
const gridStyle = { minHeight: 350 };
const columns = [
    { name: 'id', type: 'number', defaultWidth: 80 },
    { name: 'firstName', flex: 1 },
    { name: 'country', flex: 1 },
    { name: 'age', type: 'number', flex: 1 },
];
const dataSource = people;
globalObject.cellSelection = [];
const onCellSelectionChange = (activeCell) => {
    globalObject.cellSelection.push(activeCell);
};
const App = () => {
    const [enableKeyboardNavigation, setEnableKeyboardNavigation] = useState(true);
    const [enableColumnHover, setEnableColumnHover] = useState(false);
    return (React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: enableColumnHover, onChange: setEnableColumnHover }, "Column hover")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: enableKeyboardNavigation, onChange: setEnableKeyboardNavigation }, "Keyboard navigation")),
        React.createElement(DataGrid, { columns: columns, idProperty: "id", style: gridStyle, licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, dataSource: dataSource, defaultCellSelection: { '4,firstName': true, '5,firstName': true }, enableKeyboardNavigation: enableKeyboardNavigation, onCellSelectionChange: onCellSelectionChange, enableColumnHover: enableColumnHover, multiSelect: true })));
};
export default () => React.createElement(App, null);
