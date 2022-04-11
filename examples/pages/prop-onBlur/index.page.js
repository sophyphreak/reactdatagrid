import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import flags from '../flags';
const gridStyle = { marginTop: 10, minHeight: 300 };
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 80 },
    { name: 'name', header: 'Name', defaultFlex: 1 },
    { name: 'email', header: 'Email', defaultFlex: 1 },
    {
        name: 'country',
        header: 'Country',
        defaultFlex: 1,
        render: ({ value }) => (flags[value] ? flags[value] : value),
    },
    { name: 'age', header: 'Age', type: 'number', defaultFlex: 1 },
];
const App = () => {
    const [focused, setFocused] = useState(false);
    const onFocus = useCallback(event => {
        setFocused(true);
    }, []);
    const onBlur = useCallback(event => {
        setFocused(false);
    }, []);
    const renderRowContextMenu = (menuProps, { rowProps, cellProps }) => {
        menuProps.autoDismiss = true;
        menuProps.items = [
            {
                label: 'Row ' + rowProps.rowIndex,
            },
            {
                label: 'Want to visit ' +
                    (cellProps.id === 'city'
                        ? rowProps.data.city
                        : rowProps.data.country) +
                    '?',
            },
        ];
    };
    return (React.createElement("div", null,
        React.createElement("p", null, "Click on the grid and outside it."),
        React.createElement("p", null,
            "The grid is ",
            focused ? 'focused' : 'blurred',
            "."),
        React.createElement("input", null),
        React.createElement(ReactDataGrid, { style: gridStyle, idProperty: "id", onFocus: onFocus, onBlur: onBlur, columns: columns, dataSource: people, renderRowContextMenu: renderRowContextMenu })));
};
export default () => React.createElement(App, null);
