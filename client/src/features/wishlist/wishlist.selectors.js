import { createSelector } from "@reduxjs/toolkit";

const selectWishlistState = (state) => state?.wishlist;

const selectWishlistSeriesStatus = createSelector(
    [selectWishlistState],
    (wishlistState) => wishlistState?.series
);

export const selectSeriesWishlistStatus = createSelector(
    [selectWishlistSeriesStatus, (state, seriesId) => seriesId],
    (entities, seriesId) => entities.indexOf(seriesId) !== -1 ? true : false
);