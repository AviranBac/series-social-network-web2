import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wishlistService from "../../services/wishlist.service";

const seriesInitialState = [];
const seriesKey = "series";

const wishlistInitialState = {
    [seriesKey]: seriesInitialState,
};

export const loadWishlistThunk = createAsyncThunk(
    'wishlist/load',
    async (email, thunkApi) => {
        try {
            const userWishlist = await wishlistService.getUserWishlist(email);
            return userWishlist.data.map(series => series._id);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const updateWishlistState = (state, updatedWishList) => {
    state.series = updatedWishList
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: wishlistInitialState,
    reducers: {
        updateWishlist: (state, { payload }) => updateWishlistState(state, payload)
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWishlistThunk.fulfilled, (state, { payload }) => {
                updateWishlistState(state, payload);
            })
    }
});

export const { updateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;