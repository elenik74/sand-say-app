import {call, put, takeEvery} from "@redux-saga/core/effects";

import {
    AUTHORIZE_REQUEST,
    AUTHORIZE_ERROR,
    SEND_SAY_ACTION,
    AUTHENTICATION_REQUEST,
} from './constants';

import {
    authorizeReceive,
    authorizeError,
    authError,
    loginError,
} from './actions';
import request from "../../helpers/request";
import {LOGOUT_RECEIVE} from "../AdminProvider/constants";

function* authorizeRequestGenerator(action) {
    try {
        const {
            formData: {
                login,
                password,
                subLogin,
            },
        } = action;
        const options = {
            action: SEND_SAY_ACTION.LOGIN,
            login: login.value,
            passwd: password.value,
        };
        const result = yield call(request, options);
        if (result) {
            localStorage.setItem("userData", result.session);
            localStorage.setItem("login", login.value);
            localStorage.setItem("subLogin", subLogin.value ? subLogin.value : '');
            yield put(authorizeReceive(result));
        }
    } catch (e) {
        const err = JSON.stringify(e).split(',').splice(0,2).join(',') + '}';
        yield put(loginError(err));
    }
}
//
// function* signOut() {
//
// }

function* authorizeErrorGenerator(err) {
    console.log('err', err)
}

function* authRequestGenerator() {
    try {
        const session_id = localStorage.getItem('userData');

        const options = {
            action: SEND_SAY_ACTION.IS_AUTH,
            session: session_id,
        };

        const result = yield call(request, options);
        if (result) {
            yield put(authorizeReceive(result));
        } else {
            yield put(authError());
        }
    } catch (e) {
        yield put(authError());
    }
}

export function* authSaga() {
    yield takeEvery(AUTHORIZE_ERROR, authorizeErrorGenerator);
    yield takeEvery(AUTHORIZE_REQUEST, authorizeRequestGenerator);
    yield takeEvery(AUTHENTICATION_REQUEST, authRequestGenerator);
    // yield takeLatest(AUTHORIZE_REQUEST, authorizeRequestGenerator);
    // yield takeLatest(LOGOUT_REQUEST, signOut);
}

export default authSaga;
