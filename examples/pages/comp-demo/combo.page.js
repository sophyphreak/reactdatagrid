import React, { useCallback, useEffect, useState } from 'react';
//@ts-ignore
import Combobox from '@inovua/reactdatagrid-community/packages/ComboBox';
const App = () => {
    const [dataSource] = useState([
        { id: 1, label: 'ONE' },
        { id: 2, label: 'TWO' },
        { id: 3, label: 'THREE' },
        { id: 4, label: 'FOUR' },
        { id: 5, label: 'FIVE' },
    ]);
    const [value, setValue] = useState([1]);
    useEffect(() => {
        setTimeout(() => {
            setValue([++value[0] % dataSource.length]);
        }, 5000);
    }, [value, dataSource]);
    const onChange = useCallback(val => {
        setValue(val);
    }, [setValue]);
    return (React.createElement("div", { className: "App" },
        React.createElement(Combobox, { id: 'foo-combo', style: { width: 300 }, theme: 'default-dark', itemEllipsis: true, collapseOnSelect: true, dataSource: dataSource, value: value, onChange: onChange, placeholder: 'Select...', relativeToViewport: true, autoBlur: true, clearValueOnEmpty: false, multiple: true, wrapMultiple: false })));
};
export default () => React.createElement(App, null);
