import Table from '@inovua/reactdatagrid-community';
const dataSource = [
    {
        firstName: 'Jane',
        lastName: 'Doe',
        age: 32,
    },
    {
        firstName: 'Bob',
        lastName: 'Vance',
        age: 59,
    },
];
const columns = [
    {
        name: 'firstName',
        header: 'First Name',
        group: 'fullName',
        headerProps: {
            style: {
                backgroundColor: 'lightblue',
            },
        },
    },
    {
        name: 'lastName',
        header: 'Last Name',
        headerProps: {
            style: {
                backgroundColor: 'yellow',
            },
        },
        group: 'fullName',
    },
    {
        name: 'age',
        header: 'Age',
    },
];
const groups = [
    {
        name: 'fullName',
        header: 'Full Name',
        headerAlign: 'center',
        headerProps: {
            style: {
                backgroundColor: 'red',
            },
        },
    },
];
export default function App() {
    return React.createElement(Table, { dataSource: dataSource, columns: columns, groups: groups });
}
