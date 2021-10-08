import docApi from "api/docApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const docGetTypes = createAsyncThunk('doc/docGetTypes', async () => {
    const response = await docApi.getTypeList();
    return response;
})
export const docGetContent = createAsyncThunk('doc/docGetContent', async (data) => {
    const response = await docApi.getContent(data);
    response.typeId = data.data;
    return response;
})
export const docCreate = createAsyncThunk('doc/docCreate', async (data) => {
    const response = await docApi.create(data);
    response.type = data.data.type;
    console.log(`[response]`, response);
    return response;
})

const docSlice = createSlice({
    name: 'docs',
    initialState: {
        types: { loading: true, error: null, data: [] },
        contents: [], // contents:[{typeId: String, loading: Boolen, error: String, data: Array}]
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
        [docCreate.pending]: (state, action) => {

        },
        [docCreate.rejected]: (state, action) => {

        },
        [docCreate.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const response = action.payload.response;
            const contentIndex = state.contents.findIndex(value => value.typeId === response.typeId);

            // Chưa có type trong state.contents
            if (contentIndex === -1) {
                state.contents.push({ typeId: response.typeId, loading: false, error: false, data: response });
                state.types.data.push({ _id: response.typeId, type: action.payload.type });
                return state;
            }

            // Có type trong state.contents
            state.contents[contentIndex].data.push(response);
            state.types.data.push({ _id: response.typeId, type: action.payload.type });
            return state;
        }

    }
});

const { reducer: docReducer } = docSlice;

export default docReducer;