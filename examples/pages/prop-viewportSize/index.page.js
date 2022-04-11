import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import flags from '../flags';
const gridStyle = { minHeight: 550 };
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultWidth: 60,
        type: 'number',
        resizable: false,
    },
    { name: 'name', header: 'Name', defaultWidth: 100 },
    {
        name: 'country',
        header: 'Country',
        defaultWidth: 100,
        resizable: false,
        render: ({ value }) => flags[value] ? flags[value] : value,
    },
    { name: 'city', header: 'City', defaultWidth: 120 },
    { name: 'age', header: 'Age', defaultWidth: 100, type: 'number' },
];
const App = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Grid with viewport size set"),
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, columns: columns, dataSource: people, enableColumnAutosize: true, defaultGroupBy: [], viewportSize: { width: 500, height: 500 } })));
};
export default () => React.createElement(App, null);
