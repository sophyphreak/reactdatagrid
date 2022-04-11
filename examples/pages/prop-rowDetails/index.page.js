/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import DataGrid from '@inovua/reactdatagrid-enterprise';
const renderRowDetails = ({ data }) => {
    return (React.createElement("div", { style: { padding: 20 } },
        React.createElement("h3", null, "Row details:"),
        React.createElement("table", null,
            React.createElement("tbody", null, Object.keys(data).map(name => {
                return (React.createElement("tr", { key: name },
                    React.createElement("td", null, name),
                    React.createElement("td", null, data[name])));
            })))));
};
import people from '../people';
const gridStyle = { minHeight: 550, margin: 10 };
const columns = [
    {
        name: 'id',
        type: 'number',
        xdefaultLocked: 'start',
        lockedRowCellRender: (value) => {
            return value + '!';
        },
    },
    { name: 'firstName', flex: 1, defaultLocked: 'start' },
    { name: 'firstName3', flex: 1, defaultLocked: 'end' },
    { name: 'firstName1', flex: 1 },
    { name: 'firstName2', flex: 1 },
    { name: 'country', flex: 1 },
    { name: 'age', type: 'number', xdefaultLocked: 'end' },
];
const dataSource = people;
const expandedRows = {
    1: true,
    3: true,
};
const App = () => {
    return (React.createElement(DataGrid, { idProperty: "id", style: gridStyle, columns: columns, columnMinWidth: 300, columnMaxWidth: 400, rowExpandHeight: 250, defaultExpandedRows: expandedRows, licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, renderRowDetails: renderRowDetails, columnDefaultWidth: 500, dataSource: dataSource }));
};
export default () => React.createElement(App, null);
