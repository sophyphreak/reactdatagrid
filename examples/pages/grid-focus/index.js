import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import flags from '../flags';
const gridStyle = { minHeight: 550 };
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultVisible: false,
        minWidth: 300,
        type: 'number',
    },
    { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 250 },
    {
        name: 'country',
        header: 'Country',
        defaultFlex: 1,
        minWidth: 100,
        render: ({ value }) => (flags[value] ? flags[value] : value),
    },
    { name: 'city', header: 'City', defaultFlex: 1, minWidth: 300 },
    { name: 'age', header: 'Age', minWidth: 150, type: 'number' },
];
const App = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Grid with focus"),
        React.createElement("input", { style: { marginBottom: 20 } }),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, columns: columns, dataSource: people }),
        React.createElement("input", { style: { marginTop: 20 } })));
};
export default () => React.createElement(App, null);
