import { createSelector } from "@reduxjs/toolkit";
import { WatchlistStatus } from "../../enums/WatchlistStatus";

const selectWatchlistState = (state) => state?.watchlist;

const selectWatchlistSeriesState = createSelector(
    [selectWatchlistState],
    (watchlistState) => watchlistState?.series || {}
);
const selectWatchlistSeasonsState = createSelector(
    [selectWatchlistState],
    (watchlistState) => watchlistState?.seasons || {}
);
const selectWatchlistEpisodesState = createSelector(
    [selectWatchlistState],
    (watchlistState) => watchlistState?.episodes || {}
);

const selectSeries = createSelector(
    [selectWatchlistSeriesState, (state, seriesId) => seriesId],
    (entities, seriesId) => entities[seriesId]
);

export const selectSeriesWatchlistStatus = createSelector(
    [selectSeries],
    series => series?.watchlistStatus ? series.watchlistStatus : WatchlistStatus.NONE
);
export const selectSeasonWatchlistStatus = createSelector(
    [selectWatchlistSeasonsState, (state, seasonId) => seasonId],
    (entities, seasonId) => entities[seasonId]?.watchlistStatus ? entities[seasonId].watchlistStatus : WatchlistStatus.NONE
);
export const selectEpisodeWatchlistStatus = createSelector(
    [selectWatchlistEpisodesState, (state, episodeId) => episodeId],
    (entities, episodeId) => entities[episodeId] ? WatchlistStatus.COMPLETE : WatchlistStatus.NONE
);