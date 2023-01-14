import { createSelector } from "@reduxjs/toolkit";

const selectWishlistState = (state) => state?.wishlist;

export const selectWishlistSeriesIds = createSelector(
    [selectWishlistState],
    (wishlistState) => wishlistState?.series
);

export const selectIsSeriesInWishlist = createSelector(
    [selectWishlistSeriesIds, (state, seriesId) => seriesId],
    (entities, seriesId) => entities.indexOf(seriesId) !== -1
);