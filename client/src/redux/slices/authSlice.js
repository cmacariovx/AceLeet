import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
    email: null,
    username: null,
    joinedDate: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const { token, userId, email, joinedDate, username } = action.payload;
            state.isLoggedIn = true;
            state.token = token;
            state.userId = userId;
            state.email = email;
            state.username = username;
            state.joinedDate = joinedDate;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;
            state.email = null;
            state.username = null;
            state.joinedDate = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
