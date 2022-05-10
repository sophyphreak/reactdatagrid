/**
 * Copyright © INOVUA TRADING.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import DataGrid from '@inovua/reactdatagrid-enterprise';
import people from '../people';

const gridStyle = { minHeight: 450, margin: 10 };

const columns = [
  { name: 'id', type: 'number', width: 70 },
  { name: 'firstName', flex: 1, minWidth: 100 },
  { name: 'country', flex: 1, minWidth: 100 },
  { name: 'age', type: 'number', width: 70 },
];

const App = () => {
  return (
    <DataGrid
      idProperty="id"
      style={gridStyle}
      columns={columns}
      dataSource={people}
      defaultGroupBy={['country']}
    />
  );
};
export default () => <App />;
