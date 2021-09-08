import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "features/game/gameSlice";

const rootReducer = {
    games: gameReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;