/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import DataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
const gridStyle = { minHeight: 550 };
const renderRowDetails = ({ data }) => {
    return (React.createElement("div", { style: { padding: 20 } },
        React.createElement("h3", null, "Row details:"),
        React.createElement("table", null,
            React.createElement("tbody", null, Object.keys(data).map((name, i) => {
                return (React.createElement("tr", { key: i },
                    React.createElement("td", null, name),
                    React.createElement("td", null, data[name])));
            })))));
};
const columns = [
    { name: 'id', header: 'Id', defaultVisible: false, defaultWidth: 80 },
    { name: 'name', header: 'Name', defaultWidth: 120 },
    { name: 'email', header: 'Email', defaultWidth: 120 },
    { name: 'country', header: 'Country', defaultWidth: 120 },
    { name: 'city', header: 'City', defaultWidth: 120 },
    { name: 'age', header: 'Age', type: 'number', defaultWidth: 120 },
];
const App = () => {
    const [showDetails, setShowDetails] = React.useState(false);
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement("button", { onClick: () => setShowDetails(prev => !prev) }, "Toggle Details")),
        React.createElement(DataGrid, { idProperty: "id", style: gridStyle, rowExpandHeight: 400, licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, renderRowDetails: showDetails ? renderRowDetails : undefined, columns: columns, dataSource: people })));
};
export default () => React.createElement(App, null);
