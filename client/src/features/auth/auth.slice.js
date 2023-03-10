import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

const user = localStorage.getItem("user");

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (payload, thunkApi) => {
        try {
            const user = await authService.login(payload);
            return { user };
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (payload, thunkApi) => {
        try {
            const registerPayload = (({ email, password }) => ({ email, password }))(payload);
            const registerResponse = await authService.register(registerPayload);

            const updatePayload = {
                idToken: registerResponse.idToken,
                password: payload.password,
                displayName: payload.displayName
            };
            await authService.updateUserDetails(updatePayload);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const updateThunk = createAsyncThunk(
    'auth/update',
    async (updatePayload, thunkApi) => {
        try {
            const user = await authService.updateUserDetails(updatePayload);
            return { user };
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const initialState = user ?
    {isLoggedIn: true, user: JSON.parse(user)} :
    {isLoggedIn: false, user: null};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            authService.logout();
            state.isLoggedIn = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(updateThunk.fulfilled, (state, action) => {
                state.user = action.payload.user;
            })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;