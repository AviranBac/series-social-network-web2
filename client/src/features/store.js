import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice';
import wishlistReducer from './wishlist/wishlist.slice';
import watchlistReducer from './watchlist/watchlist.slice';

const rootReducer = combineReducers({
    auth: authReducer,
    wishlist: wishlistReducer,
    watchlist: watchlistReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;