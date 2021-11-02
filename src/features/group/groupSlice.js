import groupApi from "api/groupApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const groupGetDemo = createAsyncThunk('group/groupGetDemo', async () => {
    const response = await groupApi.getDemo();
    return response;
});

export const groupGet = createAsyncThunk('group/groupGet', async () => {
    const response = await groupApi.get();
    return response;

});

/**
 * data : { name, userId: [] }
 */
export const groupCreate = createAsyncThunk('group/groupCreate', async (data) => {
    const response = await groupApi.create(data);
    return response;
});

/**
 * data: { users: [], groupId: String }
 */
export const groupAddMember = createAsyncThunk('group/groupAddMember', async (data) => {
    const response = await groupApi.addMember(data);
    response.groupId = data.groupId;
    return response;
})



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

        /** Create */
        [groupCreate.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            state.groups.data.push(action.payload.response);
            return state;
        },

        /** Add group member */
        [groupAddMember.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const groupId = action.payload.groupId;

            const groupIndex = state.groups.data.findIndex(group => group._id === groupId);
            if (groupIndex === -1) return state;

            console.log(`[groupId]`, groupId, groupIndex);
            state.groups.data.splice(groupIndex, 1, action.payload.response);
            console.log(`[new group]`, state.groups.data);
            return state;

        }
    }
});

const { reducer: groupReducer } = groupSlice;

export default groupReducer;