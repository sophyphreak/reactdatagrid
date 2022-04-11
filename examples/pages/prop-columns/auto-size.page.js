import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';
import flags from '../flags';
import Button from '@inovua/reactdatagrid-community/packages/Button';
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
    const [gridRef, setGridRef] = useState(null);
    const setColumnsSizesAuto = useCallback((skipHeader) => {
        if (gridRef.current.setColumnsSizesAuto) {
            gridRef.current.setColumnsSizesAuto({
                skipHeader,
            });
        }
    }, [gridRef]);
    return (React.createElement("div", null,
        React.createElement("h3", null, "Grid with auto size"),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(Button, { onClick: () => {
                    if (gridRef.current.setColumnSizesToFit) {
                        gridRef.current.setColumnSizesToFit();
                    }
                } }, "Set column sizes to fit")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(Button, { onClick: () => {
                    if (gridRef.current.setColumnSizeAuto) {
                        gridRef.current.setColumnSizeAuto('name');
                    }
                } }, "Set 'name' column size auto")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(Button, { onClick: () => setColumnsSizesAuto(false) }, "Set column sizes auto")),
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(Button, { onClick: () => setColumnsSizesAuto(true) }, "Set column sizes auto (skipHeader)")),
        React.createElement(ReactDataGrid, { idProperty: "id", handle: setGridRef, style: gridStyle, columns: columns, dataSource: people, enableColumnAutosize: true, defaultGroupBy: [] })));
};
export default () => React.createElement(App, null);
