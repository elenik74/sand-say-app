import { createSelector } from 'reselect';
import { STATES } from "./constants";

const authDataSelector = (state) => state.get(STATES.auth);
const adminDataSelector = (state) => state.get(STATES.admin);

export const authSelector = createSelector(
    authDataSelector,
    (state) => state,
);

export const actionInfoSelector = createSelector(
    adminDataSelector,
    (state) => state,
);

