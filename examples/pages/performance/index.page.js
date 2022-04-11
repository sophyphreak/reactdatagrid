import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
import React, { useState, useCallback } from 'react';
import ReactDataGrid from '../../../enterprise-edition';
const gridStyle = { minHeight: 350 };
const isStartEditKeyPressed = ({ event }) => event.key === 'k' && event.ctrlKey;
const colString = 'abcdefghijklmnopqrstuvwxyz';
const records = 30;
const initialData = [...new Array(records)].map((_, index) => {
    const result = {
        id: index,
    };
    colString.split('').map((letter) => {
        result[letter] = letter.toUpperCase() + ' ' + (index + 1);
    });
    return result;
});
const columns = colString.split('').map((letter, index) => {
    return {
        defaultWith: 120,
        header: letter.toUpperCase() + ' ' + index,
        name: letter,
        // editable: index <= 8,
    };
});
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
const App = () => {
    const [dataSource, setDataSource] = useState(initialData);
    const [rowSelection, setRowSelection] = useState(false);
    const [cellSelection, setCellSelection] = useState({});
    const [cellSelectionFlag, setCellSelectionFlag] = useState(false);
    const [editable, setEditable] = useState(false);
    const [enableRowDetails, setEnableRowDetails] = useState(false);
    const [multiSelect, setMultiSelect] = useState(false);
    const [checkboxColumn, setCheckboxColumn] = useState(false);
    const [lastEdit, setLastEdit] = useState(null);
    const onEditStop = useCallback(({ value, columnId, rowIndex }) => {
        setLastEdit({ columnId, rowIndex, value });
    }, []);
    const onEditComplete = useCallback(({ value, columnId, rowIndex }) => {
        const data = [...dataSource];
        data[rowIndex][columnId] = value;
        setDataSource(data);
    }, [dataSource]);
    const edit = lastEdit ? (React.createElement("div", { style: { marginBottom: 20 } },
        "Last edited value: [",
        lastEdit.columnId,
        "][",
        lastEdit.rowIndex,
        "] =",
        ' ',
        lastEdit && lastEdit.value)) : null;
    return (React.createElement("div", null,
        React.createElement("h3", null, "Trigger inline edit via a custom keyboard shortcut: Ctrl+K"),
        React.createElement("div", { style: { marginBottom: '20px' } },
            React.createElement(CheckBox, { checked: rowSelection, onChange: setRowSelection }, "Row selection")),
        React.createElement("div", { style: { marginBottom: '20px' } },
            React.createElement(CheckBox, { checked: cellSelectionFlag, onChange: setCellSelectionFlag }, "Cell selection")),
        React.createElement("div", { style: { marginBottom: '20px' } },
            React.createElement(CheckBox, { checked: multiSelect, onChange: setMultiSelect }, "Multi select")),
        React.createElement("div", { style: { marginBottom: '20px' } },
            React.createElement(CheckBox, { checked: editable, onChange: setEditable }, "Editable")),
        React.createElement("div", { style: { marginBottom: '20px' } },
            React.createElement(CheckBox, { checked: enableRowDetails, onChange: setEnableRowDetails }, "Row details")),
        React.createElement("div", { style: { marginBottom: '20px' } },
            React.createElement(CheckBox, { checked: checkboxColumn, onChange: setCheckboxColumn }, "Checkbox column")),
        React.createElement(ReactDataGrid, { idProperty: "id", key: `keys__${enableRowDetails}__${editable}`, style: gridStyle, columns: columns, dataSource: dataSource, 
            // onEditComplete={editable ? onEditComplete : undefined}
            // editable={editable}
            // isStartEditKeyPressed={isStartEditKeyPressed}
            // enableSelection={rowSelection}
            cellSelection: cellSelectionFlag ? cellSelection : undefined, onCellSelectionChange: cellSelectionFlag ? setCellSelection : undefined })));
};
export default () => React.createElement(App, null);
