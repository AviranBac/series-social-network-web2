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

export const selectUserEmail = createSelector(
    [selectUser],
    (user) => user?.email
);

export const selectUserDisplayName = createSelector(
    [selectUser],
    (user) => user?.displayName
);