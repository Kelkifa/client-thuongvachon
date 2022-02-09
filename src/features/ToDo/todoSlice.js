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

// Get passed notes
// data: {groupId}
export const getPassedNotes = createAsyncThunk('todo/getPassedNotes', async (data) => {
    const response = await todoApi.getPassedNotes(data);
    return response;
})

// data : {groupId, todoName, todoId}
export const todoAdd = createAsyncThunk('todo/todoAdd', async (data) => {
    const response = await todoApi.addTodo(data);
    return response;
})

// data: {groupId, noteId, todoId, state}
export const todoChangeState = createAsyncThunk('todo/todoChangeState', async (data) => {
    const { todoId, noteId, state } = data;
    const response = await todoApi.changeState(data);
    response.todoId = todoId;
    response.noteId = noteId;
    response.state = state;

    return response;
})

// Delete a note
export const todoDelete = createAsyncThunk('todo/todoDelete', async (data) => {
    // console.log(`[slice data]`, data);
    const response = await todoApi.delete(data);
    return response;
});

// data: {groupId, noteList}
export const todoDeleteMulti = createAsyncThunk('todo/todoDeleteMulti', async (data) => {
    const response = await todoApi.deleteMulti(data);
    return response;
});

// Delete a todo
// data: {groupId, todoId, noteId}
export const todoDeleteTodo = createAsyncThunk('todo/todoDeleteTodo', async (data) => {
    const response = await todoApi.deleteTodo(data);
    response.noteId = data.noteId;
    response.todoId = data.todoId;
    return response;
})

// Search a todo in group
// data: {groupId, search}
export const todoSearch = createAsyncThunk('todo/todoSearch', async (data) => {
    const response = await todoApi.search(data);
    return response;
})

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        user: {
            loading: false,
            error: null,
            data: [],
            selectedNote: {} // {_id, tooList}
        },
        admin: {

        }
    },
    reducers: {
        addTodo: (state, action) => {
            state.user.data.push(action.payload);
        },
        setSelectedNote: (state, action) => {
            state.user.selectedNote = action.payload;
        }
    },
    extraReducers: {
        // GET
        [todoGet.pending]: (state, action) => {
            state.user = { loading: true, error: null, data: [] }
            return state;
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

        // ADD TODO
        [todoAdd.pending]: (state, action) => {
            const payload = action.meta.arg;

            // if (state.user.selectedNote._id === payload.noteId)
            state.user.selectedNote.todoList.push({ todo: payload.todoName, state: false, loading: true })

            return state;

        },
        [todoAdd.rejected]: (state, action) => {

        },
        [todoAdd.fulfilled]: (state, action) => {
            console.log(action);
            if (!action.payload.success) {
                const payload = action.meta.arg;
                if (state.user.selectedNote._id === payload.todoId) {
                    const foundTodoIndex = state.user.selectedNote.todoList.findIndex(todo => todo.todo === payload.todoName && todo.loading === true);
                    if (foundTodoIndex === -1) return state;

                    state.user.selectedNote.todoList[foundTodoIndex].error = action.payload.message ? true : action.payload.message

                }
                return state
            }


            const noteIndex = state.user.data.findIndex(note =>
                note._id === action.payload.response._id
            )

            if (noteIndex !== -1) {
                state.user.data[noteIndex] = action.payload.response;
            }

            if (state.user.selectedNote._id === action.payload.response._id) {
                state.user.selectedNote = action.payload.response;
            }

            return state;

        },
        // CHANGE STATE
        [todoChangeState.pending]: (state, action) => {
            const payload = action.meta.arg;

            if (state.user.selectedNote._id !== payload.noteId) return state;

            const todoIndex = state.user.selectedNote.todoList.findIndex(todo => todo._id === payload.todoId);
            if (todoIndex === -1) return state;

            state.user.selectedNote.todoList[todoIndex].state = payload.state;
            return state;

        },
        [todoChangeState.rejected]: (state, action) => {

        },
        [todoChangeState.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                if (state.user.selectedNote._id === action.payload.noteId) {
                    const todoIndex = state.user.selectedNote.todoList.findIndex(todo => todo._id === action.payload.todoId);

                    state.user.setSelectedNote.todoList[todoIndex].state = action.payload.state ? false : true;
                    return state;
                }
                return state;

            }

            const noteIndex = state.user.data.findIndex(note => note._id === action.payload.noteId);
            if (noteIndex === -1) return state;

            state.user.data[noteIndex] = action.payload.response;

            if (state.user.selectedNote._id !== action.payload.noteId) return state;

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
        },

        // DELETE MULTI
        [todoDeleteMulti.pending]: (state, action) => {

            const { noteList } = action.meta.arg;

            if (noteList.length === 1 && state.user.data.length > 1) {
                state.user.data = state.user.data.map((note, index) => {
                    return { ...note, loading: noteList[0] === note._id ? true : false }
                })
                return state;
            }

            state.user.data = state.user.data.map((note, index) => {
                return { ...note, loading: noteList[index] === note._id ? true : false }
            })
            return state;
        },
        [todoDeleteMulti.fulfilled]: (state, action) => {
            const { noteList } = action.meta.arg;
            if (!action.payload.success) {

                if (noteList.length === 1 && state.user.data.length > 1) {
                    state.user.data = state.user.data.map((note, index) => {
                        return { ...note, loading: noteList[0] === note._id ? undefined : note.loading }
                    })

                    return state;
                }

                state.user.data = state.user.data.map((note, index) => {
                    return { ...note, loading: undefined }
                })
                return state;
            };

            if (noteList.length === 1 && state.user.data.length > 1) {
                state.user.data = state.user.data.filter((note, index) => note._id !== noteList[0])

                return state;
            }

            state.user.data = state.user.data.filter((note, index) => note._id !== noteList[index]);
            return state;
        },

        // DELETE TODO
        [todoDeleteTodo.pending]: (state, action) => {
            const payload = action.meta.arg;

            if (state.user.selectedNote._id !== payload.noteId) return state;

            state.user.selectedNote.todoList = state.user.selectedNote.todoList.filter(todo => todo._id !== payload.todoId);
            return state;
        },
        [todoDeleteTodo.fulfilled]: (state, action) => {
            if (!action.payload.success) return state;

            const { noteId } = action.payload.response;

            const todoIndex = state.user.data.findIndex(note => note._id === noteId);

            if (todoIndex === -1) return state;

            state.user.data[todoIndex].todoList = state.user.data[todoIndex].todoList.filter(todo => todo._id !== todo.id);
            return state;

        },


        // SEARCH
        [todoSearch.pending]: (state, action) => {

        },
        [todoSearch.fulfilled]: (state, action) => {

        },
    }
})

const { reducer: todoReducer, actions } = todoSlice;

export const { addTodo, setSelectedNote } = actions;
// console.log('[redux action]', addTodo)

export default todoReducer;