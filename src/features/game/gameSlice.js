import { gameApi } from "api/gameApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const gameClientGet = createAsyncThunk('game/gameClientGet', async () => {
    const response = await gameApi.clientGet();
    console.log('[RESPONSE]', response);
    return response;
});


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
        [gameClientGet.pending]: (state, action) => {
            state.user.loading = true;
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
        }
    }
});

const { reducer: gameReducer } = game;
export default gameReducer;