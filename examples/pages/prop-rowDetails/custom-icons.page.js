import React from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
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
const renderRowDetailsExpandIcon = () => {
    return (React.createElement("svg", { height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#fafafa" },
        React.createElement("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
        React.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" })));
};
const renderRowDetailsCollapsedIcon = () => {
    return (React.createElement("svg", { height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#fafafa" },
        React.createElement("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
        React.createElement("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" })));
};
const renderRowDetailsMoreIcon = () => {
    return (React.createElement("svg", { height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#fafafa" },
        React.createElement("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
        React.createElement("path", { d: "M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })));
};
const App = () => {
    return (React.createElement("div", null,
        React.createElement("h3", null, "Grid showing row details on expand - controlled"),
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, rowExpandHeight: 400, renderRowDetails: renderRowDetails, columns: columns, dataSource: people, renderRowDetailsExpandIcon: renderRowDetailsExpandIcon, renderRowDetailsCollapsedIcon: renderRowDetailsCollapsedIcon, renderRowDetailsMoreIcon: renderRowDetailsMoreIcon })));
};
export default () => React.createElement(App, null);
