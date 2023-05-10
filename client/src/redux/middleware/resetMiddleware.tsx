import { AnyAction, Reducer, combineReducers } from '@reduxjs/toolkit';

interface Slices {
    [key: string]: Reducer;
}

const resetMiddleware = (slices: Slices) => {
    const rootReducer = combineReducers(slices);
    const initialState = rootReducer(undefined, { type: 'INIT' });

    return (state: ReturnType<typeof rootReducer> | undefined, action: AnyAction) => {
        if (action.type === 'auth/logout') {
            state = initialState;
        }

        return rootReducer(state, action);
    };
};

export default resetMiddleware;
