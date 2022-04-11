import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import NumericEditor from '@inovua/reactdatagrid-community/NumericEditor';
import people from '../people';
import flags from '../flags';
const gridStyle = { minHeight: 550 };
const columns = [
    { name: 'id', type: 'number', header: 'Id', defaultVisible: false },
    {
        name: 'name',
        defaultFlex: 1,
        minWidth: 200,
        maxWidth: 300,
        header: 'Name',
    },
    {
        name: 'age',
        defaultFlex: 1,
        type: 'number',
        editor: NumericEditor,
        header: 'Age',
    },
    {
        name: 'student',
        header: 'Student',
        width: 100,
        render: ({ value }) => (value ? 'Yes' : 'No'),
        renderEditor: (editorProps) => {
            return (React.createElement("div", { tabIndex: 0, 
                // autoFocus
                onClick: () => {
                    editorProps.onChange(!editorProps.value);
                }, onBlur: editorProps.onComplete, onKeyDown: e => {
                    if (e.key == 'Tab') {
                        editorProps.onTabNavigation(true /*complete navigation?*/, e.shiftKey ? -1 : 1 /*backwards of forwards*/);
                    }
                }, style: {
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: '#434d64',
                    color: '#9ba7b4',
                    left: 0,
                    top: 0,
                } }, editorProps.value ? 'X' : 'O'));
        },
    },
    {
        name: 'country',
        defaultFlex: 1,
        render: ({ value }) => (flags[value] ? flags[value] : value),
        header: 'Country',
    },
    { name: 'city', defaultFlex: 1, header: 'City' },
];
const App = () => {
    const [dataSource, setDataSource] = useState(people);
    const onEditComplete = useCallback(({ value, columnId, rowId }) => {
        const data = [...dataSource];
        data[rowId][columnId] = value;
        setDataSource(data);
    }, [dataSource]);
    return (React.createElement("div", null,
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, onEditComplete: onEditComplete, editable: true, columns: columns, dataSource: dataSource })));
};
export default () => React.createElement(App, null);
