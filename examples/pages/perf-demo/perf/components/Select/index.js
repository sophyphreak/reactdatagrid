import React from 'react';
import ComboBox from '@inovua/reactdatagrid-community/packages/ComboBox';
import { useAppState } from '../../hooks';
const Select = (props) => {
    const { theme } = useAppState();
    return (React.createElement(ComboBox, { theme: theme, collapseOnSelect: true, changeValueOnNavigation: true, ...props }));
};
export default Select;
