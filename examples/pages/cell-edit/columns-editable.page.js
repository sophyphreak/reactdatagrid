import React, { useState, useCallback } from 'react';
import ReactDataGrid from '../../../enterprise-edition';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
import people from '../people';
const gridStyle = { minHeight: 550 };
const getColumns = (state) => {
    return [
        {
            name: 'id',
            type: 'number',
            defaultWidth: 80,
            header: 'Id',
            defaultVisible: false,
        },
        { name: 'name', defaultFlex: 1, editable: state.editable, header: 'Name' },
        { name: 'country', defaultFlex: 1, minWidth: 80, header: 'Country' },
        { name: 'city', defaultFlex: 1, editable: state.editable, header: 'City' },
        { name: 'age', minWidth: 80, type: 'number', header: 'Age' },
    ];
};
const App = () => {
    const [editable, setEditable] = useState(false);
    const [dataSource, setDataSource] = useState(people);
    const [columns, setColumns] = useState(getColumns({ editable }));
    const onEditComplete = useCallback(({ value, columnId, rowIndex }) => {
        const data = [...dataSource];
        data[rowIndex][columnId] = value;
        setDataSource(data);
    }, [dataSource]);
    const onEditableChange = useCallback((editable) => {
        setEditable(editable);
        setColumns(getColumns({ editable }));
    }, []);
    const onCellClick = useCallback((_event, cellProps) => {
        const { rowIndex } = cellProps;
        const newColumns = columns.map((column) => {
            if (column.name === 'city' && rowIndex === 2) {
                Object.assign(column, { editable: true });
            }
            else {
                Object.assign(column, { editable: false });
            }
            return column;
        });
        setColumns(newColumns);
    }, []);
    return (React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { theme: "default-dark", checked: editable, onChange: onEditableChange }, "Make Name and City columns editable")),
        React.createElement("p", null, "Override the columns.editable prop via onCellClick on city column at row index 2."),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, style: gridStyle, onEditComplete: onEditComplete, columns: columns, dataSource: dataSource, onCellClick: onCellClick })));
};
export default () => React.createElement(App, null);
