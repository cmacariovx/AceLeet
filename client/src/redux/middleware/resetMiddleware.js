import { combineReducers } from '@reduxjs/toolkit';

const resetMiddleware = (slices) => {
    const rootReducer = combineReducers(slices);
    const initialState = rootReducer(undefined, { type: 'INIT' });

    return (state, action) => {
        if (action.type === 'auth/logout') {
            state = initialState;
        }

        return rootReducer(state, action);
    };
};

export default resetMiddleware;
