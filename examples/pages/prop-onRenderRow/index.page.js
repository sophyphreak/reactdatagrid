import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
const gridStyle = { minHeight: 550 };
const onRenderRow = ({ data, style }) => {
    const { age } = data;
    if (age > 30) {
        if (age > 35) {
            style.color = '#ef9a9a';
        }
        else {
            style.color = '#7986cb';
        }
    }
};
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 80 },
    { name: 'name', header: 'Name', defaultFlex: 1 },
    { name: 'email', header: 'Email', defaultFlex: 1 },
    { name: 'age', header: 'Age', type: 'number', defaultFlex: 1 },
];
const App = () => {
    return (React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20 } }, "Customized row rendering, computed by age"),
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, onRenderRow: onRenderRow, columns: columns, dataSource: people })));
};
export default () => React.createElement(App, null);
