const simpleColumns = [
    { name: 'uniqueId', header: 'Id', defaultWidth: 80 },
    { name: 'name', header: 'Name', defaultFlex: 1 },
    { name: 'age', header: 'Age', defaultFlex: 1 },
];
const columns = [
    {
        name: 'id',
        header: 'Id',
        defaultVisible: false,
        type: 'number',
        defaultWidth: 80,
    },
    {
        name: 'person',
        header: 'Person',
        defaultWidth: 200,
        render: ({ data }) => {
            return React.createElement("span", null, data.person.name);
        },
    },
    {
        name: 'person.personalData.age',
        header: 'Age',
        defaultWidth: 100,
        render: ({ data }) => React.createElement("span", null, data.person.personalData.age),
    },
    {
        name: 'person.personalData.location',
        header: 'Location',
        defaultWidth: 120,
        render: ({ data }) => {
            return React.createElement("span", null, data.person.personalData.location);
        },
    },
];
const getColumns = (simpleId) => {
    if (simpleId) {
        return simpleColumns;
    }
    return columns;
};
export default getColumns;
