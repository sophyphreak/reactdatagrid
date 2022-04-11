import React, { useState, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
const gridStyle = { minHeight: 500, marginTop: 10 };
const dataSource = () => Promise.resolve([
    {
        country: 'USA',
        continent: 'North America',
        year: 2000,
        sport: 'footbal',
        gold: 2,
        silver: 3,
        bronze: 1,
        team: 'red',
    },
    {
        country: 'USA',
        continent: 'North America',
        year: 2000,
        sport: 'footbal',
        gold: 1,
        silver: 4,
        bronze: 2,
        team: 'blue',
    },
    {
        country: 'USA',
        continent: 'North America',
        year: 2000,
        sport: 'swim',
        gold: 6,
        silver: 4,
        bronze: 2,
        team: 'swim-blue',
    },
    {
        country: 'USA',
        continent: 'North America',
        year: 2002,
        sport: 'footbal',
        gold: 1,
        silver: 4,
        bronze: 2,
        team: 'star',
    },
    {
        country: 'USA',
        continent: 'North America',
        year: 2002,
        sport: 'swim',
        gold: 10,
        silver: 4,
        bronze: 2,
        team: 'swimmers',
    },
    {
        country: 'USA',
        continent: 'North America',
        year: 2003,
        sport: 'swim',
        gold: 10,
        silver: 4,
        bronze: 2,
        team: 'swimmers',
    },
    {
        country: 'France',
        continent: 'Europe',
        year: 2003,
        sport: 'footbal',
        gold: 1,
        silver: 4,
        bronze: 2,
        team: 'paris-team',
    },
    {
        country: 'France',
        continent: 'Europe',
        year: 2004,
        sport: 'swim',
        gold: 3,
        silver: 1,
        bronze: 1,
        team: 'paris-team',
    },
    {
        country: 'France',
        continent: 'Europe',
        year: 2005,
        sport: 'swim',
        gold: 3,
        silver: 1,
        bronze: 1,
        team: 'toulouse-team',
    },
]);
const sumReducer = {
    initialValue: 0,
    reducer: (a, b) => a + b,
};
const countReducer = {
    initialValue: 0,
    reducer: (v) => v + 1,
};
const columns = [
    {
        name: 'country',
        defaultFlex: 1,
        header: 'Country',
    },
    {
        name: 'continent',
        defaultFlex: 1,
        header: 'Continent',
    },
    {
        name: 'year',
        type: 'number',
        header: 'Year',
    },
    {
        name: 'gold',
        groupSummaryReducer: sumReducer,
        render: ({ value }) => (value || 0) + ' gold',
        renderSummary: ({ value, data }) => (value || 0) + ' gold medals',
        header: 'Gold medals',
    },
    {
        name: 'silver',
        groupSummaryReducer: sumReducer,
        header: 'Silver medals',
    },
    {
        name: 'bronze',
        groupSummaryReducer: sumReducer,
        header: 'Bronze medals',
    },
    {
        name: 'sport',
        header: 'Sport',
    },
];
const defaultPivot = [{ name: 'sport' }];
const App = () => {
    const [enablePivot, setEnablePivot] = useState(true);
    const [groupBy, setGroupBy] = useState(['continent', 'country', 'year']);
    const [pivot, setPivot] = useState(defaultPivot);
    const updateArray = useCallback((arr, fn, keys, sortOrder) => {
        let sortOrderIndexes = (sortOrder || []).reduce((acc, value, index) => {
            acc[value] = index;
            return acc;
        }, {});
        Object.keys(keys).forEach(columnName => {
            const checked = keys[columnName];
            if (checked) {
                if (arr.indexOf(columnName) === -1) {
                    arr = [...arr, columnName];
                }
            }
            else {
                if (arr.indexOf(columnName) !== -1) {
                    arr = arr.filter(x => x != columnName);
                }
            }
        });
        if (sortOrder) {
            arr.sort((a, b) => sortOrderIndexes[a] - sortOrderIndexes[b]);
        }
        fn(arr);
    }, []);
    const updateGroupBy = useCallback(keys => {
        updateArray(groupBy, setGroupBy, keys, ['continent', 'country', 'year']);
    }, groupBy);
    const updatePivot = useCallback(keys => {
        updateArray(pivot, setPivot, keys);
    }, [pivot]);
    return (React.createElement("div", null,
        React.createElement("h3", null, "DataGrid with pivot example"),
        React.createElement("div", { style: { marginTop: 20 } },
            React.createElement(CheckBox, { checked: enablePivot, onChange: setEnablePivot }, "Enable pivot")),
        React.createElement("div", { style: { marginTop: 20 } },
            React.createElement(CheckBox, { disabled: !enablePivot, checked: pivot.indexOf({ name: 'sport' }) !== -1, onChange: checked => updatePivot({ sport: checked }) },
                "Pivot by ",
                React.createElement("b", null, "sport"),
                " column values")),
        React.createElement("div", { style: { marginTop: 20 } },
            React.createElement(CheckBox, { checked: groupBy.indexOf('continent') !== -1, onChange: checked => updateGroupBy({ continent: checked }) }, "Group by continent")),
        React.createElement("div", { style: { marginTop: 20 } },
            React.createElement(CheckBox, { checked: groupBy.indexOf('country') !== -1, onChange: checked => updateGroupBy({ country: checked }) }, "Group by country")),
        React.createElement("div", { style: { marginTop: 20 } },
            React.createElement(CheckBox, { checked: groupBy.indexOf('year') !== -1, onChange: checked => updateGroupBy({ year: checked }) }, "Group by year")),
        React.createElement(ReactDataGrid, { style: gridStyle, columns: columns, dataSource: dataSource, pivot: enablePivot ? pivot : null, groupBy: groupBy, groupNestingSize: 40, onGroupByChange: setGroupBy, groupSummaryReducer: countReducer, groupColumn: {
                defaultFlex: 1,
                minWidth: 250,
                renderGroupValue: ({ value, groupSummary }) => (React.createElement(React.Fragment, null,
                    value,
                    " (",
                    groupSummary,
                    " records)")),
            } })));
};
export default () => React.createElement(App, null);
