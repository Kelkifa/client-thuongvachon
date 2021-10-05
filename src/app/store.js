import { configureStore } from "@reduxjs/toolkit";
import docReducer from "features/doc/docSlice";
import gameReducer from "features/game/gameSlice";
import todoReducer from "features/ToDo/todoSlice";

const rootReducer = {
    games: gameReducer,
    todos: todoReducer,
    docs: docReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;