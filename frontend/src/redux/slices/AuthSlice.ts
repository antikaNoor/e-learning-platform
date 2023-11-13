import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your user state
interface UserState {
    _id: string;
    email: string;
    token: string;
}

// Load user from localStorage
const savedUser = localStorage.getItem("user");
const parsedUser: UserState | null = savedUser ? JSON.parse(savedUser) : null;

// Define the initial state
const initialState: UserState = parsedUser
    ? parsedUser
    : {
        _id: "",
        email: "",
        token: "",
    };

// Create a user slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveLogin: (state, action: PayloadAction<UserState>) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.token = action.payload.token;

            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        removeLogin: (state) => {
            state._id = "";
            state.email = "";
            state.token = "";

            // Remove from localStorage
            localStorage.removeItem("user");
        },
    },
});

// Export actions and reducer
export const { saveLogin, removeLogin } = userSlice.actions;
export default userSlice.reducer;
