import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import flags from '../flags';
const gridStyle = { minHeight: 350 };
const columns = [
    { name: 'id', header: 'Id', defaultWidth: 300, type: 'number' },
    { name: 'name', header: 'Name', defaultWidth: 350 },
    {
        name: 'country',
        header: 'Country',
        defaultWidth: 200,
        render: ({ value }) => (flags[value] ? flags[value] : value),
    },
    { name: 'city', header: 'City', defaultWidth: 350 },
    { name: 'age', header: 'Age', defaultWidth: 250, type: 'number' },
];
const App = () => {
    const [dataSource, setDataSource] = useState(people);
    const onEditComplete = useCallback(({ value, columnId, rowIndex }) => {
        const data = [...dataSource];
        data[rowIndex][columnId] = value;
        setDataSource(data);
    }, [dataSource]);
    return (React.createElement("div", null,
        React.createElement("h3", null, "Grid with inline edit"),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, onEditComplete: onEditComplete, editable: true, columns: columns, dataSource: dataSource })));
};
export default () => React.createElement(App, null);
