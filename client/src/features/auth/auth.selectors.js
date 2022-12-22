import { createSelector } from "@reduxjs/toolkit";

const selectAuthState = (state) => state.auth;

export const selectIsLoggedIn = createSelector(
    [selectAuthState],
    (authState) => authState?.isLoggedIn
);

export const selectUser = createSelector(
    [selectAuthState],
    (authState) => authState?.user
);