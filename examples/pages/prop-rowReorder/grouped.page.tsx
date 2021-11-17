import React, { useState } from 'react';

import ReactDataGrid from '../../../enterprise-edition';

import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';

import people from '../people';

const gridStyle = { minHeight: 700 };

const columns = [
  {
    name: 'id',
    header: 'Id',
    defaultVisible: false,
    type: 'number',
    defaultWidth: 80,
    groupBy: false,
  },
  { name: 'name', header: 'Name', defaultFlex: 1 },
  { name: 'country', header: 'Country', defaultWidth: 150 },
  { name: 'city', header: 'City', defaultWidth: 150 },
  { name: 'age', header: 'Age', defaultWidth: 100, type: 'number' },
  { name: 'email', header: 'Email', defaultWidth: 150, defaultFlex: 1 },
];

const App = () => {
  const [defaultGroupBy, setDefaultGroupBy] = useState(['country']);
  const [stickyGroupRows, setStickyGroupRows] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <CheckBox checked={stickyGroupRows} onChange={setStickyGroupRows}>
          Use sticky group rows
        </CheckBox>
      </div>
      <ReactDataGrid
        idProperty="id"
        theme="default-dark"
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
        style={gridStyle}
        stickyGroupRows={stickyGroupRows}
        defaultGroupBy={defaultGroupBy}
        columns={columns}
        dataSource={people}
        rowReorderColumn
      />
    </div>
  );
};

export default () => <App />;
