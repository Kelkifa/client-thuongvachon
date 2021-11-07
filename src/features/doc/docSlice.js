import docApi from "api/docApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// data: {groupId}
export const docGetDocs = createAsyncThunk('doc/docGetDocs', async (data) => {
    const response = await docApi.getDocs(data);
    return response;
});
// data: {groupId, name, title, content}
export const docCreate = createAsyncThunk('doc/docCreate', async (data) => {
    const response = await docApi.createDoc(data);
    return response;
});

// data: {groupId, docId, title, content}
// response: {success, message, response:new Doc}
export const docCreateContent = createAsyncThunk('doc/docCreateContent', async (data) => {
    const { docId } = data;
    const response = await docApi.createContent(data);
    response.docId = docId;
    return response;
})

// data: {docId, groupId};
export const docGetDetail = createAsyncThunk('doc/docGetDetail', async (data) => {
    const response = await docApi.getDetail(data);
    return response;
})

// data: {docId, name}
// response : {success, message, response: new Doc}
export const docUpdateDoc = createAsyncThunk('doc/docUpdateDoc', async (data) => {
    const response = await docApi.updateDoc(data);
    return response;
});

// data: {docId, contentId, title, content}
// response : { success, message, response: new Doc}
export const docUpdateContent = createAsyncThunk('doc/docUpdateContent', async (data) => {
    const response = await docApi.updateContent(data);
    return response;
})

// data: {docId, groupId}
export const docDeleteDoc = createAsyncThunk('doc/docDeleteDoc', async (data) => {
    const { docId } = data;

    const response = await docApi.deleteDoc(data);

    response.docId = docId;
    return response;
});

// data: {docId, contentId}
export const docDeleteContent = createAsyncThunk('doc/docDeleteContent', async (data) => {

    const { docId, contentId } = data;
    const response = await docApi.deleteContent(data);
    response.docId = docId;
    response.contentId = contentId;
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

        // Create content
        [docCreateContent.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const { docId } = action.payload;
            if (!docId) return state;

            state.data = state.data.map(doc => {
                if (doc._id === docId) {
                    return action.payload.response;
                }

                return doc;
            });

            return state;
        },

        // Get doc detail
        [docGetDetail.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const responseDoc = action.payload.response;
            try {
                const docIndex = state.data.findIndex(doc => doc._id === responseDoc._id);
                if (docIndex === -1) return state;

                state.data.splice(docIndex, 1, responseDoc);
                return state;

            } catch (err) {
                return state;
            }
        },

        // Update doc
        [docUpdateDoc.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;
            try {
                state.data = state.data.map(doc => {
                    if (doc._id === action.payload.response._id) {
                        return action.payload.response;
                    }

                    return doc;
                });

                return state;

            } catch (err) {
                return state;
            }
        },

        // Update Content
        [docUpdateContent.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            try {
                state.data = state.data.map(doc => {
                    if (doc._id === action.payload.response._id)
                        return action.payload.response;

                    return doc;
                })

            } catch (err) {
                return state;
            }
        },

        // Doc delete
        [docDeleteDoc.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const docId = action.payload.docId;

            state.data = state.data.filter(doc => doc._id !== docId);
            return state;
        },

        // Doc Delete Content

        [docDeleteContent.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const { contentId, docId } = action.payload;

            try {
                if (!contentId || !docId) return state;

                const foundDocIndex = state.data.findIndex(doc => doc._id === docId);

                if (foundDocIndex === -1) return state;

                if (!state.data[foundDocIndex].contents) return state;

                state.data[foundDocIndex].contents = state.data[foundDocIndex].contents.filter(content => content._id !== contentId);
                return state;
            } catch (err) {
                return state;
            }
        }

    }
});

const { reducer: docReducer } = docSlice;

export default docReducer;