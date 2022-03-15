import React from 'react';

import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import buildColumns from './columns';
import { useAppState, useAppActions } from '../../hooks';

const DataGrid = (props: any) => {
  const { theme, data, cols, load, times, cellSelection } = useAppState();
  const { setCellSelection } = useAppActions();

  const gridStyles = {
    height: '100%',
  };

  const columns = buildColumns(cols, times);
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
    cellSelection,
    onCellSelectionChange: setCellSelection,
  };

  return <ReactDataGrid {...gridDOMProps} />;
};

export default DataGrid;
