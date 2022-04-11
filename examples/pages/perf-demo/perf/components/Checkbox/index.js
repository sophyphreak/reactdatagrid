import React from 'react';
import InovuaCheckbox from '@inovua/react-ui-toolkit/CheckBox';
import { useAppState } from '../../hooks';
const Checkbox = (props) => {
    const { theme } = useAppState();
    return React.createElement(InovuaCheckbox, { theme: theme, ...props });
};
export default Checkbox;
