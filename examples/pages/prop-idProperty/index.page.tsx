import React from 'react';
import ReactDataGrid from '../../../enterprise-edition';

const gridStyle = { minHeight: 550 };

const dataSource = [
  {
    id: 0,
    person: {
      personId: `id-${0}`,
      name: 'Amanda Soaresz',
      personalData: { age: 35, location: 'Rome' },
    },
  },
  {
    id: 1,
    person: {
      personId: `id-${1}`,
      name: 'Mary Adamson',
      personalData: { age: 25, location: 'Madrid' },
    },
  },
  {
    id: 2,
    person: {
      personId: `id-${2}`,
      name: 'Robert Fil',
      personalData: { age: 27, location: 'Seattle' },
    },
  },
  {
    id: 3,
    person: {
      personId: `id-${3}`,
      name: 'Roger Bob',
      personalData: { age: 81, location: 'Frankfurt' },
    },
  },
  {
    id: 4,
    person: {
      personId: `id-${4}`,
      name: 'Billary Konwik',
      personalData: { age: 18, location: 'Vienna' },
    },
  },
  {
    id: 5,
    person: {
      personId: `id-${5}`,
      name: 'Bob Marc',
      personalData: { age: 18, location: 'Brussels' },
    },
  },
  {
    id: 6,
    person: {
      personId: `id-${6}`,
      name: 'Matthew Richardson',
      personalData: { age: 54, location: 'Amsterdam' },
    },
  },
  {
    id: 7,
    person: {
      personId: `id-${7}`,
      name: 'Richy Peterson',
      personalData: { age: 54, location: 'Salzburg' },
    },
  },
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
    defaultFlex: 1,
    render: ({ data }) => {
      return <span>{data.person.name}</span>;
    },
  },
  {
    name: 'person.personalData.age',
    header: 'Age',
    maxWidth: 400,
    defaultWidth: 200,
    render: ({ data }) => <span>{data.person.personalData.age}</span>,
  },
  {
    name: 'person.personalData.location',
    header: 'Location',
    defaultWidth: 200,
    render: ({ data }) => {
      return <span>{data.person.personalData.location}</span>;
    },
  },
];

const App = () => {
  return (
    <div>
      <p>Grid with nested idProperty.</p>
      <ReactDataGrid
        // idProperty="id"
        idProperty="person.personId"
        style={gridStyle}
        dataSource={dataSource}
        columns={columns}
        sortable
      />
    </div>
  );
};

export default () => <App />;
