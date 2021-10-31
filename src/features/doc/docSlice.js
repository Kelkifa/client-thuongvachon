import docApi from "api/docApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const docGetGroups = createAsyncThunk('doc/docGetGroups', async () => {
    const response = await docApi.getGroups();
    return response;
})

const docSlice = createSlice({
    name: 'docs',
    initialState: {
        loading: true,
        error: null,
        groups: []
    },
    extraReducers: {
        [docGetGroups.fulfilled]: (state, action) => {
            state.loading = false;

            if (!action.payload.success) {
                state.error = action.payload.message;
                return state;
            }

            state.groups = action.payload.response
        }

    }
});

const { reducer: docReducer } = docSlice;

export default docReducer;