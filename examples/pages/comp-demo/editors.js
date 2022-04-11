import React from 'react';
import DateEditor from '../../../community-edition/DateEditor';
const App = () => {
    return (React.createElement("div", null,
        React.createElement(DateEditor, { dateFormat: "DD-MM-YYY" })));
};
export default App;
