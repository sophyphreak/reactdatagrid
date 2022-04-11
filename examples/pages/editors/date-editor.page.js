import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import DateEditor from '@inovua/reactdatagrid-community/DateEditor';
const gridStyle = { minHeight: 550 };
const renderRowDetails = ({ data, rowIndex }) => {
    return (React.createElement("div", { key: rowIndex, style: { padding: 20 } },
        React.createElement("h3", null, "Row details:"),
        data.name));
};
const columns = [
    { name: 'id', header: 'Id', defaultWidth: 80 },
    { name: 'name', header: 'Name', defaultWidth: 120 },
    {
        name: 'date',
        header: 'Date',
        editor: DateEditor,
        render: ({ value }) => React.createElement("p", null, value.toString()),
    },
];
export const App = () => {
    return (React.createElement("div", null,
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, rowExpandHeight: 400, editable: true, renderRowDetails: renderRowDetails, columns: columns, dataSource: [
                {
                    id: 1,
                    name: 'John',
                    date: new Date(),
                },
            ] })));
};
export default App;
