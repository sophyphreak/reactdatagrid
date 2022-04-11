import React, { useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
import people from '../people';
const gridStyle = { minHeight: 400 };
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultVisible: false,
        type: 'number',
        defaultWidth: 80,
        groupBy: false,
    },
    { name: 'name', header: 'Name', defaultFlex: 1 },
    { name: 'country', header: 'Country', defaultWidth: 150 },
    { name: 'city', header: 'City', defaultWidth: 150 },
    { name: 'age', header: 'Age', defaultWidth: 100, type: 'number' },
    { name: 'email', header: 'Email', defaultWidth: 150, defaultFlex: 1 },
];
const App = () => {
    const [defaultGroupBy, setDefaultGroupBy] = useState(['country', 'city']);
    const [toggle, setToggle] = useState(false);
    return (React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: toggle, onChange: setToggle }, "Toggle Me")),
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, defaultGroupBy: defaultGroupBy, columns: columns, dataSource: people })));
};
export default () => React.createElement(App, null);
