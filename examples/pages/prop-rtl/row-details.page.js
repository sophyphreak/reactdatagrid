import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
import people from '../people';
const gridStyle = { minHeight: 550 };
const renderRowDetails = ({ data }) => {
    return (React.createElement("div", { style: { padding: 20 } },
        React.createElement("h3", null, "Row details:"),
        React.createElement("table", null, Object.keys(data).map(name => {
            return (React.createElement("tr", { key: name },
                React.createElement("td", null, name),
                React.createElement("td", null, data[name])));
        }))));
};
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 80 },
    { name: 'name', header: 'Name', defaultWidth: 120 },
    { name: 'country', header: 'Country', defaultWidth: 120 },
    { name: 'age', header: 'Age', type: 'number', defaultWidth: 120 },
];
const App = () => {
    const [rtl, setRtl] = useState(true);
    const [nativeScroll, setNativeScroll] = useState(false);
    const [expandedRows, setExpandedRows] = useState({ 1: true, 2: true });
    const [collapsedRows, setCollapsedRows] = useState(null);
    const onExpandedRowsChange = useCallback(({ expandedRows, collapsedRows }) => {
        setExpandedRows(expandedRows);
        setCollapsedRows(collapsedRows);
    }, []);
    return (React.createElement("div", null,
        React.createElement("h3", null, "Grid showing row details on expand - controlled"),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(Button, { onClick: () => setExpandedRows(true), style: { marginRight: 10 } }, "Expand all"),
            React.createElement(Button, { onClick: () => setExpandedRows({}) }, "Collapse all")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: rtl, onChange: setRtl }, "Enable RTL")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: nativeScroll, onChange: setNativeScroll }, "Enable native scroll")),
        React.createElement("p", null,
            "Expanded rows:",
            ' ',
            expandedRows == null ? 'none' : JSON.stringify(expandedRows, null, 2),
            "."),
        expandedRows === true ? (React.createElement("p", null,
            "Collapsed rows:",
            ' ',
            collapsedRows == null
                ? 'none'
                : JSON.stringify(collapsedRows, null, 2),
            ".")) : null,
        React.createElement(ReactDataGrid, { idProperty: "id", rtl: rtl, nativeScroll: nativeScroll, expandedRows: expandedRows, collapsedRows: collapsedRows, onExpandedRowsChange: onExpandedRowsChange, licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, rowExpandHeight: 400, renderRowDetails: renderRowDetails, columns: columns, dataSource: people })));
};
export default () => React.createElement(App, null);
ReactDataGrid.defaultProps.theme = 'default-dark';
CheckBox.defaultProps.theme = 'default-dark';
Button.defaultProps.theme = 'default-dark';
