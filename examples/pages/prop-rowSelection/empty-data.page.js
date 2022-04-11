import React, { useCallback } from 'react';
import ReactDataGrid from '../../../enterprise-edition';
const gridStyle = { minHeight: 400, marginTop: 10 };
const columns = [
    {
        name: 'id',
        type: 'number',
        defaultWidth: 60,
        header: 'Id',
        defaultVisible: false,
    },
    { name: 'firstName', defaultFlex: 1, header: 'First Name' },
    { name: 'lastName', defaultFlex: 1, header: 'Last Name' },
    { name: 'email', groupBy: false, defaultFlex: 1, header: 'Email' },
];
const loadData = () => {
    return new Promise(resolve => {
        resolve([]);
    }).then(data => {
        return { data };
    });
};
const App = () => {
    const dataSource = useCallback(loadData, []);
    return (React.createElement("div", null,
        React.createElement(ReactDataGrid, { key: 'grid1', theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, checkboxColumn: true, columns: columns, checkboxOnlyRowSelect: true, dataSource: dataSource }),
        React.createElement(ReactDataGrid, { key: 'grid2', theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, checkboxColumn: true, columns: columns, checkboxOnlyRowSelect: true, dataSource: [] })));
};
export default () => React.createElement(App, null);
