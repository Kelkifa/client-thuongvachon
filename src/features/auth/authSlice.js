import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authApi from "api/authApi";

const LOCALSTORAGE_TOKEN_NAME = 'token';

export const authFirstAccess = createAsyncThunk('auth/authFirstAccess', async (data) => {

    if (!localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)) {
        return { isAuth: false };
    };

    const response = await authApi.firstAccess();
    return response;
})

export const authRegister = createAsyncThunk('auth/authRegister', async (data) => {
    const response = await authApi.register({ data });
    return response;
})

/** data: { username: String, password: String} */
export const authLogin = createAsyncThunk('auth/authLogin', async (data) => {

    const response = await authApi.login({ data });
    return response;
})

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        loading: localStorage.getItem(LOCALSTORAGE_TOKEN_NAME) ? true : false,
        error: null,
        isAuth: localStorage.getItem(LOCALSTORAGE_TOKEN_NAME) ? true : false,
        user: {}
    },

    extraReducers: {
        /** First access 
         *  Get user Info
        */
        [authFirstAccess.pending]: (state, action) => {
            state.loading = true;
            state.user = {};
            return state;
        },
        [authFirstAccess.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'Lỗi không xác định';
            state.user = {};
            state.isAuth = false;

            return state;
        },
        [authFirstAccess.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.isAuth === false) {
                state.isAuth = false;
                state.error = null;
                state.user = {};

                return state;
            }

            if (!action.payload.success) {
                state.error = action.payload.message;
                state.user = {};
                state.isAuth = false;
                return state;
            }

            state.error = false;
            state.isAuth = true
            state.user = action.payload.response;

        },


        /** Register */
        [authRegister.pending]: (state, action) => {
            state.loading = true;

            return state;
        },
        [authRegister.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'Lỗi không xác định';

            return;
        },
        [authRegister.fulfilled]: (state, action) => {
            state.loading = false;

            if (!action.payload.success) {
                state.error = action.payload.message;

                return state;
            }

            // Success
            state.user = action.payload.response;
            state.isAuth = true;
            localStorage.setItem('token', action.payload.token);
        },

        /** Login */
        [authLogin.fulfilled]: (state, action) => {
            state.loading = false;

            if (!action.payload.success) {

                state.error = action.payload.message;
                state.isAuth = false;
                return state;
            }

            state.user = action.payload.response;
            state.isAuth = true;
            localStorage.setItem('token', action.payload.token);

            return state;

        }

    }

});

const { reducer: authReducer } = authSlice;

export default authReducer;