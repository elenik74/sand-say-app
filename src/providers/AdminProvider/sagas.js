import {call, put, takeEvery} from "@redux-saga/core/effects";

import {
    CHECK_VALIDATE_FORMS,
    FORMAT_MESSAGE,
    HANDLER_DROPDOWN_RUN,
    LOGOUT_REQUEST,
    SEND_ACTION_REQUEST,
} from './constants';

import {
    logoutRequest,
    logoutReceive,
    logoutError,
    sendActionReceive,
    sendActionError, validateFormsError, sendActionRequest, formatMessageSuccess,
} from './actions';

import request from "../../helpers/request";
import { SEND_SAY_ACTION } from "../AuthProvider/constants";

function* logoutRequestGenerator() {
    try {
        const session_id = localStorage.getItem('userData');

        const options = {
            action: SEND_SAY_ACTION.LOGOUT,
            session: session_id,
        };

        const result = yield call(request, options);
        if (result) {
            localStorage.removeItem('userData');
            localStorage.removeItem('login');
            localStorage.removeItem('subLogin');
            yield put(logoutReceive(result));
        } else {
            yield put(logoutError());
        }
    } catch (e) {
        yield put(logoutError());
    }
}

function* sendActionRequestGenerator({ data, id }) {
    try {
        const session_id = localStorage.getItem('userData');

        const options = {
            ...data,
            session: session_id,
        };
        let result = yield call(request, options);
        const response = {
            action: data.action,
            request: {
                ...data,
            },
            receive: {
                ...result,
            }
        }
        if (result) {
            yield put(sendActionReceive(response, id));
        } else {
            yield put(sendActionError(response, id));
        }
    } catch (e) {
        yield put(sendActionError(e));
    }
}

function* checkValidateFormsGenerator(data) {
    try {
        const checker = JSON.parse(data.data.sendActionValue)

        if (checker) {
            if (data.type === FORMAT_MESSAGE) {
                yield put(formatMessageSuccess(checker));
            } else {
                yield put(sendActionRequest(checker));
            }
        }
    } catch (e) {
        yield put(validateFormsError());
    }
}

export function* authSaga() {
    yield takeEvery(LOGOUT_REQUEST, logoutRequestGenerator);
    yield takeEvery(SEND_ACTION_REQUEST, sendActionRequestGenerator);
    yield takeEvery(CHECK_VALIDATE_FORMS, checkValidateFormsGenerator);
    yield takeEvery(FORMAT_MESSAGE, checkValidateFormsGenerator);
    yield takeEvery(HANDLER_DROPDOWN_RUN, sendActionRequestGenerator);
}

export default authSaga;
