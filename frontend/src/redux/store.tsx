import {combineReducers, configureStore} from '@reduxjs/toolkit';

import loadbalancingReducer from "./loadbalancing/loadbalancing.reducer";
import aiReducer from "./ai/ai.reducer";
import menusReducer from "../components/menus/menus.reducer";

const rootReducer = combineReducers({
    loadBalancing: loadbalancingReducer,
    ai: aiReducer,
    menus: menusReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;