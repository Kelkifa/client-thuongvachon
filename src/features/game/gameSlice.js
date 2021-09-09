import { gameApi } from "api/gameApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const gameClientGet = createAsyncThunk('game/gameClientGet', async () => {
    const response = await gameApi.clientGet();
    return response;
});

export const gameAdminGet = createAsyncThunk('game/gameAdminGet', async () => {
    const response = await gameApi.adminGet();
    return response;
})
export const gameDelete = createAsyncThunk('game/gameDelete', async (data) => {
    return;
})


const game = createSlice({
    name: 'games',
    initialState: {
        user: { loading: true, error: null, data: [] },
        admin: {
            list: { loading: true, error: null, data: [] },
            trash: { loading: true, error: null, data: [] }
        }
    },
    reducer: {},
    extraReducers: {
        // Client Get
        [gameClientGet.pending]: (state, action) => {
            state.user.loading = true;
            return state;
        },
        [gameClientGet.rejected]: (state, action) => {
            state.user.loading = false;
            state.user.error = 'fail';
        },
        [gameClientGet.fulfilled]: (state, action) => {
            state.user.loading = false;
            if (!action.payload.success) {
                state.user.error = action.payload.message ? action.payload.message : 'Internal Server';
                return state;
            }

            state.user.error = false;
            state.user.data = action.payload.response;
        },

        // Admin Get
        [gameAdminGet.pending]: (state, action) => {
            state.admin.list.loading = true;
            state.admin.trash.loading = true;
            return state;
        },
        [gameAdminGet.rejected]: (state, action) => {
            state.admin.list.loading = false;
            state.admin.list.error = 'fail';

            state.admin.trash.loading = false;
            state.admin.trash.error = 'fail';
        },
        [gameAdminGet.fulfilled]: (state, action) => {
            state.admin.list.loading = false;
            state.admin.trash.loading = false;
            if (!action.payload.success) {
                state.admin.list.error = action.payload.message ? action.payload.message : 'Internal Server';
                state.admin.trash.error = action.payload.message ? action.payload.message : 'Internal Server';
                return state;
            }

            state.admin.list.error = false;
            state.admin.trash.error = false;
            state.admin.list.data = action.payload.listResponse;
            state.admin.trash.data = action.payload.trashResponse;
        },

    }
});

const { reducer: gameReducer } = game;
export default gameReducer;