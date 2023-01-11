import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import watchlistService from "../../services/watchlist.service";
import { normalizeWatchlistSeries } from "../../utils/normalizers/watchlist.normalizer";

export const loadWatchlistThunk = createAsyncThunk(
    'watchlist/load',
    async (email, thunkApi) => {
        try {
            return await watchlistService.getUserWatchlist(email);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const seriesInitialState = {};
const seasonsInitialState = {};
const episodesInitialState = {};
const seriesKey = "series";
const seasonsKey = "seasons";
const episodesKey = "episodes";

const watchlistInitialState = {
    [seriesKey]: seriesInitialState,
    [seasonsKey]: seasonsInitialState,
    [episodesKey]: episodesInitialState
};

const updateWatchlistState = (state, updatedWatchlist) => {
    const normalizedWatchlist = normalizeWatchlistSeries(updatedWatchlist);
    [seriesKey, seasonsKey, episodesKey].forEach(key => state[key] = normalizedWatchlist[key]);
}

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: watchlistInitialState,
    reducers: {
        updateWatchlist: (state, { payload }) => updateWatchlistState(state, payload)
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadWatchlistThunk.fulfilled, (state, { payload }) => {
                updateWatchlistState(state, payload);
            })
    }
});

export const { updateWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;