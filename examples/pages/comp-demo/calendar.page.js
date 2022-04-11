//@ts-ignore
import React from 'react';
import DateInput from '@inovua/reactdatagrid-community/packages/Calendar/DateInput';
//@ts-ignore
import Calendar from '@inovua/reactdatagrid-community/packages/Calendar';
const App = () => {
    return (React.createElement(DateInput, { theme: 'default-dark', dateFormat: "DD/MM/YY HH:mm:ss", showClock: true },
        React.createElement(Calendar, { okButtonText: "Select...", cancelButtonText: "Close...", showClock: true })));
};
export default () => React.createElement(App, null);
