/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
console.log(React.version);
const gridStyle = { minHeight: 550, marginTop: 10 };
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultVisible: false,
        type: 'number',
        maxWidth: 40,
    },
    { name: 'firstName', header: 'First Name', defaultFlex: 2 },
    { name: 'lastName', header: 'Last Name', defaultFlex: 2 },
    { name: 'email', header: 'Email', defaultFlex: 3 },
];
function App() {
    const [dataSource, setDataSource] = React.useState([]);
    const loadData = () => {
        setDataSource([
            { id: 1, firstName: 'test', lastName: 'test1', email: 'email@test.com' },
        ]);
    };
    return (React.createElement("div", null,
        React.createElement("h3", null, "Sort with remote data"),
        React.createElement("div", null,
            React.createElement("button", { onClick: loadData },
                "Load async data - count ",
                dataSource.length),
            React.createElement("button", { onClick: () => setDataSource([]), style: { marginLeft: 10 } }, "Clear data")),
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, columns: columns, dataSource: dataSource })));
}
export default App;
