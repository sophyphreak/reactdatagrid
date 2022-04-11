/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import DataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
const gridStyle = { minHeight: 550, margin: 10 };
const columns = [
    {
        name: 'id',
        type: 'number',
        defaultLocked: 'start',
        lockedRowCellRender: (value) => {
            return value + '!';
        },
    },
    { name: 'firstName', flex: 1, defaultLocked: 'start' },
    { name: 'firstName3', flex: 1, defaultLocked: 'end' },
    { name: 'firstName1', flex: 1, minWidth: 700 },
    { name: 'firstName2', flex: 1, minWidth: 700 },
    { name: 'country', flex: 1, minWidth: 700 },
    { name: 'age', type: 'number', defaultLocked: 'end' },
];
const dataSource = people;
const footerRows = [
    {
        render: {
            id: React.createElement("b", null, "xxX"),
            firstName1: 'one',
            firstName: React.createElement("b", null, "First "),
            country: 'ccc',
            age: (value, { computedSummary: summary }) => {
                return (React.createElement("div", null,
                    "AGE: ",
                    React.createElement("br", null),
                    " avg - ",
                    summary));
            },
        },
        cellStyle: {
            color: 'red',
        },
    },
    {
        render: {
            id: 'y',
            firstName: 'firstname',
            country: 'ccc',
            age: 12,
            firstName3: 'fn3',
        },
    },
];
const lockedRows = [
    {
        position: 'start',
        render: {
            id: React.createElement("b", null, "xxX"),
            firstName1: 'one',
            firstName: React.createElement("b", null, "First "),
            firstName3: React.createElement("b", null, "First "),
            country: 'ccc',
            age: (value, { computedSummary: summary }) => {
                return (React.createElement("div", null,
                    "AGE: ",
                    React.createElement("br", null),
                    " avg - ",
                    summary));
            },
        },
        cellStyle: {
            color: 'red',
        },
    },
    {
        render: {
            id: 'y',
            firstName: 'firstname',
            country: 'ccc',
            age: 12,
            firstName3: 'fn3',
        },
    },
];
const App = () => {
    return (React.createElement(DataGrid, { idProperty: "id", style: gridStyle, columns: columns, columnMinWidth: 300, columnMaxWidth: 400, footerCellClassName: x => {
            return `cls`;
        }, defaultGroupBy: [], summaryReducer: {
            initialValue: 0,
            reducer: (acc, item) => acc + (item.age || 0),
            complete: (summary, data) => (data.length ? summary / data.length : 0),
        }, showCellBorders: true, rtl: false, pagination: true, hideGroupByColumns: false, showEmptyRows: true, showHoverRows: true, licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, columnDefaultWidth: 500, footerRows: footerRows, lockedRows: lockedRows, theme: "default-dark", dataSource: dataSource }));
};
export default () => React.createElement(App, null);
