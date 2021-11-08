import { todoApi } from "api/todoApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const todoGet = createAsyncThunk('todo/todoGet', async (data) => {
    const response = await todoApi.get(data);
    return response;
})
export const todoCreate = createAsyncThunk('todo/todoCreate', async (data) => {
    const response = await todoApi.add(data);
    return response;
})
export const todoDelete = createAsyncThunk('todo/todoDelete', async (data) => {
    // console.log(`[slice data]`, data);
    const response = await todoApi.delete(data);
    return response;
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        user: {
            loading: false,
            error: null,
            data: []
        },
        admin: {

        }
    },
    reducers: {
        addTodo: (state, action) => {
            state.user.data.push(action.payload);
        }
    },
    extraReducers: {
        // GET
        [todoGet.pending]: (state, action) => {
            state.user.loading = true;
        },
        [todoGet.rejected]: (state, action) => {
            state.user.loading = false;
            state.user.error = true;
        },
        [todoGet.fulfilled]: (state, action) => {
            state.user.loading = false;
            if (!action.payload.success) {
                state.user.error = action.payload.message;
                return state;
            }
            state.user.error = false;
            state.user.data = action.payload.response;
        },

        // ADD
        [todoCreate.pending]: (state, action) => {

        },
        [todoCreate.rejected]: (state, action) => {

        },
        [todoCreate.fulfilled]: (state, action) => {
            if (!action.payload.success)
                return state;
            state.user.data.push(action.payload.response);
            return state;
        },

        // DELETE
        [todoDelete.pending]: (state, action) => {

        },
        [todoDelete.rejected]: (state, action) => {

        },
        [todoDelete.fulfilled]: (state, action) => {
            if (!action.payload.success)
                return state;

            state.user.data = state.user.data.filter(value => value._id !== action.payload.response);
            return state;
        }
    }
})

const { reducer: todoReducer, actions } = todoSlice;

export const { addTodo } = actions;
// console.log('[redux action]', addTodo)

export default todoReducer;