import React, { useEffect, useMemo } from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import buildColumns from './columns';
import { useAppState, useAppActions } from '../../hooks';

const buildColumnsArray = (cols: string, count: number) => {
  const colsArray = cols.split('');
  const length = colsArray.length;
  const scale = Math.floor(count / length) + 1;

  let colsLetters = [];
  for (let i = 0; i < scale; i++) {
    for (let j = 0; j < length; j++) {
      if (i === 0) {
        colsLetters.push(colsArray[j]);
      } else if (i > 0) {
        const letter = `${colsArray[i - 1]}${colsArray[j]}`;
        colsLetters.push(letter);
      }
    }
  }

  const result = colsLetters.slice(0, count);

  return result;
};

const DataGrid = (props: any) => {
  const {
    theme,
    data,
    cols,
    load,
    columnsCount,
    columnsArray,
    cellSelection,
  } = useAppState();
  const { setCellSelection, setColumnsArray } = useAppActions();

  const gridStyles = {
    height: '100%',
  };

  useEffect(() => {
    const colsArray = buildColumnsArray(cols, columnsCount);

    setColumnsArray(colsArray);
  }, [columnsCount]);

  const columns = useMemo(() => {
    console.log('RENDER COLUMNS');
    return buildColumns(columnsArray);
  }, [columnsArray]);
  const emptyText = (
    <div style={{ fontSize: 14, color: '#9ba7b4' }}>No records available</div>
  );

  const gridDOMProps: any = {
    key: `${JSON.stringify(columns)}-${load}`,
    idProperty: 'id',
    theme,
    handle: props.setGridRef,
    style: gridStyles,
    licenseKey:
      'AppName=multi_app,Company=Inovua,ExpiryDate=2022-07-06,LicenseDeveloperCount=1,LicenseType=multi_app,Ref=InovuaLicenseRef,Z=-464174999-2163366611737475820-2096356925-464174999-785223719',
    columns,
    dataSource: data || [],
    rowIndexColumn: true,
    emptyText,
    // enableSelection: true,
    cellSelection,
    onCellSelectionChange: setCellSelection,
    virtualizeColumns: true,
  };

  return <ReactDataGrid {...gridDOMProps} />;
};

export default DataGrid;
