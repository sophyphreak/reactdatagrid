import React, { useCallback, useState } from 'react';
import ReactDataGrid from '../../../enterprise-edition';
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter';
import SelectFilter from '@inovua/reactdatagrid-community/SelectFilter';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter';
import BoolFilter from '../../../community-edition/BoolFilter';
import filter from '../../../community-edition/filter';
import people from '../people';
import flags from '../flags';
import moment from 'moment';
const gridStyle = { minHeight: 400 };
const filterIcon = className => {
    return (React.createElement("svg", { className: className, "enable-background": "new 0 0 24 24", height: "24px", viewBox: "0 0 24 24", width: "24px", fill: "#000000" },
        React.createElement("g", null,
            React.createElement("path", { d: "M0,0h24 M24,24H0", fill: "none" }),
            React.createElement("path", { d: "M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" }),
            React.createElement("path", { d: "M0,0h24v24H0V0z", fill: "none" }))));
};
const COUNTRIES = {
    ca: 'Canada',
    uk: 'United Kingdom',
    usa: 'United States of America',
};
const countries = people.reduce((countries, p) => {
    if (countries.filter(c => c.id == p.country).length) {
        return countries;
    }
    countries.push({
        id: p.country,
        label: COUNTRIES[p.country] || p.country,
    });
    return countries;
}, []);
const defaultFilterValue = [
    { name: 'name', operator: 'startsWith', type: 'string', value: '' },
    { name: 'age', operator: 'gte', type: 'number', value: null },
    { name: 'city', operator: 'startsWith', type: 'string', value: '' },
    {
        name: 'birthDate',
        operator: 'before',
        type: 'date',
        value: '',
    },
    { name: 'student', operator: 'eq', type: 'bool', value: null },
    { name: 'country', operator: 'eq', type: 'select', value: null },
];
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultVisible: false,
        defaultWidth: 80,
        type: 'number',
    },
    {
        name: 'name',
        header: 'Name',
        defaultFlex: 1,
        minWidth: 180,
        filterEditorProps: {
            placeholder: 'Name',
            renderSettings: ({ className }) => filterIcon(className),
        },
    },
    {
        name: 'age',
        header: 'Age',
        group: 'personalInfo',
        defaultFlex: 1,
        minWidth: 180,
        type: 'number',
        filterEditorProps: { placeholder: 'Age' },
        filterEditor: NumberFilter,
    },
    {
        name: 'country',
        header: 'Country',
        group: 'personalInfo',
        defaultFlex: 1,
        minWidth: 180,
        filterEditor: SelectFilter,
        filterEditorProps: {
            placeholder: 'All',
            dataSource: countries,
        },
        render: ({ value }) => (flags[value] ? flags[value] : value),
    },
    {
        name: 'birthDate',
        header: 'Bith date',
        defualtFlex: 1,
        minWidth: 200,
        filterEditor: DateFilter,
        filterEditorProps: (props, { index }) => {
            // for range and notinrange operators, the index is 1 for the after field
            return {
                dateFormat: 'MM-DD-YYYY',
                cancelButton: false,
                highlightWeekends: false,
                placeholder: index == 1 ? 'Created date is before...' : 'Created date is after...',
            };
        },
        render: ({ value, cellProps }) => {
            return moment(value).format('MM-DD-YYYY');
        },
    },
    {
        name: 'email',
        header: 'Email',
        defaultFlex: 1,
        minWidth: 180,
    },
    {
        name: 'student',
        header: 'Student',
        defaultFlex: 1,
        minWidth: 180,
        filterEditor: BoolFilter,
        render: ({ data }) => {
            return data.student ? 'Yes' : 'No';
        },
    },
    {
        name: 'city',
        header: 'City',
        defaultFlex: 1,
        minWidth: 180,
        filterEditorProps: { placeholder: 'City' },
    },
];
const groups = [
    { name: 'street', group: 'location', header: 'Street' },
    { name: 'personalInfo', header: 'Personal info' },
    { name: 'contactInfo', header: 'Contact info' },
    { name: 'location', header: 'Location' },
];
const App = () => {
    const [dataSource, setDataSource] = useState(people);
    const [filterValue, setFilterValue] = useState(defaultFilterValue);
    const onFilterValueChange = useCallback(filterValue => {
        const data = filter(people, filterValue);
        setFilterValue(filterValue);
        setDataSource(data);
    }, []);
    const filteredRowsCount = useCallback((filteredRows) => {
        // console.log('filteredRows', filteredRows);
    }, []);
    return (React.createElement("div", null,
        React.createElement("h3", null, "Grid with default filter value"),
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, onFilterValueChange: onFilterValueChange, filterValue: filterValue, columns: columns, dataSource: dataSource, filteredRowsCount: filteredRowsCount, groups: groups, defaultGroupBy: [], pagination: true }),
        React.createElement("p", null, "Delete the filters if you want to show all data. You can click the configure icon and then \"Clear All\"")));
};
export default () => React.createElement(App, null);
