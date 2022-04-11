import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import flags from '../flags';
const gridStyle = { minHeight: 250 };
const times = (arr, n) => {
    const result = [];
    let id = -1;
    for (var i = 0; i < n; i++) {
        result.push(...arr.map(x => {
            return {
                ...x,
                id: `${++id}`,
            };
        }));
    }
    return result;
};
const columns = [
    { name: 'id', header: 'Id', defaultWidth: 60 },
    { name: 'name', header: 'Name', defaultWidth: 120 },
    {
        name: 'country',
        header: 'Country',
        defaultWidth: 120,
        render: ({ value }) => (flags[value] ? flags[value] : value),
    },
    { name: 'age', header: 'Age', type: 'number', defaultWidth: 120 },
];
const dataSource = times(people, 30);
const App = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Drag to reorder"),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, rowHeight: 40, rowReorderColumn: true, columns: columns, dataSource: [].concat(dataSource), 
            // rowReorderScrollByAmount={15}
            rowReorderAutoScroll: true, rowReorderArrowStyle: {
                background: 'green',
                height: 8,
                borderRadius: 1,
            }, 
            // rowReorderAutoScrollSpeed={10}
            defaultColumnOrder: ['id', 'name', 'country', 'age'] })));
};
export default () => React.createElement(App, null);
