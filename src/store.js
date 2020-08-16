import {
    applyMiddleware, compose,
    createStore
} from "redux";

import createReducer from "./reducers";
import createSagaMiddleware from "redux-saga";

import authSaga from "./providers/AuthProvider/sagas";
import adminSaga from "./providers/AdminProvider/sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    createReducer(),
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware,
        ),
    )
);

sagaMiddleware.run(authSaga);
sagaMiddleware.run(adminSaga);
store.runSaga = sagaMiddleware.run;
