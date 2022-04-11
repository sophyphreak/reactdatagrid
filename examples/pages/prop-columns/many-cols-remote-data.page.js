import React, { useCallback, useState } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-enterprise';
import CheckBox from '@inovua/reactdatagrid-community/packages/CheckBox';
import { columns } from './utils';
const DATASET_URL = 'https://demos.reactdatagrid.io/api/v1';
const gridStyle = { minHeight: 550 };
const loadData = ({ sortInfo }) => {
    return fetch(DATASET_URL + '/leads?skip=0&limit=50&sortInfo=' + JSON.stringify(sortInfo)).then(response => response.json());
};
const App = () => {
    const [rtl, setRtl] = useState(false);
    const dataSource = useCallback(loadData, []);
    return (React.createElement("div", null,
        React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement(CheckBox, { checked: rtl, onChange: setRtl }, "RTL")),
        React.createElement(ReactDataGrid, { idProperty: "id", style: gridStyle, columns: columns, dataSource: dataSource, rtl: rtl })));
};
export default App;
