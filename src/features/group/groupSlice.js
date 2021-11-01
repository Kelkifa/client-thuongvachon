import groupApi from "api/groupApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const groupGetDemo = createAsyncThunk('group/groupGetDemo', async () => {
    const response = await groupApi.getDemo();
    return response;
});

export const groupGet = createAsyncThunk('group/groupGet', async () => {
    const response = await groupApi.get();
    return response

});

const groupSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: { loading: true, error: null, data: [] },
        selectedGroup: { loading: true, error: null, data: {} }
    },
    extraReducers: {
        // Get demo group for first request
        [groupGetDemo.rejected]: (state, action) => {
            state.selectedGroup.loading = false;
            state.selectedGroup.error = 'Client error';
        },
        [groupGetDemo.fulfilled]: (state, action) => {
            state.selectedGroup.loading = false;

            if (!action.payload.success) {
                state.selectedGroup.error = action.payload.message;
                return;
            }

            state.selectedGroup.error = false;
            state.selectedGroup.data = action.payload.response;
        },

        // Get user's group
        [groupGet.rejected]: (state, action) => {
            state.groups.loading = false;
            state.groups.error = 'Client error';
        },
        [groupGet.fulfilled]: (state, action) => {
            state.groups.loading = false;

            if (!action.payload.success) {
                state.groups.error = action.payload.message;
                return;
            }

            state.groups.error = false;
            state.groups.data = action.payload.response;
        },
    }
});

const { reducer: groupReducer } = groupSlice;

export default groupReducer;