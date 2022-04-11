import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import { getGlobal } from '@inovua/reactdatagrid-community/getGlobal';
const globalObject = getGlobal();
const gridStyle = { minHeight: 550, maxWidth: 1000 };
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultVisible: false,
        defaultWidth: 100,
        type: 'number',
    },
    {
        name: 'name',
        defaultLocked: 'end',
        header: 'Name',
        defaultFlex: 1,
        minWidth: 450,
    },
    {
        name: 'country',
        header: 'Country',
        defaultFlex: 1,
        minWidth: 200,
    },
    { name: 'city', header: 'City', defaultFlex: 1, minWidth: 450 },
    { name: 'age', header: 'Age', minWidth: 100, type: 'number' },
];
const App = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Scroll horizontally to see the effect"),
        React.createElement(ReactDataGrid, { idProperty: "id", onReady: api => {
                globalObject.api = api;
            }, reorderColumns: false, style: gridStyle, columns: columns, dataSource: people, virtualizeColumns: true, licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY })));
};
export default () => React.createElement(App, null);
