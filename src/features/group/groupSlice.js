import groupApi from "api/groupApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const LOCALSTORAGE_SELECTED_GROUP_ID = 'group';

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
        loading: true,
        error: null,
        groups: [],
        selectedGroup: {},
    },
    reducers: {
        groupChoose: (state, action) => {
            state.selectedGroup = action.payload;
            localStorage.setItem(LOCALSTORAGE_SELECTED_GROUP_ID, action.payload._id);
        },
    },
    extraReducers: {
        // Get demo group for first request
        [groupGetDemo.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'Client error';
        },
        [groupGetDemo.fulfilled]: (state, action) => {
            state.loading = false;

            if (!action.payload.success) {
                state.error = action.payload.message;
                return;
            }

            state.error = false;
            state.selectedGroup.data = action.payload.response;
        },

        // Get user's group
        [groupGet.rejected]: (state, action) => {
            state.loading = false;
            state.error = 'Server error';
        },
        [groupGet.fulfilled]: (state, action) => {
            state.loading = false;

            try {

                if (!action.payload.success) {
                    state.error = action.payload.message;
                    return;
                }

                state.error = false;
                state.groups = action.payload.response;

                const selectedGroupId = localStorage.getItem(LOCALSTORAGE_SELECTED_GROUP_ID);

                // Find demo group
                const foundDemoGroup = action.payload.response.find(group => group.type === 'demo');

                // There is no selected group in localstorage
                if (!selectedGroupId) {
                    if (!foundDemoGroup) return state;
                    state.selectedGroup = foundDemoGroup;
                    localStorage.setItem(LOCALSTORAGE_SELECTED_GROUP_ID, foundDemoGroup._id);
                    return state;

                }

                const foundGroup = action.payload.response.find(group => group._id === selectedGroupId);
                if (!foundGroup) {
                    if (!foundDemoGroup) return state;
                    state.selectedGroup = foundDemoGroup;
                    return state
                };

                state.selectedGroup = foundGroup;
                return state;

            } catch (err) {
                state.error = "Client error";
                return state;
            }

        },

        /** Create */
        [groupCreate.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            state.groups.push(action.payload.response);
            return state;
        },

        /** Add group member */
        [groupAddMember.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const groupId = action.payload.groupId;

            const groupIndex = state.groups.findIndex(group => group._id === groupId);
            if (groupIndex === -1) return state;


            state.groups.splice(groupIndex, 1, action.payload.response);

            return state;

        }
    }
});

const { reducer: groupReducer, actions } = groupSlice;

export const { groupChoose } = actions;

export default groupReducer;