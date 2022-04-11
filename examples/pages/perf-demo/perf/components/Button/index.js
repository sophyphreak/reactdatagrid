import React from 'react';
import InovuaButton from '@inovua/reactdatagrid-community/packages/Button';
import { useAppState } from '../../hooks';
const Button = (props) => {
    const { theme } = useAppState();
    return React.createElement(InovuaButton, { theme: theme, ...props });
};
export default Button;
