import React, { useState } from 'react';
import ReactDataGrid from '../../../enterprise-edition';
import Button from '@inovua/reactdatagrid-community/packages/Button';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
import getDataSource from './dataSource';
import getColumns from './columns';
const gridStyle = { minHeight: 550 };
const renderRowDetails = ({ data }) => {
    return (React.createElement("div", { style: { padding: 20 } },
        React.createElement("h2", null, "Row details:"),
        React.createElement("h3", null, "This are the details of the row."),
        React.createElement("table", null,
            React.createElement("tbody", null, Object.keys(data).map((name, i) => {
                const value = data[name];
                return (React.createElement("tr", { key: i },
                    React.createElement("td", null, name),
                    React.createElement("td", null, JSON.stringify(value))));
            })))));
};
const App = () => {
    const [gridRef, setGridRef] = useState(null);
    const [simpleId, setSimpleId] = useState(false);
    const [skipHeader, setSkipHeader] = useState(true);
    const [enableRowReorder, setEnableRowReorder] = useState(false);
    const [rowDetails, setRowDetails] = useState(false);
    const [enableCheckboxColumn, setEnableCheckboxColumn] = useState(false);
    const setItemsAt = () => {
        gridRef.current.setItemsAt([
            {
                id: 1,
                person: {
                    personId: `id-${1}`,
                    name: 'Daniel Hood',
                    personalData: { age: 25, location: 'Budapest' },
                },
            },
            {
                id: 2,
                person: {
                    personId: `id-${2}`,
                    name: 'Robert Muller',
                    personalData: { age: 27, location: 'Prague' },
                },
            },
            {
                id: 3,
                person: {
                    personId: `id-${3}`,
                    name: 'Karl May',
                    personalData: { age: 81, location: 'Geneva' },
                },
            },
        ], { replace: false });
    };
    const setColumnsSizesAuto = () => {
        if (gridRef.current.setColumnsSizesAuto) {
            gridRef.current.setColumnsSizesAuto({
                skipHeader,
            });
        }
    };
    return (React.createElement("div", null,
        React.createElement("p", null, "Grid with nested idProperty."),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: simpleId, onChange: setSimpleId }, "Simple idProperty")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: enableRowReorder, onChange: setEnableRowReorder }, "Enable row-reorder")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: rowDetails, onChange: setRowDetails }, "Enable row details")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: enableCheckboxColumn, onChange: setEnableCheckboxColumn }, "Enable checkbox column")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(Button, { onClick: () => {
                    simpleId
                        ? gridRef.current.setItemAt(3, { name: 'Daniel Muller' }, { replace: false })
                        : gridRef.current.setItemAt(2, {
                            person: {
                                personId: `id-${2}`,
                                name: 'Goerge Moody',
                                personalData: { age: 27, location: 'Seattle' },
                            },
                        }, { replace: false });
                } }, "Change 'name' to index 2")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(Button, { onClick: setItemsAt }, "Set items")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: skipHeader, onChange: setSkipHeader }, "Skip header"),
            React.createElement(Button, { style: { marginLeft: 20 }, onClick: setColumnsSizesAuto },
                "Set columns sizes auto (skipHeader ",
                skipHeader ? 'true' : 'false',
                ")")),
        React.createElement(ReactDataGrid, { idProperty: simpleId ? 'uniqueId' : 'person.personId', key: `id__${simpleId}`, handle: setGridRef, style: gridStyle, dataSource: getDataSource(simpleId), columns: getColumns(simpleId), onRowReorder: enableRowReorder, rowIndexColumn: true, checkboxColumn: enableCheckboxColumn, rowExpandHeight: () => {
                return 300;
            }, renderRowDetails: rowDetails ? renderRowDetails : undefined, defaultGroupBy: [], enableClipboard: true })));
};
export default () => React.createElement(App, null);
