import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import people from '../people';
const times = (arr, n) => {
    const result = [];
    let id = -1;
    for (var i = 0; i < n; i++) {
        result.push(...arr.map(x => {
            return {
                ...x,
                id: `${++id}`,
            };
        }));
    }
    return result;
};
const gridStyle = { minHeight: 850 };
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
const defaultExpandedRows = { 1: true, 3: true };
const columns = [
    { name: 'id', type: 'number', header: 'Id', defaultVisible: false },
    { name: 'name', defaultWidth: 150, minWidth: 80, header: 'Name' },
    { name: 'country', defaultWidth: 150, minWidth: 80, header: 'Country' },
    { name: 'city', defaultWidth: 150, minWidth: 80, header: 'City' },
    { name: 'age', minWidth: 80, type: 'number', header: 'Age' },
];
const App = () => {
    const [expandedRows, setExpandedRows] = useState({ 1: true, 2: true });
    const [collapsedRows, setCollapsedRows] = useState(null);
    const onExpandedRowsChange = useCallback(({ expandedRows, collapsedRows }) => {
        setExpandedRows(expandedRows);
        setCollapsedRows(collapsedRows);
    }, []);
    const rowExpandHeightFn = () => {
        let height = 200;
        const heights = people.map((item, i) => {
            return {
                [i]: i === 3 ? 400 : height,
            };
        });
        return heights;
    };
    return (React.createElement("div", null,
        React.createElement("div", { style: { margin: '20px 0' } },
            React.createElement(Button, { theme: "default-dark", onClick: () => setExpandedRows(true), style: { marginRight: 10 } }, "Expand all"),
            React.createElement(Button, { theme: "default-dark", onClick: () => setExpandedRows({}) }, "Collapse all")),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, renderRowDetails: renderRowDetails, defaultExpandedRows: defaultExpandedRows, columns: columns, dataSource: times(people, 20), xrowExpandHeight: rowExpandHeightFn(), 
            // rowExpandHeight={300}
            rowExpandHeight: ({ data }) => {
                if (data.id % 3 === 0) {
                    return 400;
                }
                return 200;
            }, expandedRows: expandedRows, collapsedRows: collapsedRows, onExpandedRowsChange: onExpandedRowsChange })));
};
export default () => React.createElement(App, null);
