import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import flags from '../flags';
const gridStyle = { minHeight: 350 };
const isStartEditKeyPressed = ({ event }) => event.key === 'k' && event.ctrlKey;
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultVisible: false,
        minWidth: 50,
        type: 'number',
        editable: false,
    },
    { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 200 },
    {
        name: 'country',
        header: 'Country',
        defaultFlex: 1,
        minWidth: 200,
        render: ({ value }) => (flags[value] ? flags[value] : value),
    },
    { name: 'city', header: 'City', defaultFlex: 1, minWidth: 200 },
    { name: 'age', header: 'Age', minWidth: 50, type: 'number', editable: false },
];
const App = () => {
    const [dataSource, setDataSource] = useState(people);
    const onEditComplete = useCallback(({ value, columnId, rowIndex }) => {
        const data = [...dataSource];
        data[rowIndex][columnId] = value;
        setDataSource(data);
    }, [dataSource]);
    return (React.createElement("div", null,
        React.createElement("h3", null, "Trigger inline edit via a custom keyboard shortcut: Ctrl+K"),
        React.createElement("h4", null, "AGE columns is not editable. Use TAB/SHIFT+TAB while editing to navigate to next/prev editable cell."),
        React.createElement("input", { style: { marginBottom: 20 } }),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, onEditComplete: onEditComplete, editable: true, isStartEditKeyPressed: isStartEditKeyPressed, columns: columns, dataSource: dataSource }),
        React.createElement("input", { style: { marginTop: 20 } })));
};
export default () => React.createElement(App, null);
