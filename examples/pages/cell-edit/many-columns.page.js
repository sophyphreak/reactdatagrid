import React, { useState, useCallback } from 'react';
import ReactDataGrid from '../../../enterprise-edition';
const gridStyle = { minHeight: 350 };
const isStartEditKeyPressed = ({ event }) => event.key === 'k' && event.ctrlKey;
const colString = 'abcdefghijklmnopqrstuvwxyz';
const records = 30;
const initialData = [...new Array(records)].map((_, index) => {
    const result = {
        id: index,
    };
    colString.split('').map((letter) => {
        result[letter] = letter.toUpperCase() + ' ' + (index + 1);
    });
    return result;
});
const columns = colString.split('').map((letter, index) => {
    return {
        defaultWith: 120,
        header: letter.toUpperCase() + ' ' + index,
        name: letter,
        editable: index <= 8,
    };
});
const App = () => {
    const [dataSource, setDataSource] = useState(initialData);
    const onEditComplete = useCallback(({ value, columnId, rowIndex }) => {
        const data = [...dataSource];
        data[rowIndex][columnId] = value;
        setDataSource(data);
    }, [dataSource]);
    return (React.createElement("div", null,
        React.createElement("h3", null, "Trigger inline edit via a custom keyboard shortcut: Ctrl+K"),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, onEditComplete: onEditComplete, editable: true, isStartEditKeyPressed: isStartEditKeyPressed, columns: columns, dataSource: dataSource })));
};
export default () => React.createElement(App, null);
