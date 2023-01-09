import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/auth.slice';
import wishlistReducer from './wishlist/wishlist.slice';

const rootReducer = combineReducers({
    auth: authReducer,
    wishlist: wishlistReducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;