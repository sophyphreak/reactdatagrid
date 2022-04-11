import React, { useState } from 'react';
import ReactDataGrid from '../../../enterprise-edition';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
import people from '../people';
const gridStyle = { minHeight: 550 };
const columns = [
    {
        name: 'id',
        type: 'number',
        defaultWidth: 140,
        header: 'Id',
        defaultVisible: false,
    },
    { name: 'name', defaultFlex: 1, header: 'Name' },
    { name: 'city', minWidth: 80, header: 'City' },
    { name: 'age', minWidth: 80, type: 'number', header: 'Age' },
    {
        name: 'email',
        minWidth: 80,
        defaultFlex: 1,
        draggable: false,
        header: 'Email - not draggable',
    },
];
const App = () => {
    const [reorderColumns, setReorderColumns] = useState(true);
    const renderColumnReorderProxy = props => {
        return React.createElement("div", { style: { color: 'lightgreen' } }, props.children);
    };
    return (React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { theme: "default-dark", checked: reorderColumns, onChange: setReorderColumns }, "Enable column reordering")),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, reorderColumns: reorderColumns, columns: columns, dataSource: people, sortable: false, renderColumnReorderProxy: renderColumnReorderProxy })));
};
export default () => React.createElement(App, null);
