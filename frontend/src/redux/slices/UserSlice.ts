import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    email: string;
    token: string;
}

const initialState: UserState = {
    email: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveLogin: (state, action: PayloadAction<{ email: string, token: string }>) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        removeLogin: (state) => {
            state.email = "logged out";
        },
    },
});

export const { saveLogin, removeLogin } = userSlice.actions;

export default userSlice.reducer;