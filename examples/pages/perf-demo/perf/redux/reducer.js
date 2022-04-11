import { initialState } from './initialState';
const SET_THEME = 'SET_THEME';
const SET_RECORDS_DATA = 'SET_RECORDS_DATA';
const SET_RECORDS = 'SET_RECORDS';
const SET_COLUMNS_ARRAY = 'SET_COLUMNS_ARRAY';
const SET_COLUMNS = 'SET_COLUMNS';
const SET_COLUMNS_COUNT = 'SET_COLUMNS_COUNT';
const SET_REINIT = 'SET_REINIT';
const SET_LOADING = 'SET_LOADING';
const SET_RELOAD = 'SET_RELOAD';
const getActions = (dispatch) => {
    return {
        setTheme: (theme) => {
            dispatch({
                type: SET_THEME,
                payload: theme,
            });
        },
        setReinit: () => {
            dispatch({
                type: SET_REINIT,
            });
        },
        setColumnsArray: (columns) => {
            dispatch({
                type: SET_COLUMNS_ARRAY,
                payload: columns,
            });
        },
        setData: (data) => {
            dispatch({
                type: SET_RECORDS_DATA,
                payload: data,
            });
        },
        setColumns: (columns) => {
            dispatch({
                type: SET_COLUMNS,
                payload: columns,
            });
        },
        setRecords: (records) => {
            dispatch({
                type: SET_RECORDS,
                payload: records,
            });
        },
        setColumnsCount: (columnsCount) => {
            dispatch({
                type: SET_COLUMNS_COUNT,
                payload: columnsCount,
            });
        },
        setLoading: (loading) => {
            dispatch({
                type: SET_LOADING,
                payload: loading,
            });
        },
        setReload: (reload) => {
            dispatch({
                type: SET_RELOAD,
                payload: reload,
            });
        },
    };
};
const setTheme = (state, action) => {
    return {
        ...state,
        theme: action.payload.theme,
    };
};
const setReinit = (state, action) => {
    return {
        ...state,
        reinit: !state.reinit,
    };
};
const setColumnsArray = (state, action) => {
    return {
        ...state,
        columnsArray: action.payload,
    };
};
const setData = (state, action) => {
    return {
        ...state,
        data: action.payload,
    };
};
const setColumns = (state, action) => {
    return {
        ...state,
        columns: action.payload,
    };
};
const setRecords = (state, action) => {
    return {
        ...state,
        records: action.payload,
    };
};
const setColumnsCount = (state, action) => {
    return {
        ...state,
        columnsCount: action.payload,
    };
};
const setLoading = (state, action) => {
    return {
        ...state,
        loading: action.payload,
    };
};
const setReload = (state, action) => {
    return {
        ...state,
        reload: action.payload,
    };
};
const reducers = {
    SET_THEME: setTheme,
    SET_REINIT: setReinit,
    SET_COLUMNS_ARRAY: setColumnsArray,
    SET_RECORDS_DATA: setData,
    SET_COLUMNS: setColumns,
    SET_RECORDS: setRecords,
    SET_COLUMNS_COUNT: setColumnsCount,
    SET_LOADING: setLoading,
    SET_RELOAD: setReload,
};
const appReducer = (state = initialState, action) => {
    const fn = reducers[action.type];
    if (fn) {
        return fn(state, action);
    }
    return state;
};
export { getActions };
export default appReducer;
