import React from 'react';
import ReactDataGrid from '../../../enterprise-edition';
import people from '../people';
import flags from '../flags';
const gridStyle = { minHeight: 600 };
const columns = [
    { name: 'id', defaultWidth: 60, header: 'Id' },
    { name: 'name', defaultWidth: 120, header: 'Name' },
    {
        name: 'country',
        defaultWidth: 120,
        header: 'Country',
        render: ({ value }) => (flags[value] ? flags[value] : value),
    },
    { name: 'age', type: 'number', defaultWidth: 120, header: 'Age' },
];
const App = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Grid with row reorder"),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, rowHeight: 40, maxRowHeight: 400, rowReorderColumn: true, columns: columns, dataSource: people })));
};
export default () => React.createElement(App, null);
