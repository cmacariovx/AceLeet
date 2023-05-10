import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SolvedProblem, Topic, User } from '../../interfaces';

const userSlice = createSlice({
    name: 'user',
    initialState: null as User | null,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
