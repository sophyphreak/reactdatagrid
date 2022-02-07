import React, { useState, useCallback } from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise';

import people from '../people';
import flags from '../flags';
import Button from '@inovua/reactdatagrid-community/packages/Button';

const gridStyle = { minHeight: 550 };

const columns = [
  {
    name: 'id',
    header: 'Id',
    defaultWidth: 60,
    type: 'number',
    resizable: false,
  },
  { name: 'name', header: 'Name', defaultWidth: 100 },
  {
    name: 'country',
    header: 'Country',
    defaultWidth: 100,
    resizable: false,
    render: ({ value }: { value: string }) =>
      flags[value] ? flags[value] : value,
  },
  { name: 'city', header: 'City', defaultWidth: 120 },
  { name: 'age', header: 'Age', defaultWidth: 100, type: 'number' },
];

const App = () => {
  const [gridRef, setGridRef] = useState(null);

  const setColumnSizesAuto = (skipHeader: boolean) => {
    if (gridRef.current.setColumnSizesAuto) {
      gridRef.current.setColumnSizesAuto(skipHeader);
    }
  };

  return (
    <div>
      <h3>Grid with auto size</h3>

      <div style={{ marginBottom: 20 }}>
        <Button
          onClick={() => {
            if (gridRef.current.setColumnSizesToFit) {
              gridRef.current.setColumnSizesToFit();
            }
          }}
        >
          Set column sizes to fit
        </Button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <Button onClick={() => setColumnSizesAuto(false)}>
          Set column sizes auto
        </Button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <Button onClick={() => setColumnSizesAuto(true)}>
          Set column sizes auto (skipHeader)
        </Button>
      </div>

      <ReactDataGrid
        idProperty="id"
        handle={setGridRef}
        style={gridStyle}
        columns={columns}
        dataSource={people}
        enableColumnsResizing
        defaultGroupBy={['country']}
      />
    </div>
  );
};

export default () => <App />;
