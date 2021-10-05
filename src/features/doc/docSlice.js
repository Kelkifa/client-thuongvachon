const { createSlice } = require("@reduxjs/toolkit");


const docSlice = createSlice({
    name: 'docs',
    initialState: {
        loading: true,
        error: null,
        data: []
    },
});

const { reducer: docReducer } = docSlice;

export default docReducer;