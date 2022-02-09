import React from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise';

import people from '../people';
import flags from '../flags';

const gridStyle = { minHeight: 550 };

const columns = [
  {
    name: 'id',
    header: 'Id',
    defaultWidth: 60,
    type: 'number',
    // resizable: false,
  },
  { name: 'name', header: 'Name', defaultWidth: 100 },
  {
    name: 'country',
    header: 'Country',
    defaultWidth: 100,
    // resizable: false,
    render: ({ value }: { value: string }) =>
      flags[value] ? flags[value] : value,
  },
  { name: 'city', header: 'City', defaultWidth: 120 },
  { name: 'age', header: 'Age', defaultWidth: 100, type: 'number' },
];

const App = () => {
  return (
    <div>
      <h3>Grid with column hover</h3>

      <ReactDataGrid
        idProperty="id"
        style={gridStyle}
        columns={columns}
        dataSource={people}
        enableColumnHover
      />
    </div>
  );
};

export default () => <App />;
