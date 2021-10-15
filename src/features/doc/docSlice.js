import docApi from "api/docApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const docGetTypes = createAsyncThunk('doc/docGetTypes', async () => {
    const response = await docApi.getTypeList();
    return response;
})

/** Data is typeId {data:String} */
export const docGetContent = createAsyncThunk('doc/docGetContent', async (data) => {
    const response = await docApi.getContent(data);
    response.typeId = data.data;
    return response;
})
export const docCreateContent = createAsyncThunk('doc/docCreateContent', async (data) => {
    const response = await docApi.createContent({ data });
    response.typeId = data.type;
    return response;
})
export const docCreateDoc = createAsyncThunk('doc/docCreateDoc', async (data) => {
    const response = await docApi.createDoc({ data });
    return response;
})

export const docDeleteDoc = createAsyncThunk('doc/docDelete', async (typeId) => {

    const response = await docApi.deleteDoc({ data: typeId });
    response.typeId = typeId;
    return response;
})
export const docDeleteContent = createAsyncThunk('doc/docDeleteContent', async ({ typeId, docContentId }) => {
    const response = await docApi.deleteContent({ data: docContentId });
    response.docContentId = docContentId;
    response.typeId = typeId;
    return response;
})

const docSlice = createSlice({
    name: 'docs',
    initialState: {
        types: { loading: true, error: null, data: [] },
        contents: [], // [{typeId: String, loading: Boolen, error: String, data: Array}]
    },
    extraReducers: {
        [docGetTypes.pending]: (state, action) => {
            state.types.loading = true;
        },
        [docGetTypes.rejected]: (state, action) => {
            state.types.loading = false;
            state.types.error = 'rejected';
        },
        [docGetTypes.fulfilled]: (state, action) => {
            state.types.loading = false;

            if (!action.payload.success) {
                state.types.error = action.payload.message;
                return state;
            }

            state.types.data = action.payload.response;
            return state;
        },

        // GET CONTENT
        [docGetContent.pending]: (state, action) => {
        },
        [docGetContent.rejected]: (state, action) => {
        },
        [docGetContent.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;
            state.contents.push({ typeId: action.payload.typeId, loading: false, error: false, data: action.payload.response });
        },

        // CREATE
        [docCreateContent.pending]: (state, action) => {

        },
        [docCreateContent.rejected]: (state, action) => {

        },
        [docCreateContent.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const { typeId, response } = action.payload;
            if (!typeId || !response) return state;

            const foundContentIndex = state.contents.findIndex(content => content.typeId === typeId);
            console.log(`[foundContent]`, foundContentIndex);
            if (!foundContentIndex === -1) return state;

            state.contents[foundContentIndex].data.push(response);
            return state;

        },

        [docCreateDoc.pending]: (state, action) => {

        },
        [docCreateDoc.rejected]: (state, action) => {

        },
        [docCreateDoc.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const response = action.payload.response;
            if (!response) return state;
            state.types.data.push(response);

            return state;

        },

        // DELETE
        [docDeleteDoc.pending]: (state, action) => {

        },
        [docDeleteDoc.rejected]: (state, action) => {

        },
        [docDeleteDoc.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const typeId = action.payload.typeId;

            state.types.data = state.types.data.filter(type => type._id !== typeId);
            state.contents = state.contents.filter(content => content.typeId !== typeId);
            return state;
        },

        [docDeleteContent.pending]: (state, action) => {

        },
        [docDeleteContent.rejected]: (state, action) => {

        },
        [docDeleteContent.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const { docContentId, typeId } = action.payload;
            if (!docContentId || !typeId) return state;

            const foundContentIndex = state.contents.findIndex(content => content.typeId === typeId);
            if (foundContentIndex === -1) return;

            state.contents[foundContentIndex].data = state.contents[foundContentIndex].data.filter(value => value._id !== docContentId);
            return state;
        },

    }
});

const { reducer: docReducer } = docSlice;

export default docReducer;