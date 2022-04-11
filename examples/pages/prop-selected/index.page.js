import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
const gridStyle = { minHeight: 550 };
const columns = [
    { name: 'id', defaultWidth: 60, header: 'Id', defaultVisible: false },
    { name: 'name', defaultFlex: 1, header: 'Name' },
    {
        name: 'country',
        defaultFlex: 1,
        header: 'Country',
    },
    { name: 'age', type: 'number', defaultFlex: 1, header: 'Age' },
    { name: 'email', header: 'Email', defaultFlex: 1 },
];
const App = () => {
    const [selected, setSelected] = useState('1');
    const onSelectionChange = useCallback(({ selected }) => {
        console.log('selected', selected);
        setSelected(selected);
    }, []);
    return (React.createElement("div", null,
        React.createElement("p", null,
            "Selected rows: ",
            selected == undefined ? 'none' : selected,
            "."),
        React.createElement("button", { onClick: () => {
                setSelected(undefined);
            } }, "change selection"),
        React.createElement(ReactDataGrid, { idProperty: "id", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, selected: selected, onSelectionChange: onSelectionChange, style: gridStyle, columns: columns, dataSource: people })));
};
export default () => React.createElement(App, null);
