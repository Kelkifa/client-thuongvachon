import docApi from "api/docApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const docGetDocs = createAsyncThunk('doc/docGetDocs', async (data) => {
    const response = await docApi.getDocs(data);
    return response;
});
// data: {groupId, name, title, content}
export const docCreate = createAsyncThunk('doc/docCreate', async (data) => {
    const response = await docApi.createDoc(data);
    return response;
});

// data: {docId, groupId};
export const docGetDetail = createAsyncThunk('doc/docGetDetail', async (data) => {
    const response = await docApi.getDetail(data);
    return response;
})

const docSlice = createSlice({
    name: 'docs',
    initialState: {
        loading: true,
        error: null,
        data: [],
    },
    extraReducers: {
        // Get docs
        [docGetDocs.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
            state.data = [];
            return state;
        },
        [docGetDocs.rejected]: (state, action) => {
            state.loading = false;
            state.error = "Client error";
            state.data = [];
            return state;

        },
        [docGetDocs.fulfilled]: (state, action) => {
            state.loading = false;
            if (!action.payload.success) {
                state.error = action.payload.message;
                return state;
            }

            state.error = false;
            state.data = action.payload.response;
            return state;

        },

        // Create a doc
        [docCreate.fulfilled]: (state, action) => {

            if (!action.payload.success) return state;

            state.data.push(action.payload.response);
            return;
        },

        // Get doc detail
        [docGetDetail.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const responseDoc = action.payload.response;
            try {
                const docIndex = state.data.findIndex(doc => doc._id === action.payload.response._id);
                if (docIndex === -1) return state;

                state.data.splice(docIndex, 1, responseDoc);
                return state;

            } catch (err) {
                return state;
            }
        }

    }
});

const { reducer: docReducer } = docSlice;

export default docReducer;