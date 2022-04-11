import React, { useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
import people from '../people';
import flags from '../flags';
const gridStyle = { minHeight: 400 };
const columns = [
    {
        name: 'id',
        type: 'number',
        defaultWidth: 80,
        groupBy: false,
        header: 'Id',
        defaultVisible: false,
    },
    { name: 'name', defaultFlex: 1, header: 'Name' },
    {
        name: 'country',
        defaultWidth: 150,
        header: 'Country',
        render: ({ value }) => (flags[value] ? flags[value] : value),
    },
    { name: 'city', defaultWidth: 150, header: 'City' },
    { name: 'age', defaultWidth: 100, type: 'number', header: 'Age' },
    { name: 'email', defaultWidth: 150, defaultFlex: 1, header: 'Email' },
];
const App = () => {
    const [defaultGroupBy, setDefaultGroupBy] = useState(['country']);
    const [stickyGroupRows, setStickyGroupRows] = useState(false);
    return (React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { theme: "default-dark", checked: stickyGroupRows, onChange: setStickyGroupRows }, "Use sticky group rows")),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, stickyGroupRows: stickyGroupRows, stickyTreeNodes: true, defaultGroupBy: defaultGroupBy, columns: columns, dataSource: people, checkboxColumn: true })));
};
export default () => React.createElement(App, null);
