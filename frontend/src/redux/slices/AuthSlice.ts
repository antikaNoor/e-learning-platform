import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: null,
    username: null,
    email: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveLogin: (state, action) => {
            state._id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        removeLogin: (state) => {
            state._id = null;
            state.username = null;
            state.email = null;
            state.token = null;
        },
    },
});

export const { saveLogin, removeLogin } = authSlice.actions;
export default authSlice.reducer;