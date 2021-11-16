import React, { useState, useCallback } from 'react';

import ReactDataGrid from '../../../community-edition';
import people from '../people';

const gridStyle = { minHeight: 550 };

const columns = [
  {
    name: 'id',
    header: 'Id',
    defaultVisible: false,
    minWidth: 300,
    type: 'number',
  },
  {
    name: 'name',
    header: 'Name',
    defaultFlex: 1,
    minWidth: 250,
  },
  {
    name: 'country',
    header: 'Country',
    defaultFlex: 1,
    minWidth: 100,
    defaultVisible: false,
  },
  { name: 'city', header: 'City', defaultFlex: 1, minWidth: 300 },
  { name: 'age', header: 'Age', minWidth: 150, type: 'number' },
  { name: 'email', header: 'Email', defaultFlex: 1, minWidth: 150 },
  {
    name: 'student',
    header: 'Student',
    defaultFlex: 1,
    render: ({ value }) => (value === true ? 'Yes' : 'No'),
  },
];

const App = () => {
  const [dataSource, setDataSource] = useState(people);
  const [cellSelection, setCellSelection] = useState({
    '2,name': true,
    '2,city': true,
    '2,age': true,
    '3,name': true,
    '3,city': true,
    '3,age': true,
  });

  const onEditComplete = useCallback(
    ({ value, columnId, rowIndex }) => {
      const data = [...dataSource];
      data[rowIndex][columnId] = value;

      setDataSource(data);
    },
    [dataSource]
  );

  const onCellSelectionChange = (value: { [key: string]: boolean } | any) => {
    // console.log('selection', value);

    setCellSelection(value);
  };

  const onCopySelectedCellsChange = cells => {
    console.log('copy cells: ', cells);
  };

  const onPasteSelectedCellsChange = cells => {
    console.log('paste cells: ', cells);
  };

  const onCopyActiveRowChange = row => {
    console.log('copy active row: ', row);
  };

  const onPasteActiveRowChange = row => {
    console.log('paste active row', row);
  };

  return (
    <div>
      <h3>Grid with inline edit</h3>
      <input className="cell-edit__copy-paste__input" type="text" />
      <p>
        Selected cells:{' '}
        {Object.keys(cellSelection).length === 0
          ? 'none'
          : JSON.stringify(cellSelection, null, 2)}
        .
      </p>

      <ReactDataGrid
        idProperty="id"
        theme="default-dark"
        licenseKey={process.env.NEXT_PUBLIC_LICENSE_KEY}
        cellSelection={cellSelection}
        onCellSelectionChange={onCellSelectionChange}
        enableClipboard
        onCopyActiveRowChange={onCopyActiveRowChange}
        onPasteActiveRowChange={onPasteActiveRowChange}
        onCopySelectedCellsChange={onCopySelectedCellsChange}
        onPasteSelectedCellsChange={onPasteSelectedCellsChange}
        // defaultGroupBy={[]}
        style={gridStyle}
        onEditComplete={onEditComplete}
        editable={true}
        columns={columns}
        dataSource={dataSource}
      />
      <input
        className="cell-edit__copy-paste__input"
        style={{ marginTop: 20 }}
        type="text"
      />
    </div>
  );
};

export default () => <App />;
