import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice';

const rootReducer = combineReducers({
    auth: authReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;