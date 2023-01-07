import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice';
import watchlistReducer from './watchlist/watchlist.slice';

const rootReducer = combineReducers({
    auth: authReducer,
    watchlist: watchlistReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;