import { combineReducers } from 'redux-immutable';

import authProviderReducer from './providers/AuthProvider/reducer';
import AdminProviderReducer from "./providers/AdminProvider/reducer";

export default function createReducer(asyncReducers) {
    return combineReducers({
        auth: authProviderReducer,
        admin: AdminProviderReducer,
        ...asyncReducers,
    });
}
