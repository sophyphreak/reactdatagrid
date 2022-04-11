import React, { useReducer } from 'react';
import App from './app';
import AppContext from './redux/context';
import { initialState } from './redux/initialState';
import appReducer, { getActions } from './redux/reducer';
const AppContainer = (props) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const actions = getActions(dispatch);
    return (React.createElement(AppContext.Provider, { value: {
            state,
            dispatch,
            actions,
        } },
        React.createElement(App, { ...props })));
};
export default AppContainer;
