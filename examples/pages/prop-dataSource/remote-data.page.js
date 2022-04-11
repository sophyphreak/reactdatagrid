import React, { useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
const DATASET_URL = 'https://demos.reactdatagrid.io/api/v1';
const gridStyle = { minHeight: 850 };
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultVisible: false,
        type: 'number',
        defaultWidth: 80,
    },
    { name: 'lastName', defaultFlex: 1, header: 'Name' },
    {
        name: 'email',
        headr: 'Email',
        defaultFlex: 1,
    },
    {
        name: 'address',
        header: 'Address',
        type: 'number',
        defaultFlex: 1,
    },
    {
        name: 'status',
        header: 'Status',
        render: ({ value: source }) => (source ? source.label : source),
    },
];
const dataSource = ({ skip, sortInfo, limit }) => {
    const link = DATASET_URL +
        '/leads?skip=' +
        skip +
        '&limit=' +
        limit +
        '&sortInfo=' +
        JSON.stringify(sortInfo);
    return fetch(link).then(response => {
        const totalCount = response.headers.get('X-Total-Count');
        return response.json().then(data => {
            return Promise.resolve({ data, count: parseInt(totalCount) });
        });
    });
};
const App = () => {
    const [enableColumnHover, setEnableColumnHover] = useState(true);
    const checkboxProps = {
        checked: enableColumnHover,
        onChange: setEnableColumnHover,
    };
    return (React.createElement("div", null,
        React.createElement("p", null, "Remote data"),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { ...checkboxProps }, "Enable column hover")),
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, columns: columns, dataSource: dataSource, enableColumnHover: enableColumnHover })));
};
export default () => React.createElement(App, null);
