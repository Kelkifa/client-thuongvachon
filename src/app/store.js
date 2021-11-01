import authReducer from "features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import docReducer from "features/doc/docSlice";
import gameReducer from "features/game/gameSlice";
import groupReducer from "features/group/groupSlice";
import todoReducer from "features/ToDo/todoSlice";

const rootReducer = {
    games: gameReducer,
    todos: todoReducer,
    docs: docReducer,
    groups: groupReducer,
    auth: authReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;