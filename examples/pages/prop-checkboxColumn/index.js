import React, { useState, useCallback } from 'react';
import ReactDataGrid from '../../../enterprise-edition';
const gridStyle = { minHeight: 550 };
const colsString = 'abcdefghijk';
const largeCmp = ({ value, data }) => {
    const start = Date.now();
    // while (Date.now() < start + 100) {}
    return React.createElement("div", { className: "prop-checkboxColumns__large-comp" }, value);
};
const buildColumns = cols => {
    return cols.split('').map(letter => {
        if (letter === 'b') {
            return {
                defaultWidth: 120,
                header: letter.toUpperCase(),
                name: letter,
                render: largeCmp,
            };
        }
        return {
            defaultWidth: 120,
            header: letter.toUpperCase(),
            name: letter,
        };
    });
};
const buildDataSource = (records, cols, callback) => {
    if (callback) {
        return callback();
    }
    const dataSource = [...new Array(records)].map((_, index) => {
        const result = {
            id: index,
        };
        cols.split('').map((letter) => {
            result[letter] = letter.toUpperCase() + ' ' + (index + 1);
        });
        return result;
    });
    return dataSource;
};
const dataSource = buildDataSource(1000, colsString);
const columns = buildColumns(colsString);
const App = () => {
    const [selected, setSelected] = useState();
    const onSelectionChange = useCallback(({ selected }) => {
        setSelected(selected);
    }, []);
    return (React.createElement("div", null,
        React.createElement("h3", null, "Performance issues with large components"),
        React.createElement(ReactDataGrid, { idProperty: "id", theme: "default-dark", licenseKey: process.env.NEXT_PUBLIC_LICENSE_KEY, selected: selected, checkboxColumn: true, onSelectionChange: onSelectionChange, style: gridStyle, columns: columns, dataSource: dataSource })));
};
export default () => React.createElement(App, null);
