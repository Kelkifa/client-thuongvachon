import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "features/game/gameSlice";
import todoReducer from "features/ToDo/todoSlice";

const rootReducer = {
    games: gameReducer,
    todos: todoReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;