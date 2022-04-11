import Table from '@inovua/reactdatagrid-community';
const dataSource = [];
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
for (let i = 0; i < 5000; i++) {
    dataSource.push({
        firstName: makeid(5),
        lastName: makeid(10),
        age: randomIntFromInterval(20, 100),
    });
}
const columns = [
    {
        name: 'firstName',
        header: 'First Column',
    },
    {
        name: 'lastName',
        header: 'Second Column',
    },
    {
        name: 'age',
        header: 'Age',
        type: 'number',
    },
    {
        name: 'age',
        header: 'A Long Column Name',
        type: 'number',
    },
    {
        name: 'age',
        header: 'A Long Column Name',
        type: 'number',
    },
    {
        name: 'age',
        header: 'A Long Column Name',
        type: 'number',
    },
    {
        name: 'age',
        header: 'A Long Column Name',
        type: 'number',
    },
    {
        name: 'firstName',
        header: 'Another Name',
    },
    {
        name: 'lastName',
        header: 'Another Last Name',
    },
    {
        name: 'firstName',
        header: 'Another Name',
    },
    {
        name: 'lastName',
        header: 'Another Last Name',
    },
    {
        name: 'lastName',
        header: 'Another Value 2',
    },
    {
        name: 'lastName',
        header: 'AnotherValue 3',
    },
    {
        name: 'lastName',
        header: 'Another Value 2',
    },
    {
        name: 'lastName',
        header: 'AnotherValue 3',
    },
];
export default function App() {
    return (React.createElement(Table, { dataSource: dataSource, columns: columns, style: { width: '100%', minHeight: '500px' }, checkboxColumn: true, showColumnMenuTool: false, headerHeight: 50, nativeScroll: true }));
}
